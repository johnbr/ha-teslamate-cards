"""Statistics dashboard.

Upstream reference: ``reference/grafana/statistics.sql``.

One table panel, four targets, rolled up per ``$period`` (day/week/month/year).

**Why this is one statement and not four.** Upstream's panel joins its targets
with a ``seriesToColumns`` transformation and then *computes six more columns*
with ``calculateField`` -- every cost-per-kWh, cost-per-100 and consumption
overhead figure exists only in that chain, with no SQL behind it anywhere. A
verbatim port of the four ``rawSql`` blocks renders a table with none of them,
which is the same trap the Trip dashboard's cost-per-distance panel set (it
reads ``$0.00`` taken at face value, because Grafana was going to join the
energy term in afterwards).

So the join and the derived columns are done here, in SQL:

* ``seriesToColumns byField: date`` is an **outer** join -- a period with charges
  but no drives still gets a row, and vice versa. That is what ``periods`` +
  ``LEFT JOIN`` reproduces; an inner join would silently drop months.
* ``display``/``date_from``/``date_to`` are functions of the bucket alone, so
  they are computed once here rather than four times and de-duplicated after.

Three deliberate divergences from upstream, all of which leave every displayed
number unchanged:

1. ``consumption_net`` divides by ``convert_km(sum(distance))`` with no guard
   upstream, so a period whose drives sum to zero distance raises
   ``division_by_zero`` and takes the whole card down. Upstream's own target D
   guards the identical division with ``nullif``; target C just missed it. Added.
2. ``is_incomplete`` is a *running* flag (``sum(...) over w > 0``), so the period
   in which the first incomplete record appears contains rows on both sides of
   the transition and upstream emits that period twice. ``bool_or`` folds it to
   one row per period, which is also the only shape a joined table can use.
3. The vestigial ``is_sufficiently_precise`` column is kept even though nothing
   selects it (it belongs to the Efficiency dashboard, which shares this SQL).
   PostgreSQL prunes it and elides both ``positions`` joins, so it costs
   nothing, and keeping it keeps the diff against upstream honest.
"""

from __future__ import annotations

from ._energy_stitch import energy_stitch_ctes

# The bucket. Upstream repeats this expression in all four targets; it is the
# join key, so it must be character-identical between them.
_BUCKET = "date_trunc('$period', timezone('UTC', start_date), '$__timezone') as date"

# Upstream's period label, repeated verbatim in every target. `WW` is the
# week-of-year; the ELSE arm covers 'day'.
_DISPLAY = """CASE '$period'
        WHEN 'month' THEN to_char(timezone('$__timezone', p.date), 'YYYY Month')
        WHEN 'year' THEN to_char(timezone('$__timezone', p.date), 'YYYY')
        WHEN 'week' THEN 'week ' || to_char(timezone('$__timezone', p.date), 'WW') || ' starting ' || to_char(timezone('$__timezone', p.date), 'YYYY-MM-DD')
        ELSE to_char(timezone('$__timezone', p.date), 'YYYY-MM-DD')
    END AS display"""

_STITCH = energy_stitch_ctes("start_date", precision="toggle", bucket_by_period=True)

