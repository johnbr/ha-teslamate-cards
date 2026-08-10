-- TeslaMate Grafana dashboard: statistics
--
-- Extracted verbatim from /dashboards/statistics.json inside the teslamate grafana
-- image. This file is REFERENCE ONLY -- it is not executed. It is the
-- specification the ported queries in custom_components/teslamate_cards/queries/
-- are validated against, panel by panel.
--
-- Source: https://github.com/teslamate-org/teslamate (MIT). See reference/README.md.
--
-- Dashboard template variables: car_id, length_unit, temp_unit, period, preferred_range, base_url, high_precision
-- Grafana macros used: $__timeFilter, $__timezone, $car_id, $high_precision, $length_unit, $period, $temp_unit, ${preferred_range}
-- Panels with SQL: 1  (one table panel, four targets)
--
-- Dashboard defaults: time range now-10y..now, period=month, high_precision=0.
--
-- ###########################################################################
-- # THE SQL BELOW IS NOT THE WHOLE COMPUTATION.                             #
-- ###########################################################################
--
-- This panel's four targets are joined and then EXTENDED by Grafana transforms,
-- and most of the cost columns exist only in that chain -- there is no SQL for
-- them anywhere. Ported verbatim and no further, the table renders without a
-- single cost-per-kWh or overhead figure. This is the same trap as the Trip
-- dashboard's "cost per distance" panel, which reads $0.00 taken at face value.
--
-- The chain, in order:
--
--   merge
--   seriesToColumns    byField: date          <- an OUTER join, not an inner one
--   sortBy             date desc
--   calculateField     avg_cost_kwh         = cost_charges / sum_energy_used_kwh
--   calculateField     avg_cost_added_kwh   = cost_charges / sum_energy_added_kwh
--   calculateField     cost_per_1000km      = consumption_gross_km * avg_cost_added_kwh
--   calculateField     cost_per_1000mi      = consumption_gross_mi * avg_cost_added_kwh
--   calculateField     avg_cost_km          = cost_per_1000km / 10
--   calculateField     avg_cost_mi          = cost_per_1000mi / 10
--   calculateField     overhead_pct_km_temp = consumption_net_km / consumption_gross_km
--   calculateField     overhead_pct_km      = 1 - overhead_pct_km_temp
--   calculateField     overhead_pct_mi_temp = consumption_net_mi / consumption_gross_mi
--   calculateField     overhead_pct_mi      = 1 - overhead_pct_mi_temp
--   organize           drop the intermediates, order and rename the rest
--
-- `consumption_gross_*` is Wh per distance unit, so Wh/km x $/kWh is dollars per
-- 1000 km -- which is why the /10 that follows yields cost per 100.
--
-- Displayed columns, in Grafana's own order, with the units it formats them in:
--
--   display                 Period                   (links to the Trip dashboard)
--   sum_duration_h          Time driven              dtdurations -- SECONDS despite the _h
--   sum_distance_$unit      Distance                 km | mi
--   avg_outside_temp_$unit  O Temp                   celsius | fahrenheit
--   cnt                     # of Drives
--   efficiency              Driving Efficiency       percentunit (0-1.15)
--   sum_energy_used_kwh     Energy used              kWh, 1dp
--   avg_energy_charged_kwh  O Energy used / Charge   kWh, 1dp
--   cost_charges            Costs                    2dp
--   cnt_charges             # of Charges
--   avg_cost_kwh            O Cost / kWh             2dp, NaN -> "--"
--   avg_cost_$unit          O Cost / 100 km | mi     2dp, NaN -> "--"
--   consumption_net_$unit   O Consumption (net)      Wh/km | Wh/mi
--   consumption_gross_$unit O Consumption (gross)    Wh/km | Wh/mi
--   overhead_pct_$unit      Consumption OH           percentunit, 0dp
--   is_incomplete           Data Complete            false -> OK, true -> !?
--
-- Note `sum_distance_$unit` is the ODOMETER SPAN over the period
-- (max(end_km) - min(start_km)), not sum(distance).

