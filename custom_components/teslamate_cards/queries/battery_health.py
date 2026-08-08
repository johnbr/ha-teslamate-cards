"""Battery Health dashboard.

Upstream reference: ``reference/grafana/battery-health.sql``.

**This is the one dashboard whose SQL is deliberately not kept verbatim**, and
the reason is worth stating: eight of its panels read a Grafana *template
variable* called ``$aux``, which is itself a hidden query returning a JSON
object::

    SELECT json_build_object('MaxRange', ..., 'CurrentCapacity', ...) #>> '{}'

Grafana runs that query first, then interpolates the resulting JSON **as a
string literal** into each panel, which parses it back out again::

    ('$aux'::json ->> 'CurrentCapacity')::float

Reproducing that faithfully would mean an extra round trip per card render and,
worse, splicing a server-generated string into SQL text -- the one thing
``macros.py`` exists to avoid. So the ``aux`` query is inlined here as ordinary
CTEs and its five values are returned as typed columns.

The CTE bodies below are upstream's, unchanged. Only the final ``SELECT`` differs
-- and it was verified against upstream's own ``json_build_object`` output on the
live database, matching to the last decimal place on all five values::

    {"MaxRange": 296.4340266545365243, "CurrentRange": 279.9698427098479294,
     "MaxCapacity": 92.54993333333336, "CurrentCapacity": 87.4211485834448,
     "RatedEfficiency": 19.3}

Note that nothing here is time-filtered: battery health is an all-time view, so
the card's ``days`` option does not apply to it.
"""

from __future__ import annotations

# The shared `aux` CTE: rated efficiency, plus the capacity/range extremes every
# scalar panel derives from. Kept as a fragment because the capacity-history
# query needs the efficiency term too.
_AUX_CTE = """
aux AS (
    SELECT
        car_id,
        COALESCE(derived_efficiency, car_efficiency) AS efficiency
    FROM (
        SELECT
            ROUND((charge_energy_added / NULLIF(end_rated_range_km - start_rated_range_km, 0))::numeric, 3) * 100 AS derived_efficiency,
            COUNT(*) as count,
            cars.id as car_id,
            cars.efficiency * 100 AS car_efficiency
        FROM cars
            LEFT JOIN charging_processes ON
                cars.id = charging_processes.car_id
                AND duration_min > 10
                AND end_battery_level <= 95
                AND start_rated_range_km IS NOT NULL
                AND end_rated_range_km IS NOT NULL
                AND charge_energy_added > 0
        WHERE cars.id = $car_id
        GROUP BY 1, 3, 4
        ORDER BY 2 DESC
        LIMIT 1
    ) AS Efficiency
)"""

