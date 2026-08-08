"""Import every module against a real Home Assistant.

The rest of the suite deliberately avoids Home Assistant so it can run in CI,
which means nothing there checks that the names imported *from* Home Assistant
actually exist. That gap is not theoretical: ``CONF_DATABASE`` is not in
``homeassistant.const`` (``CONF_HOST``/``CONF_PORT``/``CONF_USERNAME``/
``CONF_PASSWORD`` all are), and the only symptom was the config flow 404ing --
Hassfest, ruff and the whole pytest suite passed.

Needs a Home Assistant to import against, so it skips where there isn't one --
including CI. Run it before deploying. Override the interpreter with
``TESLAMATE_TEST_HA_PYTHON``.

This checks the **working tree**, not the deployed copy: the package is staged
into the container each run, so it catches a mistake before it ships.
"""

from __future__ import annotations

import os
import shlex
import subprocess
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parent.parent
PACKAGE_DIR = REPO_ROOT / "custom_components" / "teslamate_cards"
CONTAINER = os.environ.get("TESLAMATE_TEST_HA_CONTAINER", "homeassistant")
HA_PYTHON = shlex.split(os.environ.get("TESLAMATE_TEST_HA_PYTHON", f"docker exec {CONTAINER} python"))
STAGE = "/tmp/teslamate_cards_import_check"

MODULES = [
    "const",
    "macros",
    "queries",
    "queries.vampire_drain",
    "queries.battery_health",
    "queries.charging_stats",
    "queries.trip",
    "queries._energy_stitch",
    "db",
    "frontend",
    "websocket",
    "config_flow",
    "__init__",
]


def _home_assistant_available() -> bool:
    try:
        proc = subprocess.run(
            [*HA_PYTHON, "-c", "import homeassistant.const"],
            capture_output=True,
            timeout=60,
        )
    except (OSError, subprocess.SubprocessError):
        return False
    return proc.returncode == 0


pytestmark = pytest.mark.skipif(
    not _home_assistant_available(),
    reason="no Home Assistant runtime available (expected in CI)",
)


@pytest.fixture(scope="module")
def staged() -> str:
    """Copy the working tree into the container as a real package."""
    subprocess.run(["docker", "exec", CONTAINER, "rm", "-rf", STAGE], check=False, capture_output=True)
    subprocess.run(
        ["docker", "exec", CONTAINER, "mkdir", "-p", f"{STAGE}/custom_components"],
        check=True,
        capture_output=True,
    )
    subprocess.run(
        ["docker", "cp", str(PACKAGE_DIR), f"{CONTAINER}:{STAGE}/custom_components/teslamate_cards"],
        check=True,
        capture_output=True,
    )
    yield STAGE
    subprocess.run(["docker", "exec", CONTAINER, "rm", "-rf", STAGE], check=False, capture_output=True)


@pytest.mark.parametrize("module", MODULES)
def test_module_imports_against_home_assistant(module: str, staged: str) -> None:
    target = (
        f"custom_components.teslamate_cards.{module}" if module != "__init__" else "custom_components.teslamate_cards"
    )
    proc = subprocess.run(
        [*HA_PYTHON, "-c", f"import sys; sys.path.insert(0, {staged!r}); import {target}"],
        capture_output=True,
        text=True,
        timeout=120,
    )
    assert proc.returncode == 0, f"{target} failed to import:\n{proc.stderr.strip()[-1500:]}"
