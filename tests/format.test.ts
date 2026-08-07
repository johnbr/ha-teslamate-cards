/**
 * Formatting tests.
 *
 * Run with `npm run test:js` (Node strips the types natively; no build step).
 * The timestamp cases are the ones that matter: the backend sends naive UTC,
 * because every TeslaMate timestamp column is `timestamp WITHOUT time zone`, so
 * a missing `Z` shifts every row by the viewer's offset and still looks
 * completely plausible.
 */

import assert from "node:assert";
import { test } from "node:test";
import { dateTime, duration, fixed, percent, percentUnit, thresholdColor, toNumber } from "../src/format.ts";

test("naive timestamps are read as UTC, not local", () => {
  // Timezone-independent: the explicit-Z form and the naive form the backend
  // actually sends must resolve to the same instant.
  assert.equal(dateTime("2026-01-15 08:30:00", "en-US"), dateTime("2026-01-15T08:30:00Z", "en-US"));
});

test("microsecond precision from PostgreSQL parses", () => {
  assert.equal(dateTime("2026-08-07 06:05:35.398000", "en-US"), dateTime("2026-08-07T06:05:35.398Z", "en-US"));
});

test("an unparseable timestamp is passed through, not shown as NaN", () => {
  assert.equal(dateTime("not a date", "en-US"), "not a date");
});

test("missing timestamps render as a dash", () => {
  assert.equal(dateTime(null), "—");
  assert.equal(dateTime(undefined), "—");
});

test("durations are compact", () => {
  assert.equal(duration(0), "0m");
  assert.equal(duration(90), "1m");
  assert.equal(duration(3600), "1h 0m");
  assert.equal(duration(5400), "1h 30m");
  assert.equal(duration(86400), "1d 0h");
  assert.equal(duration(180000), "2d 2h");
  assert.equal(duration(null), "—");
});

test("percentUnit scales a 0..1 fraction; percent does not", () => {
  assert.equal(percentUnit(0.85), "85%");
  assert.equal(percentUnit(0), "0%");
  assert.equal(percentUnit(null), "—");
  assert.equal(percent(-3), "-3%");
});

test("fixed handles nulls and suffixes", () => {
  assert.equal(fixed(1.234, 2, " mi"), "1.23 mi");
  assert.equal(fixed(null, 2, " mi"), "—");
  assert.equal(fixed("", 2), "—");
  // A numeric column arrives as a JSON number, but a string must still work.
  assert.equal(fixed("2.5", 1), "2.5");
});

test("toNumber rejects non-finite values", () => {
  assert.equal(toNumber("abc"), null);
  assert.equal(toNumber(Infinity), null);
  assert.equal(toNumber(0), 0);
});

test("thresholdColor takes the last step at or below the value", () => {
  const steps: Array<[number, string]> = [
    [0, "red"],
    [0.3, "amber"],
    [0.85, "green"],
  ];
  assert.equal(thresholdColor(0, steps, "none"), "red");
  assert.equal(thresholdColor(0.29, steps, "none"), "red");
  assert.equal(thresholdColor(0.3, steps, "none"), "amber");
  assert.equal(thresholdColor(0.9, steps, "none"), "green");
  // Below the first step, and non-numeric, both fall back.
  assert.equal(thresholdColor(-1, steps, "none"), "none");
  assert.equal(thresholdColor(null, steps, "none"), "none");
});
