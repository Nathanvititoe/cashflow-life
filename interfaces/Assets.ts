export default interface Assets {
  Savings: number;
  Investments?: Investments;
}

export interface Investments {
  Mortgage?: number;
  "Real Estate"?: RealEstate;
  Stocks?: number;
  Gold_Count?: number;
  Bitcoin?: number;
  "Bitcoin Value"?: number;
  "Certificate Deposit"?: number;
}

export interface RealEstate {
  // for house/business assets and their "transaction"
  name: string;
  type: "house" | "business"; // add more types based on cards
  description: string;
  "Purchase Price": number; // What was it bought for?
  "Sale Range": string; // What can it sell for? (estimated)
  "Sale Price"?: number; // Final sale price
  "Cash Flow"?: number; // Monthly income (If rented or business)
  Mortgage: number;
  "Down Payment": number;
  purchaseTime: string;
  saleTime?: string;
}
