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
from teslamate_cards.macros import MacroError, QueryContext, auto_bucket_seconds, translate

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
    "high_precision": 0,
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

    66 query *targets* across 50 panels -- several panels (Drive Stats, Charging
    Stats, the xy charts, and the whole of Statistics) issue more than one query,
    and the reference files record one block per target.
    """
    assert len(ALL_PANELS) == 66, f"expected 66 query targets, parsed {len(ALL_PANELS)}"
    assert {d for d, _, _ in ALL_PANELS} == {
        "battery-health",
        "charges",
        "charging-stats",
        "drives",
        "statistics",
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


def test_period_reaches_inside_a_string_literal() -> None:
    """The reason `period` is spliced rather than bound.

    `interval '1 $1'` is not a parameterised interval -- it is the literal text
    "1 $1", and PostgreSQL rejects it. So the substitution has to happen before
    the statement is sent, which is what makes the allowlist load-bearing.
    """
    sql, params = translate(
        "SELECT date_trunc('$period', d) + interval '1 $period' FROM drives",
        _context(period="week"),
    )
    assert "date_trunc('week', d)" in sql
    assert "interval '1 week'" in sql
    assert params == []


@pytest.mark.parametrize(
    "value",
    ["month'; DROP TABLE drives; --", "month' || version() || '", "", "MONTH", "hour", "months"],
)
def test_period_allowlist_rejects(value: str) -> None:
    with pytest.raises(MacroError):
        translate("SELECT date_trunc('$period', d) FROM drives", _context(period=value))


def test_high_precision_is_bound_not_interpolated() -> None:
    """Statistics' own mode switch is a value, so it binds like any tunable."""
    sql, params = translate(
        "SELECT 1 FROM drives WHERE 0 = $high_precision",
        _context(extras={**EXTRAS, "high_precision": 0}),
    )
    assert "$high_precision" not in sql
    assert 0 in params


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


def test_alternative_length_unit_is_an_elevation_unit() -> None:
    """`alternative_length_unit` is metres/feet, not a second distance unit.

    It fed `convert_m(numeric, text)`, whose CASE has no ELSE -- so an unexpected
    unit returns **NULL rather than raising**, and the Trip dashboard's elevation
    chart would render empty with nothing at all to diagnose. It was allowlisted
    as {km, mi} until the Trip port first exercised it.
    """
    sql, _ = translate("SELECT convert_m(avg(elevation), '$alternative_length_unit')", _context(length_unit="mi"))
    assert "'ft'" in sql

    sql, _ = translate("SELECT convert_m(avg(elevation), '$alternative_length_unit')", _context(length_unit="km"))
    assert "'m'" in sql


def test_alternative_length_unit_cannot_disagree_with_length_unit() -> None:
    """It is derived, so passing a mismatched value cannot produce one."""
    ctx = QueryContext(
        car_id=1,
        time_from=datetime(2026, 1, 1, tzinfo=UTC),
        time_to=datetime(2026, 2, 1, tzinfo=UTC),
        length_unit="mi",
        alternative_length_unit="km",  # nonsense, and silently NULL in SQL
    )
    assert ctx.alternative_length_unit == "ft"


def test_auto_bucket_matches_upstream_on_a_short_window() -> None:
    """Inside about an hour the adaptive width bottoms out at upstream's own 5
    seconds, so a genuine single-trip view is not an approximation of Grafana's
    -- it is the same grouping."""
    assert auto_bucket_seconds(60 * 60) == 5
    assert auto_bucket_seconds(30 * 60) == 5


def test_auto_bucket_never_goes_finer_than_upstream() -> None:
    assert auto_bucket_seconds(0) == 5
    assert auto_bucket_seconds(-1) == 5
    assert auto_bucket_seconds(1) == 5


def test_auto_bucket_keeps_long_windows_renderable() -> None:
    """A 90-day window at upstream's flat 5 s produces ~32,000 buckets per
    series on this database. The point of the adaptive width is that the point
    count stays bounded however wide the window gets."""
    for days in (1, 7, 30, 90, 365):
        span = days * 86_400
        width = auto_bucket_seconds(span)
        assert span / width <= 800 * 1.05, f"{days}d yields too many points"


def test_auto_bucket_snaps_to_clock_friendly_widths() -> None:
    # 2 days / 800 = 216 s, which snaps up to 5 minutes rather than staying on
    # an arbitrary 216-second grid.
    assert auto_bucket_seconds(2 * 86_400) == 300


def test_auto_bucket_is_monotonic() -> None:
    """A wider window must never produce a finer bucket."""
    widths = [auto_bucket_seconds(span) for span in range(60, 400_000, 997)]
    assert widths == sorted(widths)


def test_time_group_auto_uses_the_context_window() -> None:
    sql, _ = translate("SELECT $__timeGroupAuto(date)", _context())
    assert "date_bin(INTERVAL '" in sql
    assert "TIMESTAMP 'epoch')" in sql
    # The context spans months, so it must not have fallen back to 5 seconds.
    assert "INTERVAL '5 seconds'" not in sql


def test_time_group_auto_does_not_collide_with_time_group() -> None:
    """`$__timeGroup` is a prefix of `$__timeGroupAuto`; both must survive in
    one statement."""
    sql, _ = translate("SELECT $__timeGroupAuto(date), $__timeGroup(date, '1h')", _context())
    assert "INTERVAL '1 hours'" in sql
    assert sql.count("date_bin(") == 2
    assert "$__" not in sql


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
