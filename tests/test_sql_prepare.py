"""Prepare every translated panel against a real TeslaMate database.

``test_macros.py`` proves the translator resolves every macro. It cannot prove
PostgreSQL will *accept* the result -- parameter type inference, ``= ANY($n::int[])``
placement and ``date_bin`` argument types only fail at prepare time. This caught
a real defect: upstream writes ``(${__to:date:seconds} - ${__from:date:seconds})``,
which as two bare bind parameters is ``unknown - unknown`` and is rejected.

``PREPARE`` plans without executing, so this is read-only. It needs a live
database, so it skips wherever one isn't reachable -- notably CI. Run it on norm
after touching ``macros.py`` or adding a query.

Override the connection with ``TESLAMATE_TEST_PSQL`` (default: the local socket
as the postgres superuser, which is how norm is set up).
"""

from __future__ import annotations

import os
import shlex
import subprocess
from datetime import UTC, datetime

import pytest
from teslamate_cards.macros import QueryContext, translate
from teslamate_cards.queries import QUERIES
from test_macros import ALL_PANELS, EXTRAS

PSQL = [
    *shlex.split(os.environ.get("TESLAMATE_TEST_PSQL", "sudo -u postgres psql -d teslamate")),
    "-v",
    "ON_ERROR_STOP=1",
    "-q",
    "-f",
    "-",
]


def _database_reachable() -> bool:
    try:
        proc = subprocess.run(PSQL, input="SELECT 1;\n", capture_output=True, text=True, timeout=15)
    except (OSError, subprocess.SubprocessError):
        return False
    return proc.returncode == 0


pytestmark = pytest.mark.skipif(
    not _database_reachable(),
    reason="no TeslaMate database reachable (expected in CI)",
)


def _context() -> QueryContext:
    return QueryContext(
        car_id=1,
        time_from=datetime(2026, 1, 1, tzinfo=UTC),
        time_to=datetime(2026, 8, 1, tzinfo=UTC),
        length_unit="mi",
        temp_unit="F",
        preferred_range="rated",
        timezone="America/Los_Angeles",
        extras=dict(EXTRAS),
    )


def _prepares(sql: str) -> subprocess.CompletedProcess[str]:
    # stdin, not a temp file: the postgres user cannot read files this test
    # would create under /tmp.
    return subprocess.run(
        PSQL,
        input=f"PREPARE _probe AS\n{sql.strip().rstrip(';')}\n;\n",
        capture_output=True,
        text=True,
        timeout=30,
    )


@pytest.mark.parametrize(
    ("dashboard", "title", "sql"),
    ALL_PANELS,
    ids=[f"{d}:{t}"[:70] for d, t, _ in ALL_PANELS],
)
def test_translated_panel_prepares(dashboard: str, title: str, sql: str) -> None:
    translated, _ = translate(sql, _context())
    proc = _prepares(translated)
    assert proc.returncode == 0, f"{dashboard}/{title} failed to prepare:\n{proc.stderr.strip()}"


@pytest.mark.parametrize("query_id", sorted(QUERIES))
def test_registered_query_prepares(query_id: str) -> None:
    """The reference corpus and the registry can drift -- a query is registered
    by hand, and only these run in production."""
    query = QUERIES[query_id]
    sql = translate(query.sql, _context())[0] if query.needs_context else query.sql
    proc = _prepares(sql)
    assert proc.returncode == 0, f"registered query {query_id} failed to prepare:\n{proc.stderr.strip()}"


@pytest.mark.parametrize("query_id", sorted(QUERIES))
def test_registered_query_actually_runs(query_id: str) -> None:
    """PREPARE only plans. Executing catches what planning cannot -- a function
    that does not exist for the argument types actually passed, for instance."""
    query = QUERIES[query_id]
    if query.needs_context:
        pytest.skip("execution needs real bind values; covered by the integration probe")
    proc = _prepares(query.sql)
    assert proc.returncode == 0
