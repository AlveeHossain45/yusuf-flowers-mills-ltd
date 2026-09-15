import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import DataTable from '../components/common/DataTable';
import { sumBy } from '../utils/calculations';
import { formatKg } from '../utils/formatters';

const empty = { name: '', company: '', phone: '', email: '', address: '' };

export default function Customers() {
  const { customers, delivery, addCustomer, updateCustomer, deleteCustomer } = useData();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) updateCustomer(editing.id, form);
    else addCustomer(form);
    setFormOpen(false);
  };

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return customers
      .filter(
        (c) =>
          !q ||
          c.name.toLowerCase().includes(q) ||
          (c.company || '').toLowerCase().includes(q) ||
          (c.phone || '').includes(q)
      )
      .map((c) => {
        const deliveries = delivery.filter((d) => d.customer === (c.company || c.name));
        return {
          ...c,
          totalDeliveries: deliveries.length,
          totalQuantity: sumBy(deliveries, 'quantity'),
        };
      });
  }, [customers, delivery, search]);

  const columns = [
    { key: 'name', label: 'Name', render: (r) => <span className="font-medium text-slate-800">{r.name}</span> },
    { key: 'company', label: 'Company' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email', render: (r) => r.email || '—' },
    { key: 'totalDeliveries', label: 'Deliveries' },
    { key: 'totalQuantity', label: 'Total Qty', render: (r) => formatKg(r.totalQuantity) },
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
        title="Customers"
        subtitle="Manage your customer list"
        actions={<button className="btn-primary" onClick={openAdd}><Plus size={16} /> Add Customer</button>}
      />

      <div className="card p-4 mb-4">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="input pl-9"
            placeholder="Search customers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <DataTable columns={columns} rows={rows} emptyTitle="No customers yet" />
      </div>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? 'Edit Customer' : 'Add Customer'}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            ['name', 'Name'],
            ['company', 'Company'],
            ['phone', 'Phone'],
            ['email', 'Email'],
            ['address', 'Address'],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input
                className="input"
                value={form[key] || ''}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                required={key === 'name'}
              />
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setFormOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete customer?">
        <p className="text-sm text-slate-600">This will remove <b>{confirmDelete?.name}</b>.</p>
        <div className="flex justify-end gap-2 mt-5">
          <button className="btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
          <button
            className="btn-danger"
            onClick={() => {
              deleteCustomer(confirmDelete.id);
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