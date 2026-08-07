"""Constants for the TeslaMate Cards integration.

Scaffold release: this module holds only pure data — no Home Assistant imports,
no I/O — so the allowlists below can be unit-tested without Home Assistant
installed. The database layer, config flow and websocket API land in M1.
"""

from __future__ import annotations

from typing import Final

DOMAIN: Final = "teslamate_cards"

URL_BASE: Final = "/teslamate_cards"
CARD_FILENAME: Final = "teslamate-cards.js"

# --- Database ---------------------------------------------------------------
# TeslaMate's own defaults. Home Assistant reaches a native PostgreSQL on the
# same host over loopback, which also sidesteps the DHCP-bind boot race that
# affects containers binding a LAN address.
DEFAULT_HOST: Final = "127.0.0.1"
DEFAULT_PORT: Final = 5432
DEFAULT_DATABASE: Final = "teslamate"
DEFAULT_USER: Final = "teslamate"

# Deliberately small. These queries are on-demand only (one websocket request
# per rendered card), never polled, so a large pool buys nothing and the cluster
# is shared with Home Assistant's own recorder.
POOL_MIN_SIZE: Final = 1
POOL_MAX_SIZE: Final = 3
CONNECT_TIMEOUT: Final = 10.0

# A runaway query must not pin a connection on a shared cluster.
STATEMENT_TIMEOUT_MS: Final = 10_000

# Several cards, browsers and the wall tablet routinely ask for the same figures
# at once; a short TTL collapses that into one query without going stale enough
# to notice.
QUERY_CACHE_TTL: Final = 60.0

# --- Query bounds -----------------------------------------------------------
# `positions` holds ~900k rows and grows ~815k/year, so anything reading it must
# bucket server-side rather than shipping raw rows to the browser.
MAX_TIME_BUCKETS: Final = 500
DEFAULT_PAGE_SIZE: Final = 25
MAX_PAGE_SIZE: Final = 200

# --- Template-variable allowlists -------------------------------------------
# `length_unit` and `temp_unit` reach SQL only as bind parameters (TeslaMate's
# convert_km(numeric, text) / convert_celsius(numeric, text) take the unit as a
# value), so validation here is about rejecting nonsense, not injection.
LENGTH_UNITS: Final = frozenset({"km", "mi"})
TEMP_UNITS: Final = frozenset({"C", "F"})

# `preferred_range` is the exception and the one genuinely security-critical
# value in this integration: the Grafana SQL splices it into *column
# identifiers* -- `start_${preferred_range}_range_km`, `end_..._range_km` -- so
# it cannot be a bind parameter. It must be checked against this set by exact
# membership and rejected outright otherwise. Never escape it, never sanitise it
# with a regex, and never add a value here without a matching column in
# TeslaMate's schema.
PREFERRED_RANGES: Final = frozenset({"ideal", "rated"})

# Sentinel used by the Grafana dashboards to mean "no geofence filter".
GEOFENCE_ALL: Final = -1

# --- hass.data[DOMAIN] keys -------------------------------------------------
DATA_POOL: Final = "pool"
DATA_CACHE: Final = "cache"
DATA_WS_REGISTERED: Final = "ws_registered"
DATA_STATIC_REGISTERED: Final = "static_registered"
