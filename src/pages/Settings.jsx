import { useState } from 'react';
import { Save, GraduationCap, Briefcase, MapPin, Github, Linkedin, Globe } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { useData } from '../context/DataContext';

export default function Settings() {
  const { stock, updateStock } = useData();
  const [saved, setSaved] = useState(false);
  const [local, setLocal] = useState(
    stock.map((s) => ({
      id: s.id,
      name: s.name,
      minStock: s.minStock,
      bagWeight: s.bagWeight,
    }))
  );

  const handleSave = () => {
    local.forEach((item) => {
      updateStock(item.id, {
        minStock: Number(item.minStock) || 0,
        bagWeight: Number(item.bagWeight) || 0,
      });
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Configure low-stock thresholds and bag sizes"
        actions={
          <button className="btn-primary" onClick={handleSave}>
            <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
          </button>
        }
      />

      {/* ============ LEAD DEVELOPER CARD (bora, prominent) ============ */}
      <div className="card p-6 max-w-2xl mb-6">
        <h3 className="font-semibold text-slate-900 mb-5">Lead Developer</h3>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Boro profile picture */}
          <div className="shrink-0">
            <img
              src="/Alveeee.png"
              alt="Alvee Hossain"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover ring-4 ring-brand-50 shadow-sm"
            />
          </div>

          {/* Developer info */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <h4 className="text-xl font-semibold text-slate-900">
              Alvee Hossain
            </h4>
            <p className="text-sm text-brand-600 font-medium mt-0.5">
              Software Engineer
            </p>

            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <GraduationCap size={15} className="text-slate-400 shrink-0" />
                <span>BSc in CSE — Uttara University</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Briefcase size={15} className="text-slate-400 shrink-0" />
                <span>Founder & CEO — Onexero</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin size={15} className="text-slate-400 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Links */}
            <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <a
                href="https://alveehosssain.netlify.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <Globe size={13} /> Portfolio
              </a>
              <a
                href="https://onexero.netlify.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors"
              >
                <Briefcase size={13} /> Onexero
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <Github size={13} /> GitHub
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <Linkedin size={13} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============ PRODUCT CONFIGURATION ============ */}
      <div className="card p-5 max-w-2xl">
        <h3 className="font-semibold text-slate-900 mb-4">Product Configuration</h3>
        <div className="space-y-4">
          {local.map((item, i) => (
            <div key={item.id} className="grid grid-cols-3 gap-3 items-end">
              <div>
                <label className="label">{item.name}</label>
                <p className="text-xs text-slate-500">Min Stock (KG)</p>
              </div>
              <div>
                <label className="label">Minimum Stock</label>
                <input
                  type="number"
                  className="input"
                  value={item.minStock}
                  onChange={(e) => {
                    const next = [...local];
                    next[i].minStock = e.target.value;
                    setLocal(next);
                  }}
                />
              </div>
              <div>
                <label className="label">Bag Weight (KG)</label>
                <input
                  type="number"
                  className="input"
                  value={item.bagWeight}
                  onChange={(e) => {
                    const next = [...local];
                    next[i].bagWeight = e.target.value;
                    setLocal(next);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ CLIENT COMPANY ============ */}
      <div className="card p-5 max-w-2xl mt-4">
        <h3 className="font-semibold text-slate-900 mb-3">Client Company</h3>
        <div className="text-sm text-slate-600 space-y-1.5">
          <p>
            <span className="text-slate-500">Name:</span>{' '}
            <span className="font-medium text-slate-800">
              Yusuf Flowers Mills LTD
            </span>
          </p>
          <p>
            <span className="text-slate-500">Location:</span> Demra, Dhaka
          </p>
          <p>
            <span className="text-slate-500">Business:</span> Flour Manufacturing
            (Wheat, Atta, Maida, Bhusi)
          </p>
        </div>
      </div>

      {/* ============ SOFTWARE DEVELOPMENT ============ */}
      <div className="card p-5 max-w-2xl mt-4">
        <h3 className="font-semibold text-slate-900 mb-3">
          Software Development
        </h3>
        <div className="text-sm text-slate-600 space-y-1.5">
          <p>
            <span className="text-slate-500">Company:</span>{' '}
            <a
              href="https://onexero.netlify.app"
              className="text-brand-600 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Onexero
            </a>
          </p>
          <p>
            <span className="text-slate-500">Developer / CEO:</span> Alvee Hossain
          </p>
          <p>
            <span className="text-slate-500">Portfolio:</span>{' '}
            <a
              href="https://alveehosssain.netlify.app"
              className="text-brand-600 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              alveehosssain.netlify.app
            </a>
          </p>
        </div>
      </div>

      {/* ============ ABOUT ============ */}
      <div className="card p-5 max-w-2xl mt-4">
        <h3 className="font-semibold text-slate-900 mb-3">About This System</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Food Manufacturing Management System built for{' '}
          <span className="font-medium text-slate-800">
            Yusuf Flowers Mills LTD
          </span>{' '}
          (Demra, Dhaka). Designed and developed by{' '}
          <span className="font-medium text-slate-800">Alvee Hossain</span> at{' '}
          <a
            href="https://onexero.netlify.app"
            className="text-brand-600 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Onexero
          </a>
          .
        </p>
        <p className="text-xs text-slate-400 mt-3">
          Version 1.0.0 • © {new Date().getFullYear()} Onexero
        </p>
      </div>
    </>
  );
}