# `$custom_kwh_new` and `$custom_max_range` are Grafana textbox variables that
# override the derived figures when non-zero. Grafana interpolates them as bare
# numeric literals; as bind parameters they need an explicit cast, because
# `CASE WHEN $1 > 0 THEN $1 ELSE <double> END` leaves PostgreSQL no way to infer
# the parameter's type. Same class of fix as the `::bigint` on the epoch macros.
BATTERY_HEALTH_SQL = f"""
WITH {_AUX_CTE},

CurrentCapacity AS (
    SELECT
        AVG(Capacity) AS Capacity
    FROM (
        SELECT
            c.rated_battery_range_km * aux.efficiency / c.usable_battery_level AS Capacity
        FROM charging_processes cp
            INNER JOIN charges c ON c.charging_process_id = cp.id
            INNER JOIN aux ON cp.car_id = aux.car_id
        WHERE
            cp.car_id = $car_id
            AND cp.end_date IS NOT NULL
            AND cp.charge_energy_added >= aux.efficiency
            AND c.usable_battery_level > 0
        ORDER BY cp.end_date DESC, c.date desc
        LIMIT 100
    ) AS lastCharges
),

MaxCapacity AS (
    SELECT
        MAX(c.rated_battery_range_km * aux.efficiency / c.usable_battery_level) AS Capacity
    FROM charging_processes cp
        INNER JOIN (
            SELECT
                charging_process_id,
                MAX(date) as date FROM charges WHERE usable_battery_level > 0 GROUP BY charging_process_id
        ) AS gcharges ON
            cp.id = gcharges.charging_process_id
        INNER JOIN charges c ON
            c.charging_process_id = cp.id
            AND c.date = gcharges.date
        INNER JOIN aux ON cp.car_id = aux.car_id
    WHERE
        cp.car_id = $car_id
        AND cp.end_date IS NOT NULL
        AND cp.charge_energy_added >= aux.efficiency
),

CurrentRange AS (
    SELECT
        (range * 100.0 / usable_battery_level) AS range
    FROM (
        (
            SELECT
                date,
                ${{preferred_range}}_battery_range_km AS range,
                usable_battery_level AS usable_battery_level
            FROM positions
            WHERE
                car_id = $car_id
                AND ideal_battery_range_km IS NOT NULL
                AND usable_battery_level > 0
            ORDER BY date DESC
            LIMIT 1
        )
        UNION ALL
        (
            SELECT date,
                ${{preferred_range}}_battery_range_km AS range,
                usable_battery_level as usable_battery_level
            FROM charges c
                INNER JOIN charging_processes p ON p.id = c.charging_process_id
            WHERE
                p.car_id = $car_id
                AND usable_battery_level > 0
            ORDER BY date DESC
            LIMIT 1
        )
    ) AS data
    ORDER BY date DESC
    LIMIT 1
),

MaxRange AS (
    SELECT
        floor(extract(epoch from date)/86400)*86400 AS time,
        CASE
            WHEN sum(usable_battery_level) = 0 THEN sum(${{preferred_range}}_battery_range_km) * 100
            ELSE sum(${{preferred_range}}_battery_range_km) / sum(usable_battery_level) * 100
        END AS range
    FROM (
        SELECT
            battery_level,
            usable_battery_level,
            date,
            ${{preferred_range}}_battery_range_km
        FROM charges c
            INNER JOIN charging_processes p ON p.id = c.charging_process_id
        WHERE
            p.car_id = $car_id
            AND usable_battery_level IS NOT NULL
    ) AS data
    GROUP BY 1
    ORDER BY 2 DESC
    LIMIT 1
),

-- The "Current SOC" panel upstream is
--   SELECT * FROM ((positions ... LIMIT 1) UNION (charges ... LIMIT 1)) AS x LIMIT 1
-- whose outer LIMIT has no ORDER BY, so which of the two candidates it returns
-- is arbitrary. On this database they differ (60% from a position 22 hours after
-- a charge that ended at 73%), so the panel can show a stale charge-time value.
-- Upstream's own CurrentRange CTE above orders the same union by date, so this
-- follows that and takes the genuinely most recent reading.
CurrentSoc AS (
    SELECT usable_battery_level
    FROM (
        (
            SELECT usable_battery_level, date
            FROM positions
            WHERE car_id = $car_id AND usable_battery_level IS NOT NULL
            ORDER BY date DESC
            LIMIT 1
        )
        UNION ALL
        (
            SELECT usable_battery_level, date
            FROM charges c
                JOIN charging_processes p ON p.id = c.charging_process_id
            WHERE p.car_id = $car_id AND usable_battery_level IS NOT NULL
            ORDER BY date DESC
            LIMIT 1
        )
    ) AS candidates
    ORDER BY date DESC
    LIMIT 1
),

SocLimits AS (
    SELECT
        0 as lowest,
        20 as lower,
        CASE WHEN lfp_battery THEN 100 ELSE 81 END as upper
    FROM cars INNER JOIN car_settings ON cars.settings_id = car_settings.id
    WHERE cars.id = $car_id
),

Base AS (
    SELECT NULL
)

SELECT
    aux.efficiency AS rated_efficiency,
    CASE WHEN $custom_kwh_new::numeric > 0 THEN $custom_kwh_new::numeric
         ELSE MaxCapacity.Capacity END AS max_capacity,
    CASE WHEN CurrentCapacity.Capacity IS NULL THEN 1
         ELSE CurrentCapacity.Capacity END AS current_capacity,
    CASE WHEN $custom_max_range::numeric > 0 THEN $custom_max_range::numeric
         ELSE convert_km(MaxRange.range, '$length_unit') END AS max_range,
    convert_km(CurrentRange.range, '$length_unit') AS current_range,
    aux.efficiency * 10 / convert_km(1, '$length_unit') AS efficiency,
    GREATEST(0, 100.0 - (CurrentCapacity.Capacity * 100.0
        / CASE WHEN $custom_kwh_new::numeric > 0 THEN $custom_kwh_new::numeric
               ELSE MaxCapacity.Capacity END)) AS degradation_pct,
    LEAST(100, 100 - GREATEST(0, 100.0 - (CurrentCapacity.Capacity * 100.0
        / CASE WHEN $custom_kwh_new::numeric > 0 THEN $custom_kwh_new::numeric
               ELSE MaxCapacity.Capacity END))) AS health_pct,
    CurrentSoc.usable_battery_level AS current_soc,
    CurrentSoc.usable_battery_level * CurrentCapacity.Capacity / 100 AS stored_energy,
    SocLimits.lowest AS soc_lowest,
    SocLimits.lower AS soc_lower,
    SocLimits.upper AS soc_upper
FROM Base
    LEFT JOIN MaxRange ON true
    LEFT JOIN CurrentRange ON true
    LEFT JOIN Aux ON true
    LEFT JOIN MaxCapacity ON true
    LEFT JOIN CurrentCapacity ON true
    LEFT JOIN CurrentSoc ON true
    LEFT JOIN SocLimits ON true
"""


