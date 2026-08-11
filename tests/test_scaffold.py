"""Repository-shape tests.

These run without Home Assistant installed, so they cover the metadata HACS and
hassfest validate rather than integration behaviour. The version-drift check is
the load-bearing one: release-please bumps ``manifest.json`` and
``.release-please-manifest.json`` together, and a hand edit to either one
silently breaks the card bundle's ``?v=`` cache-buster.
"""

from __future__ import annotations

import json
import re
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

# The TeslaMate Grafana dashboards this repo ports.
DASHBOARDS = (
    "battery-health",
    "charges",
    "charging-stats",
    "drives",
    "statistics",
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


def test_version_is_not_baked_into_the_bundle_source() -> None:
    """The version must stay out of the sources the bundle is built from.

    It used to be a constant carrying release-please's ``x-release-please-version``
    marker. That couples the *built bundle* to the version, and release-please
    cannot run a build: cutting a release rewrote the constant, left the
    committed bundle stale, and failed the build-diff check. It broke the 0.2.0
    release exactly that way.

    The banner now reads the version from the module's own URL, which
    ``frontend.py`` already stamps with ``?v=<manifest version>`` as the
    cache-buster -- so the URL is the single source of truth and a release
    touches no file the bundle depends on.
    """
    source = (REPO_ROOT / "src" / "teslamate-cards.ts").read_text(encoding="utf-8")
    assert "x-release-please-version" not in source, "version marker is back in a bundled source file"
    assert "import.meta.url" in source, "the banner should read its version from the module URL"

    config = _load(REPO_ROOT / "release-please-config.json")
    extra_files = config["packages"]["."]["extra-files"]
    bundled_sources = [f for f in extra_files if isinstance(f, str) and f.startswith("src/")]
    assert not bundled_sources, f"release-please must not rewrite bundled sources: {bundled_sources}"


def test_resource_url_is_keyed_on_the_bundle_contents() -> None:
    """The manifest version is not a sufficient cache key on its own.

    The bundle is served with a 31-day ``max-age`` and no revalidation, so the
    resource URL is the only thing that can invalidate a browser's copy. Keying
    it on the version alone is correct only for released installs: any deploy
    from a branch changes the bundle while the manifest still says the last
    released version, leaving the URL identical and every browser on the old
    module. That shipped once -- the Statistics tab rendered Home Assistant's
    generic "Configuration error" card because its element was not defined in
    the module the browser had, while the server was serving one that defined
    it.

    Source inspection rather than execution, the same shape as the version-drift
    test above: ``frontend.py`` imports Home Assistant, so it cannot be imported
    in CI, and stubbing Home Assistant is a surface this repo deliberately does
    not maintain (see ``test_ha_imports.py``). What this has to catch is someone
    simplifying the hash back out again.
    """
    source = (COMPONENT_DIR / "frontend.py").read_text(encoding="utf-8")
    assert "hashlib" in source, "the resource URL must be keyed on the bundle's contents"
    assert "read_bytes" in source, "the hash must cover the bytes actually served"
    assert "?v={version}." in source, "the fingerprint must be part of the ?v= cache key"


def _declared_card_elements() -> list[str]:
    """Every custom element declared under src/cards, read from the sources.

    Derived rather than listed: a hardcoded list silently stops covering the
    next card someone adds, which is precisely when this check matters.
    """
    elements: list[str] = []
    for path in sorted((REPO_ROOT / "src" / "cards").glob("*.ts")):
        elements.extend(re.findall(r'@customElement\(\s*["\']([^"\']+)["\']', path.read_text(encoding="utf-8")))
    return elements


def test_every_declared_card_is_in_the_bundle() -> None:
    """A card whose source exists but is not bundled renders nothing at all --
    the usual cause is forgetting to import it from the entry point."""
    declared = _declared_card_elements()
    assert declared, "no card elements found under src/cards"
    bundle = (COMPONENT_DIR / "frontend" / "teslamate-cards.js").read_text(encoding="utf-8")
    missing = [name for name in declared if name not in bundle]
    assert not missing, f"missing from the built bundle (import them in src/teslamate-cards.ts): {missing}"


def test_every_declared_card_is_advertised_to_lovelace() -> None:
    """`window.customCards` is what the dashboard card picker lists; a card
    missing from it works only if its type is typed in by hand."""
    entry = (REPO_ROOT / "src" / "teslamate-cards.ts").read_text(encoding="utf-8")
    missing = [name for name in _declared_card_elements() if f'"{name}"' not in entry]
    assert not missing, f"not registered in window.customCards: {missing}"


def test_reference_sql_present_for_every_dashboard() -> None:
    """The ported queries are checked against these; losing one loses the spec."""
    for name in DASHBOARDS:
        path = REPO_ROOT / "reference" / "grafana" / f"{name}.sql"
        assert path.is_file(), f"reference/grafana/{name}.sql missing"
        assert path.stat().st_size > 0
