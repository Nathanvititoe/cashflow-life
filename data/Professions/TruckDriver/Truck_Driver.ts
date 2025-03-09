/* eslint-disable @typescript-eslint/no-unused-vars */
import Profession from "../../../interfaces/Profession";

// ANYTIME THIS FILE IS CHANGED THE CORRESPONDING JSON AND QRCODE PNG MUST BE CHANGED TO MATCH
const Truck_Driver: Profession = {
  name: "Truck Driver",
  scanType: "Profession",
  income: {
    Salary: 2500,
    "Passive Income": {
      Interest: 0,
      Dividends: 0,
      "Real Estate Income": 0,
      "Business Income": 0,
    },
  },
  expenses: {
    "Monthly Taxes": 460,
    "Mortgage Payment": 400,
    "School Loans": 0,
    "Car Payment": 80,
    "Credit Card Payment": 60,
    "Retail Spending": 50,
    Other: 570,
    "Per Child Expense": 140,
  },
  assets: {
    Savings: 750,
  },
  liabilities: {
    "Mortgage Total": 38000,
    "School Loans Total": 0,
    "Car Loans": 4000,
    "Credit Card Loans": 2000,
    "Retail Debt": 1000,
  },
};
