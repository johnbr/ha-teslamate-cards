-- TeslaMate Grafana dashboard: trip
--
-- Extracted verbatim from /dashboards/trip.json inside the teslamate grafana
-- image. This file is REFERENCE ONLY -- it is not executed. It is the
-- specification the ported queries in custom_components/teslamate_cards/queries/
-- are validated against, panel by panel.
--
-- Source: https://github.com/teslamate-org/teslamate (MIT). See reference/README.md.
--
-- Dashboard template variables: car_id, temp_unit, length_unit, alternative_length_unit, preferred_range, base_url, from
-- Grafana macros used: $__timeFilter, $__timeFrom, $__timeGroup, $__timeTo, $alternative_length_unit, $car_id, $length_unit, ${__from:date:seconds}, ${__to:date:seconds}, ${alternative_length_unit}, ${length_unit}, ${preferred_range}
-- Panels with SQL: 15

------------------------------------------------------------------------------
-- PANEL: (untitled)  [geomap]
------------------------------------------------------------------------------
with unioned_positions as (

    -- fetch all positions based on start_date of drives so the map aligns with data shown in other panels
    select p.*
    from positions p
             inner join drives d on p.drive_id = d.id
    where p.car_id = $car_id and $__timeFilter(d.start_date)

    union all

    -- get all positions logged while not driving
    select *
    from positions p
    where p.car_id = $car_id and drive_id is null and $__timeFilter(date))

SELECT $__timeGroup(date, '5s')                AS time,
       avg(latitude)                           AS latitude,
       avg(longitude)                          AS longitude
from unioned_positions
GROUP BY 1
ORDER BY 1 ASC

------------------------------------------------------------------------------
-- PANEL: (untitled)  [stat]
------------------------------------------------------------------------------
SELECT convert_km((max(odometer) - min(odometer))::numeric, '$length_unit') as "distance_$length_unit"
FROM positions
WHERE car_id = $car_id AND ideal_battery_range_km IS NOT NULL
and (drive_id in (select id from drives where $__timeFilter(start_date)) or drive_id is null and $__timeFilter(date))
ORDER BY 1

------------------------------------------------------------------------------
-- PANEL: Time spent  [piechart] (target 1/2)
------------------------------------------------------------------------------
SELECT
	now() AS time,
	sum(extract(epoch FROM end_position.date - start_position.date)) as duration_sec,
	'driving' as metric
FROM
	drives
	JOIN positions start_position ON start_position_id = start_position.id
	JOIN positions end_position ON end_position_id = end_position.id
WHERE
	drives.car_id = $car_id
	AND $__timeFilter(start_date)
	AND end_date IS NOT NULL;

------------------------------------------------------------------------------
-- PANEL: Time spent  [piechart] (target 2/2)
------------------------------------------------------------------------------
WITH charges_current AS (
  SELECT
		cp.id,
  	extract(epoch FROM LEAST(end_date, $__timeTo()) - GREATEST(start_date, $__timeFrom())) as duration_sec,
		CASE WHEN NULLIF(mode() within group (order by charger_phases),0) is null THEN 'charging (DC)'
				 ELSE 'charging (AC)'
		END AS current
	FROM charging_processes cp
  RIGHT JOIN charges ON cp.id = charges.charging_process_id
  WHERE
	  cp.car_id = $car_id
	  AND cp.charge_energy_added > 0
  	AND ($__timeFilter(start_date) OR $__timeFilter(end_date))
  GROUP BY 1,2
),

charges_total AS (
  SELECT
  	sum(duration_sec) AS duration_sec,
  	current AS metric
  FROM charges_current
  GROUP BY 2
  ORDER BY metric
)

SELECT
	now() AS time,
	coalesce(duration_sec, 0) as duration_sec,
  metric
FROM
	charges_total;

------------------------------------------------------------------------------
-- PANEL: (untitled)  [stat]
------------------------------------------------------------------------------
SELECT
  convert_km(sum(end_position.odometer - start_position.odometer)::numeric, '$length_unit') / (sum(extract(epoch FROM end_position.date - start_position.date)) / 3600) as "speed_$length_unit"
