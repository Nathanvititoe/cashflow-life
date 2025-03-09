/* eslint-disable @typescript-eslint/no-unused-vars */
import Profession from "../../../interfaces/Profession";

// ANYTIME THIS FILE IS CHANGED THE CORRESPONDING JSON AND QRCODE PNG MUST BE CHANGED TO MATCH
const Teacher: Profession = {
  name: "Teacher",
  scanType: "Profession",
  income: {
    Salary: 3300,
    "Passive Income": {
      Interest: 0,
      Dividends: 0,
      "Real Estate Income": 0,
      "Business Income": 0,
    },
  },
  expenses: {
    "Monthly Taxes": 630,
    "Mortgage Payment": 500,
    "School Loans": 60,
    "Car Payment": 100,
    "Credit Card Payment": 90,
    "Retail Spending": 50,
    Other: 760,
    "Per Child Expense": 180,
  },
  assets: {
    Savings: 400,
  },
  liabilities: {
    "Mortgage Total": 50000,
    "School Loans Total": 12000,
    "Car Loans": 5000,
    "Credit Card Loans": 3000,
    "Retail Debt": 1000,
  },
};
