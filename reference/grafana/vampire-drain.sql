-- TeslaMate Grafana dashboard: vampire-drain
--
-- Extracted verbatim from /dashboards/vampire-drain.json inside the teslamate grafana
-- image. This file is REFERENCE ONLY -- it is not executed. It is the
-- specification the ported queries in custom_components/teslamate_cards/queries/
-- are validated against, panel by panel.
--
-- Source: https://github.com/teslamate-org/teslamate (MIT). See reference/README.md.
--
-- Dashboard template variables: car_id, duration, length_unit, preferred_range, base_url
-- Grafana macros used: $__timeFilter, $car_id, $duration, $length_unit, ${length_unit}, ${preferred_range}
-- Panels with SQL: 1

------------------------------------------------------------------------------
-- PANEL: Vampire Drain  [table]
------------------------------------------------------------------------------
with merge as (
 SELECT 
    c.start_date AS start_date,
    c.end_date AS end_date,
    c.start_ideal_range_km AS start_ideal_range_km,
    c.end_ideal_range_km AS end_ideal_range_km,
    c.start_rated_range_km AS start_rated_range_km,
    c.end_rated_range_km AS end_rated_range_km,
    start_battery_level,
    end_battery_level,
    p.usable_battery_level AS start_usable_battery_level,
    NULL AS end_usable_battery_level,
    p.odometer AS start_km,
    p.odometer AS end_km
 FROM charging_processes c
 JOIN positions p ON c.position_id = p.id
 WHERE c.car_id = $car_id AND $__timeFilter(start_date)
 UNION
 SELECT 
    d.start_date AS start_date,
    d.end_date AS end_date,
    d.start_ideal_range_km AS start_ideal_range_km,
    d.end_ideal_range_km AS end_ideal_range_km,
    d.start_rated_range_km AS start_rated_range_km,
    d.end_rated_range_km AS end_rated_range_km,
    start_position.battery_level AS start_battery_level,
    end_position.battery_level AS end_battery_level,
    start_position.usable_battery_level AS start_usable_battery_level,
    end_position.usable_battery_level AS end_usable_battery_level,
    d.start_km AS start_km,
    d.end_km AS end_km
 FROM drives d
 JOIN positions start_position ON d.start_position_id = start_position.id
 JOIN positions end_position ON d.end_position_id = end_position.id
 WHERE d.car_id = $car_id AND $__timeFilter(start_date)
), 
v as (
 SELECT
    lag(t.end_date) OVER w AS start_date,
    t.start_date AS end_date,
    lag(t.end_${preferred_range}_range_km) OVER w AS start_range,
    t.start_${preferred_range}_range_km AS end_range,
    lag(t.end_km) OVER w AS start_km,
    t.start_km AS end_km,
    EXTRACT(EPOCH FROM age(t.start_date, lag(t.end_date) OVER w)) AS duration,
    lag(t.end_battery_level) OVER w AS start_battery_level,
    lag(t.end_usable_battery_level) OVER w AS start_usable_battery_level,
		start_battery_level AS end_battery_level,
		start_usable_battery_level AS end_usable_battery_level,
		start_battery_level > COALESCE(start_usable_battery_level, start_battery_level) AS has_reduced_range
  FROM merge t
  WINDOW w AS (ORDER BY t.start_date ASC)
  ORDER BY start_date DESC
)

SELECT
  floor(extract(epoch FROM v.start_date)) * 1000 AS start_date_ts,
  ceil(extract(epoch FROM v.end_date)) * 1000 AS end_date_ts,
  -- Columns
  v.start_date,
  v.end_date,
  v.duration,
  (coalesce(s_asleep.sleep, 0) + coalesce(s_offline.sleep, 0)) / v.duration as standby,
	-greatest(v.start_battery_level - v.end_battery_level, 0) as soc_diff,
	CASE WHEN has_reduced_range THEN 1 ELSE 0 END as has_reduced_range,
	convert_km(CASE WHEN has_reduced_range THEN NULL ELSE (v.start_range - v.end_range)::numeric END, '$length_unit') AS range_diff_$length_unit,
  CASE WHEN has_reduced_range THEN NULL ELSE (v.start_range - v.end_range) * c.efficiency END AS consumption,
  CASE WHEN has_reduced_range THEN NULL ELSE ((v.start_range - v.end_range) * c.efficiency) / (v.duration / 3600) * 1000 END as avg_power,
  convert_km(CASE WHEN has_reduced_range THEN NULL ELSE ((v.start_range - v.end_range) / (v.duration / 3600))::numeric END, '$length_unit') AS range_lost_per_hour_${length_unit}
FROM v,
  LATERAL (
    SELECT EXTRACT(EPOCH FROM sum(age(s.end_date, s.start_date))) as sleep
    FROM states s
    WHERE
      state = 'asleep' AND
      v.start_date <= s.start_date AND s.end_date <= v.end_date AND
      s.car_id = $car_id
  ) s_asleep,
  LATERAL (
    SELECT EXTRACT(EPOCH FROM sum(age(s.end_date, s.start_date))) as sleep
    FROM states s
    WHERE
      state = 'offline' AND
      v.start_date <= s.start_date AND s.end_date <= v.end_date AND
      s.car_id = $car_id
  ) s_offline
JOIN cars c ON c.id = $car_id
WHERE
  v.duration > ($duration * 60 * 60)
  AND v.start_range - v.end_range >= 0
  AND v.end_km - v.start_km < 1;

