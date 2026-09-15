import { useEffect, useState } from 'react';
import { BAG_SIZES, calculateBags } from '../../utils/calculations';
import { todayISO } from '../../utils/formatters';
import { PRODUCTS } from '../../data/mockStock';

const empty = {
  date: todayISO(),
  customer: '',
  product: 'Atta',
  quantity: '',
  bagWeight: 50,
  bags: 0,
  vehicle: '',
  invoice: '',
  status: 'Pending',
  remarks: '',
};

export default function DeliveryForm({ initial, customers, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || empty);

  useEffect(() => {
    setForm(initial || empty);
  }, [initial]);

  const bags = calculateBags(form.quantity, form.bagWeight);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      quantity: Number(form.quantity) || 0,
      bagWeight: Number(form.bagWeight) || 0,
      bags,
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
          <label className="label">Customer</label>
          <select
            className="input"
            value={form.customer}
            onChange={(e) => setForm({ ...form, customer: e.target.value })}
            required
          >
            <option value="">Select customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.company || c.name}>
                {c.company || c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Product</label>
          <select
            className="input"
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
          >
            {PRODUCTS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Quantity (KG)</label>
          <input
            type="number"
            min="0"
            className="input"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Bag Size</label>
          <select
            className="input"
            value={form.bagWeight}
            onChange={(e) => setForm({ ...form, bagWeight: e.target.value })}
          >
            {BAG_SIZES.map((s) => (
              <option key={s} value={s}>{s} KG</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Number of Bags</label>
          <input className="input bg-slate-50" value={`${bags} Bags`} readOnly />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Vehicle Number</label>
          <input
            className="input"
            value={form.vehicle}
            onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
            placeholder="DHA-1234"
          />
        </div>
        <div>
          <label className="label">Invoice Number</label>
          <input
            className="input"
            value={form.invoice}
            onChange={(e) => setForm({ ...form, invoice: e.target.value })}
            placeholder="INV-0001"
          />
        </div>
      </div>

      <div>
        <label className="label">Status</label>
        <select
          className="input"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Pending</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
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
        <button type="submit" className="btn-primary">Save Delivery</button>
      </div>
    </form>
  );
}