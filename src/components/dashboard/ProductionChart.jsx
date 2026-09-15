import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from 'recharts';
  import { formatDate } from '../../utils/formatters';
  
  export default function ProductionChart({ data }) {
    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-sm text-slate-400">
          No data available
        </div>
      );
    }
    return (
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3563ff" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#3563ff" stopOpacity={0} />
            </linearGradient>
          </defs>
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
            formatter={(v) => [`${v} KG`, 'Output']}
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
          />
          <Area
            type="monotone"
            dataKey="output"
            stroke="#3563ff"
            strokeWidth={2}
            fill="url(#prodGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }