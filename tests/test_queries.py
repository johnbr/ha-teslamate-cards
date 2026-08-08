"""Query-registry tests.

Cards send a query id, never SQL, so the registry is the complete list of
statements this integration can issue. These checks keep that property honest.
"""

from __future__ import annotations

import pytest
from teslamate_cards.macros import QueryContext, translate
from teslamate_cards.queries import QUERIES, Query
from test_macros import EXTRAS, _context


def test_registry_is_not_empty() -> None:
    assert QUERIES


@pytest.mark.parametrize("query_id", sorted(QUERIES))
def test_every_query_is_a_single_select(query_id: str) -> None:
    """Nothing here may write. The role should be read-only too, but a
    registry that can only SELECT means a mistake in one layer is not enough."""
    sql = QUERIES[query_id].sql.strip().rstrip(";")
    lowered = sql.lower()

    # A parenthesised leg is still a SELECT: upstream writes the Trip battery
    # panel as `( SELECT ... ) UNION ALL ( SELECT ... )`, so the opening paren
    # has to be seen through rather than the query reshaped to satisfy a check.
    opening = lowered.lstrip("( \n\t")
    assert opening.startswith(("select", "with")), f"{query_id} does not start with SELECT/WITH"
    # A stray `;` would allow a second statement to ride along.
    assert ";" not in sql, f"{query_id} contains a statement separator"
    for forbidden in ("insert ", "update ", "delete ", "drop ", "alter ", "truncate ", "grant "):
        assert forbidden not in lowered, f"{query_id} contains {forbidden.strip()}"


@pytest.mark.parametrize("query_id", sorted(QUERIES))
def test_context_free_queries_really_are(query_id: str) -> None:
    """`needs_context=False` means the SQL is run with no parameters at all, so
    it must contain no macros -- otherwise they would reach PostgreSQL raw."""
    query: Query = QUERIES[query_id]
    if not query.needs_context:
        assert "$" not in query.sql, f"{query_id} is context-free but contains a macro"


@pytest.mark.parametrize("query_id", sorted(QUERIES))
def test_context_taking_queries_translate(query_id: str) -> None:
    query = QUERIES[query_id]
    if query.needs_context:
        translate(query.sql, _context())


def test_query_context_defaults_are_allowlisted() -> None:
    """The dataclass defaults must themselves pass the allowlist, or a caller
    that omits a field gets a MacroError instead of a sensible default."""
    ctx = QueryContext(car_id=1, time_from=_context().time_from, time_to=_context().time_to)
    for name in ("preferred_range", "length_unit", "temp_unit", "alternative_length_unit"):
        assert ctx.literal(name)
