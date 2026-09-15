import { Routes, Route } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Dashboard from '../pages/Dashboard';
import Stock from '../pages/Stock';
import Production from '../pages/Production';
import Delivery from '../pages/Delivery';
import Purchases from '../pages/Purchases';
import Customers from '../pages/Customers';
import Suppliers from '../pages/Suppliers';
import Expenses from '../pages/Expenses';
import Reports from '../pages/Reports';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/production" element={<Production />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}