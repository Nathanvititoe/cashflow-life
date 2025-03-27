// Util to add together all values within an object (ignoring keys) and return a total
export const addValuesTogether = (obj?: Record<string, any>): number => {
  if (!obj) return 0;
  return Object.values(obj).reduce((total: number, value) => {
    if (typeof value == "number") {
      return total + value;
    }
    // If value is an object (not null), recursively sum its values
    if (value && typeof value === "object") {
      return total + addValuesTogether(value);
    }
    return total;
  }, 0);
};
export default addValuesTogether;
