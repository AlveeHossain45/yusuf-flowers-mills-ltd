import { AlertTriangle } from 'lucide-react';
import Badge from '../common/Badge';
import { formatKg } from '../../utils/formatters';
import { getStockStatus } from '../../utils/calculations';

export default function LowStockAlerts({ stock = [] }) {
  const low = stock
    .map((s) => ({ ...s, status: getStockStatus(s.quantity, s.minStock) }))
    .filter((s) => s.status !== 'healthy');

  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={16} className="text-amber-500" />
        <h3 className="font-semibold text-slate-900">Low Stock Alerts</h3>
      </div>
      {low.length === 0 ? (
        <p className="text-sm text-slate-400 py-4 text-center">All stock levels are healthy</p>
      ) : (
        <ul className="space-y-3">
          {low.map((s) => (
            <li key={s.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-800">{s.name}</p>
                <p className="text-xs text-slate-500">Min: {formatKg(s.minStock)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-800">{formatKg(s.quantity)}</p>
                <Badge variant={s.status === 'critical' ? 'danger' : 'warning'}>
                  {s.status === 'critical' ? 'Critical' : 'Low'}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}