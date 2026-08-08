import { type TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { TeslaMateBaseCard } from "../base-card";
import { groupSeries } from "../align";
import "../chart";
import type { XYSeries } from "../align";
import { fixed, thresholdColor, toNumber } from "../format";
import { renderBar, renderGauge, renderSplitBar } from "../gauge";
import { renderSummary } from "../table";
import type { BatteryHealthCardConfig } from "../types";
import type { QueryOptions } from "../ws";

// Grafana's own thresholds on the Battery Health bargauge, ascending.
const HEALTH_STEPS: Array<[number, string]> = [
  [0, "var(--error-color)"],
  [80, "var(--warning-color)"],
  [90, "var(--success-color)"],
];

@customElement("teslamate-battery-health-card")
export class BatteryHealthCard extends TeslaMateBaseCard<BatteryHealthCardConfig> {
  protected queryId(): string {
    return "battery_health";
  }

  protected secondaryQueryIds(): string[] {
    return ["battery_capacity_history"];
  }

  protected queryOptions(): QueryOptions {
    const vars: Record<string, unknown> = {};
    if (this._config.custom_kwh_new !== undefined) vars.custom_kwh_new = this._config.custom_kwh_new;
    if (this._config.custom_max_range !== undefined) vars.custom_max_range = this._config.custom_max_range;
    // Nothing on this card is time-filtered: battery health is an all-time
    // view, so the shared `days` option deliberately has no effect here.
    return { ...this._config, vars };
  }

  /**
   * No range dropdown: see `queryOptions` — nothing here is time-filtered, so
   * offering one would imply a filter that does not exist and quietly suggest
   * the figures had changed when they had not.
   */
  protected showRangePicker(): boolean {
    return false;
  }

  protected defaultTitle(): string {
    return "Battery Health";
  }

  private _summary(row: Record<string, unknown>): TemplateResult {
    const unit = this._config.length_unit ?? "km";
    const now = toNumber(row.current_capacity);
    const asNew = toNumber(row.max_capacity);

    return renderSummary([
      { label: "Usable now (kWh)", value: fixed(now, 1) },
      { label: "When new (kWh)", value: fixed(asNew, 1) },
      { label: `Range (${unit})`, value: fixed(row.current_range, 0) },
      { label: `Wh/${unit}`, value: fixed(row.efficiency, 0) },
    ]);
  }

  private _panels(row: Record<string, unknown>): TemplateResult {
    const unit = this._config.length_unit ?? "km";
    const health = toNumber(row.health_pct);
    const degradation = toNumber(row.degradation_pct);
    const capacity = toNumber(row.current_capacity);
    const soc = toNumber(row.current_soc);
    const stored = toNumber(row.stored_energy);
    const lower = toNumber(row.soc_lower);
    const upper = toNumber(row.soc_upper);
    const asNew = toNumber(row.max_capacity);
    const maxRange = toNumber(row.max_range);
    const color = thresholdColor(health, HEALTH_STEPS, "var(--primary-color)");

    return html`
      <div class="panels">
        ${renderGauge({
          label: degradation === null ? "Battery health" : `${degradation.toFixed(1)}% degradation`,
          value: health,
          text: health === null ? "—" : `${health.toFixed(1)}%`,
          color,
        })}
        <div class="bars">
          ${renderBar({
            label: "Charge level",
            value: soc,
            max: 100,
            text: soc === null ? "—" : `${soc}%`,
            color: "var(--primary-color)",
            // Upstream's guidance band: daily-use lower bound and the
            // recommended charge limit for this pack chemistry.
            markers: [
              ...(lower === null ? [] : [{ at: lower, label: `${lower}% daily minimum` }]),
              ...(upper === null ? [] : [{ at: upper, label: `${upper}% recommended limit` }]),
            ],
          })}
          ${renderBar({
            label: "Stored energy",
            value: stored,
            max: capacity ?? 100,
            text: `${fixed(stored, 1)} / ${fixed(capacity, 1)} kWh`,
            color: "var(--success-color)",
          })}
          ${renderBar({
            label: `Range against best recorded`,
            value: toNumber(row.current_range),
            max: maxRange ?? 100,
            text: `${fixed(row.current_range, 0)} / ${fixed(maxRange, 0)} ${unit}`,
            color: "var(--info-color, #3d71d7)",
          })}
        </div>
      </div>
      ${renderSplitBar(
        [
          { label: "Remaining", value: capacity !== null && asNew !== null ? capacity : 0, color: "var(--success-color)" },
          {
            label: "Lost to degradation",
            value: capacity !== null && asNew !== null ? Math.max(0, asNew - capacity) : 0,
            color: "var(--error-color)",
          },
        ],
        "kWh",
      )}
    `;
  }

  /** The scatter and its half-monthly median, from one query. */
  private _capacitySeries(): XYSeries[] {
    const rows = this._extra.battery_capacity_history ?? [];
    const grouped = groupSeries(
      rows,
      (r) => String(r.series),
      (r) => Number(r.odometer),
      (r) => Number(r.kwh),
    );
    const series: XYSeries[] = [];
    const samples = grouped.get("sample");
    if (samples?.length) series.push({ label: "Per charge", points: samples, color: "#90a4ae" });
    const median = grouped.get("median");
    if (median?.length) series.push({ label: "Median", points: median, color: "#2196f3", line: true, width: 2 });
    return series;
  }

  private _chart(): TemplateResult | null {
    const series = this._capacitySeries();
    if (series.length === 0) return null;
    const unit = this._config.length_unit ?? "km";
    return html`
      <div class="subheader">Usable capacity by odometer</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${series}
          .config=${{
            height: this._config.chart_height ?? 240,
            xLabel: `Odometer (${unit})`,
            yLabel: "kWh",
            xFormat: (v: number) => `${Math.round(v).toLocaleString()} ${unit}`,
            yFormat: (v: number) => `${v.toFixed(1)} kWh`,
          }}
        ></teslamate-chart>
      </div>
    `;
  }

  protected renderContent(): TemplateResult {
    const row = this._rows[0];
    if (!row) {
      return html`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No charging history to derive battery health from.</div>
        </ha-card>
      `;
    }
    return html`
      <ha-card>
        ${this.renderHeader(`${fixed(row.rated_efficiency, 1)} Wh/km rated`)} ${this._summary(row)}
        ${this._panels(row)} ${this._chart()}
      </ha-card>
    `;
  }
}
