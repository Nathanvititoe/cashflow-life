// import necessary libraries/methods and components
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Theme from "../../../interfaces/theme";
import Transaction from "../../../interfaces/Transaction";
import formatUSD from "../../../utils/currencyUtil";
import formatTimestamp from "../../../utils/timeUtil";
import getTypeColor from "../../../utils/transactionUtil";

// component properties type definition
interface LatestTransactionProps {
  transaction: Transaction;
}

const LatestTransaction: React.FC<LatestTransactionProps> = ({
  transaction,
}) => {
  // Logic/Functions Section
  if (!transaction) return;

  // Tsx Section
  return (
    <View style={styles.card} key={transaction.id}>
      <View style={styles.transactionCard}>
        <View style={styles.transactionHeader}>
          <Text style={styles.timestamp}>
            {formatTimestamp(transaction.timestamp)}
          </Text>
          <View
            style={[
              styles.typeTag,
              { backgroundColor: getTypeColor(transaction.type) },
            ]}
          >
            <Text style={styles.typeText}>
              {transaction.type.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.nameContainer}>
          <View style={styles.newTag}>
            <Text style={styles.newText}>New</Text>
          </View>
          <Text style={styles.name}>{transaction.name}</Text>
        </View>

        <View style={styles.changesContainer}>
          <Text style={styles.description}>{transaction.description}</Text>
          <View style={styles.fieldChange}>
            <Text
              style={
                transaction.amount > 0
                  ? styles.positiveAmount
                  : styles.negativeAmount
              }
            >
              {formatUSD(transaction.amount)}
            </Text>
          </View>
        </View>
      </View>
    </View>
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
