// import necessary libraries/methods and components
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

import { QRData } from "../../interfaces/qrTypes";
import Theme from "../../interfaces/theme";
import { useTransactions } from "../components/context/TransactionProvider";
import { useUser } from "../components/context/UserProvider";
import ScannerButton from "../components/QrCodeScanner/ScannerButton";
import {
  createProfessionTransaction,
  populateFirstProfession,
  populateLaterProfession,
} from "../components/QrCodeScanner/ScannerLogic";
import LatestTransaction from "../components/TransactionLog/LatestTransaction";
import FinancialOverview, { calculateNetWorth } from "../components/UserFinances/FinancialOverview";

export const Home = () => {
  // state/ref management section
  const { user, setUser } = useUser();
  const { addTransactions } = useTransactions();

  // this will get the data from a qr scan
  const handleScan = (data: QRData) => {
    if (data.scanType === "Profession") {
      // if this is their first job of the game
      if (user.profession === "Profession" || user.profession === "") {
        setUser(populateFirstProfession(data, user));
        calculateNetWorth(user, setUser);
      } else {
        setUser(populateLaterProfession(data, user));
      }
      const newJobTransaction = createProfessionTransaction(data);
      // Add transaction to global state
      addTransactions([newJobTransaction]);
    } else if (data.scanType === "Transaction") {
      // add logic for determining transaction type, etc..
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
