import { QRTransaction } from "../../../interfaces/QrScan";

export const testTransactions: QRTransaction[] = [
  {
    name: "Salary Change",
    timestamp: "2025-02-01 02:30",
    type: "salary",
    description: "user got a promotion to manager!",
    amount: 15000,
    data: {
      income: {
        Salary: 15000,
      },
    },
  },
  {
    name: "House Purchase",
    timestamp: "2025-02-08T00:30", // test ISO format timestamp
    type: "asset",
    description: "User bought their first house",
    amount: -400,
    data: {
      Assets: {
        Investments: {
          "Real Estate": {
            name: "123 Sesame Street",
            type: "house",
            description: "1 bedroom, 1 bath, granite countertops",
            "Purchase Price": 200000,
            "Sale Range": "220000-250000",
            Mortgage: 180000,
            "Down Payment": 20000,
            purchaseTime: "2025-02-08T00:30",
          },
        },
      },
    },
  },

  {
    name: "Car Purchase",
    timestamp: "2025-02-08 18:30", // test simple time format timestamp
    type: "asset",
    description: "User bought a brand new Honda Civic",
    amount: -25000,
    data: {
      expenses: {
        "Car Payment": 400,
      },
      Liabilities: {
        "Car Loans": 25000,
      },
    },
  },
  {
    name: "Purchased Bitcoin",
    timestamp: "2025-02-08 15:30:00", // test full datetime format
    type: "asset",
    description: "User must pay the bank for their car loan",
    amount: -2000,
    data: {
      Assets: {
        Investments: {
          Bitcoin: 100000,
        },
      },
    },
  },
  {
    name: "Dividend Payout",
    timestamp: "2025-02-08", // test only date, no time
    type: "passive income",
    description: "Exon Stock paid out $5.00 quarterly dividends",
    amount: 5,
    data: {
      income: {
        "Passive Income": {
          Dividends: 5,
        },
      },
    },
  },
];
