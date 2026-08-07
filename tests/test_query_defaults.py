"""Every tunable a query references must have a typed default declared.

This is the guard for the sharpest edge in the whole translation layer. Grafana
interpolates a quoted variable as an SQL *literal*, which PostgreSQL leaves
``unknown`` and coerces from context -- so upstream writes both
``duration_min >= '$min_duration_min'`` (against a smallint) and
``'by distance' = '$efficiency'`` (against text) with identical syntax.

A bind parameter has no such freedom: the value's Python type picks the
parameter type. Get it wrong and the query **prepares perfectly** and then dies
at execution with "expected str, got int". So the registry declares the value,
and these tests make sure nothing is left undeclared.
"""

from __future__ import annotations

import re

import pytest
from teslamate_cards.queries import QUERIES

# Variables QueryContext supplies directly, so they are never in `defaults`.
CONTEXT_VARS = {
    "car_id",
    "length_unit",
    "alternative_length_unit",
    "temp_unit",
    "preferred_range",
    "geofence",
    "location",
    "charge_type",
    "base_url",
}

_VAR_RE = re.compile(r"\$\{?([A-Za-z_][A-Za-z0-9_]*)")


def _referenced_vars(sql: str) -> set[str]:
    """Template variables in the SQL, excluding Grafana's built-in macros."""
    return {name for name in _VAR_RE.findall(sql) if not name.startswith("__")}


@pytest.mark.parametrize("query_id", sorted(QUERIES))
def test_every_referenced_tunable_has_a_default(query_id: str) -> None:
    query = QUERIES[query_id]
    referenced = _referenced_vars(query.sql) - CONTEXT_VARS
    missing = sorted(referenced - set(query.defaults))
    assert not missing, f"{query_id} references {missing} with no declared default"


@pytest.mark.parametrize("query_id", sorted(QUERIES))
def test_no_unused_defaults(query_id: str) -> None:
    """A default for a variable the SQL never mentions is dead config, and
    usually means the name is misspelled on one side."""
    query = QUERIES[query_id]
    unused = sorted(set(query.defaults) - _referenced_vars(query.sql))
    assert not unused, f"{query_id} declares unused defaults: {unused}"


def test_the_types_that_actually_bit_us() -> None:
    """Regression: both of these prepared fine and failed at execution."""
    # Compared against a smallint column, despite being quoted upstream.
    assert isinstance(QUERIES["charges"].defaults["min_duration_min"], int)
    # Compared against the string literals 'slope-adjusted' / 'by distance'.
    assert isinstance(QUERIES["drives"].defaults["efficiency"], str)
    # Numeric comparisons against convert_km(...).
    assert isinstance(QUERIES["drives"].defaults["min_dist"], int | float)
    assert isinstance(QUERIES["drives"].defaults["min_speed"], int | float)


def test_defaults_are_json_safe() -> None:
    """They cross the websocket boundary as card config."""
    for query_id, query in QUERIES.items():
        for name, value in query.defaults.items():
            assert isinstance(value, str | int | float | bool), f"{query_id}.{name} is {type(value).__name__}"
