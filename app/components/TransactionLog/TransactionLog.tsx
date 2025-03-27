// import necessary libraries/methods and components
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { QRTransaction } from "../../../interfaces/QrScan";
import Theme from "../../../interfaces/theme";
import { formatUSD } from "../../../utils/currencyUtil";
import { getTypeColor } from "../../../utils/transactionUtil";
import { useTransactions } from "../context/TransactionProvider";

const TransactionLog = () => {
  const { transactions } = useTransactions();

  // Tsx for every transaction
  const renderTransaction = (transaction: QRTransaction) => (
    <View style={styles.card} key={transaction.timestamp}>
      <View style={styles.transactionCard}>
        <View style={styles.transactionHeader}>
          <Text style={styles.timestamp}>{transaction.timestamp}</Text>
          <View style={[styles.typeTag, { backgroundColor: getTypeColor(transaction.type) }]}>
            <Text style={styles.typeText}>{transaction.type.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={styles.name}>{transaction.name}</Text>

        <View style={styles.changesContainer}>
          <Text style={styles.description}>{transaction.description}</Text>
          <View style={styles.fieldChange}>
            <Text style={transaction.amount > 0 ? styles.positiveAmount : styles.negativeAmount}>
              {formatUSD(transaction.amount)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Overall tsx section
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.content}>
        {transactions.length > 0 ? (
          transactions.map(renderTransaction)
        ) : (
          <View style={styles.card}>
            <Text style={styles.noTransactions}>No Transactions Available</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

// Styling Section
const styles = StyleSheet.create({
  // container that scrolls
  scrollContainer: {
    flex: 1,
    backgroundColor: Theme.CFL_app_background,
  },
  // background container for each card
  card: {
    marginVertical: Theme.CFL_card_spacing, // space between components
    backgroundColor: Theme.CFL_black, // lighter card background
    padding: 7,
    paddingVertical: 13,
    borderRadius: 10,
  },
  // page content
  content: {
    padding: 16,
  },
  // card for each transaction
  transactionCard: {
    backgroundColor: Theme.CFL_card_background,
    padding: 10,
    borderRadius: 10,
  },
  // no transaction txt
  noTransactions: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_light_text,
    fontSize: 12,
    padding: 2,
    marginLeft: 20,
  },
  // header for each transaction
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  // timestamp for each transaction
  timestamp: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_light_text,
    fontSize: 14,
  },
  // type of transaction container
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  // type of transaction txt
  typeText: {
    color: Theme.CFL_white,
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: Theme.CFL_primary_font,

    textTransform: "uppercase",
  },
  // transaction name
  name: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_white,
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  // transaction description
  description: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_offwhite,
    fontSize: 14,
    marginBottom: 5,
  },
  // container for field change
  changesContainer: {
    borderTopWidth: 1,
    borderTopColor: Theme.CFL_gray,
    paddingTop: 3,
  },
  // what field it affects
  fieldChange: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 4,
  },
  // positive currency difference
  positiveAmount: {
    color: Theme.CFL_lime_green,
    fontFamily: Theme.CFL_primary_font,
    fontSize: 14,
    fontWeight: "500",
  },
  // negative currency difference
  negativeAmount: {
    color: Theme.CFL_red,
    fontFamily: Theme.CFL_primary_font,
    fontSize: 14,
    fontWeight: "500",
  },
});

// exported to be called in index.tsx by tab navigation
export default TransactionLog;
