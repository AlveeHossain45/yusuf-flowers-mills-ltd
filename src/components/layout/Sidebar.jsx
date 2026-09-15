import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Factory,
  Truck,
  ShoppingCart,
  Users,
  Building2,
  Wallet,
  FileBarChart,
  BarChart3,
  Settings,
  X,
} from 'lucide-react';

export const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/stock', label: 'Stock', icon: Package },
  { to: '/production', label: 'Production', icon: Factory },
  { to: '/delivery', label: 'Delivery', icon: Truck },
  { to: '/purchases', label: 'Purchases', icon: ShoppingCart },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/suppliers', label: 'Suppliers', icon: Building2 },
  { to: '/expenses', label: 'Expenses', icon: Wallet },
  { to: '/reports', label: 'Reports', icon: FileBarChart },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky lg:top-0 inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold">
              Y
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 leading-tight">
                Yusuf Flowers
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide">
                Mills LTD
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md hover:bg-slate-100 text-slate-500"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 leading-relaxed">
            © {new Date().getFullYear()} Yusuf Flowers Mills LTD
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Developed by{' '}
            <a
              href="https://onexero.netlify.app"
              target="_blank"
              rel="noreferrer"
              className="text-brand-600 hover:underline"
            >
              Onexero
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}