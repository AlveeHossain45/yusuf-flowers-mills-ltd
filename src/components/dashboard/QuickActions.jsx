import { Link } from 'react-router-dom';
import { Factory, Truck, PackagePlus } from 'lucide-react';

const actions = [
  { to: '/production', label: 'Add Production', icon: Factory, color: 'bg-brand-50 text-brand-700 hover:bg-brand-100' },
  { to: '/delivery', label: 'Add Delivery', icon: Truck, color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
  { to: '/stock', label: 'Update Stock', icon: PackagePlus, color: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {actions.map(({ to, label, icon: Icon, color }) => (
        <Link
          key={to}
          to={to}
          className={`flex items-center gap-3 rounded-xl px-4 py-3.5 transition-colors ${color}`}
        >
          <Icon size={20} />
          <span className="text-sm font-medium">{label}</span>
        </Link>
      ))}
    </div>
  );
}