FROM
	drives
	JOIN positions start_position ON start_position_id = start_position.id
	JOIN positions end_position ON end_position_id = end_position.id
WHERE
	drives.car_id = $car_id
	AND $__timeFilter(start_date)
	AND end_date IS NOT NULL;

------------------------------------------------------------------------------
-- PANEL: (untitled)  [stat]
------------------------------------------------------------------------------
WITH dc_charges AS (
  SELECT
		cp.id,
    extract(epoch FROM cp.end_date - cp.start_date) as duration_sec,
		CASE WHEN NULLIF(mode() within group (order by charger_phases),0) is null THEN 'DC'
				 ELSE 'AC'
		END AS current
	FROM charging_processes cp
  RIGHT JOIN charges ON cp.id = charges.charging_process_id
  WHERE
	  cp.car_id = $car_id
	  AND cp.charge_energy_added > 0
    AND ($__timeFilter(start_date) OR $__timeFilter(end_date))
  GROUP BY 1,2
),

data AS (
  (
  SELECT
    sum(end_position.odometer - start_position.odometer) as distance, 
    sum(extract(epoch FROM end_position.date - start_position.date)) as duration_sec
  FROM
    drives
    JOIN positions start_position ON start_position_id = start_position.id
    JOIN positions end_position ON end_position_id = end_position.id
  WHERE
    drives.car_id = $car_id
    AND $__timeFilter(start_date)
  ) UNION ALL (
  SELECT
    NULL as distance,
    sum(duration_sec)
  FROM
    dc_charges
  WHERE
   current = 'DC'
  )
)

SELECT convert_km(sum(distance)::numeric, '$length_unit') / (sum(duration_sec) / 3600) as "speed_$length_unit"
from data

------------------------------------------------------------------------------
-- PANEL: (untitled)  [stat]
------------------------------------------------------------------------------
SELECT
  sum((start_${preferred_range}_range_km - end_${preferred_range}_range_km) * car.efficiency * 1000) / 
  convert_km(sum(distance)::numeric, '$length_unit') as "consumption_$length_unit"
FROM drives
JOIN cars car ON car.id = car_id
WHERE $__timeFilter(start_date) AND car_id = $car_id

------------------------------------------------------------------------------
-- PANEL: (untitled)  [stat]
------------------------------------------------------------------------------
-- Query shared between Charging Stats, Efficiency, Statistics & Trip Dashboards (with minor changes) - ensure to modify in all places when necessary

with drives_start_event as (

    select
        'drive_start' as event, start_date as date, start_${preferred_range}_range_km as range, start_km as odometer, car_id, distance is null as is_incomplete
    from drives
    where car_id = $car_id and $__timeFilter(start_date) and 48 <= ((${__to:date:seconds} - ${__from:date:seconds})::numeric / 3600)

),

drives_end_event as (

    select
        'drive_end' as event, case when end_date is null then start_date + interval '1 second' else end_date end as date, end_${preferred_range}_range_km as range, end_km as odometer, car_id, distance is null as is_incomplete
    from drives
    where car_id = $car_id and $__timeFilter(start_date) and 48 <= ((${__to:date:seconds} - ${__from:date:seconds})::numeric / 3600)

),

charging_processes_start_event as (

    select
        'charging_process_start' as event, start_date as date, start_${preferred_range}_range_km as range, p.odometer, cp.car_id, end_date is null as is_incomplete
    from charging_processes cp
        inner join positions p on cp.position_id = p.id
    where cp.car_id = $car_id and $__timeFilter(start_date) and 48 <= ((${__to:date:seconds} - ${__from:date:seconds})::numeric / 3600)

),

charging_processes_end_event as (

    select
        'charging_process_end' as event, case when end_date is null then start_date + interval '1 second' else end_date end as date, end_${preferred_range}_range_km as range, p.odometer, cp.car_id, end_date is null as is_incomplete
    from charging_processes cp
        inner join positions p on cp.position_id = p.id
    where cp.car_id = $car_id and $__timeFilter(start_date) and 48 <= ((${__to:date:seconds} - ${__from:date:seconds})::numeric / 3600)

),

