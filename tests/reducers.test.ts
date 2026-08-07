/**
 * Shared reducer tests.
 *
 * The summary rows are reductions over the table's own rows — upstream computes
 * them the same way, as Grafana transformations rather than extra queries. Null
 * is the interesting case: an in-progress drive has a null distance, and a free
 * Supercharger session has a null cost, so a reducer that treats null as 0 is
 * fine but one that treats it as NaN poisons the whole total.
 */

import assert from "node:assert";
import { test } from "node:test";
import { meanOf, sumOf } from "../src/format.ts";

const ROWS = [
  { distance_mi: 10, cost: 1.5, duration_min: 30 },
  { distance_mi: 5.5, cost: null, duration_min: 60 },
  { distance_mi: null, cost: 2.5, duration_min: null },
];

test("sumOf skips nulls rather than poisoning the total", () => {
  assert.equal(sumOf(ROWS, "distance_mi"), 15.5);
  assert.equal(sumOf(ROWS, "cost"), 4);
});

test("sumOf of an absent column is zero, not NaN", () => {
  assert.equal(sumOf(ROWS, "nope"), 0);
  assert.equal(sumOf([], "distance_mi"), 0);
});

test("meanOf divides by the count of real values, not the row count", () => {
  // 30 and 60 are real; the null row must not drag the mean to 30.
  assert.equal(meanOf(ROWS, "duration_min"), 45);
});

test("meanOf of nothing is zero, not NaN", () => {
  assert.equal(meanOf([], "duration_min"), 0);
  assert.equal(meanOf([{ x: null }], "x"), 0);
});

test("numeric strings still reduce", () => {
  // asyncpg gives numbers, but a value that arrives as a string must not
  // silently drop out of a total.
  assert.equal(sumOf([{ a: "1.5" }, { a: 2 }], "a"), 3.5);
});

test("free Supercharging: all-null cost totals zero, not NaN", () => {
  const free = [{ cost: null }, { cost: null }];
  assert.equal(sumOf(free, "cost"), 0);
});

test("upstream's drives efficiency reducer", () => {
  // sum(consumption_kWh) / sum(distance), expressed as Wh per unit.
  const rows = [
    { distance_mi: 100, consumption_kWh: 30 },
    { distance_mi: 50, consumption_kWh: 15 },
  ];
  const perUnit = (sumOf(rows, "consumption_kWh") / sumOf(rows, "distance_mi")) * 1000;
  assert.equal(perUnit, 300);
});
