import { type TemplateResult, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TeslaMateBaseCard } from "../base-card";
import { duration, fixed, percentUnit, thresholdColor, toNumber } from "../format";
import { type Period, periodLabel, periodOptions } from "../period";
import { type Column, renderTable } from "../table";
import type { StatisticsCardConfig } from "../types";
import type { QueryOptions } from "../ws";

/** Upstream's own steps for the driving-efficiency column. */
const EFFICIENCY_STEPS: Array<[number, string]> = [
  [0, "var(--warning-color)"],
  [0.65, "var(--primary-text-color)"],
  [0.99, "var(--success-color)"],
];

@customElement("teslamate-statistics-card")
export class StatisticsCard extends TeslaMateBaseCard<StatisticsCardConfig> {
  /** Grain picked from the header dropdown; unset means the configured one. */
  @state() private _period?: Period;

  protected queryId(): string {
    return "statistics";
  }

  protected queryOptions(): QueryOptions {
    return {
      ...this._config,
      days: this.days(),
      period: this.period(),
      // Upstream's toggle is 0/1 against a literal, so it binds as a number —
      // a bool would prepare fine and fail on the comparison.
      vars: { high_precision: this._config.high_precision ? 1 : 0 },
    };
  }

  setConfig(config: StatisticsCardConfig): void {
    // Dropped for the same reason the base drops `_days`: an edit in the YAML
    // editor should show immediately, not be masked by an earlier choice.
    this._period = undefined;
    super.setConfig(config);
  }

  protected defaultTitle(): string {
    return "Statistics";
  }

  /**
   * Upstream's dashboard opens on `now-10y`, i.e. everything TeslaMate has.
   * A per-year rollup of the last 90 days would be one row.
   */
  protected defaultDays(): number {
    return 3650;
  }

  protected pageSize(): number {
    return this._config.page_size ?? 25;
  }

  private period(): Period {
    return this._period ?? this._config.period ?? "month";
  }

  private _onPeriodChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as Period;
    if (value === this.period()) return;
    this._period = value;
    this._page = 0;
    void this.refresh();
  }

  /**
   * The header dropdown picks the rollup grain rather than the look-back
   * window. The window is what makes a *row* on the other cards; here it is
   * the grain, and the window is a config-time decision (see `defaultDays`).
   */
  protected renderRangePicker(): TemplateResult | null {
    const current = this.period();
    const options = periodOptions(this._config.periods, current);
    if (options.length < 2) return null;

    return html`
      <select
        class="range"
        aria-label="Rollup period"
        .value=${current}
        @change=${(event: Event) => this._onPeriodChange(event)}
      >
        ${options.map((p) => html`<option value=${p} ?selected=${p === current}>${periodLabel(p)}</option>`)}
      </select>
    `;
  }

  /** Same shape as the Charging Stats and Trip cards. */
  private _currency(value: unknown, decimals = 2): string {
    const n = toNumber(value);
    if (n === null) return "—";
    return `${this._config.currency ?? ""}${n.toFixed(decimals)}`;
  }

  private _columns(): Column[] {
    const unit = this._config.length_unit ?? "km";
    const tempUnit = this._config.temp_unit ?? "C";

    return [
      {
        label: "Period",
        align: "left",
        // `to_char(date, 'YYYY Month')` blank-pads the month name to nine
        // characters, so upstream's own label arrives as "2026 August   ".
        render: (r) => String(r.display ?? "—").trim(),
      },
      { label: "Time driven", render: (r) => duration(r.sum_duration_h) },
      { label: "Distance", render: (r) => fixed(r[this.unitKey("sum_distance")], 0, ` ${unit}`) },
      {
        label: "Ø Temp",
        render: (r) => fixed(r[this.tempKey("avg_outside_temp")], 0, `°${tempUnit}`),
        optional: true,
      },
      { label: "Drives", render: (r) => fixed(r.cnt, 0) },
      {
        label: "Efficiency",
        render: (r) => percentUnit(r.efficiency),
        color: (r) => thresholdColor(r.efficiency, EFFICIENCY_STEPS, "var(--primary-text-color)"),
        title: () => "Distance driven against range consumed",
      },
      { label: "Energy used", render: (r) => fixed(r.sum_energy_used_kwh, 1, " kWh") },
      {
        label: "Ø Energy / charge",
        render: (r) => fixed(r.avg_energy_charged_kwh, 1, " kWh"),
        optional: true,
      },
      { label: "Cost", render: (r) => this._currency(r.cost_charges) },
      { label: "Charges", render: (r) => fixed(r.cnt_charges, 0) },
      {
        // Three decimals rather than Grafana's two, matching the Charges card:
        // a car with free Supercharging blends down to fractions of a cent per
        // kWh, and two decimals renders every one of those rows as 0.00.
        label: "Ø Cost / kWh",
        render: (r) => this._currency(r.avg_cost_kwh, 3),
        optional: true,
      },
      {
        label: `Ø Cost / 100 ${unit}`,
        render: (r) => this._currency(r[this.unitKey("avg_cost")]),
        optional: true,
      },
      {
        label: "Ø Consumption",
        render: (r) => fixed(r[this.unitKey("consumption_gross")], 0, ` Wh/${unit}`),
        title: () => "Gross: includes range lost while parked",
      },
      {
        label: "Ø Net",
        render: (r) => fixed(r[this.unitKey("consumption_net")], 0, ` Wh/${unit}`),
        title: () => "Net: the drives alone, excluding standby losses",
        optional: true,
      },
      {
        label: "Overhead",
        render: (r) => percentUnit(r[this.unitKey("overhead_pct")]),
        title: () => "Share of consumption that was not spent driving",
        optional: true,
      },
      {
        label: "Data",
        align: "center",
        // Upstream maps this the same way round: the flag is *is_incomplete*,
        // so false is the good case.
        render: (r) => (r.is_incomplete ? "⁉️" : "🆗"),
        title: (r) =>
          r.is_incomplete
            ? "Some drive or charge in or before this period has no recorded end, so the figures understate it"
            : "Every drive and charge in this period was logged completely",
      },
    ];
  }

  protected renderContent(): TemplateResult {
    if (this._rows.length === 0) {
      return html`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No drives or charges recorded in this window.</div>
        </ha-card>
      `;
    }

    const { visible, page, pages } = this.paginate(this._rows);
    const driven = this._rows.reduce((total, row) => total + (toNumber(row.cnt) ?? 0), 0);
    const subtitle = `${this._rows.length} ${this._rows.length === 1 ? "period" : "periods"} · ${driven} drives`;

    return html`
      <ha-card>
        ${this.renderHeader(subtitle)} ${renderTable(this._columns(), visible)} ${this.renderPager(page, pages)}
      </ha-card>
    `;
  }
}
