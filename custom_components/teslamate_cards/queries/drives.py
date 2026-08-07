"""The Drives dashboard panels.

Kept verbatim from upstream so they diff against
``reference/grafana/drives.sql``. Grafana macros are resolved by
``macros.translate`` at call time.
"""

from __future__ import annotations

# The Drive table: one row per drive with addresses, distance, consumption
# and efficiency.
DRIVES_SQL = """\
WITH data AS (
  SELECT
    floor(extract(epoch FROM start_date)) * 1000 AS start_date_ts,
    ceil(extract(epoch FROM end_date)) * 1000 AS end_date_ts,
    car.id as car_id,
    CASE
      WHEN start_geofence.id IS NULL THEN CONCAT('new?lat=', start_position.latitude, '&lng=', start_position.longitude)
      WHEN start_geofence.id IS NOT NULL THEN CONCAT(start_geofence.id, '/edit')
    END as start_path,
    CASE
      WHEN end_geofence.id IS NULL THEN CONCAT('new?lat=', end_position.latitude, '&lng=', end_position.longitude)
      WHEN end_geofence.id IS NOT NULL THEN CONCAT(end_geofence.id, '/edit')
    END as end_path,
    TO_CHAR((duration_min * INTERVAL '1 minute'), 'HH24:MI') as duration_str,
    drives.id as drive_id,
    start_date,
    COALESCE(start_geofence.name, CONCAT_WS(', ', COALESCE(start_address.name, nullif(CONCAT_WS(' ', start_address.road, start_address.house_number), '')), start_address.city)) AS start_address,
    COALESCE(end_geofence.name, CONCAT_WS(', ', COALESCE(end_address.name, nullif(CONCAT_WS(' ', end_address.road, end_address.house_number), '')), end_address.city)) AS end_address,
    duration_min,
    distance,
    start_position.battery_level as start_battery_level,
    end_position.battery_level as end_battery_level,
    start_${preferred_range}_range_km - end_${preferred_range}_range_km as range_diff,
    car.efficiency as car_efficiency,
    outside_temp_avg,
    distance / coalesce(NULLIF(duration_min, 0) * 60, extract(epoch from end_date - start_date)) * 3600 AS avg_speed,
    speed_max,
    power_max,
    ascent,
    descent
  FROM drives
  LEFT JOIN addresses start_address ON start_address_id = start_address.id
  LEFT JOIN addresses end_address ON end_address_id = end_address.id
  LEFT JOIN positions start_position ON start_position_id = start_position.id
  LEFT JOIN positions end_position ON end_position_id = end_position.id
  LEFT JOIN geofences start_geofence ON start_geofence_id = start_geofence.id
  LEFT JOIN geofences end_geofence ON end_geofence_id = end_geofence.id
  LEFT JOIN cars car ON car.id = drives.car_id
  WHERE $__timeFilter(start_date) AND drives.car_id = $car_id 
    AND convert_km(distance::numeric, '$length_unit') >= $min_dist 
    AND convert_km(distance::numeric, '$length_unit') / coalesce(NULLIF(duration_min, 0) * 60, extract(epoch from end_date - start_date)) * 3600 >= $min_speed 
    AND ('${geofence:pipe}' = '-1' OR start_geofence.id in ($geofence) OR end_geofence.id in ($geofence)) 
),

reduced_range_info as (

  select
    drive_id,
    case
        when sum(case when battery_level - usable_battery_level > 0 then 1 else 0 end)::numeric / count(*) > 0.25 then true
        else false
    end as reduced_range
  from positions p where $__timeFilter(date) AND car_id = $car_id and p.ideal_battery_range_km is not null group by p.drive_id  

)

SELECT
    start_date_ts,
    end_date_ts,
    car_id,
    start_path,
    end_path,
    duration_str,
    data.drive_id,
    start_date,
    start_address,
    end_address,
    duration_min,
    convert_km(distance::numeric, '$length_unit') AS distance_$length_unit,
    start_battery_level as "% Start",
    end_battery_level as "% End",
    convert_celsius(outside_temp_avg, '$temp_unit') AS outside_temp_$temp_unit,
    convert_km(avg_speed::numeric, '$length_unit') AS speed_avg_$length_unit,
    convert_km(speed_max::numeric, '$length_unit') AS speed_max_$length_unit,
    power_max,
    reduced_range as has_reduced_range,
    CASE
      WHEN range_diff > 0 and 'by distance' = '$efficiency' THEN distance / range_diff
      WHEN 'slope-adjusted' = '$efficiency' THEN
        distance * car_efficiency -- Energy at 100% efficiency
        / nullif((
             (range_diff) * car_efficiency -- Actual Energy
             + 2100 * 0.85 * 9.81 * descent / 3600 / 1000 -- Potential energy recovered from descent
             - 2100 * 9.81 * ascent / 3600 / 1000 -- Potential energy for ascent
        ), 0)
      ELSE NULL
    END as efficiency,
    range_diff * car_efficiency as "consumption_kWh",
    range_diff * car_efficiency / convert_km(distance::numeric, '$length_unit') * 1000 as consumption_kWh_$length_unit
FROM data
  left join reduced_range_info on data.drive_id = reduced_range_info.drive_id
WHERE
    start_address ILIKE '%$location%' OR end_address ILIKE '%$location%'
ORDER BY data.drive_id DESC;
"""

# Drives TeslaMate never saw the end of -- usually a logging gap.
INCOMPLETE_DRIVES_SQL = """\
SELECT id AS "Drive ID", start_date, end_date, distance, duration_min 
FROM drives 
WHERE car_id = $car_id AND end_date is null
ORDER BY start_date DESC
"""
