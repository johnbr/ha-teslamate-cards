"""Reduce a GPS track to a drawable number of points.

**Why this is not just a coarser time bucket.** Every other series in this
integration is thinned with ``$__timeGroupAuto``, which is right for a chart:
the x axis *is* time, so a wider bucket loses detail evenly. A route has no such
property. Time bucketing spends its point budget uniformly along the clock, so
it lavishes points on the eight hours the car sat parked in one spot and starves
the ninety seconds it spent going round a cloverleaf. Measured on this database,
a 3-day Trip window at upstream's own 5-second grouping is 2,645 points; pushed
through the 800-point target the shared macro uses, it snaps to a 10-minute
bucket -- at which point every corner is cut and the freeway is a polygon.

So routes are reduced **geometrically** instead: keep the points that carry the
shape, drop the ones a straight line already accounts for. Parked stretches
collapse to almost nothing for free, because a thousand samples at one spot are
all within a metre of the line through them.

This matters for the frontend, not the database. ``ha-map`` draws a circle
marker *and* a polyline segment per point, so a 2,645-point route is ~5,300
Leaflet layers.
"""

from __future__ import annotations

from math import cos, radians
from typing import Any

# Metres per degree of latitude. Longitude is scaled by cos(lat) -- see _project.
_M_PER_DEG_LAT = 110_574.0
_M_PER_DEG_LON = 111_320.0

# Below this, simplification is a no-op that costs a projection pass.
_MIN_POINTS = 3

#: Points that survive to the browser, per route. `ha-map` draws two Leaflet
#: layers per point (a circle marker with a tooltip, plus the polyline segment
#: to the next one), so this is really a ~1,200-layer budget. Comfortably more
#: detail than a card-sized map can show, and an order of magnitude below the
#: 2,645 points a 3-day window arrives with.
DEFAULT_MAX_POINTS = 600

#: Starting tolerance. A GPS fix is good to a few metres and a card-width map
#: covering a city shows ~50 m per pixel, so 5 m is already below what can be
#: seen -- it exists to strip the sampling noise, not the shape.
DEFAULT_EPSILON_M = 5.0

# Growth factor when the first pass leaves too many points. Geometric, so a
# route that needs a much larger tolerance still converges in a few passes
# rather than creeping up linearly.
_EPSILON_GROWTH = 1.8

# Hard stop on the search. Only reached if a track is so dense that no plausible
# tolerance thins it, in which case the caller gets whatever the last pass gave.
_MAX_PASSES = 24

# Bisection steps once the budget-meeting tolerance has been bracketed. Each one
# halves the bracket, so 8 lands within ~0.4% of the smallest tolerance that
# fits -- well past the point where more precision changes which points survive.
_BISECT_PASSES = 8

# Only bisect when the winning tolerance left less than this share of the
# budget, i.e. when the geometric step genuinely overshot. See simplify_route.
_REFINE_BELOW = 0.75

# Below this share of the budget the result is treated as a collapsed track
# rather than a simplified one, and the last over-budget result is preferred.
# See the closing note in simplify_route.
_DEGENERATE_BELOW = 0.1


def _project(points: list[tuple[float, float]]) -> list[tuple[float, float]]:
    """Lat/lon degrees to metres on a local tangent plane.

    Equirectangular around the track's own mean latitude. Perpendicular distance
    has to be measured in metres or the tolerance means something different at
    every latitude -- and a degree of longitude is only ~0.57 of a degree of
    latitude at this house's 34°N, so working in raw degrees would also squash
    east-west detail relative to north-south.
    """
    mean_lat = sum(lat for lat, _ in points) / len(points)
    # cos() of the mean latitude, computed once: a track never spans enough
    # latitude for the error in that approximation to reach a metre.
    lon_scale = _M_PER_DEG_LON * cos(radians(mean_lat))
    return [(lon * lon_scale, lat * _M_PER_DEG_LAT) for lat, lon in points]


def _rdp_keep(xy: list[tuple[float, float]], epsilon: float) -> list[bool]:
    """Ramer-Douglas-Peucker, iterative, returning a keep-mask.

    Iterative rather than recursive on purpose: a long track is thousands of
    points deep in the worst case (a monotonic route recurses down one side),
    and Python's recursion limit is 1,000.
    """
    keep = [False] * len(xy)
    keep[0] = keep[-1] = True
    stack = [(0, len(xy) - 1)]

    while stack:
        start, end = stack.pop()
        if end <= start + 1:
            continue

        ax, ay = xy[start]
        bx, by = xy[end]
        dx, dy = bx - ax, by - ay
        # Squared length of the segment; a zero-length one (the car returned to
        # where it started) degenerates to distance-from-a-point.
        seg_sq = dx * dx + dy * dy

        worst = 0.0
        worst_i = -1
        for i in range(start + 1, end):
            px, py = xy[i]
            if seg_sq == 0.0:
                dist_sq = (px - ax) ** 2 + (py - ay) ** 2
            else:
                # Perpendicular distance via the 2-D cross product, kept squared
                # so the loop needs no sqrt.
                cross = dx * (py - ay) - dy * (px - ax)
                dist_sq = cross * cross / seg_sq
            if dist_sq > worst:
                worst = dist_sq
                worst_i = i

        if worst_i >= 0 and worst > epsilon * epsilon:
            keep[worst_i] = True
            stack.append((start, worst_i))
            stack.append((worst_i, end))

    return keep