STATISTICS_SQL = f"""
WITH drive_data AS (
    SELECT
        duration_min > 1 AND
        distance > 1 AND
        (
            start_position.usable_battery_level IS NULL OR
            (end_position.battery_level - end_position.usable_battery_level) = 0
        ) AS is_sufficiently_precise,
        start_${{preferred_range}}_range_km - end_${{preferred_range}}_range_km AS range_diff,
        {_BUCKET},
        drives.*
    FROM drives
        LEFT JOIN positions start_position ON start_position_id = start_position.id
        LEFT JOIN positions end_position ON end_position_id = end_position.id
),

-- Target A. Note `sum_duration_h` is SECONDS -- upstream's alias says hours and
-- its own panel formats the column as `dtdurations`, which reads seconds. The
-- name is kept so the two can be diffed, and the card divides.
--
-- `sum_distance` is the ODOMETER SPAN over the period, not sum(distance): a
-- drive TeslaMate failed to log still moved the car, and the odometer caught it.
drive_stats AS (
    SELECT
        date,
        sum(duration_min)*60 AS sum_duration_h,
        convert_km(max(end_km)::numeric - min(start_km)::numeric, '$length_unit') AS sum_distance_$length_unit,
        convert_celsius(avg(outside_temp_avg), '$temp_unit') AS avg_outside_temp_$temp_unit,
        count(*) AS cnt,
        case when sum(range_diff) > 0 then sum(distance)/sum(range_diff) else null end AS efficiency
    FROM drive_data
    WHERE car_id = $car_id AND $__timeFilter(start_date)
    GROUP BY date
),

charge_data AS (
    SELECT
        charging_processes.*,
        {_BUCKET}
    FROM charging_processes
),

-- Target B. `sum(cost)` skips NULL costs while the energy terms count every
-- row, which is what makes the cost-per-kWh below meaningful for an owner with
-- free Supercharging. Do not "fix" it into an average over priced sessions.
charge_stats AS (
    SELECT
        date,
        sum(greatest(charge_energy_added,charge_energy_used)) AS sum_energy_used_kwh,
        sum(charge_energy_added) as sum_energy_added_kwh,
        sum(greatest(charge_energy_added,charge_energy_used)) / count(*) AS avg_energy_charged_kwh,
        sum(cost) AS cost_charges,
        count(*) AS cnt_charges
    FROM charge_data
    WHERE car_id = $car_id AND $__timeFilter(start_date) AND
        (charge_energy_added IS NULL OR charge_energy_added > 0)
    GROUP BY date
),

net_data AS (
    SELECT
        drives.*,
        {_BUCKET}
    FROM drives
),

-- Target C: consumption over the drives alone, so it excludes standby losses.
net_consumption AS (
    SELECT
        date,
        sum((start_${{preferred_range}}_range_km - end_${{preferred_range}}_range_km) * car.efficiency * 1000) /
        nullif(convert_km(sum(distance)::numeric, '$length_unit'), 0) as consumption_net_$length_unit
    FROM net_data
    JOIN cars car ON car.id = car_id
    WHERE car_id = $car_id AND $__timeFilter(start_date)
    GROUP BY date
),

-- Target D: the shared event stitch, which counts range lost while parked too,
-- hence "gross". Its own WITH is scoped to this CTE, so the `positions` CTE
-- inside shadows the table only in there -- `drive_data` above still reads the
-- real table.
gross_consumption AS (
    WITH {_STITCH}

    select
        date,
        (sum(range_loss) * c.efficiency * 1000) /
        nullif(convert_km(sum(distance)::numeric, '$length_unit'), 0) as consumption_gross_$length_unit,
        bool_or(is_incomplete) as is_incomplete
    from final
        inner join cars c on car_id = c.id
    group by date, c.efficiency
),

-- The outer join key. Every target buckets identically, but none of them is
-- guaranteed to have a row for a given period.
periods AS (
    SELECT date FROM drive_stats
    UNION
    SELECT date FROM charge_stats
    UNION
    SELECT date FROM net_consumption
    UNION
    SELECT date FROM gross_consumption
)

SELECT
    EXTRACT(EPOCH FROM p.date)*1000 AS date_from,
    EXTRACT(EPOCH FROM timezone('$__timezone', timezone('$__timezone', p.date) + interval '1 $period'))*1000 AS date_to,
    {_DISPLAY},
    d.sum_duration_h,
    d.sum_distance_$length_unit,
    d.avg_outside_temp_$temp_unit,
    d.cnt,
    d.efficiency,
    c.sum_energy_used_kwh,
    c.avg_energy_charged_kwh,
    c.cost_charges,
    c.cnt_charges,

    -- Below here: Grafana's calculateField chain, in SQL. See the module
    -- docstring -- none of these exist in upstream's rawSql.
    --
    -- Cost per kWh is priced on energy USED, cost per distance on energy
    -- ADDED, because consumption is measured at the battery. That asymmetry is
    -- upstream's and it is deliberate.
    c.cost_charges / nullif(c.sum_energy_used_kwh, 0) AS avg_cost_kwh,
    -- Wh/distance x $/kWh is dollars per 1000 distance units, so /10 is per 100.
    g.consumption_gross_$length_unit * (c.cost_charges / nullif(c.sum_energy_added_kwh, 0)) / 10
        AS avg_cost_$length_unit,
    n.consumption_net_$length_unit,
    g.consumption_gross_$length_unit,
    1 - (n.consumption_net_$length_unit / nullif(g.consumption_gross_$length_unit, 0))
        AS overhead_pct_$length_unit,
    coalesce(g.is_incomplete, false) AS is_incomplete
FROM periods p
    LEFT JOIN drive_stats d ON d.date = p.date
    LEFT JOIN charge_stats c ON c.date = p.date
    LEFT JOIN net_consumption n ON n.date = p.date
    LEFT JOIN gross_consumption g ON g.date = p.date
ORDER BY p.date DESC
"""