------------------------------------------------------------------------------
-- PANEL: per ${period}  [table] (target A/4)
------------------------------------------------------------------------------
WITH data AS (
SELECT
  duration_min > 1 AND
  distance > 1 AND
  ( 
    start_position.usable_battery_level IS NULL OR
    (end_position.battery_level - end_position.usable_battery_level) = 0 
  ) AS is_sufficiently_precise,
  start_${preferred_range}_range_km - end_${preferred_range}_range_km AS range_diff,
  date_trunc('$period', timezone('UTC', start_date), '$__timezone') as date,
  drives.*
FROM drives
  LEFT JOIN positions start_position ON start_position_id = start_position.id
  LEFT JOIN positions end_position ON end_position_id = end_position.id)
SELECT
  EXTRACT(EPOCH FROM date)*1000 AS date_from,
  EXTRACT(EPOCH FROM timezone('$__timezone', timezone('$__timezone', date) + interval '1 $period'))*1000 AS date_to,
  CASE '$period'
    WHEN 'month' THEN to_char(timezone('$__timezone', date), 'YYYY Month')
    WHEN 'year' THEN to_char(timezone('$__timezone', date), 'YYYY')
    WHEN 'week' THEN 'week ' || to_char(timezone('$__timezone', date), 'WW') || ' starting ' || to_char(timezone('$__timezone', date), 'YYYY-MM-DD')
    ELSE to_char(timezone('$__timezone', date), 'YYYY-MM-DD')
  END AS display,
  date,
  sum(duration_min)*60 AS sum_duration_h, 
  convert_km(max(end_km)::numeric - min(start_km)::numeric, '$length_unit') AS sum_distance_$length_unit,
  convert_celsius(avg(outside_temp_avg), '$temp_unit') AS avg_outside_temp_$temp_unit,
  count(*) AS cnt,
  case when sum(range_diff) > 0 then sum(distance)/sum(range_diff) else null end AS efficiency
FROM data WHERE
  car_id = $car_id AND
  $__timeFilter(start_date)
GROUP BY date

------------------------------------------------------------------------------
-- PANEL: per ${period}  [table] (target B/4)
------------------------------------------------------------------------------
WITH data AS (
  SELECT
    charging_processes.*,
  	date_trunc('$period', timezone('UTC', start_date), '$__timezone') as date
    FROM charging_processes)
SELECT
  EXTRACT(EPOCH FROM date)*1000 AS date_from,
  EXTRACT(EPOCH FROM timezone('$__timezone', timezone('$__timezone', date) + interval '1 $period'))*1000 AS date_to,
  CASE '$period'
    WHEN 'month' THEN to_char(timezone('$__timezone', date), 'YYYY Month')
    WHEN 'year' THEN to_char(timezone('$__timezone', date), 'YYYY')
    WHEN 'week' THEN 'week ' || to_char(timezone('$__timezone', date), 'WW') || ' starting ' || to_char(timezone('$__timezone', date), 'YYYY-MM-DD')
    ELSE to_char(timezone('$__timezone', date), 'YYYY-MM-DD')
  END AS display,
  date,
  sum(greatest(charge_energy_added,charge_energy_used)) AS sum_energy_used_kwh,
  sum(charge_energy_added) as sum_energy_added_kwh,
  sum(greatest(charge_energy_added,charge_energy_used)) / count(*) AS avg_energy_charged_kwh,
  sum(cost) AS cost_charges,
  count(*) AS cnt_charges
FROM data WHERE
  car_id = $car_id AND
  $__timeFilter(start_date) AND
  (charge_energy_added IS NULL OR charge_energy_added > 0)
GROUP BY date

------------------------------------------------------------------------------
-- PANEL: per ${period}  [table] (target C/4)
------------------------------------------------------------------------------
WITH data AS (
  SELECT
    drives.*,
    date_trunc('$period', timezone('UTC', start_date), '$__timezone') as date
  FROM drives)
