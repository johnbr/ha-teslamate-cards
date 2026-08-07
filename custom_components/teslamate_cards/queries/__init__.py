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

from dataclasses import dataclass


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


QUERIES: dict[str, Query] = {
    "cars": Query(
        sql="SELECT id, name, model, marketing_name, efficiency FROM cars ORDER BY id",
        description="Cars TeslaMate is logging; populates the car picker.",
        needs_context=False,
    ),
}
