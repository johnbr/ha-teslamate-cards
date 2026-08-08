import { type TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { TeslaMateBaseCard } from "../base-card";
import { rangeLabel } from "../range";
import { dateTime, duration, fixed, percent, percentUnit, sumOf, thresholdColor, toNumber } from "../format";
import { type Column, renderTable } from "../table";
import type { VampireDrainCardConfig } from "../types";
import type { QueryOptions } from "../ws";

const DEFAULT_MIN_HOURS = 6; // upstream's dashboard default
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
  protected queryId(): string {
    return "vampire_drain";
  }

  protected queryOptions(): QueryOptions {
    return {
      ...this._config,
      days: this.days(),
      vars: { duration: this._config.min_duration_hours ?? DEFAULT_MIN_HOURS },
    };
  }

  protected defaultTitle(): string {
    return "Vampire Drain";
  }

  protected pageSize(): number {
    return this._config.page_size ?? 25;
  }

  private _columns(): Column[] {
    const unit = this._config.length_unit ?? "km";
    const language = this._hass?.locale?.language;

    return [
      { label: "Start", align: "left", render: (r) => dateTime(r.start_date, language) },
      { label: "End", align: "left", render: (r) => dateTime(r.end_date, language) },
      {
        label: "Period",
        render: (r) => duration(r.duration),
        color: (r) => thresholdColor(r.duration, PERIOD_STEPS, "inherit"),
      },
      {
        label: "Standby",
        render: (r) => percentUnit(r.standby),
        color: (r) => thresholdColor(r.standby, STANDBY_STEPS, "inherit"),
      },
      { label: "SoC", render: (r) => percent(r.soc_diff), optional: true },
      {
        // Upstream blanks the range columns in cold weather: with part of the
        // pack unavailable, a range delta does not mean what it appears to.
        // The ❄ marks those rows so an empty cell reads as "not comparable"
        // rather than "no data".
        label: "",
        align: "center",
        render: (r) => (toNumber(r.has_reduced_range) === 1 ? "❄" : ""),
        color: () => "var(--info-color, #3d71d7)",
        title: (r) =>
          toNumber(r.has_reduced_range) === 1
            ? "Reduced range: part of the pack was unavailable, so range loss cannot be estimated"
            : undefined,
      },
      { label: "Range loss", render: (r) => fixed(r[this.unitKey("range_diff")], 2, ` ${unit}`) },
      { label: "Energy", render: (r) => fixed(r.consumption, 2, " kWh"), optional: true },
      { label: "Ø Power", render: (r) => fixed(r.avg_power, 0, " W"), optional: true },
      { label: "Ø Loss / h", render: (r) => fixed(r[this.unitKey("range_lost_per_hour")], 2, ` ${unit}`) },
    ];
  }

  protected renderContent(): TemplateResult {
    if (this._rows.length === 0) {
      return html`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">
            No standby periods longer than ${this._config.min_duration_hours ?? DEFAULT_MIN_HOURS} h in the last
            ${rangeLabel(this.days())}.
          </div>
        </ha-card>
      `;
    }

    const { visible, page, pages } = this.paginate(this._rows);
    const energy = sumOf(this._rows, "consumption");

    return html`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} periods · ${energy.toFixed(1)} kWh drained`)}
        ${renderTable(this._columns(), visible)} ${this.renderPager(page, pages)}
      </ha-card>
    `;
  }
}
