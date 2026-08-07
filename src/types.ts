export interface HomeAssistant {
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  locale?: { language?: string };
  config?: { time_zone?: string };
  themes?: unknown;
}

export type Row = Record<string, unknown>;

export interface QueryResult {
  query_id: string;
  rows: Row[];
}

/** Options every card understands. */
export interface BaseCardConfig {
  type: string;
  title?: string;
  car_id?: number;
  /** `km` | `mi` — validated server-side against an allowlist. */
  length_unit?: "km" | "mi";
  /** `C` | `F`. */
  temp_unit?: "C" | "F";
  /** `ideal` | `rated`. */
  preferred_range?: "ideal" | "rated";
  /** Look-back window in days. Grafana's dashboards default to 90. */
  days?: number;
  /** TeslaMate's own web UI, for row links. */
  base_url?: string;
}

export interface VampireDrainCardConfig extends BaseCardConfig {
  /** Minimum standby length in hours. Upstream defaults to 6. */
  min_duration_hours?: number;
  /** Rows per page. */
  page_size?: number;
}

/** Lovelace hands cards an editor-provided config; narrow it defensively. */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
