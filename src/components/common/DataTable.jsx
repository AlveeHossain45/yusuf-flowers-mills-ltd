import EmptyState from './EmptyState';

export default function DataTable({ columns, rows, emptyTitle = 'No data available', emptyAction }) {
  if (!rows || rows.length === 0) {
    return <EmptyState title={emptyTitle} action={emptyAction} />;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-slate-500 border-b border-slate-100">
            {columns.map((c) => (
              <th key={c.key} className={`py-3 px-4 font-medium ${c.className || ''}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id || i} className="border-b border-slate-50 hover:bg-slate-50/60">
              {columns.map((c) => (
                <td key={c.key} className={`py-3 px-4 text-slate-700 ${c.className || ''}`}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}