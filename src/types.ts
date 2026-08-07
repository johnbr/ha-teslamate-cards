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

export interface DrivesCardConfig extends BaseCardConfig {
  /** Hide drives shorter than this, in `length_unit`. */
  min_distance?: number;
  /** Hide drives slower than this average speed. */
  min_speed?: number;
  /** `slope-adjusted` (upstream default) or `by distance`. */
  efficiency_mode?: "slope-adjusted" | "by distance";
  page_size?: number;
}

export interface ChargesCardConfig extends BaseCardConfig {
  /** Hide sessions shorter than this. */
  min_duration_minutes?: number;
  /** `AC`, `DC`, or empty for both. */
  charge_type?: "AC" | "DC" | "";
  page_size?: number;
}

/** Lovelace hands cards an editor-provided config; narrow it defensively. */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
