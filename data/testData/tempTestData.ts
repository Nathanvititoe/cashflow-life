import User from "../../interfaces/User";

// temporary testing object for full user data
const testUser: User = {
  name: "John Smith",
  profession: "Teacher",
  totalIncome: 8500,
  income: {
    Salary: 7000,
    "Passive Income": {
      Interest: 1000,
      Dividends: 500,
      "Real Estate Income": 0,
      "Business Income": 200,
    },
  },
  totalExpenses: 5300,
  expenses: {
    "Monthly Taxes": 300,
    "Mortgage Payment": 1900,
    "School Loans": 50,
    "Car Payment": 300,
    "Credit Card Payment": 200,
    "Retail Spending": 75,
    Other: 350,
    "Per Child Expense": 0,
  },
  Assets: {
    Savings: 0,
  },
  totalAssets: 0,
  Liabilities: {
    "Mortgage Total": 280000,
    "School Loans Total": 18000,
    "Car Loans": 5000,
    "Credit Card Loans": 2000,
    "Retail Debt": 100,
  },
  totalLiabilites: 305100,
  netWorth: -305100,
  Children: 2,
  ChildCost: 0,
  professionIcon: { name: "chalkboard-teacher", library: "FontAwesome5" },
};

export default testUser;
