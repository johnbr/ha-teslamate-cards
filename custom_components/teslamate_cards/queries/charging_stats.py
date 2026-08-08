"""Charging Stats dashboard.

Upstream reference: ``reference/grafana/charging-stats.sql``.

Grafana renders each stat panel as its own query against the same rows. That is
free in Grafana, which fires them in parallel from the browser, but over a
websocket it is one round trip per number. The scalar panels are therefore
folded into a single ``charging_totals`` statement whose subqueries are
upstream's, unchanged -- so the numbers still match panel for panel.

Panels deliberately not ported (see PLAN.md): the geomap heat map and charge
heatmap (duplicated by the house's existing map cards), the AC/DC *duration*
pie (the energy pie carries the same story), and the Charge/Discharge Stats
SOC-histogram tables.
"""

from __future__ import annotations

from ._energy_stitch import energy_stitch_ctes

# The filter every panel on this dashboard shares.
_BASE_FILTER = """
        $__timeFilter(cp.end_date)
        AND cp.duration_min >= $min_duration
        AND cp.car_id = $car_id
        AND ('${geofence:pipe}' = '-1' OR cp.geofence_id in ($geofence))"""


# One row carrying every scalar panel.
#
# `# of Charges`, `Total Energy added`, `Total Charging Cost` and `Ø Cost per
# kWh` all read charging_processes directly, so they share the `base` CTE. The
# AC/DC figures need upstream's per-process classification, which is a
# `mode() within group (order by charger_phases)` over the charges samples --
# no phase count means DC.
#
# Cost is NULL on a free session. `sum()` skips NULLs while the energy terms
# count every row, which is exactly what makes `sum(cost) / sum(energy)` a
# meaningful blended rate for an owner with free Supercharging -- do not
# "fix" it into an average over priced sessions only.
CHARGING_TOTALS_SQL = f"""
WITH base AS (
    SELECT cp.*
    FROM charging_processes cp
    WHERE {_BASE_FILTER}
),

classified AS (
    SELECT
        cp.id,
        cp.cost,
        cp.charge_energy_added,
        cp.charge_energy_used,
        cp.duration_min,
        CASE WHEN NULLIF(mode() within group (order by charges.charger_phases), 0) is null THEN 'DC'
             ELSE 'AC'
        END AS current
    FROM base cp
    RIGHT JOIN charges ON cp.id = charges.charging_process_id
    WHERE cp.id IS NOT NULL
    GROUP BY 1, 2, 3, 4, 5
),

suc AS (
    SELECT COALESCE(sum(cp.cost), 0) AS cost
    FROM base cp
    LEFT JOIN addresses addr ON addr.id = cp.address_id
    LEFT JOIN geofences geo ON geo.id = cp.geofence_id
    JOIN charges char ON char.charging_process_id = cp.id AND char.date = cp.end_date
    WHERE (addr.name ILIKE '%supercharger%' OR geo.name ILIKE '%supercharger%'
           OR char.fast_charger_brand = 'Tesla')
        AND NULLIF(char.charger_phases, 0) IS NULL
        AND char.fast_charger_type != 'ACSingleWireCAN'
        AND cp.cost IS NOT NULL
)

SELECT
    (SELECT count(*) FROM base) AS charge_count,
    (SELECT sum(charge_energy_added) FROM base) AS energy_added,
    (SELECT sum(greatest(charge_energy_added, charge_energy_used)) FROM base) AS energy_used,
    (SELECT sum(cost) FROM base) AS total_cost,
    (SELECT count(*) FROM base WHERE cost > 0) AS paid_count,
    (SELECT cost FROM suc) AS suc_cost,
    (SELECT sum(cost) / nullif(sum(greatest(charge_energy_added, charge_energy_used)), 0)
        FROM base) AS cost_per_kwh,
    (SELECT sum(cost) / nullif(sum(greatest(charge_energy_added, charge_energy_used)), 0)
        FROM classified WHERE current = 'AC') AS cost_per_kwh_ac,
    (SELECT sum(cost) / nullif(sum(greatest(charge_energy_added, charge_energy_used)), 0)
        FROM classified WHERE current = 'DC') AS cost_per_kwh_dc,
    (SELECT sum(charge_energy_added) / nullif(sum(greatest(charge_energy_added, charge_energy_used)), 0)
        FROM base) AS charging_efficiency,
    (SELECT sum(GREATEST(charge_energy_added, charge_energy_used))
        FROM classified WHERE current = 'AC') AS energy_ac,
    (SELECT sum(GREATEST(charge_energy_added, charge_energy_used))
        FROM classified WHERE current = 'DC') AS energy_dc,
    -- The Charge Delta panel's reference band. Note upstream uses 80 here but
    -- 81 on Battery Health's SOC gauge, and both are kept as written.
    (SELECT 20 FROM cars WHERE cars.id = $car_id) AS soc_limit_lower,
    (SELECT CASE WHEN lfp_battery THEN 100 ELSE 80 END
        FROM cars INNER JOIN car_settings ON cars.settings_id = car_settings.id
        WHERE cars.id = $car_id) AS soc_limit_upper
"""


