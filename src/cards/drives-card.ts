import { type TemplateResult, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TeslaMateBaseCard } from "../base-card";
import { rangeLabel } from "../range";
import { dateTime, fixed, percent, sumOf } from "../format";
import "../map";
import { type Column, renderSummary, renderTable } from "../table";
import type { DrivesCardConfig, Row } from "../types";
import { type QueryOptions, runQuery } from "../ws";

const ROUTE_COLOR = "#2196f3";

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
    return { ...this._config, days: this.days(), vars };
  }

  protected defaultTitle(): string {
    return "Drives";
  }

  protected pageSize(): number {
    return this._config.page_size ?? 25;
  }

  /**
   * A narrower window can exclude the drive the map is showing, leaving a route
   * on screen with no highlighted row to explain it.
   */
  protected onRangeChanged(): void {
    this._selected = undefined;
    this._route = [];
    this._routeToken += 1;
  }

  /** The drive the map is showing, or none until a row is picked. */
  @state() private _selected?: Row;
  @state() private _route: Row[] = [];
  @state() private _routeLoading = false;

  /**
   * Show one drive's route.
   *
   * **Not a secondary query.** Those are fetched with the card's own options
   * whenever the card refreshes, and this needs a `drive_id` that changes on a
   * click, so it is fetched directly.
   *
   * `_routeToken` guards against a slow response overwriting a newer one: click
   * two rows quickly and the requests can land out of order, leaving the map
   * showing a drive that is not the highlighted one.
   */
  private _routeToken = 0;

  private async _selectDrive(row: Row): Promise<void> {
    const driveId = Number(row.drive_id);
    if (!Number.isFinite(driveId)) return;

    // Clicking the selected row again clears it, so the map can be dismissed
    // without picking some other drive.
    if (this._selected && Number(this._selected.drive_id) === driveId) {
      this._selected = undefined;
      this._route = [];
      this._routeToken += 1;
      return;
    }

    const token = ++this._routeToken;
    this._selected = row;
    this._route = [];
    this._routeLoading = true;
    try {
      const rows = await runQuery(this._hass!, "drive_route", {
        ...this.queryOptions(),
        vars: { drive_id: driveId },
      });
      if (token !== this._routeToken) return;
      this._route = rows;
    } catch {
      if (token === this._routeToken) this._route = [];
    } finally {
      if (token === this._routeToken) this._routeLoading = false;
    }
  }

  private _renderRoute(): TemplateResult | null {
    if (!this._selected) return null;
    const unit = this._config.length_unit ?? "km";
    const row = this._selected;
    const summary = [
      `${row.start_address ?? "—"} → ${row.end_address ?? "—"}`,
      fixed(row[this.unitKey("distance")], 1, ` ${unit}`),
      fixed(row.duration_min, 0, " min"),
    ].join(" · ");

    return html`
      <div class="subheader">${dateTime(row.start_date, this._hass?.locale?.language)}</div>
      ${this._routeLoading
        ? html`<div class="state">Loading route…</div>`
        : this._route.length === 0
          ? html`<div class="state">No positions logged for this drive.</div>`
          : html`
              <teslamate-map
                .rows=${this._route}
                .color=${ROUTE_COLOR}
                .label=${String(row.end_address ?? "Drive")}
                .language=${this._hass?.locale?.language}
                .height=${this._config.map_height ?? 520}
              ></teslamate-map>
            `}
      <div class="route-caption">${summary}</div>
    `;
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
          <div class="state">No drives in the last ${rangeLabel(this.days())}.</div>
        </ha-card>
      `;
    }
    const { visible, page, pages } = this.paginate(this._rows);
    return html`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} drives`)} ${this._summary()} ${this._renderRoute()}
        ${renderTable(this._columns(), visible, {
          onSelect: (row) => void this._selectDrive(row),
          isSelected: (row) => this._selected !== undefined && row.drive_id === this._selected.drive_id,
          describe: (row) =>
            this._selected !== undefined && row.drive_id === this._selected.drive_id
              ? "Hide this route"
              : `Show the route from ${row.start_address ?? "—"} to ${row.end_address ?? "—"}`,
        })}
        ${this.renderPager(page, pages)} ${this._renderIncomplete()}
      </ha-card>
    `;
  }
}
