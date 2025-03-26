export default interface Income {
  Salary: number;
  "Passive Income": PassiveIncome;
}

export interface PassiveIncome {
  // passive income types
  Interest: number;
  Dividends: number;
  "Real Estate Income": number;
  "Business Income": number;
}
