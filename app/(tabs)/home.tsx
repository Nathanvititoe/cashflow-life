// import necessary libraries/methods and components
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { testTransactions } from "../../data/testData/testTransactions";
import { QRData } from "../../interfaces/qrTypes";
import Theme from "../../interfaces/theme";
import Transaction from "../../interfaces/Transaction";
import { findLatestTransaction } from "../../utils/transactionUtil";
import ScannerButton from "../components/QrCodeScanner/ScannerButton";
import {
  populateFirstProfession,
  populateLaterProfession,
} from "../components/QrCodeScanner/ScannerLogic";
import LatestTransaction from "../components/TransactionLog/LatestTransaction";
import FinancialOverview from "../components/UserFinances/FinancialOverview";
import { useUser } from "./_layout";

export const Home = () => {
  // state/ref management section
  const { user, setUser } = useUser();

  // // TODO: remove, for testing only
  // useEffect(() => {
  //   console.log("username", user.name);
  //   console.log("Home page income data: ", user.incomeExplained);
  //   console.log("Home page Assets:", user.Assets);
  //   console.log("Home page Liabilities:", user.Liabilities);
  //   console.log("Home page profession:", user.profession);
  //   console.log("Home page Profession Icon:", user.professionIcon);
  // }, [user]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [latestTransaction, setLatestTransaction] =
    useState<Transaction | null>(() => findLatestTransaction(testTransactions));
  // logic/Functions Section

  // this will get the data from a qr scan
  const handleScan = (data: QRData) => {
    if (data.scanType === "Profession") {
      // if this is their first job of the game
      if (user.profession === "Profession" || user.profession === "") {
        setUser(populateFirstProfession(data, user));
        console.log("user after new job", user);
      } else {
        setUser(populateLaterProfession(data, user));
      }
    } else if (data.scanType === "Transaction") {
      // add logic for determining transaction type, etc..
    }
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading user...</Text>
      </View>
    );
  }

  return (
    // Home Tab
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {/* Qr Scanner Button */}
        <View style={styles.card}>
          <ScannerButton onScan={handleScan} />
        </View>

        {/* Financial Overview */}
        <View style={styles.card}>
          <FinancialOverview />
        </View>

        {/* Latest Transaction */}
        {latestTransaction && (
          <View style={styles.card}>
            <LatestTransaction transaction={latestTransaction} />
          </View>
        )}
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
