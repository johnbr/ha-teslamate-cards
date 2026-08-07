-- TeslaMate Grafana dashboard: charging-stats
--
-- Extracted verbatim from /dashboards/charging-stats.json inside the teslamate grafana
-- image. This file is REFERENCE ONLY -- it is not executed. It is the
-- specification the ported queries in custom_components/teslamate_cards/queries/
-- are validated against, panel by panel.
--
-- Source: https://github.com/teslamate-org/teslamate (MIT). See reference/README.md.
--
-- Dashboard template variables: car_id, base_url, length_unit, min_duration, geofence, preferred_range
-- Grafana macros used: $__time, $__timeFilter, $__timezone, $car_id, $geofence, $length_unit, $min_duration, ${__from:date:seconds}, ${__to:date:seconds}, ${geofence:pipe}, ${preferred_range}
-- Panels with SQL: 18

------------------------------------------------------------------------------
-- PANEL: # of Charges  [stat]
------------------------------------------------------------------------------
SELECT
	count(*)
FROM
	charging_processes cp
WHERE
	$__timeFilter(end_date)
	AND duration_min >= $min_duration
	AND car_id = $car_id
	AND ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence));

------------------------------------------------------------------------------
-- PANEL: Total Energy added  [stat]
------------------------------------------------------------------------------
SELECT
	sum(charge_energy_added)
FROM
	charging_processes cp
WHERE
	$__timeFilter(end_date)
	AND duration_min >= $min_duration
	AND car_id = $car_id
	AND ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence));

------------------------------------------------------------------------------
-- PANEL: SuC Charging Cost  [stat]
------------------------------------------------------------------------------
SELECT
	COALESCE(sum(cp.cost),0)
FROM
	charging_processes cp
LEFT JOIN 
	addresses addr ON addr.id = address_id
LEFT JOIN
  geofences geo ON geo.id = geofence_id
JOIN
  charges char ON char.charging_process_id = cp.id AND char.date = end_date	
WHERE
  $__timeFilter(end_date)
  AND (addr.name ILIKE '%supercharger%' OR geo.name ILIKE '%supercharger%' OR char.fast_charger_brand = 'Tesla')
	AND NULLIF(char.charger_phases, 0) IS NULL
	AND char.fast_charger_type != 'ACSingleWireCAN'
	AND cp.cost IS NOT NULL
	AND duration_min >= $min_duration
	AND cp.car_id = $car_id
	AND ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence));

------------------------------------------------------------------------------
-- PANEL: Total Charging Cost  [stat]
------------------------------------------------------------------------------
SELECT
	sum(cost)
FROM
	charging_processes cp
WHERE
	$__timeFilter(end_date)
	AND duration_min >= $min_duration
	AND car_id = $car_id
	AND ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence));

------------------------------------------------------------------------------
-- PANEL: Ø Cost per 100 $length_unit  [stat]
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
    where cp.car_id = $car_id and $__timeFilter(end_date) and 48 <= ((${__to:date:seconds} - ${__from:date:seconds})::numeric / 3600)

),

charging_processes_end_event as (

    select
        'charging_process_end' as event, case when end_date is null then start_date + interval '1 second' else end_date end as date, end_${preferred_range}_range_km as range, p.odometer, cp.car_id, end_date is null as is_incomplete
    from charging_processes cp
        inner join positions p on cp.position_id = p.id
    where cp.car_id = $car_id and $__timeFilter(end_date) and 48 <= ((${__to:date:seconds} - ${__from:date:seconds})::numeric / 3600)

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

),

derived as (

  select
    convert_km(sum(distance)::numeric, '$length_unit') as distance,
    sum(range_loss) * c.efficiency as consumption
  from final
    inner join cars c on car_id = c.id
  group by c.efficiency

),

charges as (

  SELECT
    sum(cost) / sum(charge_energy_added) as cost_per_kwh
  FROM charging_processes cp
  where cp.car_id = $car_id and $__timeFilter(end_date)
    and ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence))

)

select
  consumption / distance * 100 * cost_per_kwh as cost_mileage
from derived cross join charges

------------------------------------------------------------------------------
-- PANEL: Ø Cost per kWh  [stat]
------------------------------------------------------------------------------
SELECT 
  sum(cost) / sum(greatest(charge_energy_added, charge_energy_used))