positions as (

    select
        case
            when drive_id is not null and lead(drive_id) over w is not null then 'drive_start'
            else 'something'
        end as event,
        date, ${preferred_range}_battery_range_km as range, p.odometer, p.car_id, false as is_incomplete
    from positions p
    where ideal_battery_range_km is not null and car_id = $car_id and 48 > ((${__to:date:seconds} - ${__from:date:seconds})::numeric / 3600)
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

)

select
    'Total Energy consumed (gross)' as metric,
    sum(range_loss) * c.efficiency as value,
    (sum(range_loss) * c.efficiency * 1000) / nullif(convert_km(sum(distance)::numeric, '$length_unit'), 0) as consumption_$length_unit
from final
    inner join cars c on car_id = c.id
group by c.efficiency

------------------------------------------------------------------------------
-- PANEL: (untitled)  [stat]
------------------------------------------------------------------------------
select sum(cost) as "Total Charging Cost" from charging_processes where $__timeFilter(end_date) AND car_id = $car_id;

------------------------------------------------------------------------------
-- PANEL: (untitled)  [stat]
------------------------------------------------------------------------------
WITH charges as (
  SELECT
    sum(cost) / nullif(sum(charge_energy_added), 0) as cost_per_kwh
  FROM charging_processes
  where car_id = $car_id and $__timeFilter(start_date)
),

mileage as (
  SELECT convert_km((max(odometer) - min(odometer))::numeric, '$length_unit') as distance
  FROM positions
  WHERE car_id = $car_id and ideal_battery_range_km IS NOT NULL
  and (drive_id in (select id from drives where $__timeFilter(start_date)) or drive_id is null and $__timeFilter(date))
)

select
  'Total Energy consumed (gross)' as metric, -- Hack required for Join Transformation
  cost_per_kwh / nullif(distance, 0) * 100 as cost_mileage
from mileage cross join charges

------------------------------------------------------------------------------
-- PANEL: (untitled)  [bargauge]
------------------------------------------------------------------------------
WITH charges_current AS (
  SELECT
		cp.id,
		cp.charge_energy_added as energy_added,
		CASE WHEN NULLIF(mode() within group (order by charger_phases),0) is null THEN 'Total Energy added (DC)'
				 ELSE 'Total Energy added (AC)'
		END AS metric
	FROM charging_processes cp
  RIGHT JOIN charges ON cp.id = charges.charging_process_id
  WHERE
	  cp.car_id = $car_id
	  AND cp.charge_energy_added > 0
  	AND ($__timeFilter(start_date) OR $__timeFilter(end_date))
  GROUP BY 1,2
)

SELECT metric, sum(energy_added) AS energy_added
FROM charges_current
GROUP BY 1
ORDER BY 1 DESC;

------------------------------------------------------------------------------
-- PANEL: (untitled)  [state-timeline]
------------------------------------------------------------------------------
WITH states AS (
  SELECT
    unnest(ARRAY [start_date + interval '1 second', end_date]) AS date,
    unnest(ARRAY [2, 0]) AS state
  FROM charging_processes
  WHERE
    car_id = $car_id AND 
    ($__timeFrom() :: timestamp - interval '30 day') < start_date AND 
    (end_date < ($__timeTo() :: timestamp + interval '30 day') OR end_date IS NULL)
  UNION
  SELECT
    unnest(ARRAY [start_date + interval '1 second', end_date]) AS date,
    unnest(ARRAY [1, 0]) AS state
  FROM drives
  WHERE
    car_id = $car_id AND 
    ($__timeFrom() :: timestamp - interval '30 day') < start_date AND 
    (end_date < ($__timeTo() :: timestamp + interval '30 day') OR end_date IS NULL)
  UNION
  SELECT
    start_date AS date,
    CASE
      WHEN state = 'offline' THEN 3
      WHEN state = 'asleep' THEN 4
      WHEN state = 'online' THEN 5
    END AS state
  FROM states
  WHERE
    car_id = $car_id AND 
    ($__timeFrom() :: timestamp - interval '30 day') < start_date AND 
    (end_date < ($__timeTo() :: timestamp + interval '30 day') OR end_date IS NULL)
  UNION
  SELECT
    unnest(ARRAY [start_date + interval '1 second', end_date]) AS date,
    unnest(ARRAY [6, 0]) AS state
  FROM updates
  WHERE
    car_id = $car_id AND 
    ($__timeFrom() :: timestamp - interval '30 day') < start_date AND 
    (end_date < ($__timeTo() :: timestamp + interval '30 day') OR end_date IS NULL)
)
SELECT date AS "time", state
FROM states
WHERE 
  date IS NOT NULL AND
  ($__timeFrom() :: timestamp - interval '30 day') < date AND 
  date < ($__timeTo() :: timestamp + interval '30 day') 
