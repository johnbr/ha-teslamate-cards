# Reference material

## `grafana/*.sql`

The SQL behind every panel of the seven TeslaMate Grafana dashboards this repo
ports, extracted verbatim from `/dashboards/*.json` inside the
`teslamate/grafana` image.

**These files are never executed.** They are the specification: each ported
query in `custom_components/teslamate_cards/queries/` is validated against the
corresponding panel here, and against the live Grafana rendering the same time
range.

| File | Panels with SQL |
|---|---|
| `battery-health.sql` | 11 |
| `charges.sql` | 2 |
| `charging-stats.sql` | 18 |
| `drives.sql` | 2 |
| `statistics.sql` | 1 (four targets) |
| `trip.sql` | 15 |
| `vampire-drain.sql` | 1 |

Each file's header records the dashboard's template variables and the Grafana
macros its panels use — which is the checklist the translation layer in
`macros.py` has to satisfy.

**The SQL is not always the whole computation.** A Grafana panel can extend its
query result with transformations, and a port that stops at `rawSql` silently
loses whatever they added. Two panels here do that, so each records its
transformation chain in the file header alongside the SQL: the Trip dashboard's
cost-per-distance panel (which reads `$0.00` taken verbatim) and the whole of
`statistics.sql`, where most of the cost columns exist only as transformations.
Check for them before porting a panel, not after.

### Attribution

The SQL is the work of the TeslaMate project and is used under its MIT license:

> <https://github.com/teslamate-org/teslamate>

`ha-teslamate-cards` is an independent project and is not affiliated with,
endorsed by, or supported by TeslaMate or Tesla, Inc.

### Refreshing

These were taken from the TeslaMate release in use at the time. To re-extract
after a TeslaMate upgrade, so ports can be diffed against upstream changes:

```bash
docker exec teslamate-grafana-1 cat /dashboards/<name>.json
```

Keep the extraction verbatim — `reference/` is excluded from prettier
(`.prettierignore`) precisely so the diff against upstream stays meaningful.
