import { QRTransaction } from "../interfaces/QrScan";
import Theme from "../interfaces/theme";

// determines the color based on the transaction type
export const getTypeColor = (type: QRTransaction["type"]) => {
  switch (type) {
    case "salary":
      return Theme.CFL_green; // income green
    case "passive income":
      return Theme.CFL_green; // income green
    case "expense":
      return Theme.CFL_red; // expense red
    case "asset":
      return Theme.CFL_purple; // asset purple
    case "liability":
      return Theme.CFL_orange; // liability orange
    case "career":
      return Theme.CFL_cyan;
    default:
      return Theme.CFL_light_gray; // default gray
  }
};

// function to get the transaction w/ the most recent timestamp
export const findLatestTransaction = (transactions: QRTransaction[]) => {
  return transactions.reduce((mostRecent, current) => {
    return current.timestamp > mostRecent.timestamp ? current : mostRecent;
  }, transactions[0]);
};

export default getTypeColor;
