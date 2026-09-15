import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import DataTable from '../components/common/DataTable';
import { sumBy } from '../utils/calculations';
import { formatCurrency, formatDate, formatKg, todayISO } from '../utils/formatters';

const empty = {
  date: todayISO(),
  supplier: '',
  product: 'Wheat',
  quantity: '',
  bags: '',
  price: '',
  totalCost: 0,
  vehicle: '',
  remarks: '',
};

export default function Purchases() {
  const { purchases, suppliers, addPurchase, updatePurchase, deletePurchase } = useData();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openAdd = () => {
    setEditing(null);
    setForm(empty);
    setFormOpen(true);
  };
  const openEdit = (row) => {
    setEditing(row);
    setForm(row);
    setFormOpen(true);
  };

  const totalCost = (Number(form.quantity) || 0) * (Number(form.price) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      quantity: Number(form.quantity) || 0,
      bags: Number(form.bags) || 0,
      price: Number(form.price) || 0,
      totalCost,
    };
    if (editing) updatePurchase(editing.id, payload);
    else addPurchase(payload);
    setFormOpen(false);
  };

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return purchases.filter(
      (p) => !q || p.supplier.toLowerCase().includes(q) || p.product.toLowerCase().includes(q)
    );
  }, [purchases, search]);

  const totals = useMemo(() => {
    return {
      wheat: sumBy(purchases.filter((p) => p.product === 'Wheat'), 'quantity'),
      cost: sumBy(purchases, 'totalCost'),
    };
  }, [purchases]);

  const columns = [
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'supplier', label: 'Supplier' },
    { key: 'product', label: 'Product' },
    { key: 'quantity', label: 'Quantity', render: (r) => formatKg(r.quantity) },
    { key: 'bags', label: 'Bags' },
    { key: 'price', label: 'Price/KG', render: (r) => formatCurrency(r.price) },
    { key: 'totalCost', label: 'Total', render: (r) => <span className="font-medium">{formatCurrency(r.totalCost)}</span> },
    {
      key: 'actions',
      label: '',
      className: 'text-right',
      render: (r) => (
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => openEdit(r)} className="text-xs text-brand-600 hover:underline">Edit</button>
          <button onClick={() => setConfirmDelete(r)} className="text-xs text-red-500 hover:underline">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Purchases"
        subtitle="Track supplier purchases"
        actions={<button className="btn-primary" onClick={openAdd}><Plus size={16} /> Add Purchase</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="card p-4">
          <p className="text-[11px] uppercase text-slate-500">Total Wheat Purchased</p>
          <p className="text-xl font-semibold text-slate-900 mt-1">{formatKg(totals.wheat)}</p>
        </div>
        <div className="card p-4">
          <p className="text-[11px] uppercase text-slate-500">Total Purchase Cost</p>
          <p className="text-xl font-semibold text-slate-900 mt-1">{formatCurrency(totals.cost)}</p>
        </div>
      </div>

      <div className="card p-4 mb-4">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="input pl-9"
            placeholder="Search purchases"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <DataTable columns={columns} rows={rows} emptyTitle="No purchases yet" />
      </div>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? 'Edit Purchase' : 'Add Purchase'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Date</label>
              <input type="date" className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div>
              <label className="label">Supplier</label>
              <select className="input" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} required>
                <option value="">Select</option>
                {suppliers.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label">Product</label>
              <input className="input" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} />
            </div>
            <div>
              <label className="label">Quantity (KG)</label>
              <input type="number" className="input" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            </div>
            <div>
              <label className="label">Bags</label>
              <input type="number" className="input" value={form.bags} onChange={(e) => setForm({ ...form, bags: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label">Price / KG</label>
              <input type="number" className="input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <label className="label">Total Cost</label>
              <input className="input bg-slate-50" value={formatCurrency(totalCost)} readOnly />
            </div>
            <div>
              <label className="label">Vehicle</label>
              <input className="input" value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="label">Remarks</label>
            <input className="input" value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setFormOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete purchase?">
        <p className="text-sm text-slate-600">This will remove the purchase from <b>{confirmDelete?.supplier}</b>.</p>
        <div className="flex justify-end gap-2 mt-5">
          <button className="btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
          <button
            className="btn-danger"
            onClick={() => {
              deletePurchase(confirmDelete.id);
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