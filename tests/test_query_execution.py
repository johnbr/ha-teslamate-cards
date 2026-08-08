"""Execute every registered query, for real, through asyncpg.

``test_sql_prepare.py`` plans every statement. Planning is not enough, and this
project has the scars to prove it -- each of these prepared perfectly and failed
only when a row actually moved:

* binding a timezone-aware datetime against ``timestamp WITHOUT time zone``
  raises ``DataError`` at execution;
* every ``::numeric`` expression returns ``decimal.Decimal``, which Home
  Assistant's JSON encoder rejects, so the *websocket response* fails rather
  than the query;
* a bind parameter takes its type from the Python value, so a quoted-but-numeric
  Grafana variable fails on the comparison, not on the parse.

So this runs the whole path the websocket command runs: translate with real
context, execute with real binds, coerce with ``db._jsonable``, and prove the
result survives ``json.dumps``. Only ``asyncpg`` reproduces the driver's own
type inference, and it lives in the Home Assistant container rather than on the
host -- so, like ``test_ha_imports.py``, the work happens in there.

Skips where no container is reachable, which includes CI.
"""

from __future__ import annotations

import json
import os
import shlex
import subprocess
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parent.parent
PACKAGE_DIR = REPO_ROOT / "custom_components" / "teslamate_cards"
CONTAINER = os.environ.get("TESLAMATE_TEST_HA_CONTAINER", "homeassistant")
HA_PYTHON = shlex.split(os.environ.get("TESLAMATE_TEST_HA_PYTHON", f"docker exec {CONTAINER} python"))
STAGE = "/tmp/teslamate_cards_exec_check"

# Loopback is `trust` in pg_hba, and Home Assistant is host-networked, so the
# container reaches the cluster on 127.0.0.1 with no password.
DSN_USER = os.environ.get("TESLAMATE_TEST_DB_USER", "postgres")
DSN_DB = os.environ.get("TESLAMATE_TEST_DB_NAME", "teslamate")

RUNNER = '''
import asyncio, json, sys
sys.path.insert(0, {stage!r})

import asyncpg
from datetime import UTC, datetime
from custom_components.teslamate_cards.db import _jsonable
from custom_components.teslamate_cards.macros import QueryContext, translate
from custom_components.teslamate_cards.queries import QUERIES


def context(query):
    return QueryContext(
        car_id=1,
        time_from=datetime(2026, 5, 1, tzinfo=UTC),
        time_to=datetime(2026, 8, 1, tzinfo=UTC),
        length_unit="mi",
        temp_unit="F",
        preferred_range="rated",
        timezone="America/Los_Angeles",
        extras=dict(query.defaults),
    )


async def main():
    conn = await asyncpg.connect(host="127.0.0.1", port=5432, user={user!r}, database={db!r})
    results = {{}}
    try:
        for query_id, query in sorted(QUERIES.items()):
            try:
                if query.needs_context:
                    sql, params = translate(query.sql, context(query))
                else:
                    sql, params = query.sql, []
                records = await conn.fetch(sql, *params)
                rows = [{{k: _jsonable(v) for k, v in r.items()}} for r in records]
                # The step that actually failed in production: the response is
                # serialised, not just fetched.
                json.dumps(rows)
                results[query_id] = {{"ok": True, "rows": len(rows)}}
            except Exception as err:
                results[query_id] = {{"ok": False, "error": f"{{type(err).__name__}}: {{err}}"}}
    finally:
        await conn.close()
    print("RESULT_JSON:" + json.dumps(results))


asyncio.run(main())
'''


def _runtime_available() -> bool:
    try:
        proc = subprocess.run(
            [*HA_PYTHON, "-c", "import asyncpg"],
            capture_output=True,
            timeout=60,
        )
    except (OSError, subprocess.SubprocessError):
        return False
    return proc.returncode == 0


pytestmark = pytest.mark.skipif(
    not _runtime_available(),
    reason="no Home Assistant container with asyncpg (expected in CI)",
)


@pytest.fixture(scope="module")
def executed() -> dict[str, dict]:
    """Run every query once inside the container and return the verdicts.

    Module-scoped: one container round trip for the whole suite, then a test per
    query id so a failure names the query rather than the batch.
    """
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
    try:
        proc = subprocess.run(
            [*HA_PYTHON, "-c", RUNNER.format(stage=STAGE, user=DSN_USER, db=DSN_DB)],
            capture_output=True,
            text=True,
            timeout=300,
        )
        assert proc.returncode == 0, f"runner failed:\n{proc.stdout[-2000:]}\n{proc.stderr[-2000:]}"
        line = next((ln for ln in proc.stdout.splitlines() if ln.startswith("RESULT_JSON:")), None)
        assert line, f"runner produced no verdict:\n{proc.stdout[-2000:]}"
        yield json.loads(line[len("RESULT_JSON:") :])
    finally:
        subprocess.run(["docker", "exec", CONTAINER, "rm", "-rf", STAGE], check=False, capture_output=True)


def _query_ids() -> list[str]:
    from teslamate_cards.queries import QUERIES

    return sorted(QUERIES)


@pytest.mark.parametrize("query_id", _query_ids())
def test_registered_query_executes(query_id: str, executed: dict[str, dict]) -> None:
    verdict = executed.get(query_id)
    assert verdict is not None, f"{query_id} was not executed"
    assert verdict["ok"], f"{query_id} failed to execute:\n{verdict.get('error')}"


# Queries whose empty result is the *healthy* answer: they exist to surface
# logging gaps, so on a database with none they correctly return nothing.
MAY_BE_EMPTY = {"incomplete_charges", "incomplete_drives"}


@pytest.mark.parametrize("query_id", sorted(set(_query_ids()) - MAY_BE_EMPTY))
def test_registered_query_returns_rows(query_id: str, executed: dict[str, dict]) -> None:
    """A query that runs but returns nothing is usually a broken filter rather
    than an empty database -- this car has six years of history in every table
    these queries touch."""
    verdict = executed.get(query_id)
    assert verdict is not None and verdict["ok"], f"{query_id} did not execute"
    assert verdict["rows"] > 0, f"{query_id} returned no rows over a 3-month window"
