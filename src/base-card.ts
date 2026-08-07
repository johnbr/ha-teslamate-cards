import { LitElement, type TemplateResult, html } from "lit";
import { state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import type { BaseCardConfig, HomeAssistant, Row } from "./types";
import { errorMessage, runQuery, type QueryOptions } from "./ws";

const REFRESH_MS = 5 * 60 * 1000;

/**
 * Shared lifecycle for every TeslaMate card.
 *
 * `hass` is deliberately **not** a reactive Lit property. Home Assistant hands
 * a card a new `hass` object on every state change of every entity, so making
 * it reactive would re-render — and therefore rebuild the table and destroy the
 * browser's scroll anchor — many times a second on a busy instance. Rendering
 * depends only on the fetched rows, which change when a query completes.
 */
export abstract class TeslaMateBaseCard<C extends BaseCardConfig> extends LitElement {
  static styles = cardStyles;

  @state() protected _rows: Row[] = [];
  /** Results of `secondaryQueryIds()`, keyed by query id. */
  @state() protected _extra: Record<string, Row[]> = {};
  @state() protected _loading = true;
  @state() protected _error: string | null = null;
  @state() protected _page = 0;

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

  protected renderHeader(subtitle?: string): TemplateResult {
    return html`
      <div class="header">
        <div class="title">${this._config.title ?? this.defaultTitle()}</div>
        ${subtitle ? html`<div class="subtitle">${subtitle}</div>` : null}
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
