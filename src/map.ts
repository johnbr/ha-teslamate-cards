import { LitElement, type PropertyValues, type TemplateResult, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { dateTime } from "./format";
import type { Row } from "./types";

/**
 * A route on a map, as a Lit element.
 *
 * **This borrows Home Assistant's own `<ha-map>` rather than bundling Leaflet.**
 * It is the element the built-in Map card renders, so the tiles, the dark-mode
 * handling and the pan/zoom behaviour are the ones the rest of the dashboard
 * already has, at no cost to this bundle.
 *
 * Four things about that element are worth knowing before touching this file.
 *
 * 1. **It is lazily loaded.** `ha-map` lives in a chunk the frontend only
 *    fetches when something needs a map, so on a dashboard with no Map card it
 *    is undefined and rendering the tag yields an inert unknown element. The
 *    only supported way to pull the chunk in is to ask the card helpers to build
 *    a `map` card — see `ensureHaMap`.
 *
 * 2. **It takes no `hass`.** Since 2026.8 every piece of state it needs
 *    (`_states`, `_config`, `_i18n`, `_formatters`, `_connection`) arrives over
 *    Lit context with `subscribe: true`. Context requests are composed DOM
 *    events, so they cross shadow boundaries and are answered by the providers
 *    at the app root — which is why nothing is threaded through here. It also
 *    means the element only works inside the Home Assistant app tree.
 *
 * 3. **`paths` is the wrong property for a route, despite the name.** It draws
 *    an interactive circle marker at *every* point as well as the line between
 *    them, which at a few hundred points reads as a string of beads rather than
 *    a route. Worse, `fitMap()` builds its bounds from entities, zones and
 *    `layers` and **ignores `paths` entirely** — with only paths set it takes
 *    its early return and simply centres on the home coordinates at the default
 *    zoom, so `autoFit` appears to do nothing and the route can sit off screen.
 *
 *    So the line is drawn as a real Leaflet polyline handed to **`layers`**,
 *    which fixes both: one clean stroke, and bounds that `fitMap` can see.
 *
 * 4. **Building a layer needs Leaflet**, which the element exposes as
 *    `.Leaflet` once it has loaded — see `_leaflet`. That is a private field, so
 *    `paths` is kept as a fallback: if a future release stops exposing it the
 *    route still draws, just as beads.
 */

/** A point on a route. `timestamp` must be a `Date` — the tooltip formats it. */
interface MapPathPoint {
  point: [number, number];
  timestamp: Date;
}

interface MapPath {
  points: MapPathPoint[];
  color?: string;
  name?: string;
  fullDatetime?: boolean;
}

/** The sliver of Leaflet used here. */
interface LeafletLike {
  polyline(latlngs: Array<[number, number]>, options?: Record<string, unknown>): LeafletLayer;
  circleMarker(latlng: [number, number], options?: Record<string, unknown>): LeafletLayer;
}

interface LeafletLayer {
  bindTooltip(content: string, options?: Record<string, unknown>): LeafletLayer;
}

interface HaMapElement extends HTMLElement {
  Leaflet?: LeafletLike;
  /** Its own "Leaflet is up" flag; see `_ready` for why this is waited on. */
  _loaded?: boolean;
  layers?: LeafletLayer[];
  paths?: MapPath[];
  autoFit?: boolean;
  fitBounds(latlngs: Array<[number, number]>, options?: { pad?: number; zoom?: number }): void;
  updateComplete: Promise<unknown>;
}

interface CardHelpers {
  createCardElement(config: Record<string, unknown>): Promise<unknown>;
}

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<CardHelpers>;
  }
}

const LOAD_TIMEOUT_MS = 10_000;

/** How long to wait for `ha-map` to finish loading Leaflet before falling back. */
const LEAFLET_WAIT_MS = 5_000;
const LEAFLET_POLL_MS = 50;

const DEFAULT_COLOR = "#2196f3";
const START_COLOR = "#4caf50";
const END_COLOR = "#f44336";

/**
 * Padding around the fitted route, as a fraction of its own extent.
 *
 * `ha-map`'s own default is 0.5, which leaves the route filling barely half the
 * frame — right for entity markers that move, far too loose for a fixed track.
 */
const FIT_PAD = 0.08;

/**
 * Cap on how far the fit may zoom *in*. `ha-map` defaults this to its `zoom`
 * property (14), which is not enough for a short drive — a two-mile trip to the
 * shops would sit in the middle of a city-sized view.
 */
const FIT_MAX_ZOOM = 17;

/** Resolves once `<ha-map>` is defined, or false if it cannot be had. */
let haMapPromise: Promise<boolean> | undefined;

async function ensureHaMap(): Promise<boolean> {
  if (customElements.get("ha-map")) return true;

  haMapPromise ??= (async () => {
    try {
      const helpers = await window.loadCardHelpers?.();
      if (!helpers) return false;
      // Building a Map card is what imports the chunk that defines `ha-map`;
      // the card itself is thrown away. `show_all` is used because the card's
      // own setConfig rejects a config with no entities *and* no
      // geo_location_sources, and an exception here would be indistinguishable
      // from the chunk failing to load.
      await helpers.createCardElement({ type: "map", show_all: true });
    } catch {
      // Fall through: the import may still have completed even if constructing
      // the card did not.
    }
    if (customElements.get("ha-map")) return true;
    // `whenDefined` never settles if the chunk genuinely failed, so it is
    // raced — a map that never appears must not leave the card on "Loading…".
    return Promise.race([
      customElements.whenDefined("ha-map").then(() => true),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), LOAD_TIMEOUT_MS)),
    ]);
  })();

  return haMapPromise;
}