SELECT
  EXTRACT(EPOCH FROM date)*1000 AS date_from,
  EXTRACT(EPOCH FROM timezone('$__timezone', timezone('$__timezone', date) + interval '1 $period'))*1000 AS date_to,
  CASE '$period'
    WHEN 'month' THEN to_char(timezone('$__timezone', date), 'YYYY Month')
    WHEN 'year' THEN to_char(timezone('$__timezone', date), 'YYYY')
    WHEN 'week' THEN 'week ' || to_char(timezone('$__timezone', date), 'WW') || ' starting ' || to_char(timezone('$__timezone', date), 'YYYY-MM-DD')
    ELSE to_char(timezone('$__timezone', date), 'YYYY-MM-DD')
  END AS display,
  date,
  sum((start_${preferred_range}_range_km - end_${preferred_range}_range_km) * car.efficiency * 1000) / 
  convert_km(sum(distance)::numeric, '$length_unit') as consumption_net_$length_unit
FROM data
JOIN cars car ON car.id = car_id
WHERE
  car_id = $car_id AND
  $__timeFilter(start_date)
GROUP BY date

------------------------------------------------------------------------------
-- PANEL: per ${period}  [table] (target D/4)
------------------------------------------------------------------------------
-- Query shared between Charging Stats, Efficiency, Statistics & Trip Dashboards (with minor changes) - ensure to modify in all places when necessary

with drives_start_event as (

    select
        'drive_start' as event, start_date as date, start_${preferred_range}_range_km as range, start_km as odometer, car_id, distance is null as is_incomplete
    from drives
    where car_id = $car_id and $__timeFilter(start_date) and 0 = $high_precision

),

drives_end_event as (

    select
        'drive_end' as event, case when end_date is null then start_date + interval '1 second' else end_date end as date, end_${preferred_range}_range_km as range, end_km as odometer, car_id, distance is null as is_incomplete
    from drives
    where car_id = $car_id and $__timeFilter(start_date) and 0 = $high_precision

),

charging_processes_start_event as (

    select
        'charging_process_start' as event, start_date as date, start_${preferred_range}_range_km as range, p.odometer, cp.car_id, end_date is null as is_incomplete
    from charging_processes cp
        inner join positions p on cp.position_id = p.id
    where cp.car_id = $car_id and $__timeFilter(start_date) and 0 = $high_precision

),

charging_processes_end_event as (

    select
        'charging_process_end' as event, case when end_date is null then start_date + interval '1 second' else end_date end as date, end_${preferred_range}_range_km as range, p.odometer, cp.car_id, end_date is null as is_incomplete
    from charging_processes cp
        inner join positions p on cp.position_id = p.id
    where cp.car_id = $car_id and $__timeFilter(start_date) and 0 = $high_precision

),

positions as (

    select
        case
            when drive_id is not null and lead(drive_id) over w is not null then 'drive_start'
            else 'something'
        end as event,
        date, ${preferred_range}_battery_range_km as range, p.odometer, p.car_id, false as is_incomplete
    from positions p
    where ideal_battery_range_km is not null and car_id = $car_id and 1 = $high_precision
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
        date_trunc('$period', timezone('UTC', date), '$__timezone') as date,
        case when is_incomplete then 0 else lead(odometer) over w - odometer end as distance,
        case when is_incomplete then 0 else case when event != 'drive_start' then greatest(range - lead(range) over w, 0) else range - lead(range) over w end end as range_loss,
        sum(case when is_incomplete then 1 else 0 end) over w > 0 as is_incomplete
    from combined
    window w as (order by date asc)

)

select
    EXTRACT(EPOCH FROM date)*1000 AS date_from,
    EXTRACT(EPOCH FROM timezone('$__timezone', timezone('$__timezone', date) + interval '1 $period'))*1000 AS date_to,
    CASE '$period'
        WHEN 'month' THEN to_char(timezone('$__timezone', date), 'YYYY Month')
        WHEN 'year' THEN to_char(timezone('$__timezone', date), 'YYYY')
        WHEN 'week' THEN 'week ' || to_char(timezone('$__timezone', date), 'WW') || ' starting ' || to_char(timezone('$__timezone', date), 'YYYY-MM-DD')
        ELSE to_char(timezone('$__timezone', date), 'YYYY-MM-DD')
    END AS display,
    date,
    (sum(range_loss) * c.efficiency * 1000) / nullif(convert_km(sum(distance)::numeric, '$length_unit'), 0) as consumption_gross_$length_unit,
    is_incomplete
from final
    inner join cars c on car_id = c.id
group by 1, 2, 3, 4, c.efficiency, is_incomplete
