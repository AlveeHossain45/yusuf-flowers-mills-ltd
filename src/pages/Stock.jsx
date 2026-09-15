import { useState } from 'react';
import { PackagePlus } from 'lucide-react';
import { useData } from '../context/DataContext';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import StockTable from '../components/stock/StockTable';
import StockForm from '../components/stock/StockForm';
import { formatDate, formatKg, formatDateTime } from '../utils/formatters';

export default function Stock() {
  const { stock, stockHistory, updateStock, addStockHistory } = useData();
  const [editing, setEditing] = useState(null);
  const [historyOf, setHistoryOf] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const handleUpdate = (payload) => {
    const diff = payload.quantity - editing.quantity;
    updateStock(editing.id, payload);
    addStockHistory({
      date: new Date().toISOString().slice(0, 10),
      product: editing.name,
      change: diff,
      type: diff >= 0 ? 'Manual Add' : 'Manual Reduce',
      note: payload.note || '',
    });
    setEditing(null);
  };

  const openHistory = (row) => {
    setHistoryOf(row);
    setShowHistory(true);
  };

  const historyRows = historyOf
    ? stockHistory.filter((h) => h.product === historyOf.name)
    : [];

  return (
    <>
      <PageHeader
        title="Stock"
        subtitle="Current stock across all products"
      />

      <div className="card p-0 overflow-hidden">
        <StockTable stock={stock} onUpdate={setEditing} onHistory={openHistory} />
      </div>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={`Update Stock — ${editing?.name || ''}`}
      >
        {editing && (
          <StockForm
            initial={editing}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>

      <Modal
        open={showHistory}
        onClose={() => {
          setShowHistory(false);
          setHistoryOf(null);
        }}
        title={`Stock History — ${historyOf?.name || ''}`}
        size="lg"
      >
        {historyRows.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">
            No history available
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {historyRows.map((h) => (
              <li
                key={h.id}
                className="py-3 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800">{h.type}</p>
                  <p className="text-xs text-slate-500">
                    {formatDate(h.date)}
                    {h.note && ` • ${h.note}`}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium shrink-0 ${
                    h.change >= 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {h.change >= 0 ? '+' : ''}
                  {formatKg(h.change)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </>
  );
}