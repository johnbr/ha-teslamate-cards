import { type TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { TeslaMateBaseCard } from "../base-card";
import { dateTime, fixed, percent, sumOf } from "../format";
import { type Column, renderSummary, renderTable } from "../table";
import type { DrivesCardConfig } from "../types";
import type { QueryOptions } from "../ws";

const DEFAULT_DAYS = 90; // upstream's `now-3M`

@customElement("teslamate-drives-card")
export class DrivesCard extends TeslaMateBaseCard<DrivesCardConfig> {
  protected queryId(): string {
    return "drives";
  }

  protected secondaryQueryIds(): string[] {
    return ["incomplete_drives"];
  }

  protected queryOptions(): QueryOptions {
    const vars: Record<string, unknown> = {};
    if (this._config.min_distance !== undefined) vars.min_dist = this._config.min_distance;
    if (this._config.min_speed !== undefined) vars.min_speed = this._config.min_speed;
    if (this._config.efficiency_mode) vars.efficiency = this._config.efficiency_mode;
    return { ...this._config, days: this._config.days ?? DEFAULT_DAYS, vars };
  }

  protected defaultTitle(): string {
    return "Drives";
  }

  protected pageSize(): number {
    return this._config.page_size ?? 25;
  }

  private _columns(): Column[] {
    const unit = this._config.length_unit ?? "km";
    const speedUnit = unit === "mi" ? "mph" : "km/h";
    const tempUnit = this._config.temp_unit ?? "C";

    return [
      { label: "Date", align: "left", render: (r) => dateTime(r.start_date, this._hass?.locale?.language) },
      { label: "Start", align: "left", render: (r) => r.start_address ?? "—" },
      { label: "Destination", align: "left", render: (r) => r.end_address ?? "—" },
      { label: "Duration", render: (r) => fixed(r.duration_min, 0, " min") },
      { label: "Distance", render: (r) => fixed(r[this.unitKey("distance")], 1, ` ${unit}`) },
      { label: "SoC", render: (r) => `${percent(r["% Start"])} → ${percent(r["% End"])}`, optional: true },
      {
        // Upstream blanks range-derived figures in cold weather, when part of
        // the pack is unavailable and a delta does not mean what it appears to.
        label: "",
        align: "center",
        render: (r) => (r.has_reduced_range ? "❄" : ""),
        color: () => "var(--info-color, #3d71d7)",
        title: (r) => (r.has_reduced_range ? "Reduced range: part of the pack was unavailable" : undefined),
      },
      { label: "Energy", render: (r) => fixed(r.consumption_kWh, 1, " kWh") },
      { label: `Ø Wh/${unit}`, render: (r) => fixed(r[`consumption_kwh_${unit}`], 0) },
      { label: `Ø Speed`, render: (r) => fixed(r[this.unitKey("speed_avg")], 0, ` ${speedUnit}`), optional: true },
      { label: `Max Speed`, render: (r) => fixed(r[this.unitKey("speed_max")], 0, ` ${speedUnit}`), optional: true },
      { label: "Max Power", render: (r) => fixed(r.power_max, 0, " kW"), optional: true },
      { label: "Temp", render: (r) => fixed(r[this.tempKey("outside_temp")], 0, `°${tempUnit}`), optional: true },
    ];
  }

  private _summary(): TemplateResult {
    const unit = this._config.length_unit ?? "km";
    const distance = sumOf(this._rows, this.unitKey("distance"));
    const energy = sumOf(this._rows, "consumption_kWh");
    const minutes = sumOf(this._rows, "duration_min");
    // Upstream's 4th stat: sum(consumption_kWh) / sum(distance), as Wh per unit.
    const perUnit = distance > 0 ? (energy / distance) * 1000 : 0;

    return renderSummary([
      { label: `Distance (${unit})`, value: distance.toFixed(0) },
      { label: "Duration", value: `${Math.floor(minutes / 60)}h ${Math.round(minutes % 60)}m` },
      { label: "Energy (kWh)", value: energy.toFixed(1) },
      { label: `Ø Wh/${unit}`, value: perUnit.toFixed(0) },
    ]);
  }

  private _renderIncomplete(): TemplateResult | null {
    const rows = this._extra.incomplete_drives ?? [];
    if (rows.length === 0) return null;
    const columns: Column[] = [
      { label: "Drive", align: "left", render: (r) => r["Drive ID"] ?? "—" },
      { label: "Started", align: "left", render: (r) => dateTime(r.start_date, this._hass?.locale?.language) },
      { label: "Distance", render: (r) => fixed(r.distance, 1) },
      { label: "Duration", render: (r) => fixed(r.duration_min, 0, " min") },
    ];
    return html`
      <div class="subheader" title="Drives TeslaMate never saw the end of — usually a logging gap">
        Incomplete drives (${rows.length})
      </div>
      ${renderTable(columns, rows)}
    `;
  }

  protected renderContent(): TemplateResult {
    if (this._rows.length === 0) {
      return html`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No drives in the last ${this._config.days ?? DEFAULT_DAYS} days.</div>
        </ha-card>
      `;
    }
    const { visible, page, pages } = this.paginate(this._rows);
    return html`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} drives`)} ${this._summary()}
        ${renderTable(this._columns(), visible)} ${this.renderPager(page, pages)} ${this._renderIncomplete()}
      </ha-card>
    `;
  }
}
