/**
 * Turn independent (x, y) series into uPlot's aligned-column layout.
 *
 * uPlot takes one shared x array and one y array per series, all the same
 * length: `[xs, ys1, ys2, ...]`. The queries do not produce that. The battery
 * capacity chart's scatter and its median trend are sampled at completely
 * different odometer readings, and each DC charging session covers whatever SOC
 * range that session happened to span. So the x values have to be unioned and
 * every series padded with `null` where it has no sample.
 *
 * `null` is meaningful to uPlot — it breaks the line rather than drawing
 * through the gap, which is what we want, since a straight segment across a
 * three-month hole in a scatter would be an invented trend.
 *
 * This module imports nothing on purpose. Node's ESM resolver needs explicit
 * file extensions where the bundler does not, so a directly-tested module that
 * imports another one cannot run under `npm run test:js`.
 */

export interface XYSeries {
  label: string;
  /** `[x, y]` pairs. Need not be sorted, and need not share x values. */
  points: Array<[number, number]>;
  color?: string;
  /** Draw as a line through the points rather than a scatter. */
  line?: boolean;
  width?: number;
  /**
   * Which y axis to plot against. Two series sharing one axis must share units:
   * battery percent and range in miles on a single scale would flatten the
   * percentage onto the floor.
   */
  axis?: "left" | "right";
}

export interface AlignedData {
  xs: number[];
  /** One array per input series, index-aligned to `xs`. */
  ys: Array<Array<number | null>>;
}

/**
 * Union the x values across all series and pad each series to match.
 *
 * Where a series has two points at the same x the last one wins — the queries
 * group by x so this should not arise, but silently dropping to whichever the
 * iteration order happened to reach first would be worse than a stated rule.
 */
export function alignSeries(series: XYSeries[]): AlignedData {
  const lookups = series.map((s) => {
    const byX = new Map<number, number>();
    for (const [x, y] of s.points) {
      if (Number.isFinite(x) && Number.isFinite(y)) byX.set(x, y);
    }
    return byX;
  });

  const all = new Set<number>();
  for (const byX of lookups) {
    for (const x of byX.keys()) all.add(x);
  }
  const xs = [...all].sort((a, b) => a - b);

  const ys = lookups.map((byX) => xs.map((x) => (byX.has(x) ? (byX.get(x) as number) : null)));
  return { xs, ys };
}

/**
 * Group flat query rows into one series per key.
 *
 * The charting queries return a long format — one row per point with a
 * discriminator column — because that is what a `UNION ALL` of two panel
 * targets naturally produces.
 */
export function groupSeries(
  rows: Array<Record<string, unknown>>,
  keyOf: (row: Record<string, unknown>) => string,
  xOf: (row: Record<string, unknown>) => number,
  yOf: (row: Record<string, unknown>) => number,
): Map<string, Array<[number, number]>> {
  const out = new Map<string, Array<[number, number]>>();
  for (const row of rows) {
    const x = xOf(row);
    const y = yOf(row);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    const key = keyOf(row);
    const bucket = out.get(key);
    if (bucket) bucket.push([x, y]);
    else out.set(key, [[x, y]]);
  }
  for (const points of out.values()) points.sort((a, b) => a[0] - b[0]);
  return out;
}
