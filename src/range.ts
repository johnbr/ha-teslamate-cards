/**
 * Look-back window helpers for the cards' header dropdown.
 *
 * Kept out of `base-card.ts` so they can be unit-tested: that module uses Lit
 * decorators, which Node's native type-stripping cannot parse, so importing it
 * from a test fails before a single assertion runs. Same reason `format.ts` and
 * `align.ts` are their own modules.
 */

/**
 * "3 days" / "90 days".
 *
 * Deliberately not "1 month" for 30 or "3 months" for 90: the windows are
 * genuinely counted in days (`$__timeFilter` gets `now - N × 86400`), a "month"
 * here would be a rounded lie, and the cards' own copy has always read
 * "last 90 days".
 */
export function rangeLabel(days: number): string {
  return days === 1 ? "1 day" : `${days} days`;
}

/**
 * The dropdown's choices: the offered set plus the configured window.
 *
 * `current` must appear even when it is not in `ranges`, or the dropdown opens
 * showing a value absent from its own list — at which point the browser selects
 * the first option instead, and the card silently shows a different window than
 * its YAML asked for with nothing on screen to suggest it.
 */
export function rangeOptions(ranges: number[], current: number): number[] {
  const valid = ranges.filter((days) => Number.isFinite(days) && days > 0);
  return [...new Set([...valid, current])].sort((a, b) => a - b);
}
