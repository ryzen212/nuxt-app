export const rules = {
    required: (value) => {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value.trim() !== '';
        return true; // Accept numbers, booleans, arrays, etc.
    },
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    integer: (value) => Number.isInteger(Number(value)),
    length: (value, { min, max }) => value.length >= min && value.length <= max,
    include: (value, optionsArray) => optionsArray.includes(value)
};
