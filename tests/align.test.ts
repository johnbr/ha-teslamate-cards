import assert from "node:assert/strict";
import { test } from "node:test";
import { alignSeries, groupSeries } from "../src/align.ts";

test("alignSeries unions x values across series", () => {
  const { xs, ys } = alignSeries([
    { label: "a", points: [[1, 10], [3, 30]] },
    { label: "b", points: [[2, 20], [3, 33]] },
  ]);
  assert.deepEqual(xs, [1, 2, 3]);
  assert.deepEqual(ys, [
    [10, null, 30],
    [null, 20, 33],
  ]);
});

test("alignSeries pads gaps with null rather than interpolating", () => {
  // A straight segment drawn across a gap would be an invented trend; uPlot
  // breaks the line on null.
  const { ys } = alignSeries([{ label: "a", points: [[1, 10], [100, 20]] }, { label: "b", points: [[50, 15]] }]);
  assert.deepEqual(ys[0], [10, null, 20]);
  assert.deepEqual(ys[1], [null, 15, null]);
});

test("alignSeries sorts x ascending regardless of input order", () => {
  const { xs, ys } = alignSeries([{ label: "a", points: [[5, 50], [1, 10], [3, 30]] }]);
  assert.deepEqual(xs, [1, 3, 5]);
  assert.deepEqual(ys[0], [10, 30, 50]);
});

test("alignSeries drops non-finite points", () => {
  // Number(null) is 0, not NaN — a null y that slipped through would plot as a
  // real zero reading and drag a trend line to the floor.
  const { xs, ys } = alignSeries([
    { label: "a", points: [[1, 10], [2, Number.NaN], [Number.NaN, 5], [3, 30]] },
  ]);
  assert.deepEqual(xs, [1, 3]);
  assert.deepEqual(ys[0], [10, 30]);
});

test("alignSeries takes the last value when x repeats", () => {
  const { xs, ys } = alignSeries([{ label: "a", points: [[1, 10], [1, 99]] }]);
  assert.deepEqual(xs, [1]);
  assert.deepEqual(ys[0], [99]);
});

test("alignSeries handles an empty series without collapsing the others", () => {
  const { xs, ys } = alignSeries([{ label: "a", points: [[1, 10]] }, { label: "empty", points: [] }]);
  assert.deepEqual(xs, [1]);
  assert.deepEqual(ys, [[10], [null]]);
});

test("groupSeries splits rows by discriminator and sorts each by x", () => {
  const rows = [
    { series: "median", soc: 50, power: 100 },
    { series: "session", soc: 20, power: 150 },
    { series: "median", soc: 10, power: 140 },
    { series: "session", soc: 10, power: 160 },
  ];
  const grouped = groupSeries(
    rows,
    (r) => String(r.series),
    (r) => Number(r.soc),
    (r) => Number(r.power),
  );
  assert.deepEqual(grouped.get("median"), [[10, 140], [50, 100]]);
  assert.deepEqual(grouped.get("session"), [[10, 160], [20, 150]]);
});

test("groupSeries skips rows whose x or y is not numeric", () => {
  const rows = [
    { k: "a", x: 1, y: 2 },
    { k: "a", x: null, y: 3 },
    { k: "a", x: 4, y: null },
  ];
  const grouped = groupSeries(
    rows,
    (r) => String(r.k),
    (r) => (r.x === null ? Number.NaN : Number(r.x)),
    (r) => (r.y === null ? Number.NaN : Number(r.y)),
  );
  assert.deepEqual(grouped.get("a"), [[1, 2]]);
});
