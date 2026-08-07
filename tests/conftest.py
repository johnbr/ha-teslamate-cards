"""Import the integration's pure modules without Home Assistant installed.

CI installs pytest and ruff, nothing else. ``const.py`` and ``macros.py`` are
deliberately pure -- no Home Assistant imports, no I/O, no asyncpg -- so they can
be unit-tested directly. But they live in a package whose ``__init__`` imports
all three, and Python runs that ``__init__`` before any submodule.

Rather than stub Home Assistant (a surface that grows with every milestone), the
package is registered in ``sys.modules`` as a bare module object with its
``__path__`` pointed at the real directory. Submodule imports then resolve
normally while ``__init__.py`` is never executed.

Anything touching the pool, config flow or websocket needs a real Home Assistant
plus ``pytest-homeassistant-custom-component``, and is out of scope here.
"""

from __future__ import annotations

import sys
from pathlib import Path
from types import ModuleType

REPO_ROOT = Path(__file__).resolve().parent.parent
PACKAGE_DIR = REPO_ROOT / "custom_components" / "teslamate_cards"

if "teslamate_cards" not in sys.modules:
    package = ModuleType("teslamate_cards")
    package.__path__ = [str(PACKAGE_DIR)]  # type: ignore[attr-defined]
    sys.modules["teslamate_cards"] = package