FROM charging_processes cp
  WHERE $__timeFilter(end_date) AND duration_min >= $min_duration AND car_id = $car_id
    AND ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence))

------------------------------------------------------------------------------
-- PANEL: Ø Cost per kWh DC  [stat]
------------------------------------------------------------------------------
WITH data AS (
  SELECT
		cp.id,
    cp.cost,
    cp.charge_energy_added,
    cp.charge_energy_used,
		CASE WHEN NULLIF(mode() within group (order by charger_phases),0) is null THEN 'DC'
				 ELSE 'AC'
		END AS current
	FROM charging_processes cp
  RIGHT JOIN charges ON cp.id = charges.charging_process_id
  WHERE
	  cp.car_id = $car_id
    AND duration_min >= $min_duration
	  AND $__timeFilter(end_date)
    AND ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence))
  GROUP BY 1
)

SELECT 
  sum(cost) / sum(greatest(charge_energy_added, charge_energy_used))
FROM data
  WHERE current = 'DC'

------------------------------------------------------------------------------
-- PANEL: Ø Cost per kWh AC  [stat]
------------------------------------------------------------------------------
WITH data AS (
  SELECT
		cp.id,
    cp.cost,
    cp.charge_energy_added,
    cp.charge_energy_used,
		CASE WHEN NULLIF(mode() within group (order by charger_phases),0) is null THEN 'DC'
				 ELSE 'AC'
		END AS current
	FROM charging_processes cp
  RIGHT JOIN charges ON cp.id = charges.charging_process_id
  WHERE
	  cp.car_id = $car_id
    AND duration_min >= $min_duration
	  AND $__timeFilter(end_date)
    AND ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence))
  GROUP BY 1
)

SELECT 
  sum(cost) / sum(greatest(charge_energy_added, charge_energy_used))
FROM data
  WHERE current = 'AC'

------------------------------------------------------------------------------
-- PANEL: Charge Heatmap  [heatmap]
------------------------------------------------------------------------------
SELECT
	$__time(end_date),
	start_battery_level,
	end_battery_level
FROM
	charging_processes cp
WHERE
	$__timeFilter(end_date)
	AND duration_min >= $min_duration 
	AND car_id = $car_id
	AND ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence))
ORDER BY
	end_date;

------------------------------------------------------------------------------
-- PANEL: Charge Delta  [timeseries] (target 1/2)
------------------------------------------------------------------------------
WITH charges AS (
	SELECT
		end_date,
		start_battery_level,
		end_battery_level,
		p.odometer,
		COALESCE(
			LAG(p.odometer) OVER (
				ORDER BY cp.end_date
			),
			p.odometer
		) as odometer_prev
	FROM
		charging_processes cp
	JOIN positions p
	ON p.id = cp.position_id
	WHERE
		$__timeFilter(cp.end_date)
		AND cp.duration_min >= $min_duration
		AND cp.car_id = $car_id
		AND ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence))
)
SELECT
	MIN(end_date) as time,
	MIN(start_battery_level) as "Start SOC",
	MAX(end_battery_level) as "End SOC"
FROM charges
GROUP BY
	CASE WHEN odometer - odometer_prev < 2 THEN odometer_prev ELSE odometer END
ORDER BY
	time;

------------------------------------------------------------------------------
-- PANEL: Charge Delta  [timeseries] (target 2/2)
------------------------------------------------------------------------------
SELECT
  20 as lower,
  CASE WHEN lfp_battery THEN 100 ELSE 80 END as upper
from cars inner join car_settings on cars.settings_id = car_settings.id
where cars.id = $car_id

------------------------------------------------------------------------------
-- PANEL: AC/DC - Energy Used  [piechart]
------------------------------------------------------------------------------
WITH data AS (
  SELECT
		cp.id,
		cp.charge_energy_added,
		CASE WHEN NULLIF(mode() within group (order by charger_phases),0) is null THEN 'DC'
				 ELSE 'AC'
		END AS current,
		cp.charge_energy_used
	FROM charging_processes cp
  RIGHT JOIN charges ON cp.id = charges.charging_process_id
  WHERE
	  cp.car_id = $car_id
	  AND duration_min >= $min_duration
	  AND $__timeFilter(end_date)
    AND ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence))
  GROUP BY 1,2
)
SELECT
	now() AS time,
	SUM(GREATEST(charge_energy_added, charge_energy_used)) AS value,
	current AS metric
