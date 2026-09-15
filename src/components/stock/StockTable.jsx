import Badge from '../common/Badge';
import DataTable from '../common/DataTable';
import { formatDateTime, formatKg, formatNumber } from '../../utils/formatters';
import { getStockStatus } from '../../utils/calculations';

const STATUS_MAP = {
  healthy: { variant: 'success', label: 'Healthy' },
  low: { variant: 'warning', label: 'Low' },
  critical: { variant: 'danger', label: 'Critical' },
};

export default function StockTable({ stock, onUpdate, onHistory }) {
  const columns = [
    { key: 'name', label: 'Product', render: (r) => <span className="font-medium text-slate-800">{r.name}</span> },
    { key: 'quantity', label: 'Quantity', render: (r) => formatKg(r.quantity) },
    { key: 'bags', label: 'Bags', render: (r) => formatNumber(r.bags) },
    { key: 'bagWeight', label: 'Bag Size', render: (r) => `${r.bagWeight} KG` },
    {
      key: 'status',
      label: 'Status',
      render: (r) => {
        const s = getStockStatus(r.quantity, r.minStock);
        const cfg = STATUS_MAP[s];
        return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
      },
    },
    { key: 'updatedAt', label: 'Last Updated', render: (r) => formatDateTime(r.updatedAt) },
    {
      key: 'actions',
      label: '',
      className: 'text-right',
      render: (r) => (
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => onUpdate(r)} className="text-xs text-brand-600 hover:underline">
            Update
          </button>
          <button onClick={() => onHistory(r)} className="text-xs text-slate-500 hover:underline">
            History
          </button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} rows={stock} emptyTitle="No stock items" />;
}