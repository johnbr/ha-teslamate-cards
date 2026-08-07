import { type TemplateResult, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TeslaMateBaseCard } from "../base-card";
import { dateTime, duration, fixed, percent, percentUnit, thresholdColor, toNumber } from "../format";
import type { Row, VampireDrainCardConfig } from "../types";
import type { QueryOptions } from "../ws";

const DEFAULT_MIN_HOURS = 6; // upstream's dashboard default
const DEFAULT_DAYS = 90; // upstream's dashboard time range
const DEFAULT_PAGE_SIZE = 25;

// Grafana threshold steps, ascending. See the panel's fieldConfig overrides.
const STANDBY_STEPS: Array<[number, string]> = [
  [0, "#FF7383"],
  [0.3, "#FFB357"],
  [0.85, "#56A64B"],
];
const PERIOD_STEPS: Array<[number, string]> = [
  [0, "rgb(133, 142, 133)"],
  [43200, "#56A64B"],
];

@customElement("teslamate-vampire-drain-card")
export class VampireDrainCard extends TeslaMateBaseCard<VampireDrainCardConfig> {
  @state() private _page = 0;

  protected queryId(): string {
    return "vampire_drain";
  }

  protected queryOptions(): QueryOptions {
    return {
      ...this._config,
      days: this._config.days ?? DEFAULT_DAYS,
      vars: { duration: this._config.min_duration_hours ?? DEFAULT_MIN_HOURS },
    };
  }

  protected defaultTitle(): string {
    return "Vampire Drain";
  }

  setConfig(config: VampireDrainCardConfig): void {
    super.setConfig(config);
    this._page = 0;
  }

  getCardSize(): number {
    return 8;
  }

  private get _unit(): "km" | "mi" {
    return this._config.length_unit ?? "km";
  }

  /** `range_diff_km` / `range_diff_mi` — the column name carries the unit. */
  private _rangeKey(prefix: string): string {
    return `${prefix}_${this._unit}`;
  }

  private _totals(): { periods: number; energy: number } {
    let energy = 0;
    for (const row of this._rows) energy += toNumber(row.consumption) ?? 0;
    return { periods: this._rows.length, energy };
  }

  protected renderContent(): TemplateResult {
    if (this._rows.length === 0) {
      return html`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">
            No standby periods longer than ${this._config.min_duration_hours ?? DEFAULT_MIN_HOURS} h in the last
            ${this._config.days ?? DEFAULT_DAYS} days.
          </div>
        </ha-card>
      `;
    }

    const pageSize = this._config.page_size ?? DEFAULT_PAGE_SIZE;
    const pages = Math.max(1, Math.ceil(this._rows.length / pageSize));
    const page = Math.min(this._page, pages - 1);
    const visible = this._rows.slice(page * pageSize, page * pageSize + pageSize);
    const { periods, energy } = this._totals();
    const unitLabel = this._unit;

    return html`
      <ha-card>
        ${this.renderHeader(`${periods} periods · ${energy.toFixed(1)} kWh drained`)}
        <div class="scroller">
          <table>
            <thead>
              <tr>
                <th class="left">Start</th>
                <th class="left">End</th>
                <th>Period</th>
                <th>Standby</th>
                <th class="optional">SoC</th>
                <th class="center"></th>
                <th>Range loss</th>
                <th class="optional">Energy</th>
                <th class="optional">Ø Power</th>
                <th>Ø Loss / h</th>
              </tr>
            </thead>
            <tbody>
              ${visible.map((row) => this._renderRow(row, unitLabel))}
            </tbody>
          </table>
        </div>
        ${pages > 1 ? this._renderPager(page, pages) : null}
      </ha-card>
    `;
  }

  private _renderRow(row: Row, unitLabel: string): TemplateResult {
    const language = this._hass?.locale?.language;
    // Upstream blanks the range columns in cold weather: with part of the pack
    // unavailable, a range delta does not mean what it appears to mean. The ❄
    // marks those rows so an empty cell reads as "not comparable", not "no data".
    const cold = toNumber(row.has_reduced_range) === 1;

    return html`
      <tr>
        <td class="left">${dateTime(row.start_date, language)}</td>
        <td class="left">${dateTime(row.end_date, language)}</td>
        <td style="color: ${thresholdColor(row.duration, PERIOD_STEPS, "inherit")}">${duration(row.duration)}</td>
        <td style="color: ${thresholdColor(row.standby, STANDBY_STEPS, "inherit")}">${percentUnit(row.standby)}</td>
        <td class="optional">${percent(row.soc_diff)}</td>
        <td class="center cold" title=${cold ? "Reduced range: part of the pack was unavailable, so range loss cannot be estimated" : ""}>
          ${cold ? "❄" : ""}
        </td>
        <td>${fixed(row[this._rangeKey("range_diff")], 2, ` ${unitLabel}`)}</td>
        <td class="optional">${fixed(row.consumption, 2, " kWh")}</td>
        <td class="optional">${fixed(row.avg_power, 0, " W")}</td>
        <td>${fixed(row[this._rangeKey("range_lost_per_hour")], 2, ` ${unitLabel}`)}</td>
      </tr>
    `;
  }

  private _renderPager(page: number, pages: number): TemplateResult {
    return html`
      <div class="footer">
        <span>Page ${page + 1} of ${pages}</span>
        <span class="pager">
          <button ?disabled=${page === 0} @click=${() => (this._page = page - 1)}>Previous</button>
          <button ?disabled=${page >= pages - 1} @click=${() => (this._page = page + 1)}>Next</button>
        </span>
      </div>
    `;
  }
}
