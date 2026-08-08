/**
 * Range-picker option list.
 *
 * Run with `npm run test:js` (Node strips the types natively; no build step).
 *
 * The interesting case is not formatting — it is that the *configured* window
 * always survives into the list. A `<select>` whose value is absent from its own
 * options falls back to selecting the first one, so a card configured with a
 * range the dropdown does not offer would silently show a different window than
 * its YAML asked for, with nothing on screen to suggest it.
 */

import assert from "node:assert";
import { test } from "node:test";
import { rangeLabel, rangeOptions } from "../src/range.ts";

test("the configured window is offered even when it is not in the list", () => {
  // Drives' default: `days: 14` against the standard 7/30/90 choices.
  assert.deepEqual(rangeOptions([7, 30, 90], 14), [7, 14, 30, 90]);
});

test("a configured window already in the list is not duplicated", () => {
  assert.deepEqual(rangeOptions([3, 7, 30], 3), [3, 7, 30]);
});

test("options are sorted ascending regardless of how they were written", () => {
  assert.deepEqual(rangeOptions([90, 7, 30], 30), [7, 30, 90]);
});

test("duplicates in the configured list collapse", () => {
  assert.deepEqual(rangeOptions([7, 7, 30], 7), [7, 30]);
});

test("nonsense entries are dropped rather than offered", () => {
  // A hand-written dashboard can contain anything; a zero or negative window
  // would ask the backend for an empty or inverted time filter.
  assert.deepEqual(rangeOptions([0, -5, 30, Number.NaN], 7), [7, 30]);
});

test("an empty list still offers the configured window", () => {
  assert.deepEqual(rangeOptions([], 3), [3]);
});

test("labels are plain day counts", () => {
  // Not "1 month" for 30: the window really is N × 86400 seconds, and the
  // cards' own subtitles have always read "last 90 days".
  assert.equal(rangeLabel(3), "3 days");
  assert.equal(rangeLabel(30), "30 days");
  assert.equal(rangeLabel(90), "90 days");
  assert.equal(rangeLabel(1), "1 day");
});