FROM data
GROUP BY 3
ORDER BY metric DESC;

------------------------------------------------------------------------------
-- PANEL: Charging heat map by kWh  [geomap]
------------------------------------------------------------------------------
WITH charge_data AS (
SELECT COALESCE(geofence.name, CONCAT_WS(', ', COALESCE(address.name, nullif(CONCAT_WS(' ', address.road, address.house_number), '')), address.city)) AS loc_nm
, AVG(position.latitude) AS latitude
, AVG(position.longitude) AS longitude
, sum(charge.charge_energy_added) AS chg_total
, count(*) as charges
FROM charging_processes charge
LEFT JOIN addresses address ON charge.address_id = address.id
LEFT JOIN positions position ON charge.position_id = position.id
LEFT JOIN geofences geofence ON charge.geofence_id = geofence.id
WHERE $__timeFilter(charge.end_date)
AND charge.duration_min >= $min_duration
AND charge.car_id = $car_id
AND ('${geofence:pipe}' = '-1' OR charge.geofence_id in ($geofence))
GROUP BY COALESCE(geofence.name, CONCAT_WS(', ', COALESCE(address.name, nullif(CONCAT_WS(' ', address.road, address.house_number), '')), address.city))
) 
SELECT loc_nm
	,latitude
	,longitude
	,chg_total
	,chg_total * 1.0 / (SELECT sum(chg_total) FROM charge_data) * 100   AS pct
	,charges
FROM charge_data

------------------------------------------------------------------------------
-- PANEL: AC/DC - Duration  [piechart]
------------------------------------------------------------------------------
WITH data AS (
  SELECT
		cp.id,
		cp.duration_min,
		CASE WHEN NULLIF(mode() within group (order by charger_phases),0) is null THEN 'DC'
				 ELSE 'AC'
		END AS current
	FROM charging_processes cp
  RIGHT JOIN charges ON cp.id = charges.charging_process_id
  WHERE
	  cp.car_id = $car_id
	  AND cp.duration_min >= $min_duration
	  AND $__timeFilter(end_date)
    AND ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence))
  GROUP BY 1,2
)
SELECT
	now() AS time,
	sum(duration_min) * 60 AS value,
	current AS metric
FROM data
GROUP BY 3
ORDER BY metric DESC;

------------------------------------------------------------------------------
-- PANEL: DC Charging Curve  [xychart] (target 1/2)
------------------------------------------------------------------------------
SELECT
  c.battery_level as "SoC",
  round(avg(c.charger_power), 0) as "Power",
  c.charging_process_id as "charging_process_id",
  p.start_date as "start_date",
  p.end_date as "end_date",
  COALESCE(g.name, a.name) || ' ' || to_char(timezone('$__timezone', timezone('UTC', c.date)), 'YYYY-MM-dd') as "Charge"
FROM
  charges c
JOIN charging_processes p ON p.id = c.charging_process_id 
JOIN addresses a ON a.id = p.address_id
LEFT JOIN geofences g ON g.id = p.geofence_id
WHERE
  $__timeFilter(date)
 AND p.car_id = $car_id
 AND charger_power > 0
 AND c.fast_charger_present
 AND ('${geofence:pipe}' = '-1' OR p.geofence_id in ($geofence))
GROUP BY c.battery_level, c.charging_process_id, a.name, g.name, p,start_date, p.end_date, to_char(timezone('$__timezone', timezone('UTC', c.date)), 'YYYY-MM-dd')

------------------------------------------------------------------------------
-- PANEL: DC Charging Curve  [xychart] (target 2/2)
------------------------------------------------------------------------------
SELECT
  c.battery_level as "SoC",
  PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY charger_power) as "Power"
FROM
  charges c
join
  charging_processes p ON p.id = c.charging_process_id 
WHERE
  $__timeFilter(date)
 AND p.car_id = $car_id
 AND charger_power > 0
 AND c.fast_charger_present
 AND ('${geofence:pipe}' = '-1' OR p.geofence_id in ($geofence))
GROUP BY battery_level

