"""Repository-shape tests.

These run without Home Assistant installed, so they cover the metadata HACS and
hassfest validate rather than integration behaviour. The version-drift check is
the load-bearing one: release-please bumps ``manifest.json`` and
``.release-please-manifest.json`` together, and a hand edit to either one
silently breaks the card bundle's ``?v=`` cache-buster.
"""

from __future__ import annotations

import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DOMAIN = "teslamate_cards"
COMPONENT_DIR = REPO_ROOT / "custom_components" / DOMAIN

# Keys HACS requires in a custom integration manifest.
REQUIRED_MANIFEST_KEYS = (
    "domain",
    "name",
    "codeowners",
    "documentation",
    "issue_tracker",
    "version",
)

# The six TeslaMate Grafana dashboards this repo ports.
DASHBOARDS = (
    "battery-health",
    "charges",
    "charging-stats",
    "drives",
    "trip",
    "vampire-drain",
)


def _load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def test_single_integration_in_repo() -> None:
    """HACS allows exactly one integration per repository."""
    integrations = sorted(p.name for p in (REPO_ROOT / "custom_components").iterdir() if p.is_dir())
    assert integrations == [DOMAIN]


def test_manifest_has_required_keys() -> None:
    manifest = _load(COMPONENT_DIR / "manifest.json")
    missing = [key for key in REQUIRED_MANIFEST_KEYS if not manifest.get(key)]
    assert not missing, f"manifest.json missing: {missing}"


def test_manifest_domain_matches_directory() -> None:
    assert _load(COMPONENT_DIR / "manifest.json")["domain"] == COMPONENT_DIR.name


def test_manifest_version_matches_release_please() -> None:
    manifest_version = _load(COMPONENT_DIR / "manifest.json")["version"]
    tracked_version = _load(REPO_ROOT / ".release-please-manifest.json")["."]
    assert manifest_version == tracked_version


def test_manifest_pins_its_requirements() -> None:
    """An unpinned requirement makes a HACS install unreproducible."""
    for requirement in _load(COMPONENT_DIR / "manifest.json")["requirements"]:
        assert "==" in requirement, f"{requirement} is not pinned"


def test_hacs_json_has_name() -> None:
    assert _load(REPO_ROOT / "hacs.json").get("name")


def test_brand_assets_present() -> None:
    """HACS validates a brand icon for integrations."""
    for asset in ("icon.png", "icon@2x.png", "logo.png"):
        assert (COMPONENT_DIR / "brand" / asset).is_file(), f"brand/{asset} missing"


def test_config_flow_declared_and_translated() -> None:
    """``config_flow: true`` requires a flow module and matching strings."""
    manifest = _load(COMPONENT_DIR / "manifest.json")
    assert manifest.get("config_flow") is True
    assert (COMPONENT_DIR / "config_flow.py").is_file()

    strings = _load(COMPONENT_DIR / "strings.json")
    assert "user" in strings["config"]["step"]
    # translations/en.json must stay in sync with strings.json.
    assert _load(COMPONENT_DIR / "translations" / "en.json") == strings


def test_single_config_entry_matches_the_abort_string() -> None:
    """``single_config_entry`` makes HA emit this abort reason; it must exist."""
    manifest = _load(COMPONENT_DIR / "manifest.json")
    if manifest.get("single_config_entry"):
        aborts = _load(COMPONENT_DIR / "strings.json")["config"]["abort"]
        assert "single_instance_allowed" in aborts


def test_card_bundle_is_committed() -> None:
    """HACS installs straight from the repo, so a missing bundle ships no cards."""
    bundle = COMPONENT_DIR / "frontend" / "teslamate-cards.js"
    assert bundle.is_file(), "run 'npm run build'"
    assert bundle.stat().st_size > 1000


def test_card_version_banner_matches_manifest() -> None:
    """The banner is release-please's marker and the cache-buster's twin; if it
    drifts from the manifest, the released bundle reports the wrong version."""
    manifest_version = _load(COMPONENT_DIR / "manifest.json")["version"]
    source = (REPO_ROOT / "src" / "teslamate-cards.ts").read_text(encoding="utf-8")
    assert f'"{manifest_version}"; // x-release-please-version' in source


def test_every_registered_card_is_in_the_bundle() -> None:
    """A card registered in Python but absent from the bundle renders nothing."""
    bundle = (COMPONENT_DIR / "frontend" / "teslamate-cards.js").read_text(encoding="utf-8")
    for element in ("teslamate-vampire-drain-card",):
        assert element in bundle, f"{element} missing from the built bundle"


def test_reference_sql_present_for_every_dashboard() -> None:
    """The ported queries are checked against these; losing one loses the spec."""
    for name in DASHBOARDS:
        path = REPO_ROOT / "reference" / "grafana" / f"{name}.sql"
        assert path.is_file(), f"reference/grafana/{name}.sql missing"
        assert path.stat().st_size > 0
