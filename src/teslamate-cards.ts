/**
 * Bundle entry point.
 *
 * All cards ship in one bundle and therefore one Lovelace resource: they share
 * the websocket client, formatting and the chart wrappers, so splitting would
 * duplicate more than it saves.
 */

import "./cards/battery-health-card";
import "./cards/charges-card";
import "./cards/charging-stats-card";
import "./cards/drives-card";
import "./cards/trip-card";
import "./cards/vampire-drain-card";

/**
 * Read the version from this module's own URL rather than baking it in.
 *
 * `frontend.py` registers the Lovelace resource as `...teslamate-cards.js?v=<manifest version>`,
 * so the running version is already in the URL the browser fetched — and that
 * query string is the cache-buster, making it the single source of truth.
 *
 * Embedding it as a constant instead couples the *bundle* to the version, and
 * release-please cannot rebuild: it would bump the constant in source, leave the
 * committed bundle stale, and fail the build-diff check on every release. That
 * is not hypothetical — it broke the 0.2.0 release.
 */
const VERSION = new URL(import.meta.url).searchParams.get("v") ?? "dev";

interface CustomCard {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
  documentationURL?: string;
}

declare global {
  interface Window {
    customCards?: CustomCard[];
  }
}

const DOCS = "https://github.com/johnbr/ha-teslamate-cards";

window.customCards = window.customCards ?? [];
window.customCards.push(
  {
    type: "teslamate-drives-card",
    name: "TeslaMate Drives",
    description: "Every drive: route, distance, duration and energy.",
    preview: false,
    documentationURL: DOCS,
  },
  {
    type: "teslamate-charges-card",
    name: "TeslaMate Charges",
    description: "Every charging session: energy, range gained, rate and cost.",
    preview: false,
    documentationURL: DOCS,
  },
  {
    type: "teslamate-vampire-drain-card",
    name: "TeslaMate Vampire Drain",
    description: "Standby battery losses between drives and charges.",
    preview: false,
    documentationURL: DOCS,
  },
  {
    type: "teslamate-battery-health-card",
    name: "TeslaMate Battery Health",
    description: "Usable capacity, degradation and range, with capacity by odometer.",
    preview: false,
    documentationURL: DOCS,
  },
  {
    type: "teslamate-charging-stats-card",
    name: "TeslaMate Charging Stats",
    description: "Charging totals, cost per kWh, AC/DC split and the DC charging curve.",
    preview: false,
    documentationURL: DOCS,
  },
  {
    type: "teslamate-trip-card",
    name: "TeslaMate Trip",
    description: "A past journey: distance, time split, energy, cost, battery and elevation.",
    preview: false,
    documentationURL: DOCS,
  }
);

// eslint-disable-next-line no-console
console.info(
  `%c TESLAMATE-CARDS %c ${VERSION} `,
  "color:#fff;background:#2b3038;font-weight:700",
  "color:#2b3038;background:#ff9d4d;font-weight:700"
);
