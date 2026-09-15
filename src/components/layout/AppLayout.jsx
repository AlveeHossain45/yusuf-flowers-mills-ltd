import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar, { NAV_ITEMS } from './Sidebar';
import Header from './Header';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const current =
    NAV_ITEMS.find((n) => (n.end ? location.pathname === n.to : location.pathname.startsWith(n.to)))
      ?.label || 'Dashboard';

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} title={current} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}