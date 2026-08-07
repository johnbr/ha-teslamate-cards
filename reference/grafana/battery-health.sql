-- TeslaMate Grafana dashboard: battery-health
--
-- Extracted verbatim from /dashboards/battery-health.json inside the teslamate grafana
-- image. This file is REFERENCE ONLY -- it is not executed. It is the
-- specification the ported queries in custom_components/teslamate_cards/queries/
-- are validated against, panel by panel.
--
-- Source: https://github.com/teslamate-org/teslamate (MIT). See reference/README.md.
--
-- Dashboard template variables: car_id, length_unit, preferred_range, base_url, aux, custom_kwh_new, custom_max_range
-- Grafana macros used: $__timezone, $aux, $car_id, $custom_kwh_new, $custom_max_range, $length_unit
-- Panels with SQL: 11

------------------------------------------------------------------------------
-- PANEL: Battery Capacity  [stat]
------------------------------------------------------------------------------
SELECT  
  CASE WHEN $custom_kwh_new > 0 THEN $custom_kwh_new ELSE ('$aux'::json ->> 'MaxCapacity')::float END as "Usable (new)", 
  ('$aux'::json ->> 'CurrentCapacity')::float as "Usable (now)",
  ('$aux'::json ->> 'CurrentCapacity')::float - CASE WHEN $custom_kwh_new > 0 THEN $custom_kwh_new ELSE ('$aux'::json ->> 'MaxCapacity')::float END as "Difference"

------------------------------------------------------------------------------
-- PANEL: Ranges [$preferred_range]  [stat]
------------------------------------------------------------------------------
SELECT  
  CASE WHEN $custom_max_range > 0 THEN $custom_max_range ELSE ('$aux'::json ->> 'MaxRange')::float END as "maxrange_$length_unit",
  ('$aux'::json ->> 'CurrentRange')::float  as "currentrange_$length_unit",
  CASE WHEN $custom_max_range > 0 THEN $custom_max_range ELSE ('$aux'::json ->> 'MaxRange')::float END - ('$aux'::json ->> 'CurrentRange')::float as "range_lost_$length_unit"

------------------------------------------------------------------------------
-- PANEL: Drive Stats  [stat] (target 1/4)
------------------------------------------------------------------------------
select ROUND(convert_km(sum(distance)::numeric, '$length_unit'),0)|| ' $length_unit' as "Logged"
from drives 
where car_id = $car_id;

------------------------------------------------------------------------------
-- PANEL: Drive Stats  [stat] (target 2/4)
------------------------------------------------------------------------------
SELECT ROUND(convert_km((max(end_km) - min(start_km))::numeric, '$length_unit'),0)|| ' $length_unit' as "Mileage"
FROM drives WHERE car_id = $car_id;

------------------------------------------------------------------------------
-- PANEL: Drive Stats  [stat] (target 3/4)
------------------------------------------------------------------------------
SELECT ROUND(convert_km(max(end_km)::numeric, '$length_unit'),0) || ' $length_unit' as "Odometer"
FROM drives WHERE car_id =  $car_id;

------------------------------------------------------------------------------
-- PANEL: Drive Stats  [stat] (target 4/4)
------------------------------------------------------------------------------
SELECT (
 (SELECT ROUND(convert_km((max(end_km) - min(start_km))::numeric, '$length_unit'),0) FROM drives WHERE car_id = $car_id) - 
 (SELECT ROUND(convert_km(sum(distance)::numeric, '$length_unit'),0) from drives where car_id = $car_id) || ' $length_unit'
)
AS "Data lost (not logged)"

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
	  AND cp.charge_energy_added > 0.01
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
-- PANEL: Estimated Degradation  [gauge]
------------------------------------------------------------------------------
SELECT GREATEST(0, 100.0 - (('$aux'::json ->> 'CurrentCapacity')::float * 100.0 / CASE WHEN $custom_kwh_new > 0 THEN $custom_kwh_new ELSE ('$aux'::json ->> 'MaxCapacity')::float END))

------------------------------------------------------------------------------
-- PANEL: Battery Health  [bargauge]
------------------------------------------------------------------------------
SELECT  
  LEAST(100, (100 - GREATEST(0, 100.0 - (('$aux'::json ->> 'CurrentCapacity')::float * 100.0 / CASE WHEN $custom_kwh_new > 0 THEN $custom_kwh_new ELSE ('$aux'::json ->> 'MaxCapacity')::float END)))) as "Battery Health (%)"

------------------------------------------------------------------------------
-- PANEL: Charging Stats  [stat] (target 1/5)
------------------------------------------------------------------------------
SELECT
	COUNT(*) AS "# of Charges"
FROM
	charging_processes
WHERE
	car_id = $car_id AND charge_energy_added > 0.01

------------------------------------------------------------------------------
-- PANEL: Charging Stats  [stat] (target 2/5)
------------------------------------------------------------------------------
SELECT
	floor(sum(charge_energy_added) / CASE WHEN $custom_kwh_new > 0 THEN $custom_kwh_new ELSE ('$aux'::json ->> 'MaxCapacity')::float END) AS "# of Charging cycles"
FROM charging_processes WHERE car_id = $car_id AND charge_energy_added > 0.01

------------------------------------------------------------------------------
-- PANEL: Charging Stats  [stat] (target 3/5)
------------------------------------------------------------------------------
SELECT
	sum(charge_energy_added) as "Total Energy added"
FROM
	charging_processes
WHERE
	car_id = $car_id AND charge_energy_added > 0.01

