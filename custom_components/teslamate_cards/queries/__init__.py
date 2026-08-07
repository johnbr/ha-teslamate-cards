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

from .charges import CHARGES_SQL, INCOMPLETE_CHARGES_SQL
from .drives import DRIVES_SQL, INCOMPLETE_DRIVES_SQL
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
}
