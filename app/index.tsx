// import necessary libraries/methods and components
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import UserFinances from "./components/UserFinances";
import TransactionLogs from "./components/TransactionLogs";
import QRScanner from "./components/QrScanner";

// App/index.tsx is the top level of the app, where all components reside (the home page)
export default function App() {
  // logic/Functions Section

  // get the data from the card (pass it to the other components)
  const handleScan = (cardInfo: CardData) => {
    console.log("scanned card data:", cardInfo);

    // provide user feedback
    Alert.alert(
      "Card Scanned",
      `Profession: ${cardInfo.profession || "Unknown"}`
    );
  };
  // Tsx section (similar to html)
  return (
    // Safe Area avoids the phones header (battery, cell service)
    <SafeAreaView style={[styles.container]}>
      {/*Header Component*/}
      <Header />

      {/* Qr Code Scanner */}
      <View style={[styles.appContent]}>
        <View style={styles.card}>
          <QRScanner onScan={handleScan} />
        </View>

        {/* User's Finance's */}
        <View style={styles.card}>
          <UserFinances />
        </View>

        {/* Transaction Logs */}
        <View style={styles.card}>
          <TransactionLogs />
        </View>
      </View>
    </SafeAreaView>
  );
}

// styling and class names for the above components, defined by their "style" tag
const styles = StyleSheet.create({
  container: {
    flex: 1, // ensure app takes up whole screen
    backgroundColor: "#121212",
  },
  appContent: {
    padding: 16,
  },
  card: {
    marginVertical: 8, // space between components
    backgroundColor: "#1e1e1e", // lighter card background
    padding: 7,
    borderRadius: 10,
  },
});
