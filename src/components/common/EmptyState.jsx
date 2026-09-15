export default function EmptyState({ icon: Icon, title = 'No data available', action }) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        {Icon && (
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <Icon size={22} />
          </div>
        )}
        <p className="text-slate-500 text-sm">{title}</p>
        {action && <div className="mt-4">{action}</div>}
      </div>
    );
  }