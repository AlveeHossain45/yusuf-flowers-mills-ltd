import { useMemo, useState } from 'react';
import { useData } from '../context/DataContext';
import PageHeader from '../components/common/PageHeader';
import DateRangeFilter, { getRangeFromOption } from '../components/common/DateRangeFilter';
import {
  KpiCard,
  ProductionTrendChart,
  DeliveryTrendChart,
  StockTrendChart,
  ProductProductionChart,
} from '../components/analytics';
import { filterByDateRange, sumBy, groupByDate } from '../utils/calculations';
import { formatKg } from '../utils/formatters';

const ANALYTICS_OPTIONS = [
  { label: '7 Days', days: 7 },
  { label: '10 Days', days: 10 },
  { label: '30 Days', days: 30 },
  { label: '3 Months', days: 90 },
  { label: '6 Months', days: 180 },
  { label: '1 Year', days: 365 },
];

export default function Analytics() {
  const { production, delivery, stock } = useData();
  const [rangeLabel, setRangeLabel] = useState('30 Days');

  const option = ANALYTICS_OPTIONS.find((o) => o.label === rangeLabel) || ANALYTICS_OPTIONS[2];
  const { from, to } = getRangeFromOption(option);

  const prod = useMemo(() => filterByDateRange(production, from, to), [production, from, to]);
  const del = useMemo(() => filterByDateRange(delivery, from, to), [delivery, from, to]);

  const kpis = useMemo(() => {
    const totalProduction = sumBy(prod, 'atta') + sumBy(prod, 'maida') + sumBy(prod, 'bhusi');
    const totalDelivery = sumBy(del, 'quantity');
    const totalWheat = sumBy(prod, 'wheatUsed');
    const totalAtta = sumBy(prod, 'atta');
    const totalMaida = sumBy(prod, 'maida');
    const totalBhusi = sumBy(prod, 'bhusi');
    const totalLoss = sumBy(prod, 'loss');
    const avgProd = prod.length ? Math.round(totalProduction / prod.length) : 0;
    const avgDel = del.length ? Math.round(totalDelivery / del.length) : 0;
    const eff = totalWheat ? Math.round((totalProduction / totalWheat) * 1000) / 10 : 0;
    return {
      totalProduction,
      totalDelivery,
      totalWheat,
      totalAtta,
      totalMaida,
      totalBhusi,
      totalLoss,
      avgProd,
      avgDel,
      eff,
    };
  }, [prod, del]);

  const productionTrend = useMemo(
    () => groupByDate(prod, ['wheatUsed', 'atta', 'maida', 'bhusi', 'loss']),
    [prod]
  );
  const deliveryTrend = useMemo(() => groupByDate(del, ['quantity']), [del]);

  const productProduction = useMemo(
    () => [
      { name: 'Atta', value: kpis.totalAtta },
      { name: 'Maida', value: kpis.totalMaida },
      { name: 'Bhusi', value: kpis.totalBhusi },
    ],
    [kpis]
  );

  const stockTrend = useMemo(
    () => stock.map((s) => ({ name: s.name, value: s.quantity })),
    [stock]
  );

  return (
    <>
      <PageHeader title="Analytics" subtitle="Business insights and trends" />

      <div className="mb-4">
        <DateRangeFilter value={rangeLabel} onChange={setRangeLabel} options={ANALYTICS_OPTIONS} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <KpiCard label="Total Production" value={formatKg(kpis.totalProduction)} />
        <KpiCard label="Total Delivery" value={formatKg(kpis.totalDelivery)} />
        <KpiCard label="Total Wheat Used" value={formatKg(kpis.totalWheat)} />
        <KpiCard label="Total Atta" value={formatKg(kpis.totalAtta)} />
        <KpiCard label="Total Maida" value={formatKg(kpis.totalMaida)} />
        <KpiCard label="Total Bhusi" value={formatKg(kpis.totalBhusi)} />
        <KpiCard label="Total Loss" value={formatKg(kpis.totalLoss)} accent="text-red-600" />
        <KpiCard label="Avg Daily Production" value={formatKg(kpis.avgProd)} />
        <KpiCard label="Avg Daily Delivery" value={formatKg(kpis.avgDel)} />
        <KpiCard label="Avg Efficiency" value={`${kpis.eff}%`} accent="text-brand-700" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Production Trend</h3>
          <ProductionTrendChart data={productionTrend} />
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Delivery Trend</h3>
          <DeliveryTrendChart data={deliveryTrend} />
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Product Production</h3>
          <ProductProductionChart data={productProduction} />
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Stock Levels</h3>
          <StockTrendChart data={stockTrend} />
        </div>
      </div>
    </>
  );
}