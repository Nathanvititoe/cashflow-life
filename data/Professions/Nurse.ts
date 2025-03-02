/* eslint-disable @typescript-eslint/no-unused-vars */
import Profession from "../../interfaces/Profession";
//  MUST MAKE SURE COMPLETE JSON FORMAT BEFORE MAKING INTO QR CODES

const Nurse: Profession = {
  name: "Nurse",
  scanType: "Profession",
  income: {
    Salary: 3100,
    "Passive Income": {
      Interest: 0,
      Dividends: 0,
      "Real Estate Income": 0,
      "Business Income": 0,
    },
  },
  expenses: {
    "Monthly Taxes": 600,
    "Mortgage Payment": 400,
    "School Loans": 30,
    "Car Payment": 100,
    "Credit Card Payment": 90,
    "Retail Spending": 50,
    Other: 710,
    "Per Child Expense": 170,
  },
  assets: {
    Savings: 480,
  },
  liabilities: {
    "Mortgage Total": 47000,
    "School Loans Total": 6000,
    "Car Loans": 5000,
    "Credit Card Loans": 3000,
    "Retail Debt": 1000,
  },
};
