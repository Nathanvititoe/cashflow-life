// import necessary libraries/methods and components
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { testTransactions } from "../../../data/testData/testTransactions";
import Theme from "../../../interfaces/theme";
import Transaction from "../../../interfaces/transaction";
import User from "../../../interfaces/user";
import { formatUSD } from "../../../utils/currencyUtil";
import { formatTimestamp } from "../../../utils/timeUtil";
import { getTypeColor } from "../../../utils/transactionUtil";

// component properties type definition
interface TransactionLogProps {
  user: User;
  onNewTransaction: (transaction: Transaction) => void;
}

const TransactionLog: React.FC<TransactionLogProps> = ({
  user,
  onNewTransaction,
}) => {
  // Logic/Functions Section

  // Tsx for every transaction
  const renderTransaction = (transaction: Transaction) => (
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

        <Text style={styles.name}>{transaction.name}</Text>

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

  // Overall tsx section
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {testTransactions.map(renderTransaction)}
      </ScrollView>
    </View>
  );
};

// Styling Section
const styles = StyleSheet.create({
  // Full Log container
  container: {
    flex: 1,
  },
  // container that scrolls
  scrollContainer: {
    flex: 1,
  },
  // background container for each card
  card: {
    marginVertical: Theme.CFL_card_spacing, // space between components
    backgroundColor: Theme.CFL_black, // lighter card background
    padding: 7,
    paddingVertical: 13,
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
    color: Theme.CFL_light_gray,
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
  },
  // transaction name
  name: {
    color: Theme.CFL_white,
    fontSize: 16,
    marginBottom: 8,
  },
  // transaction description
  description: {
    color: Theme.CFL_light_gray,
    fontSize: 12,
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
    fontSize: 14,
    fontWeight: "500",
  },
  // negative currency difference
  negativeAmount: {
    color: Theme.CFL_red,
    fontSize: 14,
    fontWeight: "500",
  },
});

// exported to be called in index.tsx by tab navigation
export default TransactionLog;
