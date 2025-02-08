import profession from "@/interfaces/profession";

const Lawyer: profession = {
  name: "Lawyer",
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
    "Childcare Expenses": 0,
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
  image: "./app/assets/profesionIcons/Lawyer.png",
};
