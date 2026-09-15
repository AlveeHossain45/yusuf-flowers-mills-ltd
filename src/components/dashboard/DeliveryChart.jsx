import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from 'recharts';
  import { formatDate } from '../../utils/formatters';
  
  export default function DeliveryChart({ data }) {
    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-sm text-slate-400">
          No data available
        </div>
      );
    }
    return (
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#eef2f7" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(v) => formatDate(v).slice(0, 6)}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip
            labelFormatter={(v) => formatDate(v)}
            formatter={(v) => [`${v} KG`, 'Delivered']}
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
          />
          <Bar dataKey="quantity" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }