"""Caller-supplied ``vars``: only declared tunables, and never as a pattern.

``vars`` arrives from the websocket as an arbitrary dict, and each key is used
as a variable *name* in the SQL text. So a key must be one the query declares
in its ``defaults``, and even then it is matched literally -- an unescaped key
was a regular expression over the statement, which could backtrack long enough
to stall Home Assistant's event loop, or match from a ``$`` across arbitrary
text and replace it with a bind placeholder.
"""

from __future__ import annotations

import time
from datetime import UTC, datetime

import pytest
from teslamate_cards.macros import MacroError, QueryContext, check_extras, translate
from teslamate_cards.queries import QUERIES


def _context(**extras) -> QueryContext:
    return QueryContext(
        car_id=1,
        time_from=datetime(2026, 1, 1, tzinfo=UTC),
        time_to=datetime(2026, 8, 1, tzinfo=UTC),
        extras=extras,
    )


# --- the allowlist ----------------------------------------------------------


@pytest.mark.parametrize("query_id", sorted(QUERIES))
def test_every_declared_tunable_is_accepted(query_id: str) -> None:
    check_extras(query_id, QUERIES[query_id].defaults, QUERIES[query_id].defaults)


def test_no_vars_is_always_accepted() -> None:
    for query_id, query in QUERIES.items():
        check_extras(query_id, {}, query.defaults)


@pytest.mark.parametrize(
    "key",
    [
        "car_id",  # not a tunable: the car comes from the context
        "min_dist",  # a tunable, but another query's
        "(a+)+$",
        "[^$]*",
        "min_duration_min.*",
    ],
)
def test_an_undeclared_key_is_refused(key: str) -> None:
    with pytest.raises(MacroError, match="no tunable named"):
        check_extras("charges", {key: 1}, QUERIES["charges"].defaults)


def test_the_refusal_names_the_key_but_does_not_echo_a_huge_one() -> None:
    with pytest.raises(MacroError) as err:
        check_extras("charges", {"x" * 10_000: 1}, QUERIES["charges"].defaults)
    assert len(str(err.value)) < 200


# --- matched literally, even if a key gets through --------------------------


def test_a_key_is_not_a_regular_expression() -> None:
    """``.*`` after a ``$`` would have eaten the rest of the statement."""
    sql = "SELECT 1 FROM charges WHERE duration_min >= $min_duration_min AND car_id = $car_id"
    out, params = translate(sql, _context(min_duration_min=5, **{"min_duration_min.*": 0}))
    assert "car_id = $" in out
    assert "duration_min >= $" in out
    assert sorted(params) == [1, 5]


def test_a_backtracking_key_matches_nothing_and_returns_at_once() -> None:
    """As a pattern, ``(a|a)+$`` over a long run of ``a`` never finishes.

    Matched literally it finds nothing, so the stray ``$aaa…`` is left for the
    unresolved-macro guard to refuse -- promptly, rather than after the event
    loop has stalled.
    """
    sql = "SELECT 1 FROM drives WHERE car_id = $car_id -- " + "$" + "a" * 5_000 + "!"
    started = time.monotonic()
    with pytest.raises(MacroError, match="unresolved"):
        translate(sql, _context(**{"(a|a)+$": 0, "(a+)+b": 0}))
    assert time.monotonic() - started < 1.0


def test_a_tunable_cannot_stand_in_for_the_car() -> None:
    out, params = translate("SELECT 1 FROM drives WHERE car_id = $car_id", _context(car_id=99))
    assert "car_id = $1" in out
    assert params == [1]
