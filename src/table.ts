import { type TemplateResult, html, nothing } from "lit";
import type { Row } from "./types";

/**
 * One table column.
 *
 * `render` receives the whole row rather than a single value, because several
 * upstream columns are unit-suffixed (`distance_mi` / `distance_km`) or are
 * derived from more than one field.
 */
export interface Column {
  /** Header text. Empty renders a blank header, as upstream does for the ❄ column. */
  label: string;
  render: (row: Row) => unknown;
  align?: "left" | "right" | "center";
  /** Hidden on narrow viewports — for columns worth having but not essential. */
  optional?: boolean;
  /** Inline colour, for upstream's `color-text` cells. */
  color?: (row: Row) => string | undefined;
  /** Tooltip. */
  title?: (row: Row) => string | undefined;
}

/** Makes rows selectable — for a table that drives something else on the card. */
export interface RowSelection {
  onSelect: (row: Row) => void;
  /** Highlights the current row. */
  isSelected?: (row: Row) => boolean;
  /** Tooltip and accessible label for a row. */
  describe?: (row: Row) => string;
}

export function renderTable(columns: Column[], rows: Row[], selection?: RowSelection): TemplateResult {
  return html`
    <div class="scroller">
      <table>
        <thead>
          <tr>
            ${columns.map(
              (c) => html`<th class="${c.align ?? "right"} ${c.optional ? "optional" : ""}">${c.label}</th>`
            )}
          </tr>
        </thead>
        <tbody>
          ${rows.map(
            (row) => html`
              <tr
                class="${selection ? "selectable" : ""} ${selection?.isSelected?.(row) ? "selected" : ""}"
                role=${selection ? "button" : nothing}
                tabindex=${selection ? 0 : nothing}
                title=${selection?.describe?.(row) ?? nothing}
                @click=${selection ? () => selection.onSelect(row) : nothing}
                @keydown=${selection
                  ? (event: KeyboardEvent) => {
                      // A row acting as a button has to answer the keyboard like
                      // one, or the map is reachable only with a pointer.
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selection.onSelect(row);
                      }
                    }
                  : nothing}
              >
                ${columns.map((c) => {
                  const color = c.color?.(row);
                  const title = c.title?.(row);
                  return html`<td
                    class="${c.align ?? "right"} ${c.optional ? "optional" : ""}"
                    style=${color ? `color: ${color}` : nothing}
                    title=${title ?? nothing}
                  >
                    ${c.render(row)}
                  </td>`;
                })}
              </tr>
            `
          )}
        </tbody>
      </table>
    </div>
  `;
}

export interface SummaryItem {
  label: string;
  value: string;
}

/** The stat row above each upstream table, reduced from the table's own rows. */
export function renderSummary(items: SummaryItem[]): TemplateResult {
  return html`
    <div class="summary">
      ${items.map(
        (i) => html`
          <div class="stat">
            <div class="stat-value">${i.value}</div>
            <div class="stat-label">${i.label}</div>
          </div>
        `
      )}
    </div>
  `;
}
