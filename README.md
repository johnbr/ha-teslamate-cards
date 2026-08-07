# TeslaMate Cards for Home Assistant

Native Lovelace cards that bring [TeslaMate](https://github.com/teslamate-org/teslamate)'s Grafana
dashboards into Home Assistant — no iframe, no Grafana login, no separate URL.

> **Status: scaffold (v0.1.0).** The repository, tooling and reference material are in place. No
> cards work yet. See [Milestones](#milestones).

## Why this exists

TeslaMate's own [Home Assistant integration](https://docs.teslamate.org/docs/integrations/home_assistant/)
publishes *live state* over MQTT — current battery level, geofence, whether the car is asleep. That is
useful, and it is a different thing entirely from what this project does.

Every dashboard ported here is a **SQL aggregate over years of history**: drives, charging processes,
individual charge samples, positions and state transitions. None of that exists in Home Assistant's
recorder and none of it comes over MQTT. So this integration reads TeslaMate's PostgreSQL database
directly and serves the results to the cards over the Home Assistant websocket API.

## The cards

| Card | Ports |
|---|---|
| `custom:teslamate-battery-health-card` | Battery capacity, ranges, estimated degradation, current SOC and stored energy, efficiency, and battery capacity plotted against odometer |
| `custom:teslamate-charges-card` | Period summary, the full charge table by charger type, and incomplete charges |
| `custom:teslamate-charging-stats-card` | Charge counts, energy added, cost totals and per-kWh averages, charge delta, AC/DC split, the DC charging curve, and top charging stations |
| `custom:teslamate-drives-card` | Period summary, the drive table with geofence/address resolution, and incomplete drives |
| `custom:teslamate-trip-card` | Retrospective trip analysis — distance, duration, efficiency, energy and cost, time spent, drives and charges, battery/range and elevation over the trip |
| `custom:teslamate-vampire-drain-card` | Standby losses between drives and charges, with sleep-fraction attribution |

These are a **curated** port, not panel-for-panel parity. Panels that duplicate what Home Assistant
already does better — geomaps in particular — are deliberately left out, and the rationale for every
omission is recorded in the milestone notes.

## Design

- **No entities and no polling.** A query runs when a card is actually rendered, and the result is
  cached briefly. This is the crucial difference from Home Assistant's built-in `sql` platform, which
  polls every 15–30 seconds with no configurable interval and cannot take per-request parameters.
- **Its own small connection pool** (max 3), never Home Assistant's recorder pool. TeslaMate commonly
  shares a PostgreSQL cluster with the recorder, and heavy queries on the recorder's pool are a
  well-known way to slow Home Assistant down.
- **Bounded queries.** `positions` grows by roughly 800k rows a year, so anything reading it buckets
  server-side; tables are paginated server-side.
- **Read-only by construction.** The integration only ever issues `SELECT`. Point it at a read-only
  role (see below).
- **Free Supercharging is handled, not treated as missing data.** Cars with free Supercharging for
  life record those sessions at zero cost, so cost panels count the energy while charging nothing for
  it — an accurate blended cost per kWh rather than a broken one. Cost reporting is fully supported
  either way.
- **Charts are bundled, not fetched.** [uPlot](https://github.com/leeoniya/uPlot) is compiled into the
  card bundle, so nothing is loaded from a CDN.

## Requirements

- Home Assistant 2025.7.0 or newer
- TeslaMate, with its PostgreSQL database reachable from Home Assistant

## Installation

Not yet installable — the integration does nothing at this stage. Once released:

1. Add this repository to HACS as a custom repository (category: Integration), install, restart.
2. Add the **TeslaMate Cards** integration and give it your TeslaMate database connection.
3. Add cards to a dashboard. The card bundle registers its own Lovelace resource.

### Recommended: a read-only database role

The integration never writes, so give it a role that cannot:

```sql
CREATE ROLE teslamate_ro LOGIN PASSWORD 'choose-a-password';
GRANT CONNECT ON DATABASE teslamate TO teslamate_ro;
GRANT USAGE ON SCHEMA public TO teslamate_ro;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO teslamate_ro;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO teslamate_ro;
```

## Milestones

| | Scope |
|---|---|
| **M0** | Repository, tooling, CI, and the extracted Grafana SQL — **done** |
| **M1** | Database pool, Grafana-macro translation layer, config flow, websocket API |
| **M2** | Vampire Drain card — one table, proving the whole path end to end |
| **M3** | Drives and Charges cards, plus the shared table/pagination component |
| **M4** | Battery Health and Charging Stats cards, plus the uPlot chart wrappers |
| **M5** | Trip card |
| **M6** | Card editors, documentation, screenshots, HACS default-store submission |

## Development

```bash
npm install          # card toolchain
npm run build        # bundle the cards into custom_components/teslamate_cards/frontend/
npm run typecheck

pip install pytest pytest-asyncio ruff
ruff check .
pytest tests/ -v

pre-commit install   # optional
```

`reference/grafana/*.sql` holds every ported panel's original SQL — see
[`reference/README.md`](reference/README.md). Correctness of a ported query is checked by running the
same time range in TeslaMate's Grafana side by side with the card; the numbers must match exactly.

## Credits and disclaimer

The dashboard designs and SQL are the work of the **TeslaMate** project, used under its MIT license.
This is an independent project, not affiliated with, endorsed by, or supported by TeslaMate or
Tesla, Inc. Tesla is a trademark of Tesla, Inc.

Licensed MIT — see [LICENSE](LICENSE).
