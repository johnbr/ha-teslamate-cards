"""The Charges dashboard panels.

Kept verbatim from upstream so they diff against
``reference/grafana/charges.sql``. Grafana macros are resolved by
``macros.translate`` at call time.
"""

from __future__ import annotations

# The charge table: one row per charging process, AC and DC.
CHARGES_SQL = """\
WITH data AS (
    SELECT
        floor(extract(epoch FROM start_date)) * 1000 AS start_date_ts,
        ceil(extract(epoch FROM end_date)) * 1000 AS end_date_ts,
        start_date,
        end_date,
        CONCAT_WS(', ', COALESCE(addresses.name, nullif(CONCAT_WS(' ', addresses.road, addresses.house_number), '')), addresses.city) AS address,
        g.name as geofence_name,
        g.id as geofence_id,
        p.latitude,
        p.longitude,
        cp.charge_energy_added,
        cp.charge_energy_used,
        duration_min,
        start_battery_level,
        end_battery_level,
        end_${preferred_range}_range_km - start_${preferred_range}_range_km as range_added,
        outside_temp_avg,
        cp.id,
        p.odometer - lag(p.odometer) OVER (ORDER BY start_date) AS distance,
        cars.efficiency,
        cp.car_id,
        cost,
        max(c.charger_voltage) as max_charger_voltage,
        CASE WHEN NULLIF(mode() within group (order by charger_phases),0) is null THEN 'DC' ELSE 'AC' END AS charge_type,
        p.odometer as odometer
    FROM
        charging_processes cp
	LEFT JOIN charges c ON cp.id = c.charging_process_id
    LEFT JOIN positions p ON p.id = cp.position_id
    LEFT JOIN cars ON cars.id = cp.car_id
    LEFT JOIN addresses ON addresses.id = cp.address_id
    LEFT JOIN geofences g ON g.id = geofence_id
    WHERE 
        cp.car_id = $car_id AND
        $__timeFilter(start_date) AND
        (cp.charge_energy_added IS NULL OR cp.charge_energy_added > 0) AND
        ('${geofence:pipe}' = '-1' OR geofence_id in ($geofence))
    GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, p.odometer
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
    start_date,
    end_date,
    COALESCE(geofence_name, address) as address,    
    charge_type,
    duration_min,
    cost,
    cost / NULLIF(greatest(charge_energy_added, charge_energy_used), 0) as cost_per_kwh,
    charge_energy_added,
    greatest(charge_energy_used, charge_energy_added) as charge_energy_used,
    charge_energy_added / greatest(charge_energy_used, charge_energy_added) as charging_efficiency,
    convert_celsius(outside_temp_avg, '$temp_unit') AS outside_temp_avg_$temp_unit,
    charge_energy_added * 60 / NULLIF (duration_min, 0) AS charge_energy_added_per_hour,
    convert_km(range_added * 60 / NULLIF (duration_min, 0), '$length_unit') AS range_added_per_hour_$length_unit,
    convert_km(range_added, '$length_unit') AS range_added_$length_unit,
    start_battery_level,
    end_battery_level,
    convert_km(odometer::numeric, '$length_unit') AS odometer_$length_unit
 FROM
    data
WHERE
    (distance >= 0 OR distance IS NULL)
    AND duration_min >= '$min_duration_min'
    AND 
        CASE
            WHEN '$cost' !~ '^[0-9]+$' THEN TRUE 
            ELSE cost >= COALESCE(NULLIF('$cost', '')::NUMERIC, 0) 
        END
    AND charge_type = ANY(CASE WHEN array_to_string(ARRAY[$charge_type], ',') = 'DC' THEN ARRAY['DC'] WHEN array_to_string(ARRAY[$charge_type], ',') = 'AC' THEN ARRAY['AC'] ELSE ARRAY['DC', 'AC'] END)
    AND address ILIKE '%$location%'
ORDER BY
  start_date DESC;
"""

# Charging processes with no end -- usually a logging gap.
INCOMPLETE_CHARGES_SQL = """\
SELECT id as "Charging Process ID", start_date, end_date, charge_energy_added, charge_energy_used, start_battery_level, end_battery_level, duration_min
FROM charging_processes 
WHERE car_id = $car_id AND end_date is null
ORDER BY start_date DESC
"""
