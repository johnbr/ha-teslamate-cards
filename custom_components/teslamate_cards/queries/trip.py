"""Trip dashboard.

Upstream reference: ``reference/grafana/trip.sql``.

This is the **retrospective** trip view -- what a past journey actually cost in
time, energy and money. It does not overlap the live `road-trip.yaml` dashboard,
which is about a journey in progress.

Panels deliberately not ported (see PLAN.md): the geomap, which duplicates the
Google-Map-Card views this house already has, and the state-timeline.

**The one real adaptation.** Upstream groups the two timeseries panels at a flat
``$__timeGroup(date, '5s')``. That is right for Grafana, where the Trip
dashboard is opened on a single journey, but a card with a ``days`` option has
no such guarantee -- over 90 days that grouping yields ~32,000 buckets per
series on this database. Both use ``$__timeGroupAuto`` instead, which sizes the
bucket from the window and bottoms out at upstream's 5 seconds, so a genuinely
trip-sized window reproduces upstream's grouping exactly.

The Drives and Charges tables are **not** re-ported here. Upstream's copies on
this dashboard are the Drives and Charges dashboards' tables minus their
optional filters, so the card reuses the registered ``drives`` and ``charges``
queries with their tunables left at the defaults (``min_dist``/``min_speed``/
``min_duration_min`` of 0, no cost filter), which is the same set of rows.
"""

from __future__ import annotations

from ._energy_stitch import energy_stitch_ctes

# Distance over the window, from the odometer rather than the drives' own
# `distance` column: upstream uses max-min so a gap in logging is still counted
# as travelled, which is the honest figure for "how far did this trip go".
_DISTANCE_CTE = """
mileage AS (
    SELECT convert_km((max(odometer) - min(odometer))::numeric, '$length_unit') AS distance
    FROM positions
    WHERE car_id = $car_id AND ideal_battery_range_km IS NOT NULL
        AND (drive_id in (select id from drives where $__timeFilter(start_date))
             or drive_id is null and $__timeFilter(date))
)"""


# Every scalar panel of the dashboard, in one row.
#
# `time spent` is three figures -- driving, charging on AC, charging on DC --
# which upstream draws as a pie and this renders as a split bar. The charging
# durations are clamped to the window (`LEAST`/`GREATEST`) because a session can
# start before it or end after it, and counting the whole session would report
# more charging than the window contains.
TRIP_SUMMARY_SQL = f"""
WITH {_DISTANCE_CTE},

driving AS (
    SELECT
        sum(end_position.odometer - start_position.odometer) AS distance_km,
        sum(extract(epoch FROM end_position.date - start_position.date)) AS duration_sec
    FROM drives
        JOIN positions start_position ON start_position_id = start_position.id
        JOIN positions end_position ON end_position_id = end_position.id
    WHERE drives.car_id = $car_id
        AND $__timeFilter(start_date)
        AND end_date IS NOT NULL
),

charges_current AS (
    SELECT
        cp.id,
        extract(epoch FROM LEAST(cp.end_date, $__timeTo()) - GREATEST(cp.start_date, $__timeFrom())) AS duration_sec,
        cp.charge_energy_added AS energy_added,
        CASE WHEN NULLIF(mode() within group (order by charges.charger_phases), 0) is null THEN 'DC'
             ELSE 'AC'
        END AS current
    FROM charging_processes cp
    RIGHT JOIN charges ON cp.id = charges.charging_process_id
    WHERE cp.car_id = $car_id
        AND cp.charge_energy_added > 0
        AND ($__timeFilter(cp.start_date) OR $__timeFilter(cp.end_date))
    GROUP BY 1, 2, 3
)

SELECT
    (SELECT distance FROM mileage) AS distance,
    (SELECT duration_sec FROM driving) AS driving_seconds,
    (SELECT coalesce(sum(duration_sec), 0) FROM charges_current WHERE current = 'AC') AS charging_ac_seconds,
    (SELECT coalesce(sum(duration_sec), 0) FROM charges_current WHERE current = 'DC') AS charging_dc_seconds,
    (SELECT coalesce(sum(energy_added), 0) FROM charges_current WHERE current = 'AC') AS energy_added_ac,
    (SELECT coalesce(sum(energy_added), 0) FROM charges_current WHERE current = 'DC') AS energy_added_dc,
    -- Average speed while actually moving.
    (SELECT convert_km(distance_km::numeric, '$length_unit') / nullif(duration_sec / 3600, 0)
        FROM driving) AS avg_speed_driving,
    -- Average speed including DC charging stops, which is the number that
    -- matters when planning a long drive.
    (SELECT convert_km(d.distance_km::numeric, '$length_unit')
            / nullif((d.duration_sec + coalesce(
                (SELECT sum(duration_sec) FROM charges_current WHERE current = 'DC'), 0)) / 3600, 0)
        FROM driving d) AS avg_speed_with_charging,
    -- Consumption from the drives' own range deltas.
    (SELECT sum((start_${{preferred_range}}_range_km - end_${{preferred_range}}_range_km) * car.efficiency * 1000)
            / nullif(convert_km(sum(distance)::numeric, '$length_unit'), 0)
        FROM drives JOIN cars car ON car.id = car_id
        WHERE $__timeFilter(start_date) AND car_id = $car_id) AS consumption,
    (SELECT sum(cost) FROM charging_processes
        WHERE $__timeFilter(end_date) AND car_id = $car_id) AS total_cost,
    (SELECT count(*) FROM charging_processes
        WHERE $__timeFilter(end_date) AND car_id = $car_id AND cost > 0) AS paid_count
"""


