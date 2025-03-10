export interface Transaction {
  id: string;
  name: string;
  timestamp: string;
  type: "salary" | "passive income" | "expense" | "asset" | "liability";
  description: string;
  amount: number;
  fieldName: string;
}

export default Transaction;
