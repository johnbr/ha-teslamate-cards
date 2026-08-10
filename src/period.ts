/**
 * Rollup-grain helpers for the Statistics card's header dropdown.
 *
 * The sibling of `range.ts`, and import-free for the same reason: these are
 * unit-tested directly, and Node's native type-stripping cannot parse the Lit
 * decorators that `base-card.ts` uses, so a test importing a module that
 * imports that one fails before a single assertion runs.
 */

export type Period = "day" | "week" | "month" | "year";

/** Ascending by grain. Sorting alphabetically would read day, month, week, year. */
const ORDER: Period[] = ["day", "week", "month", "year"];

export function isPeriod(value: unknown): value is Period {
  return typeof value === "string" && (ORDER as string[]).includes(value);
}

/** "Per month". The dropdown says what one row of the table is. */
export function periodLabel(period: Period): string {
  return `Per ${period}`;
}

/**
 * The dropdown's choices: the offered set plus the current grain.
 *
 * `current` must appear even when it is not in `offered`, for the same reason
 * `rangeOptions` insists on it — a `<select>` whose value is absent from its own
 * options falls back to selecting the first one, so the card would quietly show
 * a different rollup than its YAML asked for with nothing on screen to say so.
 */
export function periodOptions(offered: readonly unknown[] | undefined, current: Period): Period[] {
  const valid = (offered ?? ORDER).filter(isPeriod);
  const chosen = new Set<Period>([...valid, current]);
  return ORDER.filter((period) => chosen.has(period));
}
