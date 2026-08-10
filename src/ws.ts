import type { BaseCardConfig, HomeAssistant, QueryResult, Row } from "./types";

const DOMAIN = "teslamate_cards";

export interface QueryOptions extends BaseCardConfig {
  /** Per-dashboard tunables (`duration`, `min_dist`, ...). */
  vars?: Record<string, unknown>;
  geofence_ids?: number[] | null;
  location?: string;
  charge_type?: string;
  /** Statistics' rollup grain. Allowlisted server-side, like `preferred_range`. */
  period?: string;
}

/**
 * Run a registered query.
 *
 * The card sends a query **id**, never SQL — the statement is resolved
 * server-side from a fixed registry.
 */
export async function runQuery(hass: HomeAssistant, queryId: string, options: QueryOptions): Promise<Row[]> {
  const days = options.days ?? 90;
  const to = new Date();
  const from = new Date(to.getTime() - days * 86_400_000);

  const result = await hass.callWS<QueryResult>({
    type: `${DOMAIN}/query`,
    query_id: queryId,
    car_id: options.car_id ?? 1,
    time_from: from.toISOString(),
    time_to: to.toISOString(),
    length_unit: options.length_unit ?? "km",
    temp_unit: options.temp_unit ?? "C",
    preferred_range: options.preferred_range ?? "rated",
    period: options.period ?? "month",
    geofence_ids: options.geofence_ids ?? null,
    location: options.location ?? "",
    charge_type: options.charge_type ?? "",
    vars: options.vars ?? {},
  });
  return result.rows;
}

/** Human-readable text for a websocket error, which arrives as an unknown. */
export function errorMessage(err: unknown): string {
  if (typeof err === "object" && err !== null && "message" in err) {
    return String((err as { message: unknown }).message);
  }
  return String(err);
}
