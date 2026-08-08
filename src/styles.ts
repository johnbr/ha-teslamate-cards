import { css } from "lit";

/**
 * Shared card styling.
 *
 * Everything is expressed in Home Assistant theme variables so the cards follow
 * the user's theme in both light and dark rather than shipping their own
 * palette. Tables scroll inside their own container — the dashboard body must
 * never scroll horizontally on a phone.
 */
export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    padding: 16px 16px 8px;
  }

  .title {
    font-size: var(--ha-card-header-font-size, 24px);
    font-weight: 400;
    color: var(--ha-card-header-color, var(--primary-text-color));
    line-height: 1.2;
  }

  .subtitle {
    font-size: 12px;
    color: var(--secondary-text-color);
    white-space: nowrap;
  }

  .scroller {
    overflow-x: auto;
    /* Keep vertical scrolling and pinch-zoom native — never touch-action: none. */
    -webkit-overflow-scrolling: touch;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }

  th {
    position: sticky;
    top: 0;
    z-index: 1;
    text-align: right;
    font-weight: 500;
    white-space: nowrap;
    padding: 8px 10px;
    color: var(--secondary-text-color);
    background: var(--card-background-color, var(--ha-card-background));
    border-bottom: 1px solid var(--divider-color);
  }

  th.left,
  td.left {
    text-align: left;
  }

  th.center,
  td.center {
    text-align: center;
  }

  td {
    text-align: right;
    white-space: nowrap;
    padding: 7px 10px;
    border-bottom: 1px solid var(--divider-color);
    color: var(--primary-text-color);
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover td {
    background: var(--secondary-background-color);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 16px 12px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .pager {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  button {
    font: inherit;
    color: var(--primary-text-color);
    background: none;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    padding: 2px 10px;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.4;
    cursor: default;
  }

  button:not(:disabled):hover {
    background: var(--secondary-background-color);
  }

  .state {
    padding: 24px 16px;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .state.error {
    color: var(--error-color);
    text-align: left;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .cold {
    color: var(--info-color, #3d71d7);
  }

  /* Summary stat row — upstream's reducers over the table's own rows. */
  .summary {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    padding: 4px 16px 12px;
  }

  .stat {
    text-align: center;
    min-width: 0;
  }

  .stat-value {
    font-size: 20px;
    font-weight: 500;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .stat-label {
    font-size: 11px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .subheader {
    padding: 14px 16px 4px;
    font-size: 13px;
    font-weight: 500;
    color: var(--secondary-text-color);
    border-top: 1px solid var(--divider-color);
    margin-top: 8px;
  }

  /* ── Bars, split bars and gauges (see gauge.ts) ────────────────────── */

  .bars {
    padding: 4px 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .bar-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 4px;
  }

  .bar-label {
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .bar-value {
    font-size: 13px;
    font-weight: 500;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
  }

  .bar-track {
    position: relative;
    height: 10px;
    border-radius: 5px;
    background: var(--divider-color);
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    border-radius: 5px;
  }

  /* Charge-limit guidance, drawn over the fill rather than colouring it: the
     right SOC depends on what the car is about to do. */
  .bar-marker {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--card-background-color, #fff);
    opacity: 0.85;
  }

  .split {
    padding: 4px 16px 12px;
  }

  .split-track {
    display: flex;
    height: 12px;
    border-radius: 6px;
    overflow: hidden;
    background: var(--divider-color);
  }

  .split-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 16px;
    margin-top: 8px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .split-pct {
    color: var(--primary-text-color);
    font-weight: 500;
  }

  .swatch {
    display: inline-block;
    width: 9px;
    height: 9px;
    border-radius: 2px;
    margin-right: 5px;
  }

  .gauge {
    text-align: center;
    min-width: 0;
  }

  .gauge-svg {
    width: 100%;
    max-width: 130px;
    height: auto;
  }

  .gauge-track {
    fill: none;
    stroke: var(--divider-color);
    stroke-width: 9;
    stroke-linecap: round;
  }

  .gauge-fill {
    fill: none;
    stroke-width: 9;
    stroke-linecap: round;
  }

  .gauge-value {
    font-size: 20px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    margin-top: -6px;
  }

  .gauge-label {
    font-size: 11px;
    color: var(--secondary-text-color);
  }

  .chart-wrap {
    padding: 4px 8px 8px 4px;
  }

  /* Secondary columns: worth having on a desktop, noise on a phone. These
     tables are already wide enough to need horizontal scrolling. */
  @media (max-width: 700px) {
    th.optional,
    td.optional {
      display: none;
    }

    .summary {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 10px;
    }

    .stat-value {
      font-size: 18px;
    }
  }
`;
