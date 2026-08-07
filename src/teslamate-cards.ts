/**
 * Bundle entry point.
 *
 * All cards ship in one bundle and therefore one Lovelace resource: they share
 * the websocket client, formatting and (from M4) the chart wrappers, so
 * splitting would duplicate more than it saves.
 */

import "./cards/vampire-drain-card";

const VERSION = "0.1.0"; // x-release-please-version

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
window.customCards.push({
  type: "teslamate-vampire-drain-card",
  name: "TeslaMate Vampire Drain",
  description: "Standby battery losses between drives and charges.",
  preview: false,
  documentationURL: DOCS,
});

// eslint-disable-next-line no-console
console.info(
  `%c TESLAMATE-CARDS %c ${VERSION} `,
  "color:#fff;background:#2b3038;font-weight:700",
  "color:#2b3038;background:#ff9d4d;font-weight:700"
);
