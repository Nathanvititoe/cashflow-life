// import necessary libraries/methods and components
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import User from "../../../interfaces/user";
import addValuesTogether from "../../../utils/additionUtil";
import formatUSD from "../../../utils/currencyUtil";
import Theme from "../../../interfaces/theme";

// component properties type definition
interface FinancialStatementProps {
  user: User;
}

const FinancialStatement: React.FC<FinancialStatementProps> = ({ user }) => {
  // Logic/Functions Section

  // Tsx Section
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Statement Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Income Sources List */}
          <View style={styles.card}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Income Sources</Text>

              {/* Salary */}
              <View style={styles.row}>
                <Text style={styles.label}>Salary:</Text>
                <Text style={styles.value}>
                  {formatUSD(user.incomeExplained.Salary)}
                </Text>
              </View>

              {/* Separator Line */}
              <View style={styles.separator} />

              {/* Passive Income */}
              {Object.entries(user.incomeExplained["Passive Income"]).map(
                ([source, amount]) => (
                  <View key={source} style={styles.row}>
                    <Text style={styles.label}>{source}:</Text>
                    <Text style={styles.value}>{formatUSD(amount)}</Text>
                  </View>
                )
              )}

              <View style={[styles.row, styles.totalRow]}>
                <Text style={styles.totalLabel}>Passive Income:</Text>
                <Text style={styles.positive}>
                  {formatUSD(
                    addValuesTogether(user.incomeExplained["Passive Income"])
                  )}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.totalLabel}>Total Income:</Text>
                <Text style={styles.positive}>
                  {formatUSD(user.totalIncome)}
                </Text>
              </View>
            </View>
          </View>

          {/* Expenses */}
          <View style={styles.card}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Monthly Expenses</Text>
              {Object.entries(user.expensesExplained).map(
                ([expense, amount]) => (
                  <View key={expense} style={styles.row}>
                    <Text style={styles.label}>{expense}:</Text>
                    <Text style={styles.value}>{formatUSD(amount)}</Text>
                  </View>
                )
              )}
              <View style={[styles.row, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total Expenses:</Text>
                <Text style={styles.negative}>
                  {formatUSD(user.totalExpenses)}
                </Text>
              </View>
            </View>
          </View>

          {/* Assets */}
          <View style={styles.card}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Assets</Text>
              {Object.entries(user.Assets).map(([asset, amount]) => (
                <View key={asset} style={styles.row}>
                  <Text style={styles.label}>{asset}:</Text>
                  <Text style={styles.value}>{formatUSD(amount)}</Text>
                </View>
              ))}
              <View style={[styles.row, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total Assets:</Text>
                <Text style={styles.positive}>
                  {formatUSD(
                    Object.values(user.Assets).reduce((a, b) => a + b, 0)
                  )}
                </Text>
              </View>
            </View>
          </View>

          {/* Liabilities */}
          <View style={styles.card}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Liabilities</Text>
              {Object.entries(user.Liabilities).map(([liability, amount]) => (
                <View key={liability} style={styles.row}>
                  <Text style={styles.label}>{liability}:</Text>
                  <Text style={styles.value}>{formatUSD(amount)}</Text>
                </View>
              ))}
              <View style={[styles.row, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total Liabilities:</Text>
                <Text style={styles.negative}>
                  {formatUSD(
                    Object.values(user.Liabilities).reduce((a, b) => a + b, 0)
                  )}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // full statement container
  container: {
    backgroundColor: Theme.CFL_background_black,
  },
  // scrollable view
  scrollView: {
    flex: 1,
  },
  // scrollable content
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  // statement content container
  content: {
    flex: 1,
    padding: 5,
  },
  // background container for each section
  card: {
    marginVertical: 8, // space between components
    backgroundColor: Theme.CFL_black, // lighter card background
    padding: 7,
    paddingVertical: 17,
    borderRadius: 10,
  },
  // income/expenses/assets
  section: {
    backgroundColor: Theme.CFL_background_black, // darker inner container
    padding: 15,
    borderRadius: 10,
  },
  // section titles
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.CFL_white,
    marginBottom: 10,
  },
  // row
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  // total values
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Theme.CFL_light_grey,
  },
  // labels
  label: {
    fontSize: 16,
    color: Theme.CFL_light_grey,
  },
  // values
  value: {
    fontSize: 16,
    color: Theme.CFL_white,
    fontWeight: "500",
  },
  // labels for totals
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.CFL_white,
  },
  // if $ is positive
  positive: {
    color: Theme.CFL_lime_green,
    fontSize: 16,
    fontWeight: "bold",
  },
  // if $ is negative
  negative: {
    color: Theme.CFL_red,
    fontSize: 16,
    fontWeight: "bold",
  },
  // dividing line
  separator: {
    height: 1,
    backgroundColor: Theme.CFL_light_grey,
    marginVertical: 3,
  },
});

// export to be called in index.tsx from tab navigation
export default FinancialStatement;
