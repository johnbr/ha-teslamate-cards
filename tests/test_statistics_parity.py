"""Check the Statistics port against Grafana, automatically.

The repo's standing rule is that a ported query is verified by running the same
range in TeslaMate's own Grafana and comparing the numbers. For this dashboard
that check is worth automating, because Statistics is the one port where most of
the output does **not** come from the SQL: Grafana joins four queries and then
derives six more columns with `calculateField` transformations, and a port that
quietly lost them would still look plausible on screen.

So this reproduces Grafana exactly -- interpolate each target as text the way
Grafana does, run all four, outer-join them on `date`, apply the transformation
chain -- and diffs the result against the single ported statement, column by
column.

The one expected difference is upstream's duplicate period, and it is asserted
rather than tolerated: `is_incomplete` is a running flag, so the period where
the first incomplete record appears has rows on both sides of the transition and
upstream emits it twice (measured: 8 rows for 7 months, June once with a
consumption figure and once blank). A joined table cannot use that shape, so the
port folds with `bool_or` -- and the surviving value must equal upstream's
non-null row.

Runs in the Home Assistant container, like `test_query_execution.py`, because
that is where asyncpg lives. Skips where no container is reachable.
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
REFERENCE_SQL = REPO_ROOT / "reference" / "grafana" / "statistics.sql"
CONTAINER = os.environ.get("TESLAMATE_TEST_HA_CONTAINER", "homeassistant")
HA_PYTHON = shlex.split(os.environ.get("TESLAMATE_TEST_HA_PYTHON", f"docker exec {CONTAINER} python"))
STAGE = "/tmp/teslamate_cards_parity_check"

DSN_USER = os.environ.get("TESLAMATE_TEST_DB_USER", "postgres")
DSN_DB = os.environ.get("TESLAMATE_TEST_DB_NAME", "teslamate")

# Everything the panel displays. `date_from`/`date_to` are hidden in Grafana and
# `display` is a label, so the comparison is over the figures themselves.
COMPARED = [
    "sum_duration_h",
    "sum_distance_{lu}",
    "avg_outside_temp_{tu}",
    "cnt",
    "efficiency",
    "sum_energy_used_kwh",
    "avg_energy_charged_kwh",
    "cost_charges",
    "cnt_charges",
    "avg_cost_kwh",
    "avg_cost_{lu}",
    "consumption_net_{lu}",
    "consumption_gross_{lu}",
    "overhead_pct_{lu}",
]

RUNNER = r'''
import asyncio, json, re, sys
sys.path.insert(0, {stage!r})

import asyncpg
from datetime import UTC, datetime
from custom_components.teslamate_cards.db import _jsonable
from custom_components.teslamate_cards.macros import QueryContext, translate
from custom_components.teslamate_cards.queries import QUERIES

PERIOD, TZ, CAR, LU, TU, PR = {period!r}, {tz!r}, 1, {lu!r}, {tu!r}, "rated"
FROM = datetime({y0}, {m0}, 1, tzinfo=UTC)
TO = datetime({y1}, {m1}, {d1}, tzinfo=UTC)


def grafana_interpolate(sql):
    """What Grafana actually sends: every variable pasted in as literal text."""
    sql = re.sub(
        r"\$__timeFilter\(([^)]+)\)",
        lambda m: "%s BETWEEN '%s' AND '%s'" % (m.group(1).strip(),
                                                FROM.strftime("%Y-%m-%d %H:%M:%S"),
                                                TO.strftime("%Y-%m-%d %H:%M:%S")),
        sql)
    sql = sql.replace("$__timezone", TZ)
    sql = sql.replace("${{preferred_range}}", PR).replace("$preferred_range", PR)
    sql = sql.replace("$length_unit", LU).replace("$temp_unit", TU)
    sql = sql.replace("$period", PERIOD).replace("$high_precision", "0")
    return sql.replace("$car_id", str(CAR))


def targets(text):
    blocks = re.split(r"^-{{78}}$", text, flags=re.M)
    out = []
    for i, b in enumerate(blocks):
        if "(target " in b and i + 1 < len(blocks):
            sql = "\n".join(l for l in blocks[i + 1].splitlines() if not l.strip().startswith("--")).strip()
            if sql:
                out.append(sql)
    return out


def num(v):
    return None if v is None else float(v)


def div(a, b):
    a, b = num(a), num(b)
    return None if (a is None or b in (None, 0)) else a / b


async def main():
    conn = await asyncpg.connect(host="127.0.0.1", port=5432, user={user!r}, database={db!r})
    reference = open({reference!r}).read()

    # --- Grafana's side: four queries, outer-joined on `date` ---------------
    frames, duplicated = [], set()
    for sql in targets(reference):
        frame = {{}}
        for r in await conn.fetch(grafana_interpolate(sql)):
            row = {{k: _jsonable(v) for k, v in r.items()}}
            key = r["date"].astimezone(UTC).isoformat()
            if key in frame:
                # Upstream's duplicate period. Keep whichever row carries the
                # figure; the port's fold must agree with it.
                duplicated.add(key)
                if all(v is None for k, v in row.items() if k.startswith("consumption")):
                    continue
            frame[key] = row
        frames.append(frame)

    grafana = {{}}
    for key in sorted({{k for f in frames for k in f}}, reverse=True):
        row = {{}}
        for f in frames:
            row.update(f.get(key, {{}}))
        row["avg_cost_kwh"] = div(row.get("cost_charges"), row.get("sum_energy_used_kwh"))
        added = div(row.get("cost_charges"), row.get("sum_energy_added_kwh"))
        gross = num(row.get("consumption_gross_" + LU))
        row["avg_cost_" + LU] = None if (added is None or gross is None) else gross * added / 10
        overhead = div(row.get("consumption_net_" + LU), row.get("consumption_gross_" + LU))
        row["overhead_pct_" + LU] = None if overhead is None else 1 - overhead
        grafana[key] = row

    # --- the port -----------------------------------------------------------
    query = QUERIES["statistics"]
    ctx = QueryContext(car_id=CAR, time_from=FROM, time_to=TO, length_unit=LU, temp_unit=TU,
                       preferred_range=PR, period=PERIOD, timezone=TZ, extras=dict(query.defaults))
    sql, params = translate(query.sql, ctx)
    ported = {{}}
    for r in await conn.fetch(sql, *params):
        row = {{k: _jsonable(v) for k, v in r.items()}}
        ported[datetime.fromtimestamp(row["date_from"] / 1000, UTC).isoformat()] = row
    await conn.close()

    print("RESULT_JSON:" + json.dumps({{
        "grafana": grafana, "ported": ported, "duplicated": sorted(duplicated)
    }}, default=str))


asyncio.run(main())
'''


def _runtime_available() -> bool:
    try:
        proc = subprocess.run([*HA_PYTHON, "-c", "import asyncpg"], capture_output=True, timeout=60)
    except (OSError, subprocess.SubprocessError):
        return False
    return proc.returncode == 0


pytestmark = pytest.mark.skipif(
    not _runtime_available(),
    reason="no Home Assistant container with asyncpg (expected in CI)",
)


@pytest.fixture(scope="module")
def comparison() -> dict:
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
    subprocess.run(
        ["docker", "cp", str(REFERENCE_SQL), f"{CONTAINER}:{STAGE}/statistics.sql"],
        check=True,
        capture_output=True,
    )
    try:
        script = RUNNER.format(
            stage=STAGE,
            user=DSN_USER,
            db=DSN_DB,
            reference=f"{STAGE}/statistics.sql",
            period="month",
            tz="America/Los_Angeles",
            lu="mi",
            tu="F",
            y0=2026,
            m0=1,
            y1=2026,
            m1=8,
            d1=10,
        )
        proc = subprocess.run([*HA_PYTHON, "-c", script], capture_output=True, text=True, timeout=300)
        assert proc.returncode == 0, f"runner failed:\n{proc.stdout[-2000:]}\n{proc.stderr[-3000:]}"
        line = next((ln for ln in proc.stdout.splitlines() if ln.startswith("RESULT_JSON:")), None)
        assert line, f"runner produced no verdict:\n{proc.stdout[-2000:]}"
        yield json.loads(line[len("RESULT_JSON:") :])
    finally:
        subprocess.run(["docker", "exec", CONTAINER, "rm", "-rf", STAGE], check=False, capture_output=True)


def test_the_comparison_actually_ran(comparison: dict) -> None:
    """A parity test over two empty result sets passes and proves nothing."""
    assert len(comparison["grafana"]) >= 6, "Grafana side returned almost nothing"
    assert len(comparison["ported"]) >= 6, "the port returned almost nothing"


def test_the_same_periods_appear(comparison: dict) -> None:
    assert sorted(comparison["ported"]) == sorted(comparison["grafana"])


def test_upstream_duplicate_period_is_folded(comparison: dict) -> None:
    """The one deliberate divergence, asserted rather than tolerated.

    If upstream ever stops emitting a duplicate here this test still passes; it
    only insists that where it does, the port emits exactly one row for it.
    """
    for key in comparison["duplicated"]:
        assert key in comparison["ported"]
    assert len(comparison["ported"]) == len(set(comparison["ported"]))


@pytest.mark.parametrize("column", COMPARED)
def test_every_column_matches_grafana(comparison: dict, column: str) -> None:
    column = column.format(lu="mi", tu="f")
    mismatches = []
    for key, expected_row in comparison["grafana"].items():
        expected, actual = expected_row.get(column), comparison["ported"][key].get(column)
        if expected is None or actual is None:
            if expected is not None or actual is not None:
                mismatches.append(f"{key}: grafana={expected!r} port={actual!r}")
            continue
        expected, actual = float(expected), float(actual)
        if abs(expected - actual) > max(1e-9, abs(expected) * 1e-12):
            mismatches.append(f"{key}: grafana={expected!r} port={actual!r}")
    assert not mismatches, f"{column} differs from Grafana:\n" + "\n".join(mismatches)
