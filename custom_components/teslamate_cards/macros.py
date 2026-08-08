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

from .const import ELEVATION_UNIT_FOR, ELEVATION_UNITS, LENGTH_UNITS, PREFERRED_RANGES, TEMP_UNITS


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
    # Elevation, not distance -- metres or feet. See ELEVATION_UNITS.
    "alternative_length_unit": ELEVATION_UNITS,
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

# Points to aim for when bucketing a series for a chart. Comfortably more than
# the pixel width of any card, and small enough that the JSON stays modest.
AUTO_GROUP_TARGET_POINTS = 800

# Never bucket finer than upstream's own 5-second grouping.
AUTO_GROUP_FLOOR_SECONDS = 5

# Bucket widths that land on sensible clock boundaries, ascending. Snapping to
# these keeps `date_bin` edges aligned to minutes/hours rather than an arbitrary
# 217-second grid, which makes adjacent renders comparable.
_NICE_BUCKET_SECONDS = (
    5, 10, 15, 30,
    60, 120, 300, 600, 900, 1800,
    3600, 7200, 10800, 21600, 43200,
    86400, 172800, 604800,
)

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
    #: Elevation unit (m/ft). **Derived** from ``length_unit`` in __post_init__,
    #: so anything passed here is overwritten -- see ELEVATION_UNITS.
    alternative_length_unit: str = "m"
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
        # Elevation unit follows the distance unit, exactly as upstream's own
        # template variable derives it. Deriving rather than accepting means the
        # two can never disagree -- and a mismatched pair fails *silently*,
        # because convert_m() returns NULL for an unrecognised unit.
        self.alternative_length_unit = ELEVATION_UNIT_FOR.get(self.length_unit, "m")

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
    # Before `$__timeGroup`: the scan matches on `macro + "("`, so the two do not
    # actually collide, but keeping the longer name first makes that independent
    # of that detail.
    sql = _replace_call(sql, "$__timeGroupAuto", lambda args: _time_group_auto(args, ctx))
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


def auto_bucket_seconds(
    span_seconds: float,
    target_points: int = AUTO_GROUP_TARGET_POINTS,
    floor_seconds: int = AUTO_GROUP_FLOOR_SECONDS,
) -> int:
    """Bucket width that renders ``span_seconds`` in roughly ``target_points``.

    The Trip dashboard groups ``positions`` at a flat 5 seconds, which works in
    Grafana only because that dashboard is opened on a single trip. A card with
    a ``days`` option has no such guarantee: over 90 days the same grouping
    yields ~32,000 buckets per series, and shipping that to the browser for two
    charts is pointless when no display has the pixels to show it.

    Snapped up to a clock-friendly width so bucket edges stay aligned, and never
    finer than upstream's 5 seconds -- so a short enough window reproduces
    upstream's grouping exactly rather than approximating it.
    """
    if span_seconds <= 0:
        return floor_seconds
    wanted = max(floor_seconds, span_seconds / max(1, target_points))
    for candidate in _NICE_BUCKET_SECONDS:
        if candidate >= wanted:
            return max(candidate, floor_seconds)
    return max(_NICE_BUCKET_SECONDS[-1], floor_seconds)


def _time_group_auto(column: str, ctx: QueryContext) -> str:
    """`$__timeGroupAuto(col)` -> a date_bin bucket sized for the window."""
    span = (ctx.time_to - ctx.time_from).total_seconds()
    return f"date_bin(INTERVAL '{auto_bucket_seconds(span)} seconds', {column.strip()}, TIMESTAMP 'epoch')"


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

    Quoting in the template says only that the surrounding quotes must be
    consumed -- it does **not** mean the value is text. Grafana interpolates a
    quoted variable as an SQL literal, which PostgreSQL leaves `unknown` and
    coerces from context, so upstream can write both
    ``duration_min >= '$min_duration_min'`` (against a smallint) and
    ``NULLIF('$cost', '')::NUMERIC`` (against text) with the same syntax.

    A bind parameter has no such freedom: binding the smallint comparison as
    text fails with *"'str' object cannot be interpreted as an integer"* at
    execution, though the statement prepares cleanly. So the caller's own Python
    type decides -- pass an int for a numeric tunable, a str for a text filter.
    """
    values: dict[str, Any] = {"car_id": ctx.car_id, **ctx.extras}

    for name in sorted(values, key=len, reverse=True):
        value = values[name]
        quoted = f"'${name}'"
        if quoted in sql:
            sql = sql.replace(quoted, binder.bind(name, value))
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
