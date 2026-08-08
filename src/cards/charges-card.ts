import { type TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { TeslaMateBaseCard } from "../base-card";
import { rangeLabel } from "../range";
import { dateTime, fixed, meanOf, percent, percentUnit, sumOf } from "../format";
import { type Column, renderSummary, renderTable } from "../table";
import type { ChargesCardConfig } from "../types";
import type { QueryOptions } from "../ws";

// Upstream's value mapping for the charger type column.
const TYPE_COLORS: Record<string, string> = {
  AC: "var(--success-color)",
  DC: "var(--warning-color)",
};

@customElement("teslamate-charges-card")
export class ChargesCard extends TeslaMateBaseCard<ChargesCardConfig> {
  protected queryId(): string {
    return "charges";
  }

  protected secondaryQueryIds(): string[] {
    return ["incomplete_charges"];
  }

  protected queryOptions(): QueryOptions {
    const vars: Record<string, unknown> = {};
    if (this._config.min_duration_minutes !== undefined) vars.min_duration_min = this._config.min_duration_minutes;
    return {
      ...this._config,
      days: this.days(),
      charge_type: this._config.charge_type ?? "",
      vars,
    };
  }

  protected defaultTitle(): string {
    return "Charges";
  }

  protected pageSize(): number {
    return this._config.page_size ?? 25;
  }

  private _columns(): Column[] {
    const unit = this._config.length_unit ?? "km";
    const rateUnit = unit === "mi" ? "mph" : "km/h";
    const tempUnit = this._config.temp_unit ?? "C";

    return [
      { label: "Date", align: "left", render: (r) => dateTime(r.start_date, this._hass?.locale?.language) },
      { label: "Location", align: "left", render: (r) => r.address ?? "—" },
      {
        label: "Type",
        align: "center",
        render: (r) => r.charge_type ?? "—",
        color: (r) => TYPE_COLORS[String(r.charge_type)],
      },
      { label: "Duration", render: (r) => fixed(r.duration_min, 0, " min") },
      { label: "SoC", render: (r) => `${percent(r.start_battery_level)} → ${percent(r.end_battery_level)}` },
      { label: "Added", render: (r) => fixed(r.charge_energy_added, 1, " kWh") },
      { label: "Range", render: (r) => fixed(r[this.unitKey("range_added")], 0, ` ${unit}`) },
      { label: "Ø Power", render: (r) => fixed(r.charge_energy_added_per_hour, 1, " kW") },
      {
        label: "Ø Rate",
        render: (r) => fixed(r[this.unitKey("range_added_per_hour")], 0, ` ${rateUnit}`),
        optional: true,
      },
      // Cost is null on a free session — a car with free Supercharging for life
      // records those at no cost, which is correct data, not missing data.
      { label: "Cost", render: (r) => (r.cost === null ? "free" : fixed(r.cost, 2)) },
      { label: "Cost/kWh", render: (r) => (r.cost_per_kwh === null ? "—" : fixed(r.cost_per_kwh, 3)), optional: true },
      { label: "Used", render: (r) => fixed(r.charge_energy_used, 1, " kWh"), optional: true },
      { label: "Efficiency", render: (r) => percentUnit(r.charging_efficiency), optional: true },
      { label: "Temp", render: (r) => fixed(r[this.tempKey("outside_temp_avg")], 0, `°${tempUnit}`), optional: true },
    ];
  }

  private _summary(): TemplateResult {
    // Upstream's four reducers: sum added, sum used, sum cost, MEAN duration.
    const added = sumOf(this._rows, "charge_energy_added");
    const used = sumOf(this._rows, "charge_energy_used");
    const cost = sumOf(this._rows, "cost");
    const meanMinutes = meanOf(this._rows, "duration_min");
    const paid = this._rows.filter((r) => Number(r.cost) > 0).length;

    return renderSummary([
      { label: "Energy added (kWh)", value: added.toFixed(0) },
      { label: "Energy used (kWh)", value: used.toFixed(0) },
      // A blended figure: sessions with no cost (free Supercharging) count
      // their energy but contribute nothing to the total.
      { label: paid === 0 ? "Cost (all free)" : "Cost", value: cost.toFixed(2) },
      { label: "Ø Duration", value: `${Math.round(meanMinutes)} min` },
    ]);
  }

  private _renderIncomplete(): TemplateResult | null {
    const rows = this._extra.incomplete_charges ?? [];
    if (rows.length === 0) return null;
    const columns: Column[] = [
      { label: "Started", align: "left", render: (r) => dateTime(r.start_date, this._hass?.locale?.language) },
      { label: "Added", render: (r) => fixed(r.charge_energy_added, 1, " kWh") },
      { label: "Duration", render: (r) => fixed(r.duration_min, 0, " min") },
    ];
    return html`
      <div class="subheader" title="Charging processes with no recorded end — usually a logging gap">
        Incomplete charges (${rows.length})
      </div>
      ${renderTable(columns, rows)}
    `;
  }

  protected renderContent(): TemplateResult {
    if (this._rows.length === 0) {
      return html`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No charges in the last ${rangeLabel(this.days())}.</div>
        </ha-card>
      `;
    }
    const { visible, page, pages } = this.paginate(this._rows);
    return html`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} charges`)} ${this._summary()}
        ${renderTable(this._columns(), visible)} ${this.renderPager(page, pages)} ${this._renderIncomplete()}
      </ha-card>
    `;
  }
}
