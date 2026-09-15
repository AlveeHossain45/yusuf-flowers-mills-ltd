import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import DateRangeFilter, { useDateFilter } from '../components/common/DateRangeFilter';
import DeliveryForm from '../components/delivery/DeliveryForm';
import DeliveryTable from '../components/delivery/DeliveryTable';
import { filterByDateRange } from '../utils/calculations';
import { formatDate, formatKg, formatNumber, todayISO } from '../utils/formatters';
import { PRODUCTS } from '../data/mockStock';

const DEL_OPTIONS = [
  { label: 'Today', days: 0 },
  { label: '7 Days', days: 7 },
  { label: '10 Days', days: 10 },
  { label: '30 Days', days: 30 },
  { label: 'Custom', days: 0, special: 'custom' },
];

function getRangeFromOption(option, customFrom, customTo) {
  if (option.special === 'custom') return { from: customFrom, to: customTo };
  return { from: new Date(Date.now() - option.days * 864e5).toISOString().slice(0, 10), to: todayISO() };
}

export default function Delivery() {
  const { delivery, customers, addDelivery, updateDelivery, deleteDelivery } = useData();
  const [rangeLabel, setRangeLabel] = useState('7 Days');
  const [customFrom, setCustomFrom] = useState(todayISO());
  const [customTo, setCustomTo] = useState(todayISO());
  const [search, setSearch] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const option = DEL_OPTIONS.find((o) => o.label === rangeLabel) || DEL_OPTIONS[1];
  const { from, to } = getRangeFromOption(option, customFrom, customTo);

  const filtered = useMemo(() => {
    let rows = filterByDateRange(delivery, from, to);
    if (customerFilter) rows = rows.filter((r) => r.customer === customerFilter);
    if (productFilter) rows = rows.filter((r) => r.product === productFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.customer?.toLowerCase().includes(q) ||
          r.vehicle?.toLowerCase().includes(q) ||
          r.invoice?.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [delivery, from, to, customerFilter, productFilter, search]);

  const handleSubmit = (payload) => {
    if (editing) updateDelivery(editing.id, payload);
    else addDelivery(payload);
    setFormOpen(false);
    setEditing(null);
  };

  return (
    <>
      <PageHeader
        title="Delivery"
        subtitle="Manage customer deliveries"
        actions={
          <button
            className="btn-primary"
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
            <Plus size={16} /> Add Delivery
          </button>
        }
      />

      <div className="card p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <DateRangeFilter value={rangeLabel} onChange={setRangeLabel} options={DEL_OPTIONS} />

          {rangeLabel === 'Custom' && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="input"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
              />
              <span className="text-xs text-slate-400">to</span>
              <input
                type="date"
                className="input"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="input pl-9"
              placeholder="Search customer, vehicle, invoice"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="input"
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
          >
            <option value="">All customers</option>
            {customers.map((c) => (
              <option key={c.id} value={c.company || c.name}>{c.company || c.name}</option>
            ))}
          </select>
          <select
            className="input"
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
          >
            <option value="">All products</option>
            {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <DeliveryTable
          rows={filtered}
          onView={setViewing}
          onEdit={(r) => {
            setEditing(r);
            setFormOpen(true);
          }}
          onDelete={setConfirmDelete}
        />
      </div>

      <Modal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        title={editing ? 'Edit Delivery' : 'Add Delivery'}
        size="lg"
      >
        <DeliveryForm
          initial={editing}
          customers={customers}
          onSubmit={handleSubmit}
          onCancel={() => {
            setFormOpen(false);
            setEditing(null);
          }}
        />
      </Modal>

      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Delivery Details">
        {viewing && (
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <Detail label="Date" value={formatDate(viewing.date)} />
            <Detail label="Customer" value={viewing.customer} />
            <Detail label="Product" value={viewing.product} />
            <Detail label="Quantity" value={formatKg(viewing.quantity)} />
            <Detail label="Bag Size" value={`${viewing.bagWeight} KG`} />
            <Detail label="Bags" value={formatNumber(viewing.bags)} />
            <Detail label="Vehicle" value={viewing.vehicle || '—'} />
            <Detail label="Invoice" value={viewing.invoice || '—'} />
            <Detail label="Status" value={viewing.status} />
            <Detail label="Remarks" value={viewing.remarks || '—'} />
          </dl>
        )}
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete delivery?">
        <p className="text-sm text-slate-600">
          This will permanently delete the delivery for <b>{confirmDelete?.customer}</b>.
        </p>
        <div className="flex justify-end gap-2 mt-5">
          <button className="btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
          <button
            className="btn-danger"
            onClick={() => {
              deleteDelivery(confirmDelete.id);
              setConfirmDelete(null);
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="text-slate-800 mt-0.5">{value}</dd>
    </div>
  );
}