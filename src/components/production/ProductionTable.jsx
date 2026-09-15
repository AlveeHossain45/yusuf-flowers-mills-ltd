import DataTable from '../common/DataTable';
import { formatDate } from '../../utils/formatters';
import { calculateEfficiency, calculateTotalOutput } from '../../utils/calculations';

export default function ProductionTable({ rows, onEdit, onDelete }) {
  const columns = [
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'shift', label: 'Shift' },
    { key: 'wheatUsed', label: 'Wheat Used', render: (r) => `${r.wheatUsed} KG` },
    { key: 'atta', label: 'Atta', render: (r) => `${r.atta} KG` },
    { key: 'maida', label: 'Maida', render: (r) => `${r.maida} KG` },
    { key: 'bhusi', label: 'Bhusi', render: (r) => `${r.bhusi} KG` },
    { key: 'loss', label: 'Loss', render: (r) => `${r.loss} KG` },
    {
      key: 'efficiency',
      label: 'Efficiency',
      render: (r) => {
        const eff = calculateEfficiency(r);
        const variant = eff >= 90 ? 'success' : eff >= 75 ? 'warning' : 'danger';
        return <span className={`badge-${variant}`}>{eff}%</span>;
      },
    },
    {
      key: 'actions',
      label: '',
      className: 'text-right',
      render: (r) => (
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => onEdit(r)} className="text-xs text-brand-600 hover:underline">Edit</button>
          <button onClick={() => onDelete(r)} className="text-xs text-red-500 hover:underline">Delete</button>
        </div>
      ),
    },
  ];
  return <DataTable columns={columns} rows={rows} emptyTitle="No production entries yet" />;
}