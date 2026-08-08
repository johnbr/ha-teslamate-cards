import { type TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { TeslaMateBaseCard } from "../base-card";
import { rangeLabel } from "../range";
import { type XYSeries, groupSeries } from "../align";
import "../chart";
import { fixed, toNumber } from "../format";
import { renderSplitBar } from "../gauge";
import { type Column, renderSummary, renderTable } from "../table";
import type { ChargingStatsCardConfig } from "../types";
import type { QueryOptions } from "../ws";

const AC_COLOR = "var(--success-color)";
const DC_COLOR = "var(--warning-color)";

@customElement("teslamate-charging-stats-card")
export class ChargingStatsCard extends TeslaMateBaseCard<ChargingStatsCardConfig> {
  protected queryId(): string {
    return "charging_totals";
  }

  protected secondaryQueryIds(): string[] {
    return [
      "charging_cost_per_distance",
      "charge_delta",
      "dc_charging_curve",
      "top_stations_energy",
      "top_stations_cost",
    ];
  }

  protected queryOptions(): QueryOptions {
    const vars: Record<string, unknown> = {};
    if (this._config.min_duration_minutes !== undefined) vars.min_duration = this._config.min_duration_minutes;
    return {
      ...this._config,
      days: this.days(),
      geofence_ids: this._config.geofence_ids ?? null,
      vars,
    };
  }

  protected defaultTitle(): string {
    return "Charging Stats";
  }

  private _currency(value: unknown, decimals = 2): string {
    const n = toNumber(value);
    if (n === null) return "—";
    const symbol = this._config.currency ?? "";
    return `${symbol}${n.toFixed(decimals)}`;
  }

  private _summary(row: Record<string, unknown>): TemplateResult {
    const unit = this._config.length_unit ?? "km";
    const perDistance = toNumber(this._extra.charging_cost_per_distance?.[0]?.cost_mileage);
    const paid = toNumber(row.paid_count) ?? 0;
    const count = toNumber(row.charge_count) ?? 0;

    return renderSummary([
      { label: "Charges", value: count.toFixed(0) },
      { label: "Energy added (kWh)", value: fixed(row.energy_added, 0) },
      // Cost is NULL on a free session, so the total is over paid sessions only
      // while the energy figures count every one. The label says which, because
      // a bare "0.00" next to 800 kWh reads like a bug rather than a fact about
      // free Supercharging.
      {
        label: paid === 0 ? "Cost (all free)" : `Cost (${paid} of ${count} paid)`,
        value: this._currency(row.total_cost),
      },
      {
        label: `Cost per 100 ${unit}`,
        value: perDistance === null ? "—" : this._currency(perDistance),
      },
    ]);
  }

  private _rates(row: Record<string, unknown>): TemplateResult {
    const blended = toNumber(row.cost_per_kwh);
    const ac = toNumber(row.cost_per_kwh_ac);
    const dc = toNumber(row.cost_per_kwh_dc);
    const efficiency = toNumber(row.charging_efficiency);
    const suc = toNumber(row.suc_cost);

    return renderSummary([
      { label: "Ø Cost/kWh", value: blended === null ? "—" : this._currency(blended, 3) },
      { label: "AC", value: ac === null ? "—" : this._currency(ac, 3) },
      { label: "DC", value: dc === null ? "—" : this._currency(dc, 3) },
      {
        label: suc === 0 ? "Supercharging (free)" : "Supercharging",
        value: this._currency(suc),
      },
      { label: "Charging efficiency", value: efficiency === null ? "—" : `${(efficiency * 100).toFixed(1)}%` },
    ]);
  }

  private _acdc(row: Record<string, unknown>): TemplateResult | null {
    const split = renderSplitBar(
      [
        { label: "AC", value: toNumber(row.energy_ac) ?? 0, color: AC_COLOR },
        { label: "DC", value: toNumber(row.energy_dc) ?? 0, color: DC_COLOR },
      ],
      "kWh",
    );
    if (!split) return null;
    return html`<div class="subheader">Energy used by charger type</div>
      ${split}`;
  }

  /** Start and end SOC per session, on a time axis. */
  private _deltaChart(): TemplateResult | null {
    const rows = this._extra.charge_delta ?? [];
    if (rows.length === 0) return null;

    // The chart's time scale wants epoch seconds. The backend sends naive UTC
    // (TeslaMate's columns carry no zone), so the `Z` has to be added before
    // parsing or every point shifts by the viewer's offset.
    const epoch = (value: unknown): number => {
      const raw = String(value ?? "");
      const iso = raw.includes("T") ? raw : raw.replace(" ", "T");
      return new Date(iso.endsWith("Z") ? iso : `${iso}Z`).getTime() / 1000;
    };

    const start: Array<[number, number]> = [];
    const end: Array<[number, number]> = [];
    for (const r of rows) {
      const t = epoch(r.time);
      const s = toNumber(r.start_soc);
      const e = toNumber(r.end_soc);
      if (!Number.isFinite(t)) continue;
      if (s !== null) start.push([t, s]);
      if (e !== null) end.push([t, e]);
    }
    if (start.length === 0 && end.length === 0) return null;

    const series: XYSeries[] = [
      { label: "Start SOC", points: start, color: "#ff9800", line: true },
      { label: "End SOC", points: end, color: "#4caf50", line: true },
    ];

    return html`
      <div class="subheader">Charge delta</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${series}
          .config=${{
            height: this._config.chart_height ?? 200,
            timeAxis: true,
            yLabel: "SOC %",
            yFormat: (v: number) => `${Math.round(v)}%`,
            xFormat: (v: number) => new Date(v * 1000).toLocaleDateString(this._hass?.locale?.language),
          }}
        ></teslamate-chart>
      </div>
    `;
  }

  /** Charger power against SOC — one trace per fast-charging session. */
  private _curveChart(): TemplateResult | null {
    const rows = this._extra.dc_charging_curve ?? [];
    if (rows.length === 0) return null;

    const grouped = groupSeries(
      rows,
      (r) => (r.series === "median" ? "__median" : String(r.label ?? r.session_id ?? "session")),
      (r) => Number(r.soc),
      (r) => Number(r.power),
    );

    const median = grouped.get("__median");
    grouped.delete("__median");

    // One line per session gets unreadable quickly, and the median is the point
    // of the panel. Sessions are capped, newest-first, with the rest folded into
    // the median that is always drawn.
    const limit = this._config.max_curve_sessions ?? 6;
    const sessions = [...grouped.entries()].slice(-limit);

    const series: XYSeries[] = sessions.map(([label, points]) => ({ label, points, line: true, width: 1 }));
    if (median?.length) {
      series.push({ label: "Median", points: median, color: "var(--primary-text-color)", line: true, width: 3 });
    }
    if (series.length === 0) return null;

    const hidden = grouped.size - sessions.length;
    return html`
      <div class="subheader">
        DC charging curve${hidden > 0 ? html` <span class="hint">(newest ${sessions.length} of ${grouped.size})</span>` : null}
      </div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${series}
          .config=${{
            height: this._config.chart_height ?? 220,
            xLabel: "SOC %",
            yLabel: "kW",
            yFromZero: true,
            xFormat: (v: number) => `${Math.round(v)}% SOC`,
            yFormat: (v: number) => `${Math.round(v)} kW`,
          }}
        ></teslamate-chart>
      </div>
    `;
  }

  private _stations(): TemplateResult | null {
    const energy = this._extra.top_stations_energy ?? [];
    const cost = this._extra.top_stations_cost ?? [];
    if (energy.length === 0 && cost.length === 0) return null;

    const energyColumns: Column[] = [
      { label: "Location", align: "left", render: (r) => r.location ?? "—" },
      { label: "Energy", render: (r) => fixed(r.charge_energy_added, 1, " kWh") },
    ];
    const costColumns: Column[] = [
      { label: "Location", align: "left", render: (r) => r.location ?? "—" },
      { label: "Cost", render: (r) => this._currency(r.cost) },
    ];

    return html`
      ${energy.length
        ? html`<div class="subheader">Top locations by energy</div>
            ${renderTable(energyColumns, energy)}`
        : null}
      ${cost.length
        ? html`<div class="subheader">Top locations by cost</div>
            ${renderTable(costColumns, cost)}`
        : null}
    `;
  }

  protected renderContent(): TemplateResult {
    const row = this._rows[0];
    const count = toNumber(row?.charge_count) ?? 0;
    if (!row || count === 0) {
      return html`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No charging sessions in the last ${rangeLabel(this.days())}.</div>
        </ha-card>
      `;
    }
    return html`
      <ha-card>
        ${this.renderHeader(`last ${rangeLabel(this.days())}`)} ${this._summary(row)}
        ${this._rates(row)} ${this._acdc(row)} ${this._deltaChart()} ${this._curveChart()} ${this._stations()}
      </ha-card>
    `;
  }
}
