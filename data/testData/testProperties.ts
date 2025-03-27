// testData/testProperties.ts
import { RealEstate } from "../../interfaces/Assets";

export const testProperties: RealEstate[] = [
  // Properties
  {
    name: "Lakeside Rental",
    type: "house",
    description: "3 bed, 2 bath rental property near Lake Washington",
    "Purchase Price": 450000,
    "Sale Range": "500000-550000",
    "Cash Flow": 2800, // Monthly rental income
    Mortgage: 380000,
    "Down Payment": 70000,
    purchaseTime: new Date("2024-01-15").toString(),
    saleTime: new Date().toString(), // Current date as placeholder for unsold property
  },
  {
    name: "Mountain Retreat",
    type: "house",
    description: "2 bed cabin in the Cascades, short-term rental",
    "Purchase Price": 325000,
    "Sale Range": "350000-400000",
    "Cash Flow": 3200, // Monthly average from short-term rentals
    Mortgage: 275000,
    "Down Payment": 50000,
    purchaseTime: new Date("2023-08-22").toString(),
    saleTime: new Date().toString(), // Current date as placeholder for unsold property
  },
  // Businesses
  {
    name: "Morning Brew Café",
    type: "business",
    description: "Local coffee shop in downtown Seattle",
    "Purchase Price": 180000,
    "Sale Range": "200000-250000",
    "Cash Flow": 8500, // Monthly profit
    Mortgage: 150000,
    "Down Payment": 30000,
    purchaseTime: new Date("2024-02-01").toString(),
    saleTime: new Date().toString(), // Current date as placeholder for unsold property
  },
  {
    name: "Sparkle & Shine Auto Wash",
    type: "business",
    description: "Automated car wash with detail service",
    "Purchase Price": 420000,
    "Sale Range": "450000-500000",
    "Cash Flow": 12000, // Monthly profit
    Mortgage: 350000,
    "Down Payment": 70000,
    purchaseTime: new Date("2023-11-30").toString(),
    saleTime: new Date().toString(), // Current date as placeholder for unsold property
  },
];

export default testProperties;
