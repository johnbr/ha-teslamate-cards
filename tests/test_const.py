"""Allowlist tests.

``preferred_range`` is the one value in this integration that reaches SQL as a
*column identifier* rather than a bind parameter, so its allowlist is the only
thing standing between a card config and SQL injection. It is tested in both
directions -- accepted values accepted, everything else rejected -- because an
allowlist that cannot reject is worse than no allowlist at all.
"""

from __future__ import annotations

import pytest
from teslamate_cards.const import (
    LENGTH_UNITS,
    MAX_PAGE_SIZE,
    MAX_TIME_BUCKETS,
    PERIODS,
    POOL_MAX_SIZE,
    PREFERRED_RANGES,
    TEMP_UNITS,
)


def test_preferred_ranges_accepts_only_teslamate_column_prefixes() -> None:
    """These are spliced into `start_<x>_range_km` / `end_<x>_range_km`."""
    assert sorted(PREFERRED_RANGES) == ["ideal", "rated"]


@pytest.mark.parametrize(
    "value",
    [
        "",
        "IDEAL",  # case matters: the column name is lowercase
        "ideal ",
        " ideal",
        "ideal;--",
        "ideal_range_km",
        "rated_km",
        "km",
        "ideal' OR '1'='1",
        "ideal_range_km FROM cars; DROP TABLE drives; --",
        "ideal, (SELECT password FROM users) AS x",
    ],
)
def test_preferred_ranges_rejects_everything_else(value: str) -> None:
    assert value not in PREFERRED_RANGES


def test_unit_allowlists() -> None:
    assert sorted(LENGTH_UNITS) == ["km", "mi"]
    assert sorted(TEMP_UNITS) == ["C", "F"]


@pytest.mark.parametrize("value", ["", "KM", "miles", "km;", "'mi'"])
def test_length_units_reject_everything_else(value: str) -> None:
    assert value not in LENGTH_UNITS


def test_periods_are_the_four_grains_upstream_offers() -> None:
    """Spliced into `interval '1 <x>'`, where a bind parameter cannot reach."""
    assert sorted(PERIODS) == ["day", "month", "week", "year"]


@pytest.mark.parametrize(
    "value",
    [
        "",
        "MONTH",
        "month ",
        "months",  # date_trunc accepts it; the CASE arms do not
        "hour",  # a valid date_trunc grain, but not one this dashboard offers
        "month'",
        "month' || (select version()) || '",
        "day'; DROP TABLE drives; --",
    ],
)
def test_periods_reject_everything_else(value: str) -> None:
    assert value not in PERIODS


def test_allowlists_are_immutable() -> None:
    """A mutable allowlist can be widened at runtime by accident."""
    for allowlist in (PREFERRED_RANGES, LENGTH_UNITS, TEMP_UNITS, PERIODS):
        assert isinstance(allowlist, frozenset)


def test_query_bounds_are_sane() -> None:
    """These caps are what keep ~900k `positions` rows out of the browser."""
    assert 0 < MAX_TIME_BUCKETS <= 2000
    assert 0 < MAX_PAGE_SIZE <= 1000
    # The cluster is shared with Home Assistant's own recorder.
    assert POOL_MAX_SIZE <= 5
