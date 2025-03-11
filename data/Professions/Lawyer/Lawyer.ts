/* eslint-disable @typescript-eslint/no-unused-vars */
import Profession from "../../../interfaces/Profession";

// ANYTIME THIS FILE IS CHANGED THE CORRESPONDING JSON AND QRCODE PNG MUST BE CHANGED TO MATCH
export const Lawyer: Profession = {
  name: "Lawyer",
  scanType: "Profession",
  income: {
    Salary: 7500,
    "Passive Income": {
      Interest: 0,
      Dividends: 0,
      "Real Estate Income": 0,
      "Business Income": 0,
    },
  },
  expenses: {
    "Monthly Taxes": 1830,
    "Mortgage Payment": 1100,
    "School Loans": 390,
    "Car Payment": 220,
    "Credit Card Payment": 180,
    "Retail Spending": 50,
    Other: 1650,
    "Per Child Expense": 380,
  },
  assets: {
    Savings: 400,
  },
  liabilities: {
    "Mortgage Total": 115000,
    "School Loans Total": 78000,
    "Car Loans": 11000,
    "Credit Card Loans": 6000,
    "Retail Debt": 1000,
  },
};
export default Lawyer;
