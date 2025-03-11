/* eslint-disable @typescript-eslint/no-unused-vars */
import Profession from "../../../interfaces/Profession";

// ANYTIME THIS FILE IS CHANGED THE CORRESPONDING JSON AND QRCODE PNG MUST BE CHANGED TO MATCH
export const Doctor: Profession = {
  name: "Doctor",
  scanType: "Profession",
  income: {
    Salary: 13200,
    "Passive Income": {
      Interest: 0,
      Dividends: 0,
      "Real Estate Income": 0,
      "Business Income": 0,
    },
  },
  expenses: {
    "Monthly Taxes": 3420,
    "Mortgage Payment": 1900,
    "School Loans": 750,
    "Car Payment": 380,
    "Credit Card Payment": 270,
    "Retail Spending": 50,
    Other: 2280,
    "Per Child Expense": 640,
  },
  assets: {
    Savings: 400,
  },
  liabilities: {
    "Mortgage Total": 202000,
    "School Loans Total": 150000,
    "Car Loans": 19000,
    "Credit Card Loans": 9000,
    "Retail Debt": 1000,
  },
};
export default Doctor;
