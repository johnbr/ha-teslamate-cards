"""The TeslaMate Cards integration.

Scaffold release. This integration reads TeslaMate's PostgreSQL database
directly and serves the results to a bundled set of Lovelace cards over the
Home Assistant websocket API -- there are no entities, and nothing is polled.

Nothing is wired up yet: the database pool, config flow, macro translation
layer, websocket commands and the card bundle land in later milestones. See
README.md for the milestone breakdown.
"""

from __future__ import annotations

import logging

from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

# There is no YAML configuration for this integration and -- until the config
# flow lands in M1 -- no config entries either.
CONFIG_SCHEMA = cv.empty_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the TeslaMate Cards integration."""
    _LOGGER.debug("TeslaMate Cards scaffold loaded; no data sources configured yet")
    hass.data.setdefault(DOMAIN, {})
    return True
