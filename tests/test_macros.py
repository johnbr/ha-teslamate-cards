"""Grafana-macro translation tests.

The headline test runs the translator over **every panel of all six upstream
dashboards** in ``reference/grafana/*.sql``. That is the real corpus this
integration has to handle, so a macro shape nobody anticipated fails here rather
than at runtime with a stray ``$foo`` in a statement.

The rest cover the two things the corpus cannot: that the allowlist actually
*rejects* (an allowlist that cannot fire is worse than none), and that values
reach PostgreSQL as bind parameters rather than as text.
"""

from __future__ import annotations

import re
from datetime import UTC, datetime
from pathlib import Path

import pytest
from teslamate_cards.macros import MacroError, QueryContext, translate

REPO_ROOT = Path(__file__).resolve().parent.parent
GRAFANA_SQL = REPO_ROOT / "reference" / "grafana"

PANEL_SEPARATOR = "-" * 78

# Every tunable the six dashboards reference, so the corpus test exercises the
# real substitution paths rather than tripping on a missing key.
EXTRAS = {
    "min_dist": 1,
    "min_speed": 0,
    "min_duration": 0,
    "min_duration_min": 0,
    "duration": 4,
    "efficiency": 0,
    "cost": "",
    "aux": '{"RatedEfficiency": 0.19264, "CurrentCapacity": 100}',
    "custom_kwh_new": 100,
    "custom_max_range": 400,
}


def _context(**overrides) -> QueryContext:
    base = {
        "car_id": 1,
        "time_from": datetime(2026, 1, 1, tzinfo=UTC),
        "time_to": datetime(2026, 8, 1, tzinfo=UTC),
        "length_unit": "mi",
        "temp_unit": "F",
        "preferred_range": "rated",
        "timezone": "America/Los_Angeles",
        "extras": dict(EXTRAS),
    }
    return QueryContext(**{**base, **overrides})


def _panels(path: Path) -> list[tuple[str, str]]:
    """Yield ``(panel_title, sql)`` from an extracted reference file."""
    chunks = path.read_text(encoding="utf-8").split(PANEL_SEPARATOR)
    panels = []
    # chunks[0] is the file header; then (comment, sql) pairs.
    for i in range(1, len(chunks) - 1, 2):
        title = chunks[i].strip().removeprefix("-- PANEL: ")
        sql = "\n".join(line for line in chunks[i + 1].splitlines() if not line.strip().startswith("--")).strip()
        if sql:
            panels.append((title, sql))
    return panels


def _all_panels() -> list[tuple[str, str, str]]:
    out = []
    for path in sorted(GRAFANA_SQL.glob("*.sql")):
        for title, sql in _panels(path):
            out.append((path.stem, title, sql))
    return out


ALL_PANELS = _all_panels()


def test_the_corpus_was_actually_found() -> None:
    """Guard against the parser silently yielding nothing and every test passing.

    62 query *targets* across 49 panels -- several panels (Drive Stats, Charging
    Stats, the xy charts) issue more than one query, and the reference files
    record one block per target.
    """
    assert len(ALL_PANELS) == 62, f"expected 62 query targets, parsed {len(ALL_PANELS)}"
    assert {d for d, _, _ in ALL_PANELS} == {
        "battery-health",
        "charges",
        "charging-stats",
        "drives",
        "trip",
        "vampire-drain",
    }


@pytest.mark.parametrize(
    ("dashboard", "title", "sql"),
    ALL_PANELS,
    ids=[f"{d}:{t}"[:70] for d, t, _ in ALL_PANELS],
)
def test_every_upstream_panel_translates(dashboard: str, title: str, sql: str) -> None:
    """No macro may survive translation, in any panel of any dashboard."""
    translated, params = translate(sql, _context())

    # translate() raises on leftovers, but assert here too so a future
    # loosening of that check cannot pass silently.
    assert not re.search(r"\$(?!\d)\{?[A-Za-z_]", translated), translated
    # Placeholders must be dense and 1-based, or asyncpg rejects the statement.
    used = {int(n) for n in re.findall(r"\$(\d+)", translated)}
    assert used == set(range(1, len(params) + 1)) or not used


def test_preferred_range_reaches_column_identifiers() -> None:
    """This is why it cannot be a bind parameter."""
    sql, params = translate("SELECT start_${preferred_range}_range_km FROM drives", _context())
    assert "start_rated_range_km" in sql
    assert params == []


@pytest.mark.parametrize(
    "value",
    ["ideal; DROP TABLE drives", "rated OR 1=1", "", "IDEAL", "ideal_range_km"],
)
def test_preferred_range_allowlist_rejects(value: str) -> None:
    with pytest.raises(MacroError):
        translate("SELECT start_${preferred_range}_range_km FROM drives", _context(preferred_range=value))


