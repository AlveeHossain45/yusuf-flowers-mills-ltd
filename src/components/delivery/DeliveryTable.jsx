import DataTable from '../common/DataTable';
import Badge from '../common/Badge';
import { formatDate, formatKg, formatNumber } from '../../utils/formatters';

export default function DeliveryTable({ rows, onView, onEdit, onDelete }) {
  const columns = [
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'customer', label: 'Customer', render: (r) => <span className="font-medium text-slate-800">{r.customer}</span> },
    { key: 'product', label: 'Product' },
    { key: 'quantity', label: 'Quantity', render: (r) => formatKg(r.quantity) },
    { key: 'bags', label: 'Bags', render: (r) => formatNumber(r.bags) },
    { key: 'vehicle', label: 'Vehicle' },
    {
      key: 'status',
      label: 'Status',
      render: (r) => (
        <Badge variant={r.status === 'Delivered' ? 'success' : r.status === 'Cancelled' ? 'danger' : 'warning'}>
          {r.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: '',
      className: 'text-right',
      render: (r) => (
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => onView(r)} className="text-xs text-slate-500 hover:underline">View</button>
          <button onClick={() => onEdit(r)} className="text-xs text-brand-600 hover:underline">Edit</button>
          <button onClick={() => onDelete(r)} className="text-xs text-red-500 hover:underline">Delete</button>
        </div>
      ),
    },
  ];
  return <DataTable columns={columns} rows={rows} emptyTitle="No deliveries found" />;
}