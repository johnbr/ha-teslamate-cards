"""The energy-consumption event stitch, shared by Charging Stats and Trip.

Upstream carries this ~90-line CTE chain in four dashboards at once, with a
comment on each copy:

    Query shared between Charging Stats, Efficiency, Statistics & Trip
    Dashboards (with minor changes) - ensure to modify in all places when
    necessary

The copies are not identical, so they cannot simply be shared: Charging Stats
filters charging events on ``end_date`` while Trip filters them on
``start_date``. That single word is the whole difference in the stitch itself,
which is exactly the kind of divergence that a hand-maintained copy loses. It is
a parameter here, and the differing tail (each dashboard selects something
different from ``final``) stays with its own dashboard.

**What it computes.** Drive and charge boundaries are unioned into one event
stream ordered by time; consecutive events give a distance delta and a range
delta, and the range deltas priced at the car's efficiency are the energy
actually consumed -- including what was lost while parked, which is why this is
"gross" consumption and not the sum of the drives' own figures.

Two modes are selected by window length: under 48 hours it walks raw
``positions`` for resolution, and anything longer stitches drive and charge
events instead. The cards default to windows well past 48 hours, so the cheap
branch is the normal one.

The CTE named ``positions`` shadows the table of the same name. That is safe in
a non-recursive ``WITH`` -- a CTE's own name is not in scope inside its body, so
``from positions p`` there reads the real table.
"""

from __future__ import annotations


def energy_stitch_ctes(charge_event_date: str) -> str:
    """The stitch as a ``WITH``-body fragment, ending with the ``final`` CTE.

    ``charge_event_date`` is the ``charging_processes`` column the time filter
    applies to: ``end_date`` for Charging Stats, ``start_date`` for Trip.

    The caller supplies the leading ``with`` and its own trailing CTEs and
    ``SELECT``, so it reads as one statement rather than a spliced-together one.
    """
    if charge_event_date not in {"start_date", "end_date"}:
        raise ValueError(f"unexpected charge event date column: {charge_event_date!r}")

    return f"""
drives_start_event as (

    select
        'drive_start' as event, start_date as date, start_${{preferred_range}}_range_km as range, start_km as odometer, car_id, distance is null as is_incomplete
    from drives
    where car_id = $car_id and $__timeFilter(start_date) and 48 <= ((${{__to:date:seconds}} - ${{__from:date:seconds}})::numeric / 3600)

),

drives_end_event as (

    select
        'drive_end' as event, case when end_date is null then start_date + interval '1 second' else end_date end as date, end_${{preferred_range}}_range_km as range, end_km as odometer, car_id, distance is null as is_incomplete
    from drives
    where car_id = $car_id and $__timeFilter(start_date) and 48 <= ((${{__to:date:seconds}} - ${{__from:date:seconds}})::numeric / 3600)

),

charging_processes_start_event as (

    select
        'charging_process_start' as event, start_date as date, start_${{preferred_range}}_range_km as range, p.odometer, cp.car_id, end_date is null as is_incomplete
    from charging_processes cp
        inner join positions p on cp.position_id = p.id
    where cp.car_id = $car_id and $__timeFilter({charge_event_date}) and 48 <= ((${{__to:date:seconds}} - ${{__from:date:seconds}})::numeric / 3600)

),

charging_processes_end_event as (

    select
        'charging_process_end' as event, case when end_date is null then start_date + interval '1 second' else end_date end as date, end_${{preferred_range}}_range_km as range, p.odometer, cp.car_id, end_date is null as is_incomplete
    from charging_processes cp
        inner join positions p on cp.position_id = p.id
    where cp.car_id = $car_id and $__timeFilter({charge_event_date}) and 48 <= ((${{__to:date:seconds}} - ${{__from:date:seconds}})::numeric / 3600)

),

positions as (

    select
        case
            when drive_id is not null and lead(drive_id) over w is not null then 'drive_start'
            else 'something'
        end as event,
        date, ${{preferred_range}}_battery_range_km as range, p.odometer, p.car_id, false as is_incomplete
    from positions p
    where ideal_battery_range_km is not null and car_id = $car_id and 48 > ((${{__to:date:seconds}} - ${{__from:date:seconds}})::numeric / 3600)
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
        car_id,
        case when is_incomplete then 0 else lead(odometer) over w - odometer end as distance,
        case when is_incomplete then 0 else case when event != 'drive_start' then greatest(range - lead(range) over w, 0) else range - lead(range) over w end end as range_loss
    from combined
    window w as (order by date asc)

)"""