# Gross energy consumed over the window, including standby losses -- see
# _energy_stitch. Trip filters charging events on start_date where Charging
# Stats uses end_date, which is the only difference in the stitch itself.
#
# **Cost per distance is computed here, not the way Trip's own panel does it.**
# Upstream's Trip panel selects `cost_per_kwh / distance * 100`, which is not a
# cost per distance at all -- it is missing the energy term, and its own comment
# says why: "Hack required for Join Transformation". The figure only becomes
# real once Grafana joins that panel against the energy panel and multiplies the
# two. There is no join here, so taking it verbatim yields a number ~500x too
# small that still looks plausible (it rendered as 0.00 on a real trip).
#
# The Charging Stats dashboard writes the same quantity self-containedly, as
# `consumption / distance * 100 * cost_per_kwh`, and since this query already
# has both consumption and distance, that is the form used.
TRIP_ENERGY_SQL = f"""
with {energy_stitch_ctes("start_date")},

derived as (

    select
        sum(range_loss) * c.efficiency as energy_consumed,
        convert_km(sum(distance)::numeric, '$length_unit') as distance
    from final
        inner join cars c on car_id = c.id
    group by c.efficiency

),

charges as (

    SELECT sum(cost) / nullif(sum(charge_energy_added), 0) as cost_per_kwh
    FROM charging_processes cp
    where cp.car_id = $car_id and $__timeFilter(start_date)

)

select
    energy_consumed,
    distance,
    (energy_consumed * 1000) / nullif(distance, 0) as consumption,
    cost_per_kwh,
    energy_consumed / nullif(distance, 0) * 100 * cost_per_kwh as cost_per_distance
from derived cross join charges
"""


# Battery level and range over time. Upstream unions `positions` with `charges`
# so the trace does not flat-line while parked and plugged in -- the car logs
# charge samples, not positions, during a charging session.
#
# The +/- 1 day padding is upstream's: it keeps the line running to both edges
# of the chart rather than stopping at the first and last sample inside it.
TRIP_BATTERY_SQL = """
(
  SELECT $__timeGroupAuto(date) AS time,
         avg(battery_level) as battery_level,
         convert_km(avg(${preferred_range}_battery_range_km), '$length_unit') as range
  FROM positions
  WHERE date BETWEEN ($__timeFrom()::timestamp - interval '1 day') AND ($__timeTo()::timestamp + interval '1 day')
    AND car_id = $car_id
  GROUP BY 1
) UNION ALL (
  SELECT $__timeGroupAuto(date) AS time,
         avg(battery_level) as battery_level,
         convert_km(avg(${preferred_range}_battery_range_km), '$length_unit') as range
  FROM charges c
  LEFT JOIN charging_processes p ON c.charging_process_id = p.id
  WHERE date BETWEEN ($__timeFrom()::timestamp - interval '1 day') AND ($__timeTo()::timestamp + interval '1 day')
    AND p.car_id = $car_id
  GROUP BY 1
)
ORDER BY 1
"""


TRIP_ELEVATION_SQL = """
SELECT
    $__timeGroupAuto(date) AS time,
    ROUND(convert_m(avg(elevation), '$alternative_length_unit')) AS elevation
FROM
    positions
WHERE
 car_id = $car_id AND
 date BETWEEN ($__timeFrom()::timestamp - interval '1 day') AND ($__timeTo()::timestamp + interval '1 day')
GROUP BY
 1
ORDER BY
 1 ASC
"""
