import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDate, formatKg } from '../../utils/formatters';

export default function RecentDelivery({ rows = [] }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Recent Deliveries</h3>
        <Link to="/delivery" className="text-xs text-brand-600 hover:underline flex items-center gap-1">
          View all <ArrowRight size={12} />
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-400 py-6 text-center">No data available</p>
      ) : (
        <ul className="space-y-3">
          {rows.slice(0, 5).map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{r.customer}</p>
                <p className="text-xs text-slate-500">
                  {r.product} • {formatDate(r.date)}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-medium text-slate-800">{formatKg(r.quantity)}</p>
                <Badge variant={r.status === 'Delivered' ? 'success' : 'warning'}>{r.status}</Badge>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}