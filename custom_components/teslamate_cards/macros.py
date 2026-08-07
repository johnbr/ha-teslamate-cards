"""Translate TeslaMate's Grafana panel SQL into parameterised PostgreSQL.

The ported queries in ``queries/`` are the upstream Grafana ``rawSql`` kept as
close to verbatim as possible -- see ``reference/grafana/*.sql``. Grafana
resolves its own macros and template variables before sending a statement to the
database; this module does the same job, but emits asyncpg bind parameters
instead of interpolating text.

Two rules govern everything here:

1. **Bind by default.** Every value becomes ``$1``, ``$2``, ... Nothing a card
   sends is ever concatenated into SQL.

2. **Substitute literally only from an allowlist.** A handful of variables land
   in positions where a bind parameter is not legal -- column identifiers like
   ``start_${preferred_range}_range_km`` and aliases like
   ``AS range_diff_$length_unit``. Those are substituted as text, which is safe
   *only* because each is first checked for exact membership in a small closed
   set. There is no escaping step and there must never be one: if a value is not
   in the allowlist the translation fails.

Anything left unresolved is a hard error (:func:`_assert_fully_resolved`) rather
than a statement handed to the database with a stray ``$foo`` in it.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from datetime import UTC, datetime
from typing import Any

from .const import LENGTH_UNITS, PREFERRED_RANGES, TEMP_UNITS


class MacroError(ValueError):
    """A query template could not be safely translated."""


def _naive_utc(value: datetime) -> datetime:
    """Aware -> UTC -> naive; already-naive values are assumed to be UTC."""
    if value.tzinfo is None:
        return value
    return value.astimezone(UTC).replace(tzinfo=None)


# Variables spliced into SQL text rather than bound. See rule 2 above.
_LITERAL_VARS: dict[str, frozenset[str]] = {
    "preferred_range": PREFERRED_RANGES,
    "length_unit": LENGTH_UNITS,
    "alternative_length_unit": LENGTH_UNITS,
    "temp_unit": TEMP_UNITS,
}

# Grafana duration shorthand -> PostgreSQL interval units.
_INTERVAL_UNITS = {
    "s": "seconds",
    "m": "minutes",
    "h": "hours",
    "d": "days",
    "w": "weeks",
}
_DURATION_RE = re.compile(r"^(\d+)([smhdw])$")

# A `$name` reference that is not one of our own `$1`-style placeholders.
_LEFTOVER_RE = re.compile(r"\$(?!\d)\{?[A-Za-z_][A-Za-z0-9_:]*\}?")


@dataclass(slots=True)
class QueryContext:
    """Everything a card supplies for one query.

    ``extras`` carries the per-dashboard tunables (``min_dist``, ``min_speed``,
    ``duration``, ``cost``, ``aux``, ...) so this class does not need to grow a
    field per dashboard.
    """

    car_id: int
    time_from: datetime
    time_to: datetime
    length_unit: str = "km"
    temp_unit: str = "C"
    preferred_range: str = "rated"
    alternative_length_unit: str = "mi"
    timezone: str = "UTC"
    # None means "no geofence filter", matching Grafana's -1 sentinel.
    geofence_ids: list[int] | None = None
    location: str = ""
    charge_type: str = ""
    extras: dict[str, Any] = field(default_factory=dict)

    def __post_init__(self) -> None:
        """Normalise the window to naive UTC.

        Every timestamp column in TeslaMate's schema is ``timestamp WITHOUT time
        zone`` holding UTC, so asyncpg expects naive datetimes for them. Binding
        a timezone-aware one raises ``DataError: can't subtract offset-naive and
        offset-aware datetimes`` at execution -- which nothing catches earlier,
        because the statement itself prepares perfectly well. Normalising here
        means every consumer of the context gets it right by construction.
        """
        self.time_from = _naive_utc(self.time_from)
        self.time_to = _naive_utc(self.time_to)

    def literal(self, name: str) -> str:
        """Return an allowlisted value safe to splice into SQL text."""
        allowed = _LITERAL_VARS[name]
        value = getattr(self, name)
        if value not in allowed:
            raise MacroError(f"{name}={value!r} is not one of {sorted(allowed)}")
        return value


class _Binder:
    """Collects bind parameters, reusing a placeholder for a repeated value.

    ``$car_id`` alone appears 28 times in one dashboard; without reuse each
    occurrence would add another identical parameter.
    """

    def __init__(self) -> None:
        self.params: list[Any] = []
        self._seen: dict[tuple[str, Any], str] = {}

    def bind(self, key: str, value: Any) -> str:
        cache_key = (key, value if isinstance(value, (str, int, float, bool, datetime)) else id(value))
        if cache_key in self._seen:
            return self._seen[cache_key]
        self.params.append(value)
        placeholder = f"${len(self.params)}"
        self._seen[cache_key] = placeholder
        return placeholder


def translate(sql: str, ctx: QueryContext) -> tuple[str, list[Any]]:
    """Return ``(sql, params)`` ready for ``asyncpg``."""
    binder = _Binder()

    sql = _substitute_literals(sql, ctx)
    sql = _substitute_time_macros(sql, ctx, binder)
    sql = _substitute_filters(sql, ctx, binder)
    sql = _substitute_scalars(sql, ctx, binder)

    _assert_fully_resolved(sql)
    return sql, binder.params


def _substitute_literals(sql: str, ctx: QueryContext) -> str:
    """Allowlisted text substitution -- must run first, before any binding."""
    # Longest name first so `$alternative_length_unit` is never matched as
    # `$length_unit` with a stray prefix left behind.
    for name in sorted(_LITERAL_VARS, key=len, reverse=True):
        value = ctx.literal(name)
        sql = re.sub(rf"\$\{{{name}\}}", value, sql)
        sql = re.sub(rf"\${name}(?![A-Za-z0-9_])", value, sql)
    return sql


def _substitute_time_macros(sql: str, ctx: QueryContext, binder: _Binder) -> str:
    sql = _replace_call(sql, "$__timeFilter", lambda args: _time_filter(args, ctx, binder))
    sql = _replace_call(sql, "$__timeGroup", _time_group)
    sql = _replace_call(sql, "$__time", lambda args: f"extract(epoch from {args})*1000")

    sql = _replace_token(sql, "$__timeFrom()", lambda: binder.bind("time_from", ctx.time_from))
    sql = _replace_token(sql, "$__timeTo()", lambda: binder.bind("time_to", ctx.time_to))

    # `${__from}`/`${__to}` are epoch milliseconds; the `:date:seconds` format
    # Grafana uses in these dashboards is epoch seconds. Getting this backwards
    # is a 1000x error that still returns rows, so both are handled explicitly.
    #
    # The `::bigint` cast is required, not cosmetic. Grafana interpolates these
    # as numeric literals, so upstream happily writes
    # `(${__to:date:seconds} - ${__from:date:seconds})::numeric` -- as two bare
    # bind parameters that is `unknown - unknown`, which PostgreSQL rejects at
    # prepare time with "operator is not unique".
    for token, moment, key in (
        ("__from", ctx.time_from, "from"),
        ("__to", ctx.time_to, "to"),
    ):
        # The context stores naive UTC (see QueryContext.__post_init__), and
        # datetime.timestamp() reads a naive value as LOCAL time -- which would
        # silently shift every epoch bound by the host's UTC offset. Re-attach
        # UTC before converting.
        epoch = moment.replace(tzinfo=UTC).timestamp()
        sql = _replace_token(
            sql, f"${{{token}:date:seconds}}", lambda k=key, e=epoch: f"{binder.bind(f'{k}_s', int(e))}::bigint"
        )
        sql = _replace_token(
            sql, f"${{{token}}}", lambda k=key, e=epoch: f"{binder.bind(f'{k}_ms', int(e * 1000))}::bigint"
        )

    sql = _replace_token(sql, "'$__timezone'", lambda: binder.bind("tz", ctx.timezone))
    return sql


def _time_filter(column: str, ctx: QueryContext, binder: _Binder) -> str:
    lower = binder.bind("time_from", ctx.time_from)
    upper = binder.bind("time_to", ctx.time_to)
    return f"{column.strip()} BETWEEN {lower} AND {upper}"


def _time_group(args: str) -> str:
    """`$__timeGroup(col, '5s')` -> a date_bin bucket (PostgreSQL 14+)."""
    parts = [p.strip() for p in args.split(",")]
    if len(parts) != 2:
        raise MacroError(f"$__timeGroup expects 2 arguments, got {args!r}")
    column, raw = parts
    match = _DURATION_RE.match(raw.strip("'\""))
    if not match:
        raise MacroError(f"$__timeGroup interval {raw!r} is not a Grafana duration")
    amount, unit = match.groups()
    return f"date_bin(INTERVAL '{amount} {_INTERVAL_UNITS[unit]}', {column}, TIMESTAMP 'epoch')"


def _substitute_filters(sql: str, ctx: QueryContext, binder: _Binder) -> str:
    """The multi-value filters, each of which has exactly one upstream idiom."""
    # `('${geofence:pipe}' = '-1' OR x in ($geofence))` -- the quoted pipe form
    # is Grafana's "all selected" sentinel.
    selected = ctx.geofence_ids or []
    sql = _replace_token(
        sql,
        "'${geofence:pipe}'",
        lambda: binder.bind("geofence_pipe", "-1" if not selected else "|".join(str(g) for g in selected)),
    )
    if "$geofence" in sql:
        ids = binder.bind("geofence_ids", list(selected))
        sql = re.sub(r"\bin\s*\(\s*\$geofence\s*\)", f"= ANY({ids}::int[])", sql)

    # `address ILIKE '%$location%'`
    sql = _replace_token(sql, "'%$location%'", lambda: binder.bind("location", f"%{ctx.location}%"))

    # `array_to_string(ARRAY[$charge_type], ',')`
    sql = _replace_token(
        sql,
        "ARRAY[$charge_type]",
        lambda: f"{binder.bind('charge_type', [ctx.charge_type] if ctx.charge_type else [])}::text[]",
    )
    return sql


def _substitute_scalars(sql: str, ctx: QueryContext, binder: _Binder) -> str:
    """`$car_id` and the per-dashboard tunables.

    A quoted occurrence (`'$cost'`, `'$aux'`) binds as text, because upstream
    casts it explicitly -- `NULLIF('$cost', '')::NUMERIC`, `'$aux'::json`. An
    unquoted one binds as-is.
    """
    values: dict[str, Any] = {"car_id": ctx.car_id, **ctx.extras}

    for name in sorted(values, key=len, reverse=True):
        value = values[name]
        quoted = f"'${name}'"
        if quoted in sql:
            sql = sql.replace(quoted, binder.bind(name, "" if value is None else str(value)))
        sql = re.sub(rf"\${name}(?![A-Za-z0-9_])", lambda _m, v=value, n=name: binder.bind(n, v), sql)
    return sql


def _replace_token(sql: str, token: str, render) -> str:
    """Replace ``token`` only if present.

    ``render`` is deferred on purpose: calling it unconditionally would bind a
    parameter for every macro this module knows about, in every query, whether
    or not the query mentions it -- which silently renumbers every placeholder.
    """
    if token not in sql:
        return sql
    return sql.replace(token, render())


def _replace_call(sql: str, macro: str, render) -> str:
    """Replace `macro(args)` using a balanced-parenthesis scan.

    A regex would do for the argument shapes upstream actually uses, but a
    balanced scan costs little and does not quietly truncate a nested call.
    """
    while (start := sql.find(macro + "(")) != -1:
        open_paren = start + len(macro)
        depth = 0
        for i in range(open_paren, len(sql)):
            if sql[i] == "(":
                depth += 1
            elif sql[i] == ")":
                depth -= 1
                if depth == 0:
                    sql = sql[:start] + render(sql[open_paren + 1 : i]) + sql[i + 1 :]
                    break
        else:
            raise MacroError(f"unbalanced parentheses after {macro}")
    return sql


def _assert_fully_resolved(sql: str) -> None:
    """Fail loudly rather than send a statement with an unresolved macro."""
    leftovers = sorted(set(_LEFTOVER_RE.findall(sql)))
    if leftovers:
        raise MacroError(f"unresolved Grafana macros: {', '.join(leftovers)}")
