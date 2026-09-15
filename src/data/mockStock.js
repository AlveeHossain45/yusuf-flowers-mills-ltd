// Product stock — one row per product
// `opening` is the starting stock used by daily closing calculation.
export const mockStock = [
    {
      id: 'wheat',
      name: 'Wheat',
      quantity: 12000,
      bagWeight: 50,
      bags: 240,
      minStock: 5000,
      opening: 12000,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'atta',
      name: 'Atta',
      quantity: 5240,
      bagWeight: 50,
      bags: 105,
      minStock: 1000,
      opening: 5240,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'maida',
      name: 'Maida',
      quantity: 3120,
      bagWeight: 50,
      bags: 62,
      minStock: 800,
      opening: 3120,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'bhusi',
      name: 'Bhusi',
      quantity: 2150,
      bagWeight: 40,
      bags: 54,
      minStock: 600,
      opening: 2150,
      updatedAt: new Date().toISOString(),
    },
  ];
  
  export const mockStockHistory = [
    { id: 'h1', date: '2025-01-10', product: 'Atta', change: 500, type: 'Production', note: 'Day shift' },
    { id: 'h2', date: '2025-01-10', product: 'Atta', change: -300, type: 'Delivery', note: 'Karim Traders' },
    { id: 'h3', date: '2025-01-11', product: 'Maida', change: 400, type: 'Production', note: 'Night shift' },
  ];
  
  export const PRODUCTS = ['Wheat', 'Atta', 'Maida', 'Bhusi'];