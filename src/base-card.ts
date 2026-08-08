import { LitElement, type TemplateResult, html } from "lit";
import { state } from "lit/decorators.js";
import { rangeLabel, rangeOptions } from "./range";
import { cardStyles } from "./styles";
import type { BaseCardConfig, HomeAssistant, Row } from "./types";
import { errorMessage, runQuery, type QueryOptions } from "./ws";

const REFRESH_MS = 5 * 60 * 1000;

export abstract class TeslaMateBaseCard<C extends BaseCardConfig> extends LitElement {
  static styles = cardStyles;

  @state() protected _rows: Row[] = [];
  /** Results of `secondaryQueryIds()`, keyed by query id. */
  @state() protected _extra: Record<string, Row[]> = {};
  @state() protected _loading = true;
  @state() protected _error: string | null = null;
  @state() protected _page = 0;
  /** Range picked from the header dropdown; unset means the configured one. */
  @state() protected _days?: number;

  protected _config!: C;
  protected _hass?: HomeAssistant;
  private _timer?: number;
  private _requested = false;

  /** The registered query id this card's main table renders. */
  protected abstract queryId(): string;

  /** Card-specific query parameters. */
  protected abstract queryOptions(): QueryOptions;

  protected abstract renderContent(): TemplateResult;

  /** Extra queries fetched alongside the main one (e.g. "incomplete" tables). */
  protected secondaryQueryIds(): string[] {
    return [];
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (!this._requested) {
      this._requested = true;
      void this.refresh();
    }
  }

  setConfig(config: C): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = config;
    this._page = 0;
    // Deliberately dropped, so an edit in the YAML editor is reflected
    // immediately rather than being masked by a range picked earlier.
    this._days = undefined;
    this._requested = false;
    if (this._hass) {
      this._requested = true;
      void this.refresh();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Historical data, so a slow cadence is plenty; the backend also caches for
    // 60 s, which collapses several dashboards refreshing at once.
    this._timer = window.setInterval(() => void this.refresh(), REFRESH_MS);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._timer) window.clearInterval(this._timer);
    this._timer = undefined;
  }

  async refresh(): Promise<void> {
    if (!this._hass || !this._config) return;
    const hass = this._hass;
    const options = this.queryOptions();
    try {
      const ids = this.secondaryQueryIds();
      const [main, ...rest] = await Promise.all([
        runQuery(hass, this.queryId(), options),
        ...ids.map((id) => runQuery(hass, id, options)),
      ]);
      this._rows = main;
      this._extra = Object.fromEntries(ids.map((id, i) => [id, rest[i] ?? []]));
      this._error = null;
    } catch (err) {
      this._error = errorMessage(err);
    } finally {
      this._loading = false;
    }
  }

  /** Rows for the current page, plus the paging metadata the footer needs. */
  protected paginate(rows: Row[]): { visible: Row[]; page: number; pages: number } {
    const size = this.pageSize();
    const pages = Math.max(1, Math.ceil(rows.length / size));
    const page = Math.min(this._page, pages - 1);
    return { visible: rows.slice(page * size, page * size + size), page, pages };
  }

  protected pageSize(): number {
    return 25;
  }

  /** Look-back window in days, honouring the header dropdown. */
  protected days(): number {
    return this._days ?? this._config.days ?? this.defaultDays();
  }

  /** Upstream's own dashboard time range for this card. */
  protected defaultDays(): number {
    return 90; // upstream's `now-3M`
  }

  /** Choices offered by the header dropdown. */
  protected defaultRanges(): number[] {
    return [7, 30, 90];
  }

  /**
   * False for a card whose figures are not time-filtered — Battery Health,
   * where capacity and degradation are all-time by design and a range picker
   * would imply a filter that does not exist.
   */
  protected showRangePicker(): boolean {
    return true;
  }

  /** Hook for state that a range change invalidates (a selected table row). */
  protected onRangeChanged(): void {}

  private _ranges(): number[] {
    return rangeOptions(this._config.ranges ?? this.defaultRanges(), this._config.days ?? this.defaultDays());
  }

  private _onRangeChange(event: Event): void {
    const days = Number((event.target as HTMLSelectElement).value);
    if (!Number.isFinite(days) || days === this.days()) return;
    this._days = days;
    this._page = 0;
    this.onRangeChanged();
    void this.refresh();
  }

  protected renderRangePicker(): TemplateResult | null {
    if (!this.showRangePicker()) return null;
    const ranges = this._ranges();
    if (ranges.length < 2) return null;
    const current = this.days();

    return html`
      <select
        class="range"
        aria-label="Look-back window"
        .value=${String(current)}
        @change=${(event: Event) => this._onRangeChange(event)}
      >
        ${ranges.map((days) => html`<option value=${days} ?selected=${days === current}>${rangeLabel(days)}</option>`)}
      </select>
    `;
  }

  protected renderHeader(subtitle?: string): TemplateResult {
    return html`
      <div class="header">
        <div class="header-text">
          <div class="title">${this._config.title ?? this.defaultTitle()}</div>
          ${subtitle ? html`<div class="subtitle">${subtitle}</div>` : null}
        </div>
        ${this.renderRangePicker()}
      </div>
    `;
  }

  protected renderPager(page: number, pages: number): TemplateResult | null {
    if (pages <= 1) return null;
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

  protected defaultTitle(): string {
    return "TeslaMate";
  }

  /** `distance_mi` / `distance_km` — upstream suffixes columns with the unit. */
  protected unitKey(prefix: string): string {
    return `${prefix}_${this._config.length_unit ?? "km"}`;
  }

  protected tempKey(prefix: string): string {
    return `${prefix}_${(this._config.temp_unit ?? "C").toLowerCase()}`;
  }

  render(): TemplateResult {
    if (!this._config) return html``;
    if (this._error) {
      return html`<ha-card>${this.renderHeader()}<div class="state error">${this._error}</div></ha-card>`;
    }
    if (this._loading) {
      return html`<ha-card>${this.renderHeader()}<div class="state">Loading…</div></ha-card>`;
    }
    return this.renderContent();
  }
}
