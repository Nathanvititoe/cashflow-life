interface CardData {
    profession: string;
    income: {
      salary: number;
      interest: number;
      dividends: number;
      realEstateBusiness: number;
      passiveIncome: number;
      totalIncome: number;
    };
    expenses: {
      taxes: number;
      mortgageRent: number;
      schoolLoan: number;
      carPayment: number;
      creditCardPayment: number;
      retailPayment: number;
      otherExpenses: number;
      childExpenses: number;
      perChildExpense: number;
      totalExpenses: number;
    };
    assets: {
      savings: number;
    };
    liabilities: {
      mortgage: number;
      schoolLoans: number;
      carLoans: number;
      creditCards: number;
      retailDebt: number;
    };
    monthlyCashFlow: number;
  }