# Upstream's "Battery Capacity by Mileage" xychart has two targets -- the
# per-charge scatter and a half-monthly median trend over the same samples.
# They share every join, so they are one statement here with a `series` column,
# saving a round trip and guaranteeing both lines are computed from identical
# rows. Upstream's `('$aux'::json ->> 'RatedEfficiency')::float` becomes a
# CROSS JOIN against the aux CTE, which is a single row per car.
BATTERY_CAPACITY_HISTORY_SQL = f"""
WITH {_AUX_CTE},

last_charges AS (
    SELECT charging_process_id, MAX(date) as date
    FROM charges WHERE usable_battery_level > 0 GROUP BY charging_process_id
),

capacity_samples AS (
    SELECT
        p.odometer,
        c.rated_battery_range_km * aux.efficiency / c.usable_battery_level AS kwh,
        cp.end_date
    FROM charging_processes cp
        JOIN last_charges ON cp.id = last_charges.charging_process_id
        INNER JOIN charges c ON c.charging_process_id = cp.id AND c.date = last_charges.date
        INNER JOIN positions p ON p.id = cp.position_id
        CROSS JOIN aux
    WHERE cp.car_id = $car_id
        AND cp.end_date IS NOT NULL
        AND cp.charge_energy_added >= aux.efficiency
)

SELECT
    'sample' AS series,
    convert_km(AVG(odometer)::numeric, '$length_unit') AS odometer,
    AVG(kwh) AS kwh,
    to_char(timezone('$__timezone', timezone('UTC', end_date)), 'YYYY-MM-DD') AS label
FROM capacity_samples
GROUP BY to_char(timezone('$__timezone', timezone('UTC', end_date)), 'YYYY-MM-DD')

UNION ALL

SELECT
    'median',
    ROUND(MIN(convert_km(odometer::numeric, '$length_unit')), 0),
    ROUND(PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY kwh)::numeric, 1),
    to_char(timezone('$__timezone', timezone('UTC', end_date)), 'YYYYMM')
        || CASE WHEN to_char(timezone('$__timezone', timezone('UTC', end_date)), 'DD')::int <= 15
                THEN '1' ELSE '2' END
FROM capacity_samples
GROUP BY 4

ORDER BY 1, 2
"""
