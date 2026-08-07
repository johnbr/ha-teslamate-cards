"""Connection pool and query execution against TeslaMate's PostgreSQL.

Deliberately small and on-demand. A query runs when a card is rendered and asks
for one; nothing here polls, and there is no coordinator. TeslaMate commonly
shares a cluster with Home Assistant's own recorder, so this owns a 3-connection
pool of its own and never borrows the recorder's.
"""

from __future__ import annotations

import asyncio
import logging
import ssl as ssl_module
import time
from dataclasses import replace
from datetime import date, datetime, timedelta
from decimal import Decimal
from typing import Any
from uuid import UUID

import asyncpg

from .const import (
    APPLICATION_NAME,
    CONNECT_TIMEOUT,
    POOL_MAX_SIZE,
    POOL_MIN_SIZE,
    QUERY_CACHE_TTL,
    STATEMENT_TIMEOUT_MS,
)
from .macros import QueryContext, translate
from .queries import QUERIES, UnknownQuery

_LOGGER = logging.getLogger(__name__)


class DatabaseError(Exception):
    """Connection or query failure, already safe to show a user."""


class TeslaMateDB:
    """A pool plus a short-lived result cache."""

    def __init__(self, dsn: dict[str, Any], ssl: Any = "disable") -> None:
        self._dsn = dsn
        # Either the string "disable" or a prebuilt ssl.SSLContext. Building the
        # context is blocking file I/O, so it is the caller's job to do that in
        # an executor -- see `build_ssl_context`.
        self._ssl = ssl
        self._pool: asyncpg.Pool | None = None
        self._cache: dict[tuple, tuple[float, list[dict[str, Any]]]] = {}
        self._lock = asyncio.Lock()

    async def async_connect(self) -> None:
        if self._pool is not None:
            return
        try:
            self._pool = await asyncpg.create_pool(
                min_size=POOL_MIN_SIZE,
                max_size=POOL_MAX_SIZE,
                timeout=CONNECT_TIMEOUT,
                ssl=self._ssl,
                command_timeout=STATEMENT_TIMEOUT_MS / 1000,
                server_settings={
                    # A runaway query must not pin a connection on a shared cluster.
                    "statement_timeout": str(STATEMENT_TIMEOUT_MS),
                    # TeslaMate's own pool, Grafana and this one all land in the
                    # same pg_stat_activity. Without a name our connections and
                    # queries are unattributable on a shared cluster -- and this
                    # cluster is also monitored, so an unlabelled slow query is a
                    # question nobody can answer.
                    "application_name": APPLICATION_NAME,
                },
                **self._dsn,
            )
        except (OSError, asyncpg.PostgresError) as err:
            raise DatabaseError(f"Cannot connect to TeslaMate database: {err}") from err

    async def async_close(self) -> None:
        if self._pool is not None:
            await self._pool.close()
            self._pool = None
        self._cache.clear()

    async def async_cars(self) -> list[dict[str, Any]]:
        """Cars TeslaMate knows about -- used by config flow and card editors."""
        return await self.async_query("cars", None)

    async def async_query(self, query_id: str, ctx: QueryContext | None) -> list[dict[str, Any]]:
        """Run a *registered* query. Cards send an id, never SQL."""
        try:
            template = QUERIES[query_id]
        except KeyError as err:
            raise UnknownQuery(f"Unknown query id: {query_id}") from err

        if ctx is None:
            sql, params = template.sql, []
        else:
            # The registry's defaults carry the right Python type for each
            # tunable; a caller may override the value but rarely all of them.
            ctx = replace(ctx, extras={**template.defaults, **ctx.extras})
            sql, params = translate(template.sql, ctx)

        key = (query_id, tuple(_hashable(p) for p in params))
        if (hit := self._cache.get(key)) and time.monotonic() - hit[0] < QUERY_CACHE_TTL:
            return hit[1]

        if self._pool is None:
            raise DatabaseError("Database pool is not connected")

        # One flight per distinct query: several cards, browsers and the wall
        # tablet routinely ask for the same figures at the same moment.
        async with self._lock:
            if (hit := self._cache.get(key)) and time.monotonic() - hit[0] < QUERY_CACHE_TTL:
                return hit[1]
            try:
                records = await self._pool.fetch(sql, *params)
            except asyncpg.PostgresError as err:
                _LOGGER.debug("Query %s failed: %s\nSQL: %s", query_id, err, sql)
                raise DatabaseError(f"Query {query_id} failed: {err}") from err

            rows = [{k: _jsonable(v) for k, v in record.items()} for record in records]
            self._cache[key] = (time.monotonic(), rows)

        return rows


def build_ssl_context() -> ssl_module.SSLContext:
    """Build the TLS context asyncpg should use.

    **Blocking** -- `create_default_context` reads the system CA bundle from
    disk, so run this in an executor, never on the event loop.

    Verification is left off, matching asyncpg's own "prefer"/"require"
    behaviour: a TeslaMate database on a private network almost never has a
    certificate that chains to a public CA, and failing closed there would just
    push people back to plaintext.
    """
    context = ssl_module.create_default_context()
    context.check_hostname = False
    context.verify_mode = ssl_module.CERT_NONE
    return context


def _hashable(value: Any) -> Any:
    """Bind parameters include lists (geofence ids), which cannot key a dict."""
    return tuple(value) if isinstance(value, list) else value


def _jsonable(value: Any) -> Any:
    """Coerce PostgreSQL types Home Assistant's JSON encoder cannot serialise.

    Any `::numeric` expression -- and TeslaMate's own ``convert_km`` /
    ``convert_celsius`` helpers all return numeric -- comes back from asyncpg as
    ``decimal.Decimal``, which HA's encoder rejects outright: the websocket
    response fails, not the query, so the card sees a bare connection error with
    nothing useful in it.

    Timestamps are emitted as ISO 8601 with no zone, matching the columns they
    come from (TeslaMate stores naive UTC). The card appends the ``Z``.
    """
    if isinstance(value, Decimal):
        return float(value)
    if isinstance(value, datetime | date):
        return value.isoformat()
    if isinstance(value, timedelta):
        return value.total_seconds()
    if isinstance(value, UUID):
        return str(value)
    if isinstance(value, list):
        return [_jsonable(item) for item in value]
    return value