@customElement("teslamate-map")
export class TeslaMateMap extends LitElement {
  /** Route rows: `time`, `latitude`, `longitude`. */
  @property({ attribute: false }) rows: Row[] = [];
  @property({ attribute: false }) color = DEFAULT_COLOR;
  @property({ attribute: false }) label?: string;
  @property({ attribute: false }) language?: string;
  @property({ type: Number }) height = 400;

  @state() private _available: boolean | null = null;

  static styles = css`
    :host {
      display: block;
    }
    ha-map {
      display: block;
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: hidden;
    }
    .state {
      padding: 16px;
      text-align: center;
      color: var(--secondary-text-color);
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    if (this._available === null) void ensureHaMap().then((ok) => (this._available = ok));
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("rows") || changed.has("color") || changed.has("_available")) {
      void this._drawRoute();
    }
  }

  /**
   * Naive-UTC timestamp to a `Date`.
   *
   * TeslaMate's columns carry no zone, so the backend sends naive UTC — the `Z`
   * has to be added before parsing or every point shifts by the viewer's offset.
   */
  private _date(value: unknown): Date {
    const raw = String(value ?? "");
    const iso = raw.includes("T") ? raw : raw.replace(" ", "T");
    return new Date(iso.endsWith("Z") ? iso : `${iso}Z`);
  }

  /** Valid points only — see the null note in the backend's simplify.py. */
  private _points(): MapPathPoint[] {
    const points: MapPathPoint[] = [];
    for (const row of this.rows) {
      const lat = Number(row.latitude);
      const lon = Number(row.longitude);
      const timestamp = this._date(row.time);
      // A NaN coordinate becomes a marker at 0,0 and a line from California
      // into the Atlantic; an invalid Date breaks the tooltip.
      if (!Number.isFinite(lat) || !Number.isFinite(lon) || Number.isNaN(timestamp.getTime())) continue;
      points.push({ point: [lat, lon], timestamp });
    }
    return points;
  }

  private get _map(): HaMapElement | null {
    return this.renderRoot?.querySelector<HaMapElement>("ha-map") ?? null;
  }

  /**
   * Wait until `ha-map` has Leaflet up *and* has flipped its own `_loaded`.
   *
   * Waiting for `.Leaflet` alone is not enough. `ha-map` re-fits itself whenever
   * `_loaded` changes — that branch is unconditional, not gated on `autoFit` —
   * and it fits with its own loose 0.5 padding. Assigning layers in the window
   * between Leaflet appearing and `_loaded` flipping therefore gets the tight
   * fit below immediately overwritten by the element's own. Once `_loaded` is
   * true that branch cannot fire again, so the fit here is the last word.
   */
  private async _ready(el: HaMapElement): Promise<LeafletLike | undefined> {
    const deadline = Date.now() + LEAFLET_WAIT_MS;
    while ((!el.Leaflet || !el._loaded) && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, LEAFLET_POLL_MS));
    }
    return el.Leaflet;
  }

  private async _drawRoute(): Promise<void> {
    const el = this._map;
    if (!el) return;
    const points = this._points();
    if (points.length < 2) return;

    const coords = points.map((p) => p.point);
    const leaflet = await this._ready(el);

    if (!leaflet) {
      // Degraded but not broken: `paths` still draws the route, as a line with
      // a circle at every point, and without an automatic fit.
      el.paths = [{ points, color: this.color, name: this.label, fullDatetime: true }];
      return;
    }

    const first = points[0];
    const last = points[points.length - 1];
    const marker = (at: MapPathPoint, fill: string, what: string) =>
      leaflet
        .circleMarker(at.point, {
          radius: 6,
          color: "#fff",
          weight: 2,
          fillColor: fill,
          fillOpacity: 1,
          interactive: true,
        })
        .bindTooltip(`${what}<br>${dateTime(at.timestamp.toISOString(), this.language)}`, { direction: "top" });

    el.layers = [
      leaflet.polyline(coords, {
        color: this.color,
        weight: 4,
        opacity: 0.9,
        lineJoin: "round",
        lineCap: "round",
        // The line is the shape, not a control; keeping it non-interactive
        // leaves click-and-drag panning working everywhere on the map.
        interactive: false,
      }),
      marker(first, START_COLOR, "Start"),
      marker(last, END_COLOR, "End"),
    ];

    // Fit explicitly rather than via `autoFit`, which would use ha-map's own
    // 0.5 padding and cap the zoom at 14. See FIT_PAD / FIT_MAX_ZOOM.
    await el.updateComplete;
    el.fitBounds(coords, { pad: FIT_PAD, zoom: FIT_MAX_ZOOM });
  }

  render(): TemplateResult | typeof nothing {
    // One point draws a marker but no line, which reads as a bug rather than a
    // short route; two is the shortest thing worth calling a route.
    if (this._points().length < 2) return nothing;

    if (this._available === null) {
      return html`<div class="state" style="height:${this.height}px">Loading map…</div>`;
    }
    if (!this._available) {
      return html`<div class="state">Map unavailable — Home Assistant's map component did not load.</div>`;
    }

    return html`<ha-map style="height:${this.height}px" .themeMode=${"auto"}></ha-map>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "teslamate-map": TeslaMateMap;
  }
}
