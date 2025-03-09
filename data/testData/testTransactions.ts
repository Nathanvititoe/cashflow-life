import Transaction from "../../interfaces/Transaction";
// these values are just sample for testing and are likely to be changed
export const testTransactions: Transaction[] = [
  {
    id: "1",
    scanType: "Transaction",
    name: "Salary Increase",
    timestamp: "2025-02-01 02:30",
    type: "salary",
    description: "user got a promotion to manager!",
    amount: 1000,
    fieldName: "incomeExplained.salary",
  },
  {
    id: "2",
    scanType: "Transaction",
    name: "Car Payment",
    timestamp: "2025-02-08T00:30", // test ISO format timestamp
    type: "expense",
    description: "User had to pay their monthly car payment",
    amount: -400,
    fieldName: "expensesExplained.carPayment",
  },
  {
    id: "3",
    scanType: "Transaction",
    name: "Car Purchase",
    timestamp: "2025-02-08 18:30", // test simple time format timestamp
    type: "asset",
    description: "User bought a brand new Honda Civic",
    amount: -25000,
    fieldName: "Assets.car",
  },
  {
    id: "4",
    scanType: "Transaction",
    name: "Car Loan",
    timestamp: "2025-02-08 15:30:00", // test full datetime format
    type: "liability",
    description: "User must pay the bank for their car loan",
    amount: -20000,
    fieldName: "Liabilities.carLoan",
  },
  {
    id: "5",
    scanType: "Transaction",
    name: "Dividend Payout",
    timestamp: "2025-02-08", // test only date, no time
    type: "passive income",
    description: "Exon Stock paid out $5.00 quarterly dividends",
    amount: 5,
    fieldName: "incomeExplained.salary",
  },
];
