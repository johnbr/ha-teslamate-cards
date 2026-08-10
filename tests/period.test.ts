/**
 * Statistics' rollup-grain dropdown.
 *
 * Run with `npm run test:js` (Node strips the types natively; no build step).
 *
 * Same trap as the range picker: a `<select>` whose value is absent from its
 * own options silently selects the first one instead, so the configured grain
 * has to survive into the list however the YAML was written. The extra concern
 * here is *ordering* — these are words, and the obvious sort is wrong.
 */

import assert from "node:assert";
import { test } from "node:test";
import { isPeriod, periodLabel, periodOptions } from "../src/period.ts";

test("options are ordered by grain, not alphabetically", () => {
  // Sorting these as strings gives day, month, week, year — which puts a month
  // between a day and a week.
  assert.deepEqual(periodOptions(["year", "day", "month", "week"], "month"), ["day", "week", "month", "year"]);
});

test("the configured grain is offered even when it is not in the list", () => {
  assert.deepEqual(periodOptions(["month", "year"], "week"), ["week", "month", "year"]);
});

test("a configured grain already in the list is not duplicated", () => {
  assert.deepEqual(periodOptions(["month", "year"], "year"), ["month", "year"]);
});

test("duplicates collapse", () => {
  assert.deepEqual(periodOptions(["month", "month"], "month"), ["month"]);
});

test("nonsense entries are dropped rather than offered", () => {
  // `date_trunc` accepts 'hour' and 'quarter', but upstream's own CASE arms do
  // not label them, so offering one would render an unlabelled period.
  assert.deepEqual(periodOptions(["hour", "quarter", "month", 7, null], "month"), ["month"]);
});

test("an omitted list offers all four", () => {
  assert.deepEqual(periodOptions(undefined, "month"), ["day", "week", "month", "year"]);
});

test("an empty list still offers the configured grain", () => {
  assert.deepEqual(periodOptions([], "year"), ["year"]);
});

test("isPeriod rejects everything outside the allowlist", () => {
  // The server allowlists this too — this is the friendly half, not the
  // security boundary.
  for (const value of ["", "MONTH", "months", "hour", 1, null, undefined, {}]) {
    assert.equal(isPeriod(value), false, `${String(value)} should not be a period`);
  }
  for (const value of ["day", "week", "month", "year"]) {
    assert.equal(isPeriod(value), true);
  }
});

test("labels say what a row is", () => {
  assert.equal(periodLabel("day"), "Per day");
  assert.equal(periodLabel("year"), "Per year");
});
