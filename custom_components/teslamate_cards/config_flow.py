"""Config flow: where TeslaMate's database lives.

Validation is a real query (``SELECT ... FROM cars``), not just a TCP connect --
a reachable PostgreSQL that isn't TeslaMate, or a role without SELECT, should
fail here with an explanation rather than at the first card render.
"""

from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol
from homeassistant.config_entries import ConfigFlow, ConfigFlowResult
from homeassistant.const import (
    CONF_HOST,
    CONF_PASSWORD,
    CONF_PORT,
    CONF_USERNAME,
)

from .const import (
    CONF_DATABASE,
    DEFAULT_DATABASE,
    DEFAULT_HOST,
    DEFAULT_PORT,
    DEFAULT_USER,
    DOMAIN,
)
from .db import DatabaseError, TeslaMateDB

_LOGGER = logging.getLogger(__name__)

STEP_USER_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_HOST, default=DEFAULT_HOST): str,
        vol.Required(CONF_PORT, default=DEFAULT_PORT): int,
        vol.Required(CONF_DATABASE, default=DEFAULT_DATABASE): str,
        vol.Required(CONF_USERNAME, default=DEFAULT_USER): str,
        # Optional: a loopback connection to a local PostgreSQL is commonly
        # `trust`, and TeslaMate's own docs cover password auth.
        vol.Optional(CONF_PASSWORD, default=""): str,
    }
)


def dsn_from_entry(data: dict[str, Any]) -> dict[str, Any]:
    """Config-entry data -> asyncpg keyword arguments."""
    dsn = {
        "host": data[CONF_HOST],
        "port": data[CONF_PORT],
        "database": data[CONF_DATABASE],
        "user": data[CONF_USERNAME],
    }
    if data.get(CONF_PASSWORD):
        dsn["password"] = data[CONF_PASSWORD]
    return dsn


class TeslaMateCardsConfigFlow(ConfigFlow, domain=DOMAIN):
    """Collect and verify the database connection."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        errors: dict[str, str] = {}

        if user_input is not None:
            try:
                cars = await _async_validate(user_input)
            except DatabaseError as err:
                _LOGGER.debug("TeslaMate database validation failed: %s", err)
                errors["base"] = "cannot_connect"
            else:
                if not cars:
                    errors["base"] = "no_cars"
                else:
                    return self.async_create_entry(
                        title=f"TeslaMate ({user_input[CONF_HOST]})",
                        data=user_input,
                    )

        return self.async_show_form(
            step_id="user",
            data_schema=self.add_suggested_values_to_schema(STEP_USER_SCHEMA, user_input or {}),
            errors=errors,
        )


async def _async_validate(user_input: dict[str, Any]) -> list[dict[str, Any]]:
    """Connect, read the car list, disconnect."""
    db = TeslaMateDB(dsn_from_entry(user_input))
    try:
        await db.async_connect()
        return await db.async_cars()
    finally:
        await db.async_close()