ORDER BY date ASC, state ASC;

------------------------------------------------------------------------------
-- PANEL: Drives  [table]
------------------------------------------------------------------------------
WITH data AS (
  SELECT
    floor(extract(epoch FROM start_date)) * 1000 AS start_date_ts,
    ceil(extract(epoch FROM end_date)) * 1000 AS end_date_ts,
    car.id as car_id,
    CASE WHEN start_geofence.id IS NULL THEN CONCAT('new?lat=', start_position.latitude, '&lng=', start_position.longitude)
         WHEN start_geofence.id IS NOT NULL THEN CONCAT(start_geofence.id, '/edit')
    END as start_path,
    CASE WHEN end_geofence.id IS NULL THEN CONCAT('new?lat=', end_position.latitude, '&lng=', end_position.longitude)
         WHEN end_geofence.id IS NOT NULL THEN CONCAT(end_geofence.id, '/edit')
    END as end_path,
    TO_CHAR((duration_min * INTERVAL '1 minute'), 'HH24:MI') as duration_str,
    drives.id as drive_id,
    -- Columns
    start_date,
    COALESCE(start_geofence.name, CONCAT_WS(', ', COALESCE(start_address.name, nullif(CONCAT_WS(' ', start_address.road, start_address.house_number), '')), start_address.city)) AS start_address,
    COALESCE(end_geofence.name, CONCAT_WS(', ', COALESCE(end_address.name, nullif(CONCAT_WS(' ', end_address.road, end_address.house_number), '')), end_address.city)) AS end_address,
    duration_min,
    distance,
    start_position.usable_battery_level as start_usable_battery_level,
    start_position.battery_level as start_battery_level,
    end_position.usable_battery_level as end_usable_battery_level,
    end_position.battery_level as end_battery_level,
    start_position.battery_level != start_position.usable_battery_level OR end_position.battery_level != end_position.usable_battery_level  as reduced_range,
    duration_min > 1 AND distance > 1 AND ( 
      start_position.usable_battery_level IS NULL OR end_position.usable_battery_level IS NULL	OR
      (end_position.battery_level - end_position.usable_battery_level) = 0 
    ) as is_sufficiently_precise,
    start_${preferred_range}_range_km - end_${preferred_range}_range_km as range_diff,
    car.efficiency as car_efficiency,
    outside_temp_avg,
    distance / NULLIF(duration_min, 0) * 60 AS avg_speed
  FROM drives
  LEFT JOIN addresses start_address ON start_address_id = start_address.id
  LEFT JOIN addresses end_address ON end_address_id = end_address.id
  LEFT JOIN positions start_position ON start_position_id = start_position.id
  LEFT JOIN positions end_position ON end_position_id = end_position.id
  LEFT JOIN geofences start_geofence ON start_geofence_id = start_geofence.id
  LEFT JOIN geofences end_geofence ON end_geofence_id = end_geofence.id
  LEFT JOIN cars car ON car.id = drives.car_id
  WHERE $__timeFilter(start_date) AND drives.car_id = $car_id
  ORDER BY start_date DESC
)
SELECT
    start_date_ts,
    end_date_ts,
    car_id,
    start_path,
    end_path,
    duration_str,
    drive_id,
    -- Columns
    start_date,
    start_address,
    end_address,
    duration_min,
    convert_km(distance::numeric, '$length_unit') AS distance_$length_unit,
    start_battery_level as "% Start",
    end_battery_level as "% End",
    CASE WHEN is_sufficiently_precise THEN range_diff * car_efficiency / convert_km(distance::numeric, '$length_unit') * 1000
    END AS consumption_kWh_$length_unit
