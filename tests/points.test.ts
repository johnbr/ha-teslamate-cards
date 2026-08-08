import assert from "node:assert/strict";
import { test } from "node:test";
import { markerRadius, seriesPoints } from "../src/points.ts";

// Every series width the cards actually pass, plus the uPlot default of 1.
// battery-health: scatter (2, implicit) + median (2); charging-stats: SOC lines
// (2, implicit), per-session lines (1), median (3); trip: battery/range (2).
const WIDTHS = [1, 2, 3];

test("a line series draws no markers", () => {
  assert.deepEqual(seriesPoints(true, "#2196f3"), { show: false });
});

test("a scatter series draws a filled dot in the series colour", () => {
  assert.deepEqual(seriesPoints(false, "#2196f3"), {
    show: true,
    size: 4,
    width: 0,
    stroke: "#2196f3",
    fill: "#2196f3",
  });
});

test("no series config can produce a negative marker radius", () => {
  // The bug this guards: `points: { show: true, size: 0 }` on a line series made
  // uPlot compute `(0 - points.width) / 2` — a negative radius — and
  // `Path2D.arc()` threw `IndexSizeError` on every draw, aborting the frame and
  // taking the axes and later series with it. Observed live as radius -1.4 and
  // -1 on Android (pxRatio 2) and -0.758516 / -0.541797 on desktop at zoom.
  for (const line of [true, false]) {
    for (const width of WIDTHS) {
      const radius = markerRadius(seriesPoints(line, "#2196f3"), width);
      assert.ok(
        radius === null || radius > 0,
        `line=${line} width=${width} produced radius ${radius}`,
      );
    }
  }
});

test("markerRadius reproduces the uPlot formula that made size:0 negative", () => {
  // Pin the formula itself, so this suite still fails loudly if someone
  // reintroduces `size: 0` by hand rather than through seriesPoints().
  const close = (actual: number | null, expected: number) =>
    assert.ok(
      actual !== null && Math.abs(actual - expected) < 1e-9,
      `expected ~${expected}, got ${actual}`,
    );
  close(markerRadius({ show: true, size: 0 }, 2), -0.7);
  close(markerRadius({ show: true, size: 0 }, 1), -0.5);
  assert.equal(markerRadius({ show: false }, 2), null);
});
