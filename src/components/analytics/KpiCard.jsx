export default function KpiCard({ label, value, sub, accent = 'text-slate-900' }) {
    return (
      <div className="card p-4">
        <p className="text-[11px] uppercase tracking-wide text-slate-500 font-medium">
          {label}
        </p>
        <p className={`text-xl font-semibold mt-1.5 ${accent}`}>{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
      </div>
    );
  }