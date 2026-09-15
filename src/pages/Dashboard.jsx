import { useMemo, useState } from 'react';
import { Wheat, Factory, Truck, Package, Boxes } from 'lucide-react';
import { useData } from '../context/DataContext';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import DateRangeFilter, { useDateFilter } from '../components/common/DateRangeFilter';
import QuickActions from '../components/dashboard/QuickActions';
import ProductionChart from '../components/dashboard/ProductionChart';
import DeliveryChart from '../components/dashboard/DeliveryChart';
import StockChart from '../components/dashboard/StockChart';
import ProductionVsDeliveryChart from '../components/dashboard/ProductionVsDeliveryChart';
import RecentDelivery from '../components/dashboard/RecentDelivery';
import LowStockAlerts from '../components/dashboard/LowStockAlerts';
import {
  calculateTotalOutput,
  filterByDateRange,
  sumBy,
} from '../utils/calculations';
import { formatKg, formatNumber, todayISO } from '../utils/formatters';

export default function Dashboard() {
  const { stock, production, delivery } = useData();
  const { from, to } = useDateFilter('7 Days');
  const [chartRange, setChartRange] = useState('7 Days');

  const today = todayISO();

  const todayProduction = production.filter((p) => p.date === today);
  const todayDelivery = delivery.filter((d) => d.date === today);
  const todayOutput = todayProduction.reduce(
    (acc, p) => acc + calculateTotalOutput(p),
    0
  );
  const todayDeliveryKg = sumBy(todayDelivery, 'quantity');

  const prodFiltered = filterByDateRange(production, from, to);
  const chartProduction = useMemo(() => {
    const map = new Map();
    prodFiltered.forEach((p) => {
      const key = p.date;
      if (!map.has(key)) map.set(key, { date: key, output: 0 });
      map.get(key).output += calculateTotalOutput(p);
    });
    return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
  }, [prodFiltered]);

  const delFiltered = filterByDateRange(delivery, from, to);
  const chartDelivery = useMemo(() => {
    const map = new Map();
    delFiltered.forEach((d) => {
      const key = d.date;
      if (!map.has(key)) map.set(key, { date: key, quantity: 0 });
      map.get(key).quantity += Number(d.quantity) || 0;
    });
    return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
  }, [delFiltered]);

  const chartStock = useMemo(() => {
    const dates = new Set([
      ...chartProduction.map((r) => r.date),
      ...chartDelivery.map((r) => r.date),
    ]);
    const sorted = Array.from(dates).sort();
    let atta = stock.find((s) => s.id === 'atta')?.opening || 0;
    let maida = stock.find((s) => s.id === 'maida')?.opening || 0;
    let bhusi = stock.find((s) => s.id === 'bhusi')?.opening || 0;
    return sorted.map((date) => {
      const p = prodFiltered.filter((x) => x.date === date);
      const d = delFiltered.filter((x) => x.date === date);
      atta += sumBy(p, 'atta') - sumBy(d.filter((x) => x.product === 'Atta'), 'quantity');
      maida += sumBy(p, 'maida') - sumBy(d.filter((x) => x.product === 'Maida'), 'quantity');
      bhusi += sumBy(p, 'bhusi') - sumBy(d.filter((x) => x.product === 'Bhusi'), 'quantity');
      return { date, atta, maida, bhusi };
    });
  }, [chartProduction, chartDelivery, prodFiltered, delFiltered, stock]);

  const chartProdVsDel = useMemo(() => {
    const map = new Map();
    chartProduction.forEach((r) => {
      map.set(r.date, { date: r.date, production: r.output, delivery: 0 });
    });
    chartDelivery.forEach((r) => {
      if (!map.has(r.date))
        map.set(r.date, { date: r.date, production: 0, delivery: 0 });
      map.get(r.date).delivery = r.quantity;
    });
    return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
  }, [chartProduction, chartDelivery]);

  const getStock = (id) =>
    stock.find((s) => s.id === id) || { quantity: 0, bags: 0, minStock: 0 };

  return (
    <>
      <PageHeader
        title="Welcome, Admin"
        subtitle={`Yusuf Flowers Mills LTD • ${new Date().toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}`}
        actions={
          <span className="text-xs text-slate-500">Last updated: just now</span>
        }
      />

      <div className="mb-6">
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Wheat Stock"
          value={formatKg(getStock('wheat').quantity)}
          sub={`${formatNumber(getStock('wheat').bags)} Bags`}
          icon={Wheat}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Atta Stock"
          value={formatKg(getStock('atta').quantity)}
          sub={`${formatNumber(getStock('atta').bags)} Bags`}
          icon={Package}
          iconBg="bg-brand-50"
          iconColor="text-brand-600"
        />
        <StatCard
          title="Maida Stock"
          value={formatKg(getStock('maida').quantity)}
          sub={`${formatNumber(getStock('maida').bags)} Bags`}
          icon={Boxes}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Bhusi Stock"
          value={formatKg(getStock('bhusi').quantity)}
          sub={`${formatNumber(getStock('bhusi').bags)} Bags`}
          icon={Package}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Today's Production"
          value={formatKg(todayOutput)}
          sub={`${todayProduction.length} entries`}
          icon={Factory}
          iconBg="bg-brand-50"
          iconColor="text-brand-600"
        />
        <StatCard
          title="Today's Delivery"
          value={formatKg(todayDeliveryKg)}
          sub={`${todayDelivery.length} deliveries`}
          icon={Truck}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <LowStockAlerts stock={stock} />
        </div>
        <RecentDelivery rows={delivery} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="font-semibold text-slate-900">Overview</h2>
        <DateRangeFilter value={chartRange} onChange={setChartRange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Production</h3>
          <ProductionChart data={chartProduction} />
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Delivery</h3>
          <DeliveryChart data={chartDelivery} />
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Stock Trend</h3>
          <StockChart data={chartStock} />
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">
            Production vs Delivery
          </h3>
          <ProductionVsDeliveryChart data={chartProdVsDel} />
        </div>
      </div>
    </>
  );
}