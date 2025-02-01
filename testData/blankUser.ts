import User from "@/interfaces/user";

const blankUser: User = {
  name: "",
  profession: "",
  totalIncome: 2000,
  incomeExplained: {
    Salary: 2000,
    Interest: 0,
    Dividends: 0,
    "Real Estate Income": 0,
    "Business Income": 0,
  },
  totalExpenses: 20,
  expensesExplained: {
    "monthly taxes": 20,
    "mortgage payment": 0,
    "rent payment": 0,
    "School Loans": 0,
    "Car Payment": 0,
    "Credit Card Payment": 0,
    "Retail Spending": 0,
    Other: 0,
    "Childcare Expenses": 0,
  },
  Assets: {
    savings: 0,
    investments: 0,
  },
  Liabilities: {
    "Mortgage Total": 0,
    "School Loans Total": 0,
    "Car Loans": 0,
    "Credit Card Loans": 0,
    "Retail Debt": 0,
  },
  children: 0,
  childCost: {
    "babysitter cost": 0,
    "daycare costs": 0,
    food: 200,
  },
  failedAudits: 0,
  image: "",
};

export default blankUser;
