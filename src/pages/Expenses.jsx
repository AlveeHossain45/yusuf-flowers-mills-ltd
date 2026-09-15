import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useData } from '../context/DataContext';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import DataTable from '../components/common/DataTable';
import { EXPENSE_CATEGORIES } from '../data/mockExpenses';
import { formatCurrency, formatDate, todayISO } from '../utils/formatters';
import { sumBy } from '../utils/calculations';

const empty = {
  date: todayISO(),
  category: 'Electricity',
  amount: '',
  description: '',
};

export default function Expenses() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useData();
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
    const payload = { ...form, amount: Number(form.amount) || 0 };
    if (editing) updateExpense(editing.id, payload);
    else addExpense(payload);
    setFormOpen(false);
  };

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return expenses.filter(
      (e) => !q || e.category.toLowerCase().includes(q) || (e.description || '').toLowerCase().includes(q)
    );
  }, [expenses, search]);

  const today = todayISO();
  const totals = useMemo(() => {
    const startOfMonth = today.slice(0, 7);
    const startOfYear = today.slice(0, 4);
    return {
      today: sumBy(expenses.filter((e) => e.date === today), 'amount'),
      month: sumBy(expenses.filter((e) => e.date.startsWith(startOfMonth)), 'amount'),
      year: sumBy(expenses.filter((e) => e.date.startsWith(startOfYear)), 'amount'),
    };
  }, [expenses, today]);

  const chartData = useMemo(() => {
    const map = new Map();
    expenses.forEach((e) => {
      map.set(e.category, (map.get(e.category) || 0) + (Number(e.amount) || 0));
    });
    return Array.from(map.entries()).map(([category, amount]) => ({ category, amount }));
  }, [expenses]);

  const columns = [
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'category', label: 'Category' },
    { key: 'amount', label: 'Amount', render: (r) => formatCurrency(r.amount) },
    { key: 'description', label: 'Description', render: (r) => r.description || '—' },
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
        title="Expenses"
        subtitle="Track operational expenses"
        actions={<button className="btn-primary" onClick={openAdd}><Plus size={16} /> Add Expense</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="card p-4">
          <p className="text-[11px] uppercase text-slate-500">Today's Expense</p>
          <p className="text-xl font-semibold text-slate-900 mt-1">{formatCurrency(totals.today)}</p>
        </div>
        <div className="card p-4">
          <p className="text-[11px] uppercase text-slate-500">Monthly Expense</p>
          <p className="text-xl font-semibold text-slate-900 mt-1">{formatCurrency(totals.month)}</p>
        </div>
        <div className="card p-4">
          <p className="text-[11px] uppercase text-slate-500">Yearly Expense</p>
          <p className="text-xl font-semibold text-slate-900 mt-1">{formatCurrency(totals.year)}</p>
        </div>
      </div>

      <div className="card p-5 mb-4">
        <h3 className="font-semibold text-slate-900 mb-3">Expense by Category</h3>
        {chartData.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Bar dataKey="amount" fill="#3563ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="card p-4 mb-4">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="input pl-9"
            placeholder="Search expenses"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <DataTable columns={columns} rows={rows} emptyTitle="No expenses yet" />
      </div>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? 'Edit Expense' : 'Add Expense'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="label">Date</label>
            <input type="date" className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {EXPENSE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Amount</label>
            <input type="number" className="input" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          </div>
          <div>
            <label className="label">Description</label>
            <input className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setFormOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete expense?">
        <p className="text-sm text-slate-600">This will remove the expense entry.</p>
        <div className="flex justify-end gap-2 mt-5">
          <button className="btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
          <button
            className="btn-danger"
            onClick={() => {
              deleteExpense(confirmDelete.id);
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