// import necessary libraries/methods and components
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

import { QRTransaction } from "../../interfaces/QrScan";
import Theme from "../../interfaces/theme";
import User from "../../interfaces/User";
import { useTransactions } from "../components/context/TransactionProvider";
import { useUser } from "../components/context/UserProvider";
import ScannerButton from "../components/QrCodeScanner/ScannerButton";
import LatestTransaction from "../components/TransactionLog/LatestTransaction";
import FinancialOverview, {
  calculateNetWorth,
  calculateTotals,
} from "../components/UserFinances/FinancialOverview";

export const Home = () => {
  // state/ref management section
  const { user, setUser } = useUser();
  const { addTransactions } = useTransactions();

  // this will get the data from a qr scan
  const handleScan = (newTransaction: QRTransaction) => {
    if (!newTransaction || !newTransaction.type || !newTransaction.data) return;

    // Merge scanned transaction into the existing user, only changing the passed fields
    setUser(prevUser => {
      return {
        ...prevUser,
        ...newTransaction.data,
        income: { ...prevUser.income, ...newTransaction.data?.income },
        expenses: { ...prevUser.expenses, ...newTransaction.data?.expenses },
        Assets: { ...prevUser.Assets, ...newTransaction.data?.Assets },
        Liabilities: { ...prevUser.Liabilities, ...newTransaction.data?.Liabilities },
        profession: newTransaction.data?.profession ?? prevUser.profession,
        professionIcon: {
          name: newTransaction.data?.professionIcon?.name ?? prevUser.professionIcon.name ?? "",
          library:
            newTransaction.data?.professionIcon?.library ??
            prevUser.professionIcon.library ??
            "FontAwesome5",
        },
      } as User;
    });

    // add transacton to transactions log
    addTransactions([newTransaction]);
    const type = newTransaction.type;
    switch (type) {
      // recalculate net worth after updates to assets/liabilities
      case "asset":
      case "liability":
        calculateNetWorth(user, setUser);
        break;
      case "passive income":
      case "salary":
      case "expense":
      case "career":
        calculateTotals(user, setUser);
        break;
      default:
        return;
    }
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading User...</Text>
      </View>
    );
  }

  return (
    // Home Tab
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Qr Scanner Button */}
        <View style={styles.card}>
          <ScannerButton onScan={handleScan} />
        </View>

        {/* Financial Overview */}
        <View style={styles.card}>
          <FinancialOverview />
        </View>

        <View style={styles.card}>
          <LatestTransaction />
        </View>
      </View>
    </ScrollView>
  );
};

// styling and class names for the above components, defined by their "style" tag
const styles = StyleSheet.create({
  // card for each component
  card: {
    marginVertical: Theme.CFL_card_spacing, // space between components
    backgroundColor: Theme.CFL_black, // lighter card background
    padding: 6,
    borderRadius: 10,
  },
  // scrollable view
  scrollView: {
    flex: 1,
    backgroundColor: Theme.CFL_app_background,
  },
  // scrollable
  scrollContent: {
    paddingBottom: 20,
  },
  // all conntent
  content: {
    padding: 16,
  },
  // loading indicator
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.CFL_app_background,
  },
  // loading text
  loadingText: {
    color: Theme.CFL_light_text,
    marginTop: 50,
  },
});

export default Home;