# "Ø Cost per 100 $length_unit". Upstream notes this query is shared with the
# Efficiency, Statistics and Trip dashboards -- keep the four in step.
#
# It has two modes selected by the window length: a range under 48 hours walks
# raw `positions`, anything longer stitches drive/charge start and end events.
# The cards default to 90 days, so the cheap branch is the normal one (measured
# 8.5 ms); the `positions` CTE is retained so a short window still works.
#
# The CTE named `positions` shadows the table of the same name. That is safe in
# a non-recursive WITH -- a CTE's own name is not in scope inside its body, so
# `from positions p` there reads the real table.
CHARGING_COST_PER_DISTANCE_SQL = f"""
with {energy_stitch_ctes("end_date")},

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
    and ('${{geofence:pipe}}' = '-1' OR cp.geofence_id in ($geofence))

)

select
  distance,
  consumption,
  cost_per_kwh,
  consumption / distance * 100 * cost_per_kwh as cost_mileage
from derived cross join charges
"""


# Charge Delta: start and end SOC per charging session, collapsed so several
# sessions at the same place (odometer moved less than 2 km between them) read
# as one.
CHARGE_DELTA_SQL = f"""
WITH charges AS (
    SELECT
        cp.end_date,
        cp.start_battery_level,
        cp.end_battery_level,
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
    WHERE {_BASE_FILTER}
)
SELECT
    MIN(end_date) as time,
    MIN(start_battery_level) as start_soc,
    MAX(end_battery_level) as end_soc
FROM charges
GROUP BY
    CASE WHEN odometer - odometer_prev < 2 THEN odometer_prev ELSE odometer END
ORDER BY
    time
"""


# DC Charging Curve. Upstream's two xychart targets -- the per-session traces
# and the median curve across all of them -- are unioned here with a `series`
# column so both come from one scan.
#
# Upstream's target 1 groups by `p,start_date` (a comma where a period was
# meant), which happens to work because grouping by the whole row `p` is
# equivalent to grouping by its primary key. The intent is spelled out here.
DC_CHARGING_CURVE_SQL = """
SELECT
  'session' AS series,
  c.battery_level as soc,
  round(avg(c.charger_power), 0) as power,
  c.charging_process_id::text as session_id,
  COALESCE(g.name, a.name) || ' ' || to_char(timezone('$__timezone', timezone('UTC', c.date)), 'YYYY-MM-DD') as label
FROM
  charges c
JOIN charging_processes p ON p.id = c.charging_process_id
JOIN addresses a ON a.id = p.address_id
LEFT JOIN geofences g ON g.id = p.geofence_id
WHERE
  $__timeFilter(c.date)
 AND p.car_id = $car_id
 AND c.charger_power > 0
 AND c.fast_charger_present
 AND ('${geofence:pipe}' = '-1' OR p.geofence_id in ($geofence))
GROUP BY c.battery_level, c.charging_process_id, a.name, g.name, to_char(timezone('$__timezone', timezone('UTC', c.date)), 'YYYY-MM-DD')

UNION ALL

SELECT
  'median',
  c.battery_level,
  PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY charger_power),
  NULL,
  NULL
FROM
  charges c
join
  charging_processes p ON p.id = c.charging_process_id
WHERE
  $__timeFilter(c.date)
 AND p.car_id = $car_id
 AND charger_power > 0
 AND c.fast_charger_present
 AND ('${geofence:pipe}' = '-1' OR p.geofence_id in ($geofence))
GROUP BY c.battery_level

ORDER BY 1, 4, 2
"""


TOP_STATIONS_ENERGY_SQL = f"""
SELECT
    COALESCE(geofence.name, CONCAT_WS(', ', COALESCE(address.name, nullif(CONCAT_WS(' ', address.road, address.house_number), '')), address.city)) AS location,
  sum(charge_energy_added) as charge_energy_added
FROM
    charging_processes cp
LEFT JOIN addresses address ON cp.address_id = address.id
LEFT JOIN geofences geofence ON cp.geofence_id = geofence.id
WHERE {_BASE_FILTER}
GROUP BY
    1
ORDER BY
    SUM(charge_energy_added) DESC
LIMIT 17
"""


TOP_STATIONS_COST_SQL = f"""
SELECT
    COALESCE(geofence.name, CONCAT_WS(', ', COALESCE(address.name, CONCAT_WS(' ', address.road, address.house_number)), address.city)) AS location,
    sum(cost) as cost
FROM
    charging_processes cp
    LEFT JOIN addresses address ON cp.address_id = address.id
    LEFT JOIN geofences geofence ON cp.geofence_id = geofence.id
WHERE {_BASE_FILTER}
    AND cp.cost IS NOT NULL
GROUP BY
    1
ORDER BY
    2 DESC NULLS LAST
LIMIT 17
"""