@pytest.mark.parametrize("value", ["mi; --", "kilometres", "'mi'", ""])
def test_length_unit_allowlist_rejects(value: str) -> None:
    with pytest.raises(MacroError):
        translate("SELECT convert_km(distance, '$length_unit')", _context(length_unit=value))


def test_car_id_is_bound_not_interpolated() -> None:
    sql, params = translate("SELECT 1 FROM drives WHERE car_id = $car_id", _context(car_id=7))
    assert "car_id = $1" in sql
    assert params == [7]


def test_repeated_variable_reuses_one_placeholder() -> None:
    """`$car_id` appears 28 times in one dashboard."""
    sql, params = translate(
        "SELECT 1 FROM a WHERE car_id = $car_id UNION SELECT 1 FROM b WHERE car_id = $car_id",
        _context(car_id=3),
    )
    assert params == [3]
    assert sql.count("$1") == 2


def test_time_filter_becomes_a_bounded_range() -> None:
    """Bound as NAIVE UTC: every TeslaMate timestamp column is `timestamp
    WITHOUT time zone`, and asyncpg rejects an aware datetime for one."""
    sql, params = translate("SELECT 1 WHERE $__timeFilter(start_date)", _context())
    assert "start_date BETWEEN $1 AND $2" in sql
    assert params == [datetime(2026, 1, 1), datetime(2026, 8, 1)]
    assert all(p.tzinfo is None for p in params)


def test_aware_and_naive_inputs_agree() -> None:
    """A card may send either; both must land on the same instant."""
    aware = translate("SELECT 1 WHERE $__timeFilter(d)", _context())[1]
    naive = translate(
        "SELECT 1 WHERE $__timeFilter(d)",
        _context(time_from=datetime(2026, 1, 1), time_to=datetime(2026, 8, 1)),
    )[1]
    assert aware == naive


def test_epoch_macros_use_the_right_scale() -> None:
    """`${__from}` is milliseconds, `:date:seconds` is seconds -- a 1000x trap.

    Asserted against the context's own timestamp rather than against each other,
    so this cannot pass by binding two values that merely differ by 1000.
    """
    # Computed independently of the context so a timezone bug in the code
    # cannot be mirrored by the same bug in the expectation.
    expected = datetime(2026, 1, 1, tzinfo=UTC).timestamp()

    _, seconds_only = translate("SELECT ${__from:date:seconds}", _context())
    assert seconds_only == [int(expected)]

    _, millis_only = translate("SELECT ${__from}", _context())
    assert millis_only == [int(expected * 1000)]


def test_time_group_becomes_date_bin() -> None:
    sql, _ = translate("SELECT $__timeGroup(date, '5s')", _context())
    assert "date_bin(INTERVAL '5 seconds', date, TIMESTAMP 'epoch')" in sql


def test_time_group_rejects_a_bad_interval() -> None:
    with pytest.raises(MacroError):
        translate("SELECT $__timeGroup(date, 'fortnight')", _context())


def test_geofence_all_uses_the_sentinel() -> None:
    sql, params = translate(
        "SELECT 1 WHERE ('${geofence:pipe}' = '-1' OR geofence_id in ($geofence))",
        _context(geofence_ids=None),
    )
    assert "= ANY($2::int[])" in sql
    assert params[0] == "-1"


def test_geofence_selection_binds_an_array() -> None:
    sql, params = translate(
        "SELECT 1 WHERE ('${geofence:pipe}' = '-1' OR geofence_id in ($geofence))",
        _context(geofence_ids=[3, 9]),
    )
    assert "= ANY($2::int[])" in sql
    assert params == ["3|9", [3, 9]]


def test_location_filter_is_bound_with_wildcards() -> None:
    sql, params = translate("SELECT 1 WHERE address ILIKE '%$location%'", _context(location="Reno"))
    assert "ILIKE $1" in sql
    assert params == ["%Reno%"]


def test_location_wildcard_input_cannot_break_out() -> None:
    """A quote in the search box must stay data."""
    sql, params = translate(
        "SELECT 1 WHERE address ILIKE '%$location%'",
        _context(location="' OR 1=1 --"),
    )
    assert "ILIKE $1" in sql
    assert params == ["%' OR 1=1 --%"]


def test_unresolved_macro_is_an_error() -> None:
    with pytest.raises(MacroError, match="unresolved"):
        translate("SELECT 1 WHERE x = $not_a_known_variable", _context())
