// Format number as USD
export const formatUSD = (amount: number) => {
  if (typeof amount === "number") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } else {
    return "$0.00";
  }
};
export default formatUSD;