------------------------------------------------------------------------------
-- PANEL: Charging Stats  [stat] (target 4/5)
------------------------------------------------------------------------------
SELECT
	SUM(greatest(charge_energy_added, charge_energy_used)) AS "Total Energy used"
FROM
	charging_processes
WHERE
	car_id = $car_id AND charge_energy_added > 0.01

------------------------------------------------------------------------------
-- PANEL: Charging Stats  [stat] (target 5/5)
------------------------------------------------------------------------------
SELECT
	SUM(charge_energy_added) / SUM(greatest(charge_energy_added, charge_energy_used)) AS "Charging Efficiency"
FROM
	charging_processes
WHERE
	car_id = $car_id AND charge_energy_added > 0.01

------------------------------------------------------------------------------
-- PANEL: Current SOC  [bargauge] (target 1/2)
------------------------------------------------------------------------------
SELECT * FROM ((SELECT usable_battery_level, date
FROM positions
WHERE car_id = $car_id AND usable_battery_level IS NOT NULL
ORDER BY date DESC
LIMIT 1)
UNION
(SELECT usable_battery_level, date
FROM charges c
JOIN charging_processes p ON p.id = c.charging_process_id
WHERE p.car_id = $car_id AND usable_battery_level IS NOT NULL
ORDER BY date DESC
LIMIT 1)) AS last_usable_battery_level LIMIT 1

------------------------------------------------------------------------------
-- PANEL: Current SOC  [bargauge] (target 2/2)
------------------------------------------------------------------------------
SELECT
  0 as lowest,
  20 as lower,
  CASE WHEN lfp_battery THEN 100 ELSE 81 END as upper
from cars inner join car_settings on cars.settings_id = car_settings.id
where cars.id = $car_id

------------------------------------------------------------------------------
-- PANEL: Efficiency  [stat]
------------------------------------------------------------------------------
SELECT ('$aux'::json ->> 'RatedEfficiency')::float * 10 / convert_km(1, '$length_unit') AS efficiency_$length_unit

------------------------------------------------------------------------------
-- PANEL: Current Stored Energy  [bargauge]
------------------------------------------------------------------------------
SELECT * FROM ((SELECT usable_battery_level * ('$aux'::json ->> 'CurrentCapacity')::float / 100 as kWh, date, ('$aux'::json ->> 'CurrentCapacity')::float as Total
FROM positions
WHERE car_id = $car_id  AND usable_battery_level IS NOT NULL
ORDER BY date DESC
LIMIT 1)
UNION
(SELECT battery_level * ('$aux'::json ->> 'CurrentCapacity')::float / 100 as kWh, date, ('$aux'::json ->> 'CurrentCapacity')::float as Total
FROM charges c
JOIN charging_processes p ON p.id = c.charging_process_id
WHERE p.car_id = $car_id  AND usable_battery_level IS NOT NULL
ORDER BY date DESC
LIMIT 1)) AS last_usable_battery_level LIMIT 1

------------------------------------------------------------------------------
-- PANEL: Battery Capacity by Mileage  [xychart] (target 1/2)
------------------------------------------------------------------------------
SELECT convert_km(AVG(p.odometer)::numeric,'$length_unit') AS "Odometer", 
	AVG(c.rated_battery_range_km * ('$aux'::json ->> 'RatedEfficiency')::float / c.usable_battery_level) AS "kWh",
	--MAX(cp.id) AS id,
	to_char(timezone('$__timezone', timezone('UTC', cp.end_date)), 'YYYY-MM-dd') AS "Date"
	FROM charging_processes cp
		JOIN (SELECT charging_process_id, MAX(date) as date	FROM charges WHERE usable_battery_level > 0 GROUP BY charging_process_id) AS last_charges	ON cp.id = last_charges.charging_process_id
		INNER JOIN charges c
		ON c.charging_process_id = cp.id AND c.date = last_charges.date
		INNER JOIN positions p ON p.id = cp.position_id
	WHERE cp.car_id = $car_id
		AND cp.end_date IS NOT NULL
		AND cp.charge_energy_added >= ('$aux'::json ->> 'RatedEfficiency')::float
	GROUP BY 3

------------------------------------------------------------------------------
-- PANEL: Battery Capacity by Mileage  [xychart] (target 2/2)
------------------------------------------------------------------------------
SELECT 
  ROUND(MIN(convert_km(p.odometer::numeric,'$length_unit')),0) AS "Odometer",
	ROUND(PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY c.rated_battery_range_km * ('$aux'::json ->> 'RatedEfficiency')::float / c.usable_battery_level)::numeric,1) AS "kWh",
	to_char(timezone('$__timezone', timezone('UTC', cp.end_date)), 'YYYYMM') || CASE WHEN to_char(timezone('$__timezone', timezone('UTC', cp.end_date)), 'DD')::int <= 15 THEN '1' ELSE '2' END  AS Title
	FROM charging_processes cp
		JOIN (SELECT charging_process_id, MAX(date) as date	FROM charges WHERE usable_battery_level > 0 GROUP BY charging_process_id) AS last_charges	ON cp.id = last_charges.charging_process_id
		INNER JOIN charges c
		ON c.charging_process_id = cp.id AND c.date = last_charges.date
		INNER JOIN positions p ON p.id = cp.position_id
	WHERE cp.car_id = $car_id
		AND cp.end_date IS NOT NULL
		AND cp.charge_energy_added >= ('$aux'::json ->> 'RatedEfficiency')::float
	GROUP BY 3

