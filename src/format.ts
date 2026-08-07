/**
 * Value formatting, matching the units Grafana's panels declare.
 *
 * Grafana unit ids map here as: `s` -> duration, `percentunit` -> a 0..1
 * fraction shown as a percentage, `percent` -> already a percentage,
 * `lengthkm`/`lengthmi` -> distance, `kwatth` -> energy, `watt` -> power.
 */

export function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

export function fixed(value: unknown, decimals: number, suffix = ""): string {
  const n = toNumber(value);
  return n === null ? "—" : `${n.toFixed(decimals)}${suffix}`;
}

/** Grafana `unit: s` with 1 decimal renders as a compact duration. */
export function duration(seconds: unknown): string {
  const total = toNumber(seconds);
  if (total === null) return "—";
  const abs = Math.abs(Math.round(total));
  const d = Math.floor(abs / 86400);
  const h = Math.floor((abs % 86400) / 3600);
  const m = Math.floor((abs % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

/** A 0..1 fraction as a whole percentage (Grafana `percentunit`, 0 decimals). */
export function percentUnit(value: unknown): string {
  const n = toNumber(value);
  return n === null ? "—" : `${Math.round(n * 100)}%`;
}

/** An already-percentage value (Grafana `percent`). */
export function percent(value: unknown): string {
  const n = toNumber(value);
  return n === null ? "—" : `${n}%`;
}

export function dateTime(value: unknown, language?: string): string {
  if (!value) return "—";
  // The backend sends naive UTC timestamps (TeslaMate's columns carry no zone),
  // so they must be marked as UTC before the browser converts them to local —
  // otherwise every row silently shifts by the viewer's offset.
  const raw = String(value);
  const iso = raw.includes("T") ? raw : raw.replace(" ", "T");
  const date = new Date(iso.endsWith("Z") ? iso : `${iso}Z`);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleString(language || undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Grafana threshold semantics: the last step whose value is <= the reading.
 * Steps must be given in ascending order.
 */
export function thresholdColor(value: unknown, steps: Array<[number, string]>, fallback: string): string {
  const n = toNumber(value);
  if (n === null) return fallback;
  let color = fallback;
  for (const [floor, candidate] of steps) {
    if (n >= floor) color = candidate;
  }
  return color;
}

/**
 * Numeric values of a column across rows, skipping nulls.
 *
 * Goes through `toNumber` rather than `Number` because `Number(null)` is **0**,
 * not NaN — so a plain `Number.isFinite` filter keeps nulls, which is harmless
 * in a sum and silently wrong in a mean (an in-progress drive has a null
 * duration; a free Supercharger session has a null cost).
 */
function numericValues(rows: Array<Record<string, unknown>>, key: string): number[] {
  const out: number[] = [];
  for (const row of rows) {
    const n = toNumber(row[key]);
    if (n !== null) out.push(n);
  }
  return out;
}

export function sumOf(rows: Array<Record<string, unknown>>, key: string): number {
  return numericValues(rows, key).reduce((a, b) => a + b, 0);
}

export function meanOf(rows: Array<Record<string, unknown>>, key: string): number {
  const values = numericValues(rows, key);
  return values.length === 0 ? 0 : values.reduce((a, b) => a + b, 0) / values.length;
}
