/* eslint-disable @typescript-eslint/no-unused-vars */
import Profession from "../../../interfaces/Profession";

// ANYTIME THIS FILE IS CHANGED THE CORRESPONDING JSON AND QRCODE PNG MUST BE CHANGED TO MATCH
export const Janitor: Profession = {
  name: "Janitor",
  scanType: "Profession",
  income: {
    Salary: 1600,
    "Passive Income": {
      Interest: 0,
      Dividends: 0,
      "Real Estate Income": 0,
      "Business Income": 0,
    },
  },
  expenses: {
    "Monthly Taxes": 280,
    "Mortgage Payment": 200,
    "School Loans": 0,
    "Car Payment": 60,
    "Credit Card Payment": 60,
    "Retail Spending": 50,
    Other: 300,
    "Per Child Expense": 70,
  },
  assets: {
    Savings: 560,
  },
  liabilities: {
    "Mortgage Total": 20000,
    "School Loans Total": 0,
    "Car Loans": 4000,
    "Credit Card Loans": 2000,
    "Retail Debt": 1000,
  },
};
export default Janitor;
