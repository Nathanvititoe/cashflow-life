import profession from "@/interfaces/profession";

const Airline_Pilot: profession = {
  name: "Airline Pilot",
  income: {
    Salary: 9500,
    "Passive Income": {
      Interest: 0,
      Dividends: 0,
      "Real Estate Income": 0,
      "Business Income": 0,
    },
  },
  expenses: {
    "Monthly Taxes": 2350,
    "Mortgage Payment": 1330,
    "School Loans": 0,
    "Car Payment": 300,
    "Credit Card Payment": 660,
    "Retail Spending": 50,
    Other: 0,
    "Childcare Expenses": 0,
    "Per Child Expense": 480,
  },
  assets: {
    Savings: 400,
  },
  liabilities: {
    "Mortgage Total": 143000,
    "School Loans Total": 0,
    "Car Loans": 15000,
    "Credit Card Loans": 22000,
    "Retail Debt": 1000,
  },
  image: "./app/assets/profesionIcons/Airline_Pilot.png",
};
