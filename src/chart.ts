import { LitElement, type PropertyValues, type TemplateResult, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import uPlot from "uplot";
import uplotCss from "uplot/dist/uPlot.min.css";
import { type XYSeries, alignSeries } from "./align";

/**
 * A uPlot canvas as a Lit element.
 *
 * Four constraints shaped this, all of them learned the hard way on this house's
 * other hand-rolled chart card:
 *
 * 1. **uPlot does not size itself.** It is given explicit pixel dimensions and
 *    keeps them, so a `ResizeObserver` re-sizes it when the card's column
 *    changes width. Creating it at zero width produces a blank canvas that never
 *    recovers, which is a live risk here because these cards sit inside a
 *    `custom:tabbed-card` — an unselected tab can have no layout at all. So
 *    creation is deferred until there is a real width to draw into.
 *
 * 2. **Never `touch-action: none`.** Setting it to make a drag gesture reach the
 *    canvas silently removes the user's pinch-zoom and scrolling over the whole
 *    chart. Drag-to-zoom is therefore switched off entirely (`setScale: false`)
 *    and the browser keeps every native gesture; the crosshair still tracks.
 *    The card's `days` option is how the range is changed.
 *
 * 3. **Never rebuild on every render.** The plot is created once and updated in
 *    place with `setData`; it is only torn down when the series *shape* changes.
 *    Rebuilding on each `hass` update is what destroyed the scroll anchor on the
 *    air-quality card.
 *
 * 4. **Colours come from the theme.** Canvas cannot resolve `var(--x)`, so the
 *    theme variables are read once with `getComputedStyle` at creation.
 */

export interface ChartConfig {
  height?: number;
  /** Render the x axis as wall-clock time (values are epoch seconds). */
  timeAxis?: boolean;
  xLabel?: string;
  yLabel?: string;
  /** Formatters for the cursor readout, not the axis ticks. */
  xFormat?: (value: number) => string;
  yFormat?: (value: number) => string;
  /** Force the y axis to start at zero rather than fitting the data. */
  yFromZero?: boolean;
}

/** Distinct enough to stay separable in both light and dark themes. */
const PALETTE = [
  "#2196f3",
  "#ff9800",
  "#4caf50",
  "#e91e63",
  "#9c27b0",
  "#00bcd4",
  "#ffc107",
  "#795548",
  "#607d8b",
  "#8bc34a",
];

export function seriesColor(index: number, explicit?: string): string {
  return explicit ?? PALETTE[index % PALETTE.length];
}

@customElement("teslamate-chart")
export class TeslaMateChart extends LitElement {
  static styles = [
    unsafeCSS(uplotCss),
    css`
      :host {
        display: block;
        /* Keep vertical scroll and pinch-zoom native over the plot. */
        touch-action: pan-y pinch-zoom;
      }

      .holder {
        position: relative;
        width: 100%;
      }

      /* uPlot sets width:min-content on .uplot, which would collapse the
         holder; the explicit pixel width it is given is authoritative.
         (No backticks in here -- they would close the Lit css template.) */
      .uplot {
        width: 100% !important;
      }

      .readout {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 14px;
        min-height: 18px;
        padding: 2px 4px 6px;
        font-size: 12px;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }

      .readout .swatch {
        display: inline-block;
        width: 9px;
        height: 9px;
        border-radius: 2px;
        margin-right: 5px;
        vertical-align: baseline;
      }

      .empty {
        padding: 24px 8px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 13px;
      }
    `,
  ];

  @property({ attribute: false }) series: XYSeries[] = [];
  @property({ attribute: false }) config: ChartConfig = {};

  private _plot?: uPlot;
  private _observer?: ResizeObserver;
  /** The series shape the live plot was built for; a change forces a rebuild. */
  private _builtFor = "";

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._observer?.disconnect();
    this._observer = undefined;
    this._plot?.destroy();
    this._plot = undefined;
    this._builtFor = "";
  }

  protected firstUpdated(): void {
    const holder = this._holder();
    if (!holder) return;
    this._observer = new ResizeObserver(() => this._sync());
    this._observer.observe(holder);
    this._sync();
  }

  protected updated(_changed: PropertyValues): void {
    this._sync();
  }

  private _holder(): HTMLElement | null {
    return this.renderRoot.querySelector(".holder");
  }

  /** Identity of the plot's structure — labels and colours, not values. */
  private _shape(): string {
    return JSON.stringify([
      this.series.map((s, i) => [s.label, seriesColor(i, s.color), s.line === true, s.width ?? 0]),
      this.config.timeAxis === true,
      this.config.yFromZero === true,
    ]);
  }

  /** Create, resize or update the plot to match the current props. */
  private _sync(): void {
    const holder = this._holder();
    if (!holder || this.series.length === 0) return;

    const width = Math.floor(holder.clientWidth);
    // Zero width means no layout yet (a hidden tab, or before first paint).
    // Bail out and wait — the ResizeObserver fires when it gains a size.
    if (width < 1) return;

    const height = this.config.height ?? 220;
    const { xs, ys } = alignSeries(this.series);
    const data = [xs, ...ys] as unknown as uPlot.AlignedData;

    if (this._plot && this._builtFor === this._shape()) {
      this._plot.setSize({ width, height });
      this._plot.setData(data);
      return;
    }

    this._plot?.destroy();
    this._plot = new uPlot(this._options(width, height), data, holder);
    this._builtFor = this._shape();
  }

  private _themeColor(name: string, fallback: string): string {
    const value = getComputedStyle(this).getPropertyValue(name).trim();
    return value || fallback;
  }

  private _options(width: number, height: number): uPlot.Options {
    const grid = this._themeColor("--divider-color", "rgba(127,127,127,0.3)");
    const text = this._themeColor("--secondary-text-color", "#888");
    const cfg = this.config;

    return {
      width,
      height,
      // uPlot's time mode expects epoch *seconds* and formats the x axis as
      // dates; mode 2 (`false`) leaves x as a plain number.
      ...(cfg.timeAxis ? {} : { mode: 1 as const }),
      tzDate: undefined,
      legend: { show: false },
      cursor: {
        // No drag-zoom: it would need touch-action:none to work on a phone,
        // which costs the user pinch-zoom over the whole chart.
        drag: { x: false, y: false, setScale: false },
        points: { size: 6 },
      },
      scales: {
        x: { time: cfg.timeAxis === true },
        y: { range: cfg.yFromZero ? (_u, _min, max) => [0, max] : undefined },
      },
      axes: [
        {
          stroke: text,
          grid: { stroke: grid, width: 1 },
          ticks: { stroke: grid },
          font: "11px system-ui, sans-serif",
          label: cfg.xLabel,
          labelFont: "11px system-ui, sans-serif",
          labelSize: cfg.xLabel ? 18 : 0,
        },
        {
          stroke: text,
          grid: { stroke: grid, width: 1 },
          ticks: { stroke: grid },
          font: "11px system-ui, sans-serif",
          label: cfg.yLabel,
          labelFont: "11px system-ui, sans-serif",
          labelSize: cfg.yLabel ? 18 : 0,
          size: 48,
        },
      ],
      series: [
        {},
        ...this.series.map((s, i) => {
          const stroke = seriesColor(i, s.color);
          return {
            label: s.label,
            stroke,
            width: s.width ?? 2,
            // A scatter draws points only. Returning null from the path builder
            // is uPlot's documented way to suppress the connecting line.
            ...(s.line ? {} : { paths: () => null }),
            points: { show: true, size: s.line ? 0 : 4, stroke, fill: stroke },
          } as uPlot.Series;
        }),
      ],
      hooks: {
        setCursor: [(u) => this._updateReadout(u)],
      },
    };
  }

  /**
   * Update the hover readout in place.
   *
   * Written straight into the DOM rather than through a reactive property: a
   * Lit re-render per mouse move would rebuild the plot's sibling nodes on every
   * pointer event.
   */
  private _updateReadout(u: uPlot): void {
    const el = this.renderRoot.querySelector(".readout");
    if (!el) return;
    const idx = u.cursor.idx;
    if (idx === null || idx === undefined) {
      el.textContent = "";
      return;
    }

    const cfg = this.config;
    const x = u.data[0][idx];
    const parts: string[] = [];
    const head = document.createElement("span");
    head.textContent = cfg.xFormat && typeof x === "number" ? cfg.xFormat(x) : String(x ?? "");
    el.replaceChildren(head);

    this.series.forEach((s, i) => {
      const value = u.data[i + 1]?.[idx];
      if (value === null || value === undefined) return;
      const span = document.createElement("span");
      const swatch = document.createElement("span");
      swatch.className = "swatch";
      swatch.style.background = seriesColor(i, s.color);
      span.append(swatch);
      const yText = cfg.yFormat ? cfg.yFormat(Number(value)) : String(value);
      span.append(document.createTextNode(`${s.label} ${yText}`));
      el.append(span);
      parts.push(yText);
    });
  }

  render(): TemplateResult {
    if (this.series.length === 0 || this.series.every((s) => s.points.length === 0)) {
      return html`<div class="empty">No data in this range.</div>`;
    }
    return html`
      <div class="holder"></div>
      <div class="readout"></div>
    `;
  }
}
