export default function StatCard({
    title,
    value,
    sub,
    icon: Icon,
    iconColor = 'text-brand-600',
    iconBg = 'bg-brand-50',
    trend,
    badge,
  }) {
    return (
      <div className="card p-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-slate-500 font-medium">{title}</p>
            <p className="text-2xl font-semibold text-slate-900 mt-2 truncate">{value}</p>
            {sub && <p className="text-sm text-slate-500 mt-1">{sub}</p>}
          </div>
          {Icon && (
            <div className={`w-10 h-10 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
              <Icon size={20} />
            </div>
          )}
        </div>
        {(trend || badge) && (
          <div className="mt-3 flex items-center justify-between">
            {trend && <span className="text-xs text-slate-500">{trend}</span>}
            {badge}
          </div>
        )}
      </div>
    );
  }