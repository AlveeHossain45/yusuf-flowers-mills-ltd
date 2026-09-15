export const formatNumber = (n, decimals = 0) => {
    const num = Number(n) || 0;
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };
  
  export const formatKg = (n) => `${formatNumber(n)} KG`;
  
  export const formatCurrency = (n) => {
    const num = Number(n) || 0;
    return `৳ ${num.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };
  
  export const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  
  export const formatDateTime = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  export const todayISO = () => new Date().toISOString().slice(0, 10);
  
  export const daysAgoISO = (days) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().slice(0, 10);
  };
  
  export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);