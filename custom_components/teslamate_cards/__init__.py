"""The TeslaMate Cards integration.

Reads TeslaMate's PostgreSQL database directly and serves the results to a
bundled set of Lovelace cards over the Home Assistant websocket API. There are
no entities and nothing is polled -- a query runs when a card asks for one.

M1: data layer only. The card bundle lands with the first card (M2).
"""

from __future__ import annotations

import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryNotReady
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType
from homeassistant.loader import async_get_integration

from .config_flow import async_resolve_ssl, dsn_from_entry
from .const import DATA_DB, DOMAIN
from .db import DatabaseError, TeslaMateDB
from .frontend import async_register_frontend
from .websocket import async_register_commands

_LOGGER = logging.getLogger(__name__)

# Configured through the UI only.
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    hass.data.setdefault(DOMAIN, {})
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    data = dict(entry.data)
    db = TeslaMateDB(dsn_from_entry(data), await async_resolve_ssl(hass, data))
    try:
        await db.async_connect()
        # Prove the credentials actually reach TeslaMate's schema, not just
        # that a socket opened.
        await db.async_cars()
    except DatabaseError as err:
        await db.async_close()
        # Transient failures (database still starting) get retried by HA.
        raise ConfigEntryNotReady(str(err)) from err

    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = {DATA_DB: db}
    async_register_commands(hass)

    integration = await async_get_integration(hass, DOMAIN)
    await async_register_frontend(hass, str(integration.version))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    stored = hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)
    if stored and (db := stored.get(DATA_DB)):
        await db.async_close()
    return True
