import { RealEstateTransaction } from "./Assets";

export interface Transaction {
  scanType: "Transaction";
  name: string;
  timestamp: string;
  type: "salary" | "passive income" | "expense" | "asset" | "liability" | "career";
  description: string;
  amount: number;
  fieldName: string;
  realEstate?: RealEstateTransaction;
}

export default Transaction;
