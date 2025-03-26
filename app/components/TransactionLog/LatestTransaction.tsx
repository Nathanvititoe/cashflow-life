// import necessary libraries/methods and components
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Theme from "../../../interfaces/theme";
import Transaction from "../../../interfaces/Transaction";
import formatUSD from "../../../utils/currencyUtil";
import formatTimestamp from "../../../utils/timeUtil";
import getTypeColor, { findLatestTransaction } from "../../../utils/transactionUtil";
import { useTransactions } from "../context/TransactionProvider";

const LatestTransaction = () => {
  const { getTransactions } = useTransactions();
  const [latestTransaction, setLatestTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const transactions = getTransactions();
    if (transactions.length > 0) {
      setLatestTransaction(findLatestTransaction(transactions));
    }
  }, [getTransactions]);

  // if no transactions, display this message
  if (!latestTransaction) {
    return (
      <View style={styles.card}>
        <Text style={styles.noTransaction}>No Transactions Available</Text>
      </View>
    );
  }

  // if theres a transaction, display it
  return (
    latestTransaction && (
      <View style={styles.card} key={latestTransaction.timestamp}>
        <View style={styles.transactionCard}>
          <View style={styles.transactionHeader}>
            <Text style={styles.timestamp}>{formatTimestamp(latestTransaction.timestamp)}</Text>
            <View
              style={[styles.typeTag, { backgroundColor: getTypeColor(latestTransaction.type) }]}>
              <Text style={styles.typeText}>{latestTransaction.type.toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.nameContainer}>
            <View style={styles.newTag}>
              <Text style={styles.newText}>New</Text>
            </View>
            <Text style={styles.name}>{latestTransaction.name}</Text>
          </View>

          <View style={styles.changesContainer}>
            <Text style={styles.description}>{latestTransaction.description}</Text>
            <View style={styles.fieldChange}>
              <Text
                style={
                  latestTransaction.amount > 0 ? styles.positiveAmount : styles.negativeAmount
                }>
                {formatUSD(latestTransaction.amount)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  // background container for each card
  card: {
    marginVertical: Theme.CFL_card_spacing, // space between components
    backgroundColor: Theme.CFL_black, // lighter card background
    borderRadius: 10,
  },
  // card for each transaction
  transactionCard: {
    backgroundColor: Theme.CFL_card_background,
    padding: 10,
    borderRadius: 10,
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
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_white,
    fontSize: 12,
    fontWeight: "bold",
  },
  // name container
  nameContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  // new tag
  newTag: {
    backgroundColor: Theme.CFL_lime_green,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  // new tag txt
  newText: {
    color: Theme.CFL_dark_text,
    fontSize: 12,
    fontWeight: "900",
    fontFamily: Theme.CFL_primary_font,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  // transaction name
  name: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_white,
    fontWeight: "bold",
    fontSize: 16,
  },
  // no transaction txt
  noTransaction: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_light_text,
    fontSize: 12,
    padding: 2,
    marginLeft: 20,
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
    fontFamily: Theme.CFL_primary_font,
  },
  // positive currency difference
  positiveAmount: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_lime_green,
    fontSize: 14,
    fontWeight: "500",
  },
  // negative currency difference
  negativeAmount: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_red,
    fontSize: 14,
    fontWeight: "500",
  },
});
// export to be called in index.tsx
export default LatestTransaction;
