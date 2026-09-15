import { createContext, useContext, useMemo, useState } from 'react';
import { mockStock, mockStockHistory } from '../data/mockStock';
import { mockProduction } from '../data/mockProduction';
import { mockDelivery } from '../data/mockDelivery';
import { mockCustomers } from '../data/mockCustomers';
import { mockSuppliers } from '../data/mockSuppliers';
import { mockPurchases } from '../data/mockPurchases';
import { mockExpenses } from '../data/mockExpenses';
import { uid } from '../utils/formatters';

const DataContext = createContext(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside <DataProvider>');
  return ctx;
};

export function DataProvider({ children }) {
  const [stock, setStock] = useState(mockStock);
  const [stockHistory, setStockHistory] = useState(mockStockHistory);
  const [production, setProduction] = useState(mockProduction);
  const [delivery, setDelivery] = useState(mockDelivery);
  const [customers, setCustomers] = useState(mockCustomers);
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [purchases, setPurchases] = useState(mockPurchases);
  const [expenses, setExpenses] = useState(mockExpenses);

  // ------- Production -------
  const addProduction = (row) => setProduction((p) => [{ ...row, id: uid() }, ...p]);
  const updateProduction = (id, row) =>
    setProduction((p) => p.map((item) => (item.id === id ? { ...item, ...row } : item)));
  const deleteProduction = (id) => setProduction((p) => p.filter((item) => item.id !== id));

  // ------- Delivery -------
  const addDelivery = (row) => setDelivery((d) => [{ ...row, id: uid() }, ...d]);
  const updateDelivery = (id, row) =>
    setDelivery((d) => d.map((item) => (item.id === id ? { ...item, ...row } : item)));
  const deleteDelivery = (id) => setDelivery((d) => d.filter((item) => item.id !== id));

  // ------- Stock -------
  const updateStock = (id, changes) =>
    setStock((s) =>
      s.map((item) =>
        item.id === id ? { ...item, ...changes, updatedAt: new Date().toISOString() } : item
      )
    );
  const addStockHistory = (row) => setStockHistory((h) => [{ ...row, id: uid() }, ...h]);

  // ------- Customers -------
  const addCustomer = (row) => setCustomers((c) => [{ ...row, id: uid() }, ...c]);
  const updateCustomer = (id, row) =>
    setCustomers((c) => c.map((item) => (item.id === id ? { ...item, ...row } : item)));
  const deleteCustomer = (id) => setCustomers((c) => c.filter((item) => item.id !== id));

  // ------- Suppliers -------
  const addSupplier = (row) => setSuppliers((s) => [{ ...row, id: uid() }, ...s]);
  const updateSupplier = (id, row) =>
    setSuppliers((s) => s.map((item) => (item.id === id ? { ...item, ...row } : item)));
  const deleteSupplier = (id) => setSuppliers((s) => s.filter((item) => item.id !== id));

  // ------- Purchases -------
  const addPurchase = (row) => setPurchases((p) => [{ ...row, id: uid() }, ...p]);
  const updatePurchase = (id, row) =>
    setPurchases((p) => p.map((item) => (item.id === id ? { ...item, ...row } : item)));
  const deletePurchase = (id) => setPurchases((p) => p.filter((item) => item.id !== id));

  // ------- Expenses -------
  const addExpense = (row) => setExpenses((e) => [{ ...row, id: uid() }, ...e]);
  const updateExpense = (id, row) =>
    setExpenses((e) => e.map((item) => (item.id === id ? { ...item, ...row } : item)));
  const deleteExpense = (id) => setExpenses((e) => e.filter((item) => item.id !== id));

  const value = useMemo(
    () => ({
      stock,
      stockHistory,
      production,
      delivery,
      customers,
      suppliers,
      purchases,
      expenses,
      addProduction,
      updateProduction,
      deleteProduction,
      addDelivery,
      updateDelivery,
      deleteDelivery,
      updateStock,
      addStockHistory,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      addSupplier,
      updateSupplier,
      deleteSupplier,
      addPurchase,
      updatePurchase,
      deletePurchase,
      addExpense,
      updateExpense,
      deleteExpense,
    }),
    [stock, stockHistory, production, delivery, customers, suppliers, purchases, expenses]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}