"""Route simplification.

The property that matters is not "returns few points" -- dropping every other
point does that too, and would round off the corners the map exists to show.
It is that the points *removed* are the ones a straight line already accounts
for, so these check the shape survives, not just the count.
"""

from __future__ import annotations

import math
from itertools import pairwise

import pytest
from teslamate_cards.simplify import DEFAULT_MAX_POINTS, simplify_route

# Roughly the house, so the longitude scaling is exercised at a real latitude
# rather than at the equator where cos(lat) is 1 and a bug would cancel out.
LAT0, LON0 = 33.93, -117.55

# Metres per degree at LAT0, for writing fixtures in metres.
_DEG_LAT = 1.0 / 110_574.0
_DEG_LON = 1.0 / (111_320.0 * math.cos(math.radians(LAT0)))


def at(north_m: float, east_m: float, ts: str = "2026-08-07T10:00:00") -> dict:
    """A row `north_m`/`east_m` metres from the origin."""
    return {"time": ts, "latitude": LAT0 + north_m * _DEG_LAT, "longitude": LON0 + east_m * _DEG_LON}


def max_deviation_m(original: list[dict], simplified: list[dict]) -> float:
    """Furthest any original point sits from the simplified polyline, in metres.

    This is the property that actually matters and the one a point count cannot
    express: "returned 40 points" says nothing about whether they are the right
    40. Dropping every other point hits any budget and rounds off every corner.
    """
    to_m = [(r["longitude"] / _DEG_LON, r["latitude"] / _DEG_LAT) for r in original]
    line = [(r["longitude"] / _DEG_LON, r["latitude"] / _DEG_LAT) for r in simplified]

    worst = 0.0
    for px, py in to_m:
        best = float("inf")
        for (ax, ay), (bx, by) in pairwise(line):
            dx, dy = bx - ax, by - ay
            length_sq = dx * dx + dy * dy
            t = 0.0 if length_sq == 0 else max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / length_sq))
            best = min(best, (px - (ax + t * dx)) ** 2 + (py - (ay + t * dy)) ** 2)
        worst = max(worst, math.sqrt(best))
    return worst


def test_straight_line_collapses_to_its_endpoints() -> None:
    """1,000 samples down a straight road carry no shape beyond two points."""
    rows = [at(0, e) for e in range(0, 10_000, 10)]
    out = simplify_route(rows, max_points=DEFAULT_MAX_POINTS)
    assert len(out) == 2
    assert out[0] is rows[0]
    assert out[-1] is rows[-1]


def test_parked_samples_collapse() -> None:
    """A parked car logs the same spot for hours; that is one point, not 500.

    This is the case time bucketing gets exactly backwards -- it spends the
    budget here, where nothing happens. Note the input is already *under* the
    default budget: the base pass must run anyway, or the same parked stretch
    would be cleaned inside a long route and kept in full on its own.
    """
    rows = [at(0.4 * math.sin(i), 0.4 * math.cos(i)) for i in range(500)]
    out = simplify_route(rows)
    assert len(out) <= 3


def test_a_corner_is_never_dropped() -> None:
    """The vertex of a right-angle turn is the one point that must survive."""
    rows = [at(0, e) for e in range(0, 1000, 10)] + [at(n, 990) for n in range(10, 1000, 10)]
    corner = rows[99]
    out = simplify_route(rows)
    assert corner in out


def test_winding_road_keeps_its_shape() -> None:
    """A canyon road really does need its points, and the shape must survive.

    Asserted as a deviation, not a count: 5,000 samples of a ~60 m-amplitude
    curve genuinely only need a few dozen points to be drawn within a few
    metres, so a count-based floor would just encode whatever the algorithm
    happens to return today.
    """
    rows = [at(60 * math.sin(i / 120.0), i * 2.0) for i in range(5000)]
    out = simplify_route(rows, max_points=300)
    assert len(out) <= 300
    assert max_deviation_m(rows, out) <= 10.0


def test_budget_gives_way_rather_than_flatten_a_route() -> None:
    """Where no tolerance both fits the budget and keeps the route, keep the route.

    Douglas-Peucker's point count is not continuous in the tolerance. This
    sawtooth has all its detail at one scale, so every tolerance below the
    amplitude keeps ~440 points and every tolerance above collapses it to the
    two endpoints -- there is no tolerance that yields 300.

    Overshooting the budget is the right failure there: a few hundred extra
    Leaflet layers is a performance nuisance, whereas a straight line drawn
    confidently across the map is wrong in a way nobody would question.
    """
    rows = [at(200 * math.sin(i / 3.0), i * 2.0) for i in range(5000)]
    out = simplify_route(rows, max_points=300)

    assert len(out) > 300, "budget was met by destroying the route"
    # Still a zigzag rather than a line: the output must span the same
    # north-south extent as the input, which two endpoints could not.
    span = max(r["latitude"] for r in out) - min(r["latitude"] for r in out)
    original_span = max(r["latitude"] for r in rows) - min(r["latitude"] for r in rows)
    assert span > original_span * 0.9


def test_output_is_a_subsequence_of_the_input() -> None:
    """Points are kept or dropped, never moved, averaged or invented.

    A simplifier that emitted interpolated coordinates would still draw a
    plausible line, but every surviving point carries a real timestamp into the
    map's hover tooltip -- so they have to be points the car actually reported.
    """
    rows = [at(120 * math.sin(i / 30.0), i * 4.0) for i in range(900)]
    out = simplify_route(rows, max_points=100)

    remaining = iter(rows)
    assert all(any(row is candidate for candidate in remaining) for row in out), "not a subsequence"
    assert out[0] is rows[0]
    assert out[-1] is rows[-1]


def test_null_coordinates_are_dropped() -> None:
    """TeslaMate logs positions with no fix; a null must never reach the map.

    Left in, it becomes either a gap in the polyline or a marker at 0,0 -- a
    line from California into the Atlantic.
    """
    rows = [at(0, 0), {"time": "x", "latitude": None, "longitude": None}, at(0, 5000)]
    out = simplify_route(rows)
    assert len(out) == 2
    assert all(r["latitude"] is not None for r in out)


def test_whole_rows_survive_so_tooltips_keep_their_timestamps() -> None:
    rows = [at(0, e, ts=f"2026-08-07T10:{e // 60:02d}:00") for e in range(0, 6000, 10)]
    out = simplify_route(rows)
    assert all("time" in row for row in out)


def test_empty_and_tiny_inputs() -> None:
    assert simplify_route([]) == []
    single = [at(0, 0)]
    assert simplify_route(single) == single


def test_longitude_is_scaled_by_latitude() -> None:
    """A degree of longitude is ~0.83 of a degree of latitude at LAT0.

    Working in raw degrees would measure the same physical deviation as smaller
    when it runs east-west, so an east-west jog would be dropped where an
    identical north-south one is kept. Same track, rotated: same verdict.
    """
    east_west = [at(0, 0), at(0, 500), at(40, 1000), at(0, 1500), at(0, 2000)]
    north_south = [at(0, 0), at(500, 0), at(1000, 40), at(1500, 0), at(2000, 0)]
    assert len(simplify_route(east_west, max_points=4)) == len(simplify_route(north_south, max_points=4))


@pytest.mark.parametrize("count", [601, 1000, 2645])
def test_default_budget_holds_at_realistic_sizes(count: int) -> None:
    """2,645 is the measured size of a 3-day Trip window on this database."""
    rows = [at(300 * math.sin(i / 40.0), i * 3.0) for i in range(count)]
    assert len(simplify_route(rows)) <= DEFAULT_MAX_POINTS
