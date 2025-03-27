// import necessary libraries/methods and components
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Theme from "../../../interfaces/theme";
import addValuesTogether from "../../../utils/additionUtil";
import formatUSD from "../../../utils/currencyUtil";
import { useUser } from "../context/UserProvider";
import { calculateTotals } from "./FinancialOverview";

const FinancialStatement = () => {
  const { user, setUser } = useUser();

  // recalculate everytime income/expenses values change
  useEffect(() => {
    calculateTotals(user, setUser);
  }, [user.income, user.expenses]);

  return (
    // Statement Container
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Income Sources List */}
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Income Sources</Text>

            {/* Salary */}
            <View style={styles.row}>
              <Text style={styles.label}>Salary:</Text>
              <Text style={styles.value}>{formatUSD(user.income?.Salary)}</Text>
            </View>

            {/* Separator Line */}
            <View style={styles.separator} />

            {/* Passive Income */}
            {Object.entries(user.income["Passive Income"]).map(([source, amount]) => (
              <View key={source} style={styles.row}>
                <Text style={styles.label}>{source}:</Text>
                <Text style={styles.value}>{formatUSD(amount)}</Text>
              </View>
            ))}

            <View style={[styles.row, styles.totalRow]}>
              <Text style={styles.totalLabel}>Passive Income:</Text>
              <Text style={styles.positive}>
                {formatUSD(addValuesTogether(user.income?.["Passive Income"]))}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Income:</Text>
              <Text style={styles.positive}>{formatUSD(user.totalIncome ?? 0)}</Text>
            </View>
          </View>
        </View>

        {/* Expenses */}
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Monthly Expenses</Text>
            {Object.entries(user.expenses).map(([expense, amount]) => (
              <View key={expense} style={styles.row}>
                <Text style={styles.label}>{expense}:</Text>
                <Text style={styles.value}>{formatUSD(amount)}</Text>
              </View>
            ))}
            <View style={[styles.row, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Expenses:</Text>
              <Text style={styles.negative}>{formatUSD(user.totalExpenses ?? 0)}</Text>
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
              <Text style={styles.positive}>{formatUSD(user.totalAssets ?? 0)}</Text>
            </View>
          </View>
        </View>

        {/* Liabilities */}
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Liabilities</Text>
            {Object.entries(user.Liabilities ?? {}).map(([liability, amount]) => (
              <View key={liability} style={styles.row}>
                <Text style={styles.label}>{liability}:</Text>
                <Text style={styles.value}>{formatUSD(amount ?? 0)}</Text>
              </View>
            ))}
            <View style={[styles.row, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Liabilities:</Text>
              <Text style={styles.negative}>{formatUSD(user.totalLiabilites)}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // scrollable container
  scrollView: {
    backgroundColor: Theme.CFL_app_background,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  // statement content container
  content: {
    padding: 16,
  },
  // background container for each section
  card: {
    marginVertical: Theme.CFL_card_spacing, // space between components
    backgroundColor: Theme.CFL_black, // lighter card background
    padding: 7,
    paddingVertical: 17,
    borderRadius: 10,
  },
  // income/expenses/assets
  section: {
    backgroundColor: Theme.CFL_card_background, // inner container black
    padding: 15,
    borderRadius: 10,
  },
  // section titles
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.CFL_white,
    fontFamily: Theme.CFL_title_font,
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
    borderTopColor: Theme.CFL_gray,
  },
  // labels
  label: {
    fontSize: 16,
    color: Theme.CFL_light_text,
    fontFamily: Theme.CFL_primary_font,
  },
  // values
  value: {
    fontSize: 16,
    color: Theme.CFL_white,
    fontWeight: "500",
    fontFamily: Theme.CFL_primary_font,
  },
  // labels for totals
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.CFL_white,
    fontFamily: Theme.CFL_primary_font,
  },
  // if $ is positive
  positive: {
    color: Theme.CFL_lime_green,
    fontFamily: Theme.CFL_primary_font,

    fontSize: 16,
    fontWeight: "bold",
  },
  // if $ is negative
  negative: {
    color: Theme.CFL_red,
    fontFamily: Theme.CFL_primary_font,

    fontSize: 16,
    fontWeight: "bold",
  },
  // dividing line
  separator: {
    height: 1,
    backgroundColor: Theme.CFL_gray,
    marginVertical: 3,
  },
});

// export to be called in index.tsx from tab navigation
export default FinancialStatement;
