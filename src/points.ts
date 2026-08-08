/**
 * Per-point marker config for a chart series.
 *
 * Split out of `chart.ts` so it can be exercised under `npm run test:js`:
 * `chart.ts` pulls in Lit, uPlot and a CSS import, none of which load under a
 * bare Node test runner. Like `align.ts`, this module imports nothing on
 * purpose.
 */

/** The subset of uPlot's `Series.Points` that these charts set. */
export interface PointsConfig {
  show: boolean;
  size?: number;
  width?: number;
  stroke?: string;
  fill?: string;
}

/** Diameter in CSS pixels of a scatter series' dot. */
export const SCATTER_POINT_SIZE = 4;

/**
 * **A line series must switch its markers off with `show: false`, never by
 * asking for `size: 0`.** uPlot's point path builder computes the marker radius
 * as `(points.size - points.width) / 2 * pxRatio`, and `points.width` is *not*
 * zero by default — it defaults to `max(1, (3 + strokeWidth * 2) * 0.2)`. A zero
 * size therefore yields a negative radius, and `Path2D.arc()` throws
 * `IndexSizeError: The radius provided (-1.4) is negative` on every single draw.
 * That throw escapes mid-frame, so the axes and every later series are lost with
 * it — the chart does not degrade to "line without dots", it stops rendering.
 * `show: false` skips the builder entirely (uPlot only calls it when shown).
 *
 * The scatter branch pins `width: 0` for the same reason from the other side:
 * the radius is then exactly `size / 2` and cannot go negative however wide the
 * caller makes the series stroke. The dot is drawn as a solid fill rather than a
 * thin ring around a smaller disc, which is what the stroked version looked like
 * anyway at these sizes.
 */
export function seriesPoints(line: boolean, stroke: string): PointsConfig {
  return line
    ? { show: false }
    : { show: true, size: SCATTER_POINT_SIZE, width: 0, stroke, fill: stroke };
}

/**
 * uPlot's own marker-radius formula, in CSS pixels at `pxRatio` 1.
 *
 * Reproduced from `uplot/dist/uPlot.esm.js` (`points()` and the series defaults)
 * so a test can assert the radius this config actually produces. Returns `null`
 * when no marker is drawn.
 */
export function markerRadius(points: PointsConfig, seriesWidth: number): number | null {
  if (!points.show) return null;
  const ptDia = 3 + Math.max(1, seriesWidth) * 2;
  const size = points.size ?? ptDia;
  const width = points.width ?? Math.max(1, ptDia * 0.2);
  return (size - width) / 2;
}
