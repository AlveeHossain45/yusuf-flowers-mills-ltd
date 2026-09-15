import { useEffect, useState } from 'react';
import { calculateLoss, calculateEfficiency, calculateTotalOutput } from '../../utils/calculations';
import { todayISO } from '../../utils/formatters';

const empty = {
  date: todayISO(),
  shift: 'Day',
  wheatUsed: '',
  atta: '',
  maida: '',
  bhusi: '',
  loss: 0,
  remarks: '',
};

export default function ProductionForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || empty);

  useEffect(() => {
    setForm(initial || empty);
  }, [initial]);

  const totalOutput = calculateTotalOutput(form);
  const autoLoss = calculateLoss(form);
  const efficiency = calculateEfficiency(form);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      wheatUsed: Number(form.wheatUsed) || 0,
      atta: Number(form.atta) || 0,
      maida: Number(form.maida) || 0,
      bhusi: Number(form.bhusi) || 0,
      loss: autoLoss,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Date</label>
          <input
            type="date"
            className="input"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">Shift</label>
          <select
            className="input"
            value={form.shift}
            onChange={(e) => setForm({ ...form, shift: e.target.value })}
          >
            <option>Day</option>
            <option>Night</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label">Wheat Used (KG)</label>
        <input
          type="number"
          min="0"
          className="input"
          value={form.wheatUsed}
          onChange={(e) => setForm({ ...form, wheatUsed: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="label">Atta (KG)</label>
          <input
            type="number"
            min="0"
            className="input"
            value={form.atta}
            onChange={(e) => setForm({ ...form, atta: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Maida (KG)</label>
          <input
            type="number"
            min="0"
            className="input"
            value={form.maida}
            onChange={(e) => setForm({ ...form, maida: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Bhusi (KG)</label>
          <input
            type="number"
            min="0"
            className="input"
            value={form.bhusi}
            onChange={(e) => setForm({ ...form, bhusi: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg bg-slate-50 px-3 py-2.5">
          <p className="text-[11px] text-slate-500">Total Output</p>
          <p className="font-semibold text-slate-800">{totalOutput} KG</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2.5">
          <p className="text-[11px] text-slate-500">Loss</p>
          <p className="font-semibold text-slate-800">{autoLoss} KG</p>
        </div>
        <div className="rounded-lg bg-brand-50 px-3 py-2.5">
          <p className="text-[11px] text-brand-600">Efficiency</p>
          <p className="font-semibold text-brand-700">{efficiency}%</p>
        </div>
      </div>

      <div>
        <label className="label">Remarks</label>
        <input
          className="input"
          value={form.remarks}
          onChange={(e) => setForm({ ...form, remarks: e.target.value })}
          placeholder="Optional"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
        <button type="submit" className="btn-primary">Save Production</button>
      </div>
    </form>
  );
}