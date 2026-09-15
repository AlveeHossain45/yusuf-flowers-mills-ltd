import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from 'recharts';
  import { formatDate } from '../../utils/formatters';
  
  export default function ProductionVsDeliveryChart({ data }) {
    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-sm text-slate-400">
          No data available
        </div>
      );
    }
    return (
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="production" stroke="#3563ff" strokeWidth={2} name="Production" />
          <Line type="monotone" dataKey="delivery" stroke="#10b981" strokeWidth={2} name="Delivery" />
        </LineChart>
      </ResponsiveContainer>
    );
  }