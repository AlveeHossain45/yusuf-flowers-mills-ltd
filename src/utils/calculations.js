// ---------------------------------------------------------------
// Bag <-> KG helpers
// ---------------------------------------------------------------

export const BAG_SIZES = [25, 30, 40, 50];

/** bags = kg ÷ bagWeight  (rounded to 1 decimal) */
export const calculateBags = (kg, bagWeight) => {
  const k = Number(kg) || 0;
  const w = Number(bagWeight) || 0;
  if (!w) return 0;
  return Math.round((k / w) * 10) / 10;
};

/** kg = bags × bagWeight */
export const calculateKgFromBags = (bags, bagWeight) => {
  return (Number(bags) || 0) * (Number(bagWeight) || 0);
};

// ---------------------------------------------------------------
// Production
// ---------------------------------------------------------------

/** Total output = atta + maida + bhusi */
export const calculateTotalOutput = ({ atta = 0, maida = 0, bhusi = 0 } = {}) =>
  (Number(atta) || 0) + (Number(maida) || 0) + (Number(bhusi) || 0);

/** Loss = wheatUsed - totalOutput (auto) */
export const calculateLoss = ({ wheatUsed = 0, atta = 0, maida = 0, bhusi = 0 } = {}) => {
  const output = calculateTotalOutput({ atta, maida, bhusi });
  return Math.max(0, (Number(wheatUsed) || 0) - output);
};

/** Efficiency % = totalOutput ÷ wheatUsed × 100 */
export const calculateEfficiency = ({ wheatUsed = 0, atta = 0, maida = 0, bhusi = 0 } = {}) => {
  const w = Number(wheatUsed) || 0;
  if (!w) return 0;
  const output = calculateTotalOutput({ atta, maida, bhusi });
  return Math.round((output / w) * 1000) / 10;
};

// ---------------------------------------------------------------
// Stock
// ---------------------------------------------------------------

/**
 * Closing = opening + production + purchase - delivery - damage
 */
export const calculateClosingStock = ({
  opening = 0,
  production = 0,
  purchase = 0,
  delivery = 0,
  damage = 0,
} = {}) => {
  return (
    (Number(opening) || 0) +
    (Number(production) || 0) +
    (Number(purchase) || 0) -
    (Number(delivery) || 0) -
    (Number(damage) || 0)
  );
};

/** Stock status: 'healthy' | 'low' | 'critical' */
export const getStockStatus = (quantity, minStock = 0) => {
  const q = Number(quantity) || 0;
  const m = Number(minStock) || 0;
  if (m <= 0) return 'healthy';
  if (q <= m * 0.5) return 'critical';
  if (q < m) return 'low';
  return 'healthy';
};

// ---------------------------------------------------------------
// Aggregations (used by dashboard / analytics / reports)
// ---------------------------------------------------------------

export const sumBy = (arr, key) =>
  arr.reduce((acc, item) => acc + (Number(item[key]) || 0), 0);

export const filterByDateRange = (arr, fromISO, toISO) =>
  arr.filter((item) => {
    if (!item.date) return false;
    return item.date >= fromISO && item.date <= toISO;
  });

export const groupByDate = (arr, valueKeys = []) => {
  const map = new Map();
  for (const item of arr) {
    const key = item.date;
    if (!map.has(key)) {
      const empty = { date: key };
      valueKeys.forEach((k) => (empty[k] = 0));
      map.set(key, empty);
    }
    const row = map.get(key);
    valueKeys.forEach((k) => {
      row[k] += Number(item[k]) || 0;
    });
  }
  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
};