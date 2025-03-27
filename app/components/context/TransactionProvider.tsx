import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { QRTransaction } from "../../../interfaces/QrScan";

// define TransactionContext type
interface QRTransactionsContextType {
  transactions: QRTransaction[];
  addTransactions: (newTransactions: QRTransaction[]) => void;
  clearTransactions: () => void;
  getTransactions: () => QRTransaction[];
}

// create context
const TransactionsContext = createContext<QRTransactionsContextType>({
  transactions: [],
  addTransactions: () => {},
  clearTransactions: () => {},
  getTransactions: () => [],
});

// export TransactionsContext
export function useTransactions() {
  return useContext(TransactionsContext);
}

export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<QRTransaction[]>([]);

  // Load transactions from storage
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const savedTransactions = await AsyncStorage.getItem("transactions");
        if (savedTransactions) {
          setTransactions(JSON.parse(savedTransactions));
        }
      } catch (error) {
        console.error("Error loading transactions:", error);
      }
    };
    loadTransactions();
  }, []);

  // Save transactions to storage whenever they change
  useEffect(() => {
    const saveTransactions = async () => {
      try {
        await AsyncStorage.setItem("transactions", JSON.stringify(transactions));
      } catch (error) {
        console.error("Error saving transactions:", error);
      }
    };
    saveTransactions();
  }, [transactions]);

  // Function to add new transactions
  const addTransactions = (newTransactions: QRTransaction[]) => {
    setTransactions(prevTransactions => [...prevTransactions, ...newTransactions]);
  };

  // Function to clear all transactions
  const clearTransactions = () => {
    setTransactions([]);
  };

  // Function to get transactions array
  const getTransactions = (): QRTransaction[] => {
    return transactions;
  };

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransactions, clearTransactions, getTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
