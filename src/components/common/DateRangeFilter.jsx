import { useState } from 'react';
import { daysAgoISO, todayISO } from '../../utils/formatters';

export const RANGE_OPTIONS = [
  { label: 'Today', days: 0 },
  { label: 'Yesterday', days: -1, special: 'yesterday' },
  { label: '7 Days', days: 7 },
  { label: '10 Days', days: 10 },
  { label: '30 Days', days: 30 },
  { label: '1 Year', days: 365 },
];

export function getRangeFromOption(option) {
  if (option.special === 'yesterday') {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const iso = d.toISOString().slice(0, 10);
    return { from: iso, to: iso };
  }
  return { from: daysAgoISO(option.days), to: todayISO() };
}

export default function DateRangeFilter({ value, onChange, options = RANGE_OPTIONS }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {options.map((opt) => {
        const active = value === opt.label;
        return (
          <button
            key={opt.label}
            onClick={() => onChange(opt.label)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              active
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function useDateFilter(defaultLabel = '7 Days', options = RANGE_OPTIONS) {
  const [label, setLabel] = useState(defaultLabel);
  const option = options.find((o) => o.label === label) || options[0];
  const { from, to } = getRangeFromOption(option);
  return { label, setLabel, from, to };
}