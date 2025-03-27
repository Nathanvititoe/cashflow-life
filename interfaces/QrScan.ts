export default interface QRType {
  type: string;
  data: QRTransaction;
}

export interface QRTransaction {
  name: string;
  timestamp: string;
  type: "salary" | "passive income" | "expense" | "asset" | "liability" | "career";
  description: string;
  amount: number;
  data?: Record<string, any>;
}
