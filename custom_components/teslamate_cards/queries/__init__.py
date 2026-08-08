"""The registry of runnable queries.

Cards send a **query id**, never SQL. Everything runnable is registered here, so
the set of statements this integration can issue is fixed at import time and
visible in one place.

Each dashboard's queries land with its card -- see the milestones in README.md.
The SQL is kept as close to upstream's as possible so it can be diffed against
``reference/grafana/*.sql``; the Grafana macros in it are resolved by
``macros.translate`` at call time.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from .battery_health import BATTERY_CAPACITY_HISTORY_SQL, BATTERY_HEALTH_SQL
from .charges import CHARGES_SQL, INCOMPLETE_CHARGES_SQL
from .charging_stats import (
    CHARGE_DELTA_SQL,
    CHARGING_COST_PER_DISTANCE_SQL,
    CHARGING_TOTALS_SQL,
    DC_CHARGING_CURVE_SQL,
    TOP_STATIONS_COST_SQL,
    TOP_STATIONS_ENERGY_SQL,
)
from .drives import DRIVES_SQL, INCOMPLETE_DRIVES_SQL
from .trip import (
    TRIP_BATTERY_SQL,
    TRIP_ELEVATION_SQL,
    TRIP_ENERGY_SQL,
    TRIP_SUMMARY_SQL,
)
from .vampire_drain import VAMPIRE_DRAIN_SQL


class UnknownQuery(KeyError):
    """A card asked for a query id that is not registered."""


@dataclass(frozen=True, slots=True)
class Query:
    """One registered statement.

    ``sql`` may contain Grafana macros; ``needs_context`` says whether it does.
    A query without macros (``cars``) is run with no parameters at all.
    """

    sql: str
    description: str
    needs_context: bool = True
    #: Per-dashboard tunables, with Grafana's own defaults.
    #:
    #: **The Python type here is load-bearing.** Grafana interpolates a quoted
    #: variable as an SQL literal that PostgreSQL coerces from context, so
    #: upstream writes both ``duration_min >= '$min_duration_min'`` (smallint)
    #: and ``'by distance' = '$efficiency'`` (text) the same way. A bind
    #: parameter cannot do that -- the value's Python type picks the parameter
    #: type, and getting it wrong fails at execution while preparing cleanly.
    defaults: dict[str, Any] = field(default_factory=dict)


QUERIES: dict[str, Query] = {
    "cars": Query(
        sql="SELECT id, name, model, marketing_name, efficiency FROM cars ORDER BY id",
        description="Cars TeslaMate is logging; populates the car picker.",
        needs_context=False,
    ),
    "drives": Query(
        sql=DRIVES_SQL,
        description="One row per drive (Drives dashboard).",
        # min_dist/min_speed are numeric; efficiency is a text choice of
        # "slope-adjusted" or "by distance".
        defaults={"min_dist": 0, "min_speed": 0, "efficiency": "slope-adjusted"},
    ),
    "incomplete_drives": Query(
        sql=INCOMPLETE_DRIVES_SQL,
        description="Drives with no recorded end.",
    ),
    "charges": Query(
        sql=CHARGES_SQL,
        description="One row per charging process (Charges dashboard).",
        # cost is a free-text filter ("" = no filter); min_duration_min is
        # compared against a smallint column despite being quoted upstream.
        defaults={"cost": "", "min_duration_min": 0},
    ),
    "incomplete_charges": Query(
        sql=INCOMPLETE_CHARGES_SQL,
        description="Charging processes with no recorded end.",
    ),
    "vampire_drain": Query(
        sql=VAMPIRE_DRAIN_SQL,
        description="Standby losses between drives and charges (Vampire Drain dashboard).",
        # Minimum standby length in hours.
        defaults={"duration": 6},
    ),
    "battery_health": Query(
        sql=BATTERY_HEALTH_SQL,
        description="Capacity, range, degradation and current SOC (Battery Health dashboard).",
        # Grafana textbox overrides for a known-good pack; 0 means "derive it".
        # Numeric, and cast in the SQL -- see the note in battery_health.py.
        defaults={"custom_kwh_new": 0, "custom_max_range": 0},
    ),
    "battery_capacity_history": Query(
        sql=BATTERY_CAPACITY_HISTORY_SQL,
        description="Usable capacity against odometer, per charge and as a half-monthly median.",
    ),
    "charging_totals": Query(
        sql=CHARGING_TOTALS_SQL,
        description="Every scalar panel of the Charging Stats dashboard, in one row.",
        # Minimum session length in minutes; compared against a smallint column.
        defaults={"min_duration": 0},
    ),
    "charging_cost_per_distance": Query(
        sql=CHARGING_COST_PER_DISTANCE_SQL,
        description="Blended energy cost per 100 distance units.",
    ),
    "charge_delta": Query(
        sql=CHARGE_DELTA_SQL,
        description="Start and end SOC per charging session, for the Charge Delta timeseries.",
        defaults={"min_duration": 0},
    ),
    "dc_charging_curve": Query(
        sql=DC_CHARGING_CURVE_SQL,
        description="Charger power against SOC for fast-charging sessions, plus the median curve.",
    ),
    "top_stations_energy": Query(
        sql=TOP_STATIONS_ENERGY_SQL,
        description="Charging locations ranked by energy added.",
        defaults={"min_duration": 0},
    ),
    "top_stations_cost": Query(
        sql=TOP_STATIONS_COST_SQL,
        description="Charging locations ranked by cost.",
        defaults={"min_duration": 0},
    ),
    "trip_summary": Query(
        sql=TRIP_SUMMARY_SQL,
        description="Distance, time split, speeds and cost for a trip (Trip dashboard).",
    ),
    "trip_energy": Query(
        sql=TRIP_ENERGY_SQL,
        description="Gross energy consumed over a trip, including standby losses.",
    ),
    "trip_battery": Query(
        sql=TRIP_BATTERY_SQL,
        description="Battery level and range over time, bucketed to the window.",
    ),
    "trip_elevation": Query(
        sql=TRIP_ELEVATION_SQL,
        description="Elevation over time, bucketed to the window.",
    ),
}
