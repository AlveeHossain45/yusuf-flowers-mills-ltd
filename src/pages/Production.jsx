import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useData } from '../context/DataContext';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import DateRangeFilter, { useDateFilter } from '../components/common/DateRangeFilter';
import ProductionForm from '../components/production/ProductionForm';
import ProductionTable from '../components/production/ProductionTable';
import {
  calculateEfficiency,
  calculateTotalOutput,
  filterByDateRange,
  sumBy,
} from '../utils/calculations';
import { formatKg, formatNumber } from '../utils/formatters';

const PROD_OPTIONS = [
  { label: 'Today', days: 0 },
  { label: '7 Days', days: 7 },
  { label: '10 Days', days: 10 },
  { label: '30 Days', days: 30 },
  { label: '1 Year', days: 365 },
];

export default function Production() {
  const { production, addProduction, updateProduction, deleteProduction } = useData();
  const { label, setLabel, from, to } = useDateFilter('7 Days', PROD_OPTIONS);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = useMemo(
    () => filterByDateRange(production, from, to),
    [production, from, to]
  );

  const totals = useMemo(() => {
    const wheat = sumBy(filtered, 'wheatUsed');
    const atta = sumBy(filtered, 'atta');
    const maida = sumBy(filtered, 'maida');
    const bhusi = sumBy(filtered, 'bhusi');
    const loss = sumBy(filtered, 'loss');
    const totalOutput = atta + maida + bhusi;
    const efficiency = wheat ? Math.round((totalOutput / wheat) * 1000) / 10 : 0;
    return { wheat, atta, maida, bhusi, loss, totalOutput, efficiency };
  }, [filtered]);

  const handleSubmit = (payload) => {
    if (editing) updateProduction(editing.id, payload);
    else addProduction(payload);
    setFormOpen(false);
    setEditing(null);
  };

  return (
    <>
      <PageHeader
        title="Production"
        subtitle="Record daily production output"
        actions={
          <button
            className="btn-primary"
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
            <Plus size={16} /> Add Production
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <DateRangeFilter value={label} onChange={setLabel} options={PROD_OPTIONS} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        {[
          { label: 'Wheat Used', value: formatKg(totals.wheat) },
          { label: 'Total Output', value: formatKg(totals.totalOutput) },
          { label: 'Atta', value: formatKg(totals.atta) },
          { label: 'Maida', value: formatKg(totals.maida) },
          { label: 'Bhusi', value: formatKg(totals.bhusi) },
          { label: 'Efficiency', value: `${totals.efficiency}%` },
        ].map((s) => (
          <div key={s.label} className="card p-3">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">{s.label}</p>
            <p className="text-lg font-semibold text-slate-900 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card p-0 overflow-hidden">
        <ProductionTable
          rows={filtered}
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
        title={editing ? 'Edit Production' : 'Add Production'}
        size="lg"
      >
        <ProductionForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={() => {
            setFormOpen(false);
            setEditing(null);
          }}
        />
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete entry?">
        <p className="text-sm text-slate-600">
          This will permanently remove the production entry for{' '}
          <b>{confirmDelete?.date}</b>.
        </p>
        <div className="flex justify-end gap-2 mt-5">
          <button className="btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
          <button
            className="btn-danger"
            onClick={() => {
              deleteProduction(confirmDelete.id);
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