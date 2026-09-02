import { type TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { TeslaMateBaseCard } from "../base-card";
import { rangeLabel } from "../range";
import type { XYSeries } from "../align";
import "../chart";
import "../map";
import { dateTime, duration, fixed, toNumber } from "../format";
import { renderSplitBar } from "../gauge";
import { type Column, renderSummary, renderTable } from "../table";
import type { TripCardConfig } from "../types";
import type { QueryOptions } from "../ws";

const DRIVING_COLOR = "#2196f3";
const AC_COLOR = "var(--success-color)";
const DC_COLOR = "var(--warning-color)";

@customElement("teslamate-trip-card")
export class TripCard extends TeslaMateBaseCard<TripCardConfig> {
  protected queryId(): string {
    return "trip_summary";
  }

  protected secondaryQueryIds(): string[] {
    // `drives` and `charges` are the registered queries the Drives and Charges
    // cards use. Upstream's copies on the Trip dashboard are those same tables
    // minus their optional filters, and the tunables here are left at their
    // defaults (no minimum distance, speed or duration), so the rows match.
    return ["trip_energy", "trip_battery", "trip_elevation", "trip_route", "drives", "charges"];
  }

  protected queryOptions(): QueryOptions {
    return { ...this._config, days: this.days(), vars: {} };
  }

  /** A trip, not a quarter. Upstream's Trip dashboard is opened on one journey. */
  protected defaultDays(): number {
    return 3;
  }

  /**
   * Trip-sized windows, not the 90 days the other cards offer. Widening this
   * turns "the trip" into "everything since" and the summary stats stop meaning
   * anything — and the route map stops being one journey.
   */
  protected defaultRanges(): number[] {
    return [3, 7, 30];
  }

  protected defaultTitle(): string {
    return "Trip";
  }

  protected pageSize(): number {
    return this._config.page_size ?? 10;
  }

  private _currency(value: unknown, decimals = 2): string {
    const n = toNumber(value);
    if (n === null) return "—";
    return `${this._config.currency ?? ""}${n.toFixed(decimals)}`;
  }

  private _summary(row: Record<string, unknown>): TemplateResult {
    const unit = this._config.length_unit ?? "km";
    const energy = this._extra.trip_energy?.[0] ?? {};
    const speedUnit = unit === "mi" ? "mph" : "km/h";

    return html`
      ${renderSummary([
        { label: `Distance (${unit})`, value: fixed(row.distance, 0) },
        { label: "Driving time", value: duration(row.driving_seconds) },
        { label: `Ø Speed (${speedUnit})`, value: fixed(row.avg_speed_driving, 0) },
        { label: "Energy used (kWh)", value: fixed(energy.energy_consumed, 0) },
      ])}
      ${renderSummary([
        // Upstream's headline efficiency number for a trip: gross consumption,
        // which includes what was lost while parked.
        { label: `Wh/${unit}`, value: fixed(energy.consumption, 0) },
        {
          label: `Ø incl. charging (${speedUnit})`,
          value: fixed(row.avg_speed_with_charging, 0),
        },
        {
          label: (toNumber(row.paid_count) ?? 0) === 0 ? "Cost (all free)" : "Cost",
          value: this._currency(row.total_cost),
        },
        { label: `Cost per 100 ${unit}`, value: this._currency(energy.cost_per_distance) },
      ])}
    `;
  }

  private _timeSpent(row: Record<string, unknown>): TemplateResult | null {
    const bar = renderSplitBar(
      [
        { label: "Driving", value: (toNumber(row.driving_seconds) ?? 0) / 3600, color: DRIVING_COLOR },
        { label: "Charging AC", value: (toNumber(row.charging_ac_seconds) ?? 0) / 3600, color: AC_COLOR },
        { label: "Charging DC", value: (toNumber(row.charging_dc_seconds) ?? 0) / 3600, color: DC_COLOR },
      ],
      "h",
    );
    if (!bar) return null;
    return html`<div class="subheader">Time spent</div>
      ${bar}`;
  }

  private _energyAdded(row: Record<string, unknown>): TemplateResult | null {
    const bar = renderSplitBar(
      [
        { label: "AC", value: toNumber(row.energy_added_ac) ?? 0, color: AC_COLOR },
        { label: "DC", value: toNumber(row.energy_added_dc) ?? 0, color: DC_COLOR },
      ],
      "kWh",
    );
    if (!bar) return null;
    return html`<div class="subheader">Energy added</div>
      ${bar}`;
  }

  /**
   * Naive-UTC timestamp to epoch seconds.
   *
   * TeslaMate's columns carry no zone, so the backend sends naive UTC — the `Z`
   * has to be added before parsing or every point shifts by the viewer's offset.
   */
  private _epoch(value: unknown): number {
    const raw = String(value ?? "");
    const iso = raw.includes("T") ? raw : raw.replace(" ", "T");
    return new Date(iso.endsWith("Z") ? iso : `${iso}Z`).getTime() / 1000;
  }

  /**
   * The route, as upstream's geomap draws it: the whole window, driving and
   * parked alike. It leads the card because it is what a trip *is* — the
   * numbers below are all descriptions of this line.
   */
  private _route(): TemplateResult | null {
    const rows = this._extra.trip_route ?? [];
    if (rows.length === 0) return null;
    return html`
      <teslamate-map
        .rows=${rows}
        .color=${DRIVING_COLOR}
        .label=${"Trip"}
        .language=${this._hass?.locale?.language}
        .height=${this._config.map_height ?? 540}
      ></teslamate-map>
    `;
  }

  private _batteryChart(): TemplateResult | null {
    const rows = this._extra.trip_battery ?? [];
    if (rows.length === 0) return null;
    const unit = this._config.length_unit ?? "km";

    const level: Array<[number, number]> = [];
    const range: Array<[number, number]> = [];
    for (const r of rows) {
      const t = this._epoch(r.time);
      if (!Number.isFinite(t)) continue;
      const lvl = toNumber(r.battery_level);
      const rng = toNumber(r.range);
      if (lvl !== null) level.push([t, lvl]);
      if (rng !== null) range.push([t, rng]);
    }
    if (level.length === 0 && range.length === 0) return null;

    // Percent and distance cannot share a scale — on one axis the percentage
    // would sit flat against the floor.
    const series: XYSeries[] = [
      { label: "Battery", points: level, color: "#4caf50", line: true },
      { label: `Range`, points: range, color: "#2196f3", line: true, axis: "right" },
    ];

    return html`
      <div class="subheader">Battery level &amp; range</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${series}
          .config=${{
            height: this._config.chart_height ?? 200,
            timeAxis: true,
            yLabel: "%",
            y2Label: unit,
            yFormat: (v: number) => `${Math.round(v)}%`,
            y2Format: (v: number) => `${Math.round(v)} ${unit}`,
            xFormat: (v: number) => dateTime(new Date(v * 1000).toISOString(), this._hass?.locale?.language),
          }}
        ></teslamate-chart>
      </div>
    `;
  }

  private _elevationChart(): TemplateResult | null {
    const rows = this._extra.trip_elevation ?? [];
    const points: Array<[number, number]> = [];
    for (const r of rows) {
      const t = this._epoch(r.time);
      const e = toNumber(r.elevation);
      // Null elevation is normal: samples logged while parked carry a position
      // but no elevation, so the trace legitimately has gaps.
      if (Number.isFinite(t) && e !== null) points.push([t, e]);
    }
    if (points.length === 0) return null;

    // Upstream's alternative_length_unit: metres with km, feet with miles.
    const unit = (this._config.length_unit ?? "km") === "mi" ? "ft" : "m";

    return html`
      <div class="subheader">Elevation</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${[{ label: "Elevation", points, color: "#795548", line: true }]}
          .config=${{
            height: this._config.chart_height ?? 160,
            timeAxis: true,
            yLabel: unit,
            yFormat: (v: number) => `${Math.round(v).toLocaleString()} ${unit}`,
            xFormat: (v: number) => dateTime(new Date(v * 1000).toISOString(), this._hass?.locale?.language),
          }}
        ></teslamate-chart>
      </div>
    `;
  }

  private _drives(): TemplateResult | null {
    const rows = this._extra.drives ?? [];
    if (rows.length === 0) return null;
    const unit = this._config.length_unit ?? "km";
    const language = this._hass?.locale?.language;

    const columns: Column[] = [
      { label: "Start", align: "left", render: (r) => dateTime(r.start_date, language) },
      { label: "From", align: "left", render: (r) => r.start_address ?? "—" },
      { label: "To", align: "left", render: (r) => r.end_address ?? "—" },
      { label: "Duration", render: (r) => fixed(r.duration_min, 0, " min") },
      { label: `Distance`, render: (r) => fixed(r[this.unitKey("distance")], 1, ` ${unit}`) },
      { label: "SoC", render: (r) => `${fixed(r.start_battery_level, 0)}% → ${fixed(r.end_battery_level, 0)}%` },
      { label: `Wh/${unit}`, render: (r) => fixed(r[this.unitKey("consumption_kwh")], 0), optional: true },
    ];

    const { visible, page, pages } = this.paginate(rows);
    return html`
      <div class="subheader">Drives (${rows.length})</div>
      ${renderTable(columns, visible)} ${this.renderPager(page, pages)}
    `;
  }

  private _charges(): TemplateResult | null {
    const rows = this._extra.charges ?? [];
    if (rows.length === 0) return null;
    const unit = this._config.length_unit ?? "km";
    const language = this._hass?.locale?.language;

    const columns: Column[] = [
      { label: "Start", align: "left", render: (r) => dateTime(r.start_date, language) },
      { label: "Location", align: "left", render: (r) => r.address ?? "—" },
      { label: "Duration", render: (r) => fixed(r.duration_min, 0, " min") },
      { label: "Added", render: (r) => fixed(r.charge_energy_added, 1, " kWh") },
      { label: "Range", render: (r) => fixed(r[this.unitKey("range_added")], 0, ` ${unit}`) },
      { label: "SoC", render: (r) => `${fixed(r.start_battery_level, 0)}% → ${fixed(r.end_battery_level, 0)}%` },
      { label: "Cost", render: (r) => (r.cost === null ? "free" : this._currency(r.cost)) },
    ];

    return html`
      <div class="subheader">Charges (${rows.length})</div>
      ${renderTable(columns, rows.slice(0, this.pageSize()))}
    `;
  }

  protected renderContent(): TemplateResult {
    const row = this._rows[0];
    const distance = toNumber(row?.distance);
    if (!row || distance === null || distance === 0) {
      return html`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No travel recorded in the last ${rangeLabel(this.days())}.</div>
        </ha-card>
      `;
    }
    return html`
      <ha-card>
        ${this.renderHeader(`last ${rangeLabel(this.days())}`)} ${this._route()}
        ${this._summary(row)} ${this._timeSpent(row)} ${this._energyAdded(row)} ${this._batteryChart()}
        ${this._elevationChart()} ${this._drives()} ${this._charges()}
      </ha-card>
    `;
  }
}
