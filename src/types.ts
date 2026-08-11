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
  /**
   * Choices in the header's range dropdown, in days. Defaults to the card's own
   * set; `days` is always included whether listed here or not. A single-entry
   * list hides the dropdown.
   */
  ranges?: number[];
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
  /** Height of the route map shown for the selected drive, in pixels. */
  map_height?: number;
}

export interface ChargesCardConfig extends BaseCardConfig {
  /** Hide sessions shorter than this. */
  min_duration_minutes?: number;
  /** `AC`, `DC`, or empty for both. */
  charge_type?: "AC" | "DC" | "";
  page_size?: number;
}

export interface BatteryHealthCardConfig extends BaseCardConfig {
  /**
   * Override the derived pack capacity, in kWh. Upstream exposes this because
   * the derived figure is inferred from charging history and a well-documented
   * pack is more trustworthy. 0 or unset means "derive it".
   */
  custom_kwh_new?: number;
  /** Override the derived best-ever range, in `length_unit`. */
  custom_max_range?: number;
  chart_height?: number;
}

export interface ChargingStatsCardConfig extends BaseCardConfig {
  /** Ignore sessions shorter than this, in minutes. */
  min_duration_minutes?: number;
  /** Restrict to specific geofences; null or unset means all of them. */
  geofence_ids?: number[] | null;
  /** Prefix for money, e.g. "$". Purely presentational. */
  currency?: string;
  /** Traces on the DC charging curve before it becomes unreadable. */
  max_curve_sessions?: number;
  chart_height?: number;
}

/** The four grains `date_trunc` and upstream's own label arms agree on. */
export type StatisticsPeriod = "day" | "week" | "month" | "year";

export interface StatisticsCardConfig extends BaseCardConfig {
  /** Rollup grain. Upstream's default is `month`. */
  period?: StatisticsPeriod;
  /**
   * Choices in the header dropdown. This card's dropdown picks the *period*,
   * not the look-back window — the window is what `days` is for, and on a
   * per-year rollup it wants to be years wide rather than adjustable.
   */
  periods?: StatisticsPeriod[];
  /**
   * Walk raw `positions` instead of stitching drive and charge events: more
   * precise consumption, and far more expensive. Upstream defaults it off, and
   * over this card's multi-year default window it will hit the statement
   * timeout — turn it on only with `days` set to something short.
   */
  high_precision?: boolean;
  /** Prefix for money, e.g. "$". Purely presentational. */
  currency?: string;
  page_size?: number;
}

export interface TripCardConfig extends BaseCardConfig {
  /**
   * Look-back window. Defaults to 3 rather than the shared 90: this is the
   * retrospective view of a single journey, and upstream's dashboard is opened
   * on one trip's time range.
   */
  days?: number;
  /** Prefix for money, e.g. "$". Purely presentational. */
  currency?: string;
  /** Rows per page in the drives table. */
  page_size?: number;
  chart_height?: number;
  /** Height of the route map at the top of the card, in pixels. */
  map_height?: number;
}

/** Lovelace hands cards an editor-provided config; narrow it defensively. */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