FROM data;

------------------------------------------------------------------------------
-- PANEL: Charges  [table]
------------------------------------------------------------------------------
WITH data AS (
    SELECT
        floor(extract(epoch FROM start_date)) * 1000 AS start_date_ts,
        ceil(extract(epoch FROM end_date)) * 1000 AS end_date_ts,
        start_date,
        end_date,
        CONCAT_WS(', ', COALESCE(addresses.name, CONCAT_WS(' ', addresses.road, addresses.house_number)), addresses.city) AS address,
        g.name as geofence_name,
        g.id as geofence_id,
        p.latitude,
        p.longitude,
        charge_energy_added,
        charge_energy_used,
        duration_min,
        start_battery_level,
        end_battery_level,
        end_${preferred_range}_range_km - start_${preferred_range}_range_km as range_added,
        outside_temp_avg,
        c.id,
        p.odometer - lag(p.odometer) OVER (ORDER BY start_date) AS distance,
        cars.efficiency,
        c.car_id,
        cost
    FROM
        charging_processes c
    LEFT JOIN positions p ON p.id = c.position_id
    LEFT JOIN cars ON cars.id = c.car_id
    LEFT JOIN addresses ON addresses.id = c.address_id
    LEFT JOIN geofences g ON g.id = geofence_id
WHERE 
    (charge_energy_added IS NULL OR charge_energy_added > 0) AND
    c.car_id = $car_id AND
    $__timeFilter(start_date)
ORDER BY
    start_date
)
SELECT
    start_date_ts,
    end_date_ts,
    CASE WHEN geofence_id IS NULL THEN CONCAT('new?lat=', latitude, '&lng=', longitude)
         WHEN geofence_id IS NOT NULL THEN CONCAT(geofence_id, '/edit')
    END as path,
    car_id,
    id,
    -- Columns
    start_date,
    COALESCE(geofence_name, address) as address,    
    duration_min,
    cost,
    charge_energy_added,
    charge_energy_used,
    charge_energy_added * 60 / NULLIF (duration_min, 0) AS charge_energy_added_per_hour,
    convert_km(range_added, '$length_unit') AS range_added_$length_unit,
    start_battery_level,
    end_battery_level
FROM
    data
WHERE
    (distance >= 0 OR distance IS NULL)
ORDER BY
  start_date DESC;

------------------------------------------------------------------------------
-- PANEL: Battery Level & Range  [timeseries]
------------------------------------------------------------------------------
(
  SELECT $__timeGroup(date, '5s'), avg(battery_level) as battery_level, convert_km(avg(${preferred_range}_battery_range_km), '$length_unit') as range_${preferred_range}_${length_unit}
  FROM positions
  WHERE date BETWEEN ($__timeFrom()::timestamp - interval '1 day') AND ($__timeTo()::timestamp + interval '1 day') AND car_id = $car_id
  GROUP BY 1
) UNION ALL (
  SELECT $__timeGroup(date, '5s'), avg(battery_level) as battery_level, convert_km(avg(${preferred_range}_battery_range_km), '$length_unit') as range_${preferred_range}_${length_unit}
  FROM charges c
  LEFT JOIN charging_processes p ON c.charging_process_id = p.id
  WHERE date BETWEEN ($__timeFrom()::timestamp - interval '1 day') AND ($__timeTo()::timestamp + interval '1 day') AND p.car_id = $car_id
  GROUP BY 1
)
ORDER BY 1

------------------------------------------------------------------------------
-- PANEL: Elevation  [timeseries]
------------------------------------------------------------------------------
SELECT
	$__timeGroup(date, '5s'),
	ROUND(convert_m(avg(elevation), '$alternative_length_unit')) AS elevation_${alternative_length_unit}
FROM
	positions
WHERE
 car_id = $car_id AND
 date BETWEEN ($__timeFrom()::timestamp - interval '1 day') AND ($__timeTo()::timestamp + interval '1 day')
GROUP BY
 1
ORDER BY
 1 ASC