def simplify_route(
    rows: list[dict[str, Any]],
    *,
    lat_key: str = "latitude",
    lon_key: str = "longitude",
    max_points: int = DEFAULT_MAX_POINTS,
    epsilon_m: float = DEFAULT_EPSILON_M,
) -> list[dict[str, Any]]:
    """Return ``rows`` thinned to at most ``max_points``, shape preserved.

    Whole rows are kept, not just coordinates, so every surviving point still
    carries its timestamp for the map's hover tooltip.

    Rows with a null coordinate are dropped. TeslaMate logs positions with no
    fix (and the Trip query's parked branch can select rows logged while the car
    had no GPS), and a null would otherwise reach the browser as a break in the
    polyline or an ``L.circleMarker`` at the origin.
    """
    points: list[tuple[float, float]] = []
    kept_rows: list[dict[str, Any]] = []
    for row in rows:
        lat, lon = row.get(lat_key), row.get(lon_key)
        if lat is None or lon is None:
            continue
        points.append((float(lat), float(lon)))
        kept_rows.append(row)

    if len(kept_rows) < _MIN_POINTS:
        return kept_rows

    xy = _project(points)

    # The base pass runs unconditionally, even on a track already under budget.
    # Skipping it as an optimisation would mean a 500-sample parked stretch is
    # cleaned when it arrives inside a long route and kept in full when it
    # arrives alone -- the same input reduced differently depending on what else
    # came with it. At this tolerance the pass only removes points no map could
    # render distinguishably anyway.
    keep = _rdp_keep(xy, epsilon_m)
    if sum(keep) <= max_points:
        return [row for row, keep_it in zip(kept_rows, keep, strict=True) if keep_it]

    # Still too many: escalate. How much a given tolerance removes depends
    # entirely on the road -- a twisty mountain descent legitimately needs more
    # points than a freeway of the same length -- so no fixed epsilon can
    # promise a bound and the tolerance has to be searched for.
    #
    # `closest_over` is the best result seen that was still over budget. It is
    # kept because the search can fail usefully -- see the degenerate check.
    low = epsilon_m  # known to leave too many
    high = epsilon_m
    closest_over = keep
    for _ in range(_MAX_PASSES):
        high *= _EPSILON_GROWTH
        keep = _rdp_keep(xy, high)
        if sum(keep) <= max_points:
            break
        low, closest_over = high, keep

    # Geometric growth can overshoot hard: a tolerance wider than the track's
    # own amplitude flattens it completely, so the pass before the successful
    # one may leave hundreds of points and the successful one just two.
    #
    # Refining only pays when that happened. On real routes the escalation lands
    # just under the budget on its first step -- measured over a 3-day window on
    # this database, the base pass leaves 642 against a 600 budget and one step
    # takes it to 599 -- and bisecting from there costs eight more passes over
    # thousands of points to shave off 43 points nobody can see. So the bracket
    # is only narrowed when the result is far enough under budget to mean detail
    # was genuinely lost.
    if sum(keep) < max_points * _REFINE_BELOW:
        for _ in range(_BISECT_PASSES):
            mid = (low + high) / 2
            candidate = _rdp_keep(xy, mid)
            if sum(candidate) <= max_points:
                high, keep = mid, candidate
            else:
                low, closest_over = mid, candidate

    # **The budget is a target, not a guarantee, and deliberately so.** The
    # number of points Douglas-Peucker keeps is not continuous in the tolerance:
    # where a track's detail all sits at one scale, every tolerance below it
    # keeps that detail and every tolerance above erases the track entirely,
    # with nothing in between. Real routes do not behave that way -- measured
    # over a 3-day window here the curve runs 930/642/474/356/258/190 points as
    # the tolerance rises, perfectly smooth -- but a synthetic or pathological
    # one can, and then no tolerance exists that both fits the budget and leaves
    # a route.
    #
    # Given that choice, overshooting the budget is the right failure. A few
    # hundred extra Leaflet layers is a performance nuisance; a map confidently
    # drawing a straight line across Los Angeles is wrong, and wrong in a way
    # nobody would think to question.
    if sum(keep) < max_points * _DEGENERATE_BELOW:
        keep = closest_over

    return [row for row, keep_it in zip(kept_rows, keep, strict=True) if keep_it]
