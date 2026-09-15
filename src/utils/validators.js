export const isRequired = (value) =>
    value !== undefined && value !== null && String(value).trim() !== '';
  
  export const isPositiveNumber = (value) => {
    const n = Number(value);
    return !Number.isNaN(n) && n > 0;
  };
  
  export const validate = (rules) => {
    const errors = {};
    for (const [field, checks] of Object.entries(rules)) {
      for (const check of checks) {
        const msg = check();
        if (msg) {
          errors[field] = msg;
          break;
        }
      }
    }
    return errors;
  };