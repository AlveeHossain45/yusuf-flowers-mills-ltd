import { useEffect, useState } from 'react';
import { calculateBags } from '../../utils/calculations';
import { BAG_SIZES } from '../../utils/calculations';

export default function StockForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    quantity: initial?.quantity ?? 0,
    bagWeight: initial?.bagWeight ?? 50,
    minStock: initial?.minStock ?? 0,
    note: '',
  });

  useEffect(() => {
    if (initial) {
      setForm({
        quantity: initial.quantity,
        bagWeight: initial.bagWeight,
        minStock: initial.minStock,
        note: '',
      });
    }
  }, [initial]);

  const bags = calculateBags(form.quantity, form.bagWeight);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      quantity: Number(form.quantity) || 0,
      bagWeight: Number(form.bagWeight) || 0,
      bags,
      minStock: Number(form.minStock) || 0,
      note: form.note,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label">Quantity (KG)</label>
        <input
          type="number"
          min="0"
          className="input"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Bag Weight</label>
          <select
            className="input"
            value={BAG_SIZES.includes(Number(form.bagWeight)) ? form.bagWeight : 'custom'}
            onChange={(e) =>
              setForm({
                ...form,
                bagWeight: e.target.value === 'custom' ? '' : e.target.value,
              })
            }
          >
            {BAG_SIZES.map((s) => (
              <option key={s} value={s}>{s} KG</option>
            ))}
            <option value="custom">Custom</option>
          </select>
          {!BAG_SIZES.includes(Number(form.bagWeight)) && (
            <input
              type="number"
              min="1"
              className="input mt-2"
              placeholder="Custom bag weight"
              value={form.bagWeight}
              onChange={(e) => setForm({ ...form, bagWeight: e.target.value })}
            />
          )}
        </div>
        <div>
          <label className="label">Minimum Stock (KG)</label>
          <input
            type="number"
            min="0"
            className="input"
            value={form.minStock}
            onChange={(e) => setForm({ ...form, minStock: e.target.value })}
          />
        </div>
      </div>

      <div className="rounded-lg bg-brand-50 text-brand-700 px-3 py-2.5 text-sm flex items-center justify-between">
        <span>Calculated Bags</span>
        <span className="font-semibold">{bags} Bags</span>
      </div>

      <div>
        <label className="label">Note (optional)</label>
        <input
          className="input"
          placeholder="e.g. Received new stock"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
        <button type="submit" className="btn-primary">Save</button>
      </div>
    </form>
  );
}