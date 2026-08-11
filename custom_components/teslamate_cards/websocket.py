"""Websocket API the cards call.

One command. A card sends a registered **query id** plus the values that fill
the Grafana template variables; it never sends SQL, and the id is resolved
against ``queries.QUERIES`` server-side.
"""

from __future__ import annotations

from datetime import datetime
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.util import dt as dt_util

from .const import (
    DATA_DB,
    DATA_WS_REGISTERED,
    DOMAIN,
    LENGTH_UNITS,
    PERIODS,
    PREFERRED_RANGES,
    TEMP_UNITS,
)
from .db import DatabaseError, TeslaMateDB
from .macros import MacroError, QueryContext
from .queries import QUERIES, UnknownQuery

WS_QUERY = f"{DOMAIN}/query"


@callback
def async_register_commands(hass: HomeAssistant) -> None:
    """Register once, even with several config entries."""
    if hass.data.setdefault(DOMAIN, {}).get(DATA_WS_REGISTERED):
        return
    websocket_api.async_register_command(hass, ws_query)
    hass.data[DOMAIN][DATA_WS_REGISTERED] = True


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_QUERY,
        vol.Required("query_id"): vol.In(sorted(QUERIES)),
        vol.Optional("car_id", default=1): vol.Coerce(int),
        vol.Optional("time_from"): cv.datetime,
        vol.Optional("time_to"): cv.datetime,
        # Validated here as well as in macros.py. This is the friendly-error
        # layer; the allowlist in macros.py is the security boundary and must
        # keep its own check -- never remove one because the other exists.
        vol.Optional("length_unit", default="km"): vol.In(sorted(LENGTH_UNITS)),
        vol.Optional("temp_unit", default="C"): vol.In(sorted(TEMP_UNITS)),
        vol.Optional("preferred_range", default="rated"): vol.In(sorted(PREFERRED_RANGES)),
        vol.Optional("period", default="month"): vol.In(sorted(PERIODS)),
        vol.Optional("geofence_ids"): vol.Any(None, [vol.Coerce(int)]),
        vol.Optional("location", default=""): cv.string,
        vol.Optional("charge_type", default=""): cv.string,
        vol.Optional("vars", default={}): dict,
    }
)
@websocket_api.async_response
async def ws_query(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    db = _first_db(hass)
    if db is None:
        connection.send_error(msg["id"], "not_ready", "TeslaMate Cards is not configured")
        return

    query_id = msg["query_id"]
    ctx = None
    if QUERIES[query_id].needs_context:
        now = dt_util.utcnow()
        ctx = QueryContext(
            car_id=msg["car_id"],
            time_from=_as_utc(msg.get("time_from")) or now.replace(year=now.year - 1),
            time_to=_as_utc(msg.get("time_to")) or now,
            length_unit=msg["length_unit"],
            temp_unit=msg["temp_unit"],
            preferred_range=msg["preferred_range"],
            period=msg["period"],
            timezone=hass.config.time_zone or "UTC",
            geofence_ids=msg.get("geofence_ids"),
            location=msg["location"],
            charge_type=msg["charge_type"],
            extras=msg["vars"],
        )

    try:
        rows = await db.async_query(query_id, ctx)
    except UnknownQuery:
        connection.send_error(msg["id"], "unknown_query", f"No such query: {query_id}")
    except MacroError as err:
        # A rejected allowlist value lands here -- a client bug, not a server one.
        connection.send_error(msg["id"], "invalid_params", str(err))
    except DatabaseError as err:
        connection.send_error(msg["id"], "query_failed", str(err))
    else:
        connection.send_result(msg["id"], {"query_id": query_id, "rows": rows})


def _as_utc(value: datetime | None) -> datetime | None:
    """Cards may send naive local or offset-aware timestamps."""
    return None if value is None else dt_util.as_utc(value)


def _first_db(hass: HomeAssistant) -> TeslaMateDB | None:
    for value in (hass.data.get(DOMAIN) or {}).values():
        if isinstance(value, dict) and isinstance(value.get(DATA_DB), TeslaMateDB):
            return value[DATA_DB]
    return None
