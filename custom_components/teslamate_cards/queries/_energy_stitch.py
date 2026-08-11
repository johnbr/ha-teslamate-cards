"""The energy-consumption event stitch, shared by Charging Stats, Trip and Statistics.

Upstream carries this ~90-line CTE chain in four dashboards at once, with a
comment on each copy:

    Query shared between Charging Stats, Efficiency, Statistics & Trip
    Dashboards (with minor changes) - ensure to modify in all places when
    necessary

The copies are not identical, so they cannot simply be shared. Three axes differ,
and each is a parameter here rather than a fork of the fragment -- divergence
between hand-maintained copies is exactly what upstream's comment is warning
about:

1. **Which charge column the time filter applies to.** Charging Stats uses
   ``end_date``; Trip and Statistics use ``start_date``.

2. **How high-precision mode is selected** (``precision``). Charging Stats and
   Trip decide from the window length -- under 48 hours they walk raw
   ``positions`` for resolution, anything longer stitches drive and charge
   events. Statistics instead exposes a ``$high_precision`` toggle and lets the
   user choose. Same two branches either way; only the condition differs.

3. **Whether ``final`` is bucketed** (``bucket_by_period``). Statistics rolls up
   per period, so it needs the bucket and a running "any incomplete row so far"
   flag inside the window; the other two consume ``final`` whole.

The differing tail -- each dashboard selects something different from ``final``
-- stays with its own dashboard.

**What it computes.** Drive and charge boundaries are unioned into one event
stream ordered by time; consecutive events give a distance delta and a range
delta, and the range deltas priced at the car's efficiency are the energy
actually consumed -- including what was lost while parked, which is why this is
"gross" consumption and not the sum of the drives' own figures.

There are always two branches -- raw ``positions`` for resolution, or stitched
drive and charge events -- and only ``precision`` decides which one runs. The
cards default to windows well past 48 hours and to the toggle being off, so the
cheap branch is the normal one either way. That matters more for Statistics than
for the others: its natural window is years, and walking ``positions`` across
years is what ``STATEMENT_TIMEOUT_MS`` exists to stop.

The CTE named ``positions`` shadows the table of the same name. That is safe in
a non-recursive ``WITH`` -- a CTE's own name is not in scope inside its body, so
``from positions p`` there reads the real table.
"""

from __future__ import annotations

#: ``(event_branch_gate, positions_branch_gate)`` per selection mode. The two
#: must always be complements: every row has to come from exactly one branch, or
#: the ``union all`` in ``combined`` double-counts the whole window.
_HOURS_IN_WINDOW = "((${__to:date:seconds} - ${__from:date:seconds})::numeric / 3600)"
PRECISION_GATES: dict[str, tuple[str, str]] = {
    # Charging Stats and Trip: decided by window length.
    "window": (f"48 <= {_HOURS_IN_WINDOW}", f"48 > {_HOURS_IN_WINDOW}"),
    # Statistics: decided by the user, via the dashboard's own toggle.
    "toggle": ("0 = $high_precision", "1 = $high_precision"),
}


def energy_stitch_ctes(
    charge_event_date: str,
    precision: str = "window",
    bucket_by_period: bool = False,
) -> str:
    """The stitch as a ``WITH``-body fragment, ending with the ``final`` CTE.

    ``charge_event_date`` is the ``charging_processes`` column the time filter
    applies to: ``end_date`` for Charging Stats, ``start_date`` for Trip and
    Statistics.

    ``precision`` picks how the raw-``positions`` branch is selected -- see
    :data:`PRECISION_GATES`.

    ``bucket_by_period`` adds Statistics' period bucket and its running
    incompleteness flag to ``final``.

    The caller supplies the leading ``with`` and its own trailing CTEs and
    ``SELECT``, so it reads as one statement rather than a spliced-together one.
    """
    if charge_event_date not in {"start_date", "end_date"}:
        raise ValueError(f"unexpected charge event date column: {charge_event_date!r}")
    if precision not in PRECISION_GATES:
        raise ValueError(f"unknown precision mode: {precision!r}")

    event_gate, positions_gate = PRECISION_GATES[precision]

    # Statistics buckets inside `final` rather than in its tail, because the
    # incompleteness flag is a running total over the same window and cannot be
    # recovered once the rows are grouped.
    period_column = "\n        date_trunc('$period', timezone('UTC', date), '$__timezone') as date," if bucket_by_period else ""
    incomplete_column = (
        ",\n        sum(case when is_incomplete then 1 else 0 end) over w > 0 as is_incomplete"
        if bucket_by_period
        else ""
    )

    return f"""
drives_start_event as (

    select
        'drive_start' as event, start_date as date, start_${{preferred_range}}_range_km as range, start_km as odometer, car_id, distance is null as is_incomplete
    from drives
    where car_id = $car_id and $__timeFilter(start_date) and {event_gate}

),

drives_end_event as (

    select
        'drive_end' as event, case when end_date is null then start_date + interval '1 second' else end_date end as date, end_${{preferred_range}}_range_km as range, end_km as odometer, car_id, distance is null as is_incomplete
    from drives
    where car_id = $car_id and $__timeFilter(start_date) and {event_gate}

),

charging_processes_start_event as (

    select
        'charging_process_start' as event, start_date as date, start_${{preferred_range}}_range_km as range, p.odometer, cp.car_id, end_date is null as is_incomplete
    from charging_processes cp
        inner join positions p on cp.position_id = p.id
    where cp.car_id = $car_id and $__timeFilter({charge_event_date}) and {event_gate}

),

charging_processes_end_event as (

    select
        'charging_process_end' as event, case when end_date is null then start_date + interval '1 second' else end_date end as date, end_${{preferred_range}}_range_km as range, p.odometer, cp.car_id, end_date is null as is_incomplete
    from charging_processes cp
        inner join positions p on cp.position_id = p.id
    where cp.car_id = $car_id and $__timeFilter({charge_event_date}) and {event_gate}

),

positions as (

    select
        case
            when drive_id is not null and lead(drive_id) over w is not null then 'drive_start'
            else 'something'
        end as event,
        date, ${{preferred_range}}_battery_range_km as range, p.odometer, p.car_id, false as is_incomplete
    from positions p
    where ideal_battery_range_km is not null and car_id = $car_id and {positions_gate}
    and (drive_id in (select id from drives where $__timeFilter(start_date)) or drive_id is null and $__timeFilter(date))
    window w as (order by date)

),

combined as (

    select * from drives_start_event
    union all
    select * from drives_end_event
    union all
    select * from charging_processes_start_event
    union all
    select * from charging_processes_end_event
    union all
    select * from positions

),

final as (

    select
        car_id,{period_column}
        case when is_incomplete then 0 else lead(odometer) over w - odometer end as distance,
        case when is_incomplete then 0 else case when event != 'drive_start' then greatest(range - lead(range) over w, 0) else range - lead(range) over w end end as range_loss{incomplete_column}
    from combined
    window w as (order by date asc)

)"""
