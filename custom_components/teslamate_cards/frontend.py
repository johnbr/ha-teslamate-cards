"""Serve the card bundle and register it as a Lovelace resource.

Adapted from ``ha-rss-newsreader-card``, including the HA 2026.7
``mode`` -> ``resource_mode`` rename fallback.

The ``?v=<version>`` on the resource URL is the only cache-buster: browsers hold
the module otherwise, so the manifest version must be bumped whenever the bundle
changes. release-please does that automatically from a ``feat:``/``fix:`` commit.
"""

from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import CARD_FILENAME, DATA_STATIC_REGISTERED, DOMAIN, URL_BASE

_LOGGER = logging.getLogger(__name__)

_CARD_URL_PATH = f"{URL_BASE}/{CARD_FILENAME}"


async def async_register_frontend(hass: HomeAssistant, version: str) -> None:
    data = hass.data.setdefault(DOMAIN, {})
    if not data.get(DATA_STATIC_REGISTERED):
        card_path = Path(__file__).parent / "frontend" / CARD_FILENAME
        if not card_path.is_file():
            # A source checkout without `npm run build`. The integration still
            # works; only the cards are missing, so say so rather than fail.
            _LOGGER.warning("Card bundle not found at %s -- run 'npm run build'", card_path)
            return
        await hass.http.async_register_static_paths(
            [StaticPathConfig(_CARD_URL_PATH, str(card_path), cache_headers=True)]
        )
        data[DATA_STATIC_REGISTERED] = True

    versioned_url = f"{_CARD_URL_PATH}?v={version}"
    resources = _storage_resources(hass)
    if resources is None:
        _LOGGER.info(
            "Lovelace is in YAML mode; add the card resource manually: url: %s, type: module",
            versioned_url,
        )
        return

    if not resources.loaded:
        await resources.async_load()
        resources.loaded = True

    for item in resources.async_items():
        if (item.get("url") or "").split("?")[0] == _CARD_URL_PATH:
            if item["url"] != versioned_url:
                await resources.async_update_item(item["id"], {"res_type": "module", "url": versioned_url})
                _LOGGER.debug("Updated Lovelace resource to %s", versioned_url)
            return

    await resources.async_create_item({"res_type": "module", "url": versioned_url})
    _LOGGER.debug("Registered Lovelace resource %s", versioned_url)


def _storage_resources(hass: HomeAssistant):
    """Return the resource storage collection, or None in YAML resource mode."""
    lovelace = hass.data.get("lovelace")
    # HA 2026.7 renamed LovelaceData.mode to resource_mode; check both so
    # older cores (>= 2025.7) keep working.
    mode = getattr(lovelace, "resource_mode", None) or getattr(lovelace, "mode", None)
    if mode != "storage":
        return None
    return getattr(lovelace, "resources", None)
