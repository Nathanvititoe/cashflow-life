/* eslint-disable @typescript-eslint/no-unused-vars */
import Profession from "../../../interfaces/Profession";

// ANYTIME THIS FILE IS CHANGED THE CORRESPONDING JSON AND QRCODE PNG MUST BE CHANGED TO MATCH
const Engineer: Profession = {
  name: "Engineer",
  scanType: "Profession",
  income: {
    Salary: 4900,
    "Passive Income": {
      Interest: 0,
      Dividends: 0,
      "Real Estate Income": 0,
      "Business Income": 0,
    },
  },
  expenses: {
    "Monthly Taxes": 1050,
    "Mortgage Payment": 700,
    "School Loans": 60,
    "Car Payment": 140,
    "Credit Card Payment": 120,
    "Retail Spending": 50,
    Other: 1090,
    "Per Child Expense": 250,
  },
  assets: {
    Savings: 400,
  },
  liabilities: {
    "Mortgage Total": 75000,
    "School Loans Total": 12000,
    "Car Loans": 7000,
    "Credit Card Loans": 4000,
    "Retail Debt": 1000,
  },
};
