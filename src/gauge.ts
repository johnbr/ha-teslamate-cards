import { type TemplateResult, html, svg } from "lit";

/**
 * The bar and gauge panels, drawn directly rather than through uPlot.
 *
 * Upstream renders these as Grafana `bargauge` and `piechart` panels, but they
 * are one to three numbers each. A charting library earns its place on the
 * scatter and timeseries panels, where there are hundreds of points and real
 * axes; wiring it up to draw a two-slice pie would cost more than it explains.
 *
 * Render-only, like `table.ts` — no imports beyond Lit, so the formatting and
 * reducer logic stays testable in isolation.
 */

export interface BarMarker {
  /** Position on the same scale as the bar's value. */
  at: number;
  label?: string;
}

/**
 * A labelled horizontal bar with optional reference markers.
 *
 * The markers are how the charge limits are shown: TeslaMate's dashboards draw
 * the 20% and 80/81% guidance as thresholds on the SOC gauge, which is more
 * useful than colouring the bar, because the "right" SOC depends on what the
 * car is about to do.
 */
export function renderBar(opts: {
  label: string;
  value: number | null;
  max: number;
  text: string;
  color?: string;
  markers?: BarMarker[];
}): TemplateResult {
  const { label, value, max, text, color, markers = [] } = opts;
  const pct = value === null || !(max > 0) ? 0 : Math.max(0, Math.min(100, (value / max) * 100));

  return html`
    <div class="bar-row">
      <div class="bar-head">
        <span class="bar-label">${label}</span>
        <span class="bar-value">${text}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style=${`width:${pct}%;background:${color ?? "var(--primary-color)"}`}></div>
        ${markers
          .filter((m) => max > 0 && m.at >= 0 && m.at <= max)
          .map(
            (m) => html`
              <div
                class="bar-marker"
                style=${`left:${(m.at / max) * 100}%`}
                title=${m.label ?? String(m.at)}
              ></div>
            `,
          )}
      </div>
    </div>
  `;
}

export interface Segment {
  label: string;
  value: number;
  color: string;
}

/**
 * A single stacked bar standing in for upstream's AC/DC pie chart.
 *
 * A pie with two slices is harder to read than a bar, and the question being
 * asked — how much of the charging was fast — is a proportion, which a stacked
 * bar answers directly.
 */
export function renderSplitBar(segments: Segment[], unit: string): TemplateResult | null {
  const usable = segments.filter((s) => Number.isFinite(s.value) && s.value > 0);
  const total = usable.reduce((sum, s) => sum + s.value, 0);
  if (total <= 0) return null;

  return html`
    <div class="split">
      <div class="split-track">
        ${usable.map(
          (s) => html`
            <div
              class="split-seg"
              style=${`width:${(s.value / total) * 100}%;background:${s.color}`}
              title=${`${s.label}: ${s.value.toFixed(1)} ${unit}`}
            ></div>
          `,
        )}
      </div>
      <div class="split-legend">
        ${usable.map(
          (s) => html`
            <span class="split-item">
              <span class="swatch" style=${`background:${s.color}`}></span>
              ${s.label} ${s.value.toFixed(0)} ${unit}
              <span class="split-pct">${Math.round((s.value / total) * 100)}%</span>
            </span>
          `,
        )}
      </div>
    </div>
  `;
}

/**
 * A semicircular gauge for a single 0-100 reading.
 *
 * Hand-drawn as two arcs on a fixed 0..100 sweep. `pathLength` normalises the
 * arc to 100 units so the dash offset is the percentage directly, which avoids
 * computing arc lengths from the radius.
 */
export function renderGauge(opts: {
  label: string;
  value: number | null;
  text: string;
  color: string;
}): TemplateResult {
  const { label, value, text, color } = opts;
  const pct = value === null ? 0 : Math.max(0, Math.min(100, value));
  const arc = "M 10 52 A 42 42 0 0 1 94 52";

  return html`
    <div class="gauge">
      <svg viewBox="0 0 104 64" class="gauge-svg" role="img" aria-label=${`${label}: ${text}`}>
        ${svg`
          <path d=${arc} class="gauge-track" pathLength="100" />
          <path d=${arc} pathLength="100" stroke=${color} class="gauge-fill"
                stroke-dasharray=${`${pct} 100`} />
        `}
      </svg>
      <div class="gauge-value" style=${`color:${color}`}>${text}</div>
      <div class="gauge-label">${label}</div>
    </div>
  `;
}