------------------------------------------------------------------------------
-- PANEL: Charge Stats  [table] (target 1/2)
------------------------------------------------------------------------------
with data as (

    select id, end_battery_level, end_date, 'Charging Process' as activity
    from charging_processes cp
    where cp.car_id = $car_id and $__timeFilter(cp.end_date) and duration_min >= $min_duration
      and ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence))
    
    union all
    
    select d.id, p.battery_level as end_battery_level, end_date, 'Drive' as activity
    from drives d
        inner join positions p on d.end_position_id = p.id
    where d.car_id = $car_id and $__timeFilter(d.end_date)

),

flag_consecutive_charges as (

    select *, lead(activity) over (order by end_date) as next_activity from data

)

SELECT
    ROUND(end_battery_level / 5, 0) * 5 AS SOC,
    count(*) AS n
FROM
    flag_consecutive_charges
where
    activity = 'Charging Process' and (next_activity != 'Charging Process' or next_activity is null)
GROUP BY
    ROUND(end_battery_level / 5, 0) * 5
ORDER BY
    SOC DESC

------------------------------------------------------------------------------
-- PANEL: Charge Stats  [table] (target 2/2)
------------------------------------------------------------------------------
SELECT
  CASE WHEN lfp_battery THEN 100 ELSE 81 END as high,
  CASE WHEN lfp_battery THEN 100 ELSE 91 END as highest
from cars inner join car_settings on cars.settings_id = car_settings.id
where cars.id = $car_id

------------------------------------------------------------------------------
-- PANEL: Discharge Stats  [table]
------------------------------------------------------------------------------
with data as (

    select id, start_battery_level, end_date, 'Charging Process' as activity
    from charging_processes cp
    where cp.car_id = $car_id and $__timeFilter(cp.end_date) and duration_min >= $min_duration
      and ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence))
    
    union all
    
    select d.id, p.battery_level as start_battery_level, end_date, 'Drive' as activity
    from drives d
        inner join positions p on d.start_position_id = p.id
    where d.car_id = $car_id and $__timeFilter(d.end_date)

),

flag_consecutive_charges as (

    select *, lag(activity) over (order by end_date) as previous_activity from data

)

SELECT
    ROUND(start_battery_level / 5, 0) * 5 AS SOC,
    count(*) AS n
FROM
    flag_consecutive_charges
where
    activity = 'Charging Process' and (previous_activity != 'Charging Process' or previous_activity is null)
GROUP BY
    ROUND(start_battery_level / 5, 0) * 5
ORDER BY
    SOC DESC

------------------------------------------------------------------------------
-- PANEL: Top Charging Stations (Charged)  [table]
------------------------------------------------------------------------------
SELECT
	COALESCE(geofence.name, CONCAT_WS(', ', COALESCE(address.name, nullif(CONCAT_WS(' ', address.road, address.house_number), '')), address.city)) AS location,
  sum(charge_energy_added) as charge_energy_added
FROM
	charging_processes c
LEFT JOIN addresses address ON c.address_id = address.id
LEFT JOIN geofences geofence ON geofence_id = geofence.id
WHERE
	$__timeFilter(end_date)
	AND duration_min >= $min_duration
	AND car_id = $car_id
	AND ('${geofence:pipe}' = '-1' OR c.geofence_id in ($geofence))
GROUP BY
	1
ORDER BY
	SUM(charge_energy_added) DESC
LIMIT 17;

------------------------------------------------------------------------------
-- PANEL: Top Charging Stations (Cost)  [table]
------------------------------------------------------------------------------
SELECT
	COALESCE(geofence.name, CONCAT_WS(', ', COALESCE(address.name, CONCAT_WS(' ', address.road, address.house_number)), address.city)) AS location,
	sum(cost) as cost
FROM
	charging_processes c
	LEFT JOIN addresses address ON c.address_id = address.id
	LEFT JOIN geofences geofence ON geofence_id = geofence.id
WHERE
  $__timeFilter(end_date) AND
	duration_min >= $min_duration AND
	car_id = $car_id AND
	COST IS NOT NULL AND
	('${geofence:pipe}' = '-1' OR c.geofence_id in ($geofence))
GROUP BY
	1
ORDER BY
	2 DESC NULLS LAST
LIMIT 17;

