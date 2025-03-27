// import necessary libraries/methods and components
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Theme from "../../../interfaces/theme";
import User from "../../../interfaces/User";
import addValuesTogether from "../../../utils/additionUtil";
import formatUSD from "../../../utils/currencyUtil";
import { useUser } from "../context/UserProvider";
import ProfessionIcon from "../features/ProfessionIcon";

// Calculate net worth (Assets - Liabilities)
export const calculateNetWorth = (user: User, setUser: Dispatch<SetStateAction<User>>): void => {
  const totalAssets = Object.values(user.Assets).reduce((sum, value) => sum + value, 0);
  const totalLiabilities = Object.values(user.Liabilities).reduce((sum, value) => sum + value, 0);
  const netWorth = totalAssets - totalLiabilities;
  setUser(prevUser => ({ ...prevUser, totalAssets, totalLiabilites: totalLiabilities, netWorth }));
};

// calculate total income (Salary + passive income) and total expenses (all expenses summed)
export const calculateTotals = (user: User, setUser: Dispatch<SetStateAction<User>>) => {
  const totalIncome = addValuesTogether(user.income["Passive Income"]) + (user.income.Salary ?? 0);
  const totalExpenses = addValuesTogether(user.expenses);
  setUser(prevUser => ({ ...prevUser, totalIncome, totalExpenses }));
};

const FinancialOverview = () => {
  const { user, setUser } = useUser();

  // update user everytime assets, or liabilities changes
  useEffect(() => {
    calculateNetWorth(user, setUser);
  }, [user.Liabilities, user.Assets]);

  const getCashflow = (): number => {
    if (user.totalExpenses) {
      return addValuesTogether(user.income["Passive Income"]) - user.totalExpenses;
    }
    return 0;
  };
  // Tsx Section
  return (
    <View style={styles.container}>
      <View>
        {/* Header Container */}
        <View style={styles.headerContainer}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleUsername} numberOfLines={1} ellipsizeMode="tail">
              {user.name}'s
            </Text>
            <Text style={styles.title}> Financial Overview</Text>
          </View>
        </View>
      </View>

      {/* Separator Line */}
      <View style={styles.separator} />

      {/* Profession Section */}
      <View style={styles.professionContainer}>
        <View style={styles.professionIconContainer}>
          <ProfessionIcon icon={user.professionIcon} size={35} color={Theme.CFL_midnight} />
        </View>
        <Text style={styles.professionTxt}>{user.profession}</Text>
      </View>

      {/* Separator Line */}
      <View style={styles.separator} />

      {/* Monthly Overview */}
      <View style={styles.row}>
        <Text style={styles.label}>Salary:</Text>
        <Text style={styles.value}>{formatUSD(user.income.Salary)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Passive Income:</Text>
        <Text style={styles.value}>
          {formatUSD(addValuesTogether(user.income["Passive Income"]))}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Monthly Expenses:</Text>
        <Text style={styles.value}>{formatUSD(user.totalExpenses ?? 0)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Cashflow:</Text>
        <Text style={[styles.value, getCashflow() >= 0 ? styles.positive : styles.negative]}>
          {formatUSD(getCashflow())}
        </Text>
      </View>

      {/* Separator Line */}
      <View style={styles.separator} />

      {/* Assets/Liabilities Overview */}
      <View style={styles.row}>
        <Text style={styles.label}>Total Assets:</Text>
        <Text style={styles.value}>{formatUSD(user.totalAssets ?? 0)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total Liabilities:</Text>
        <Text style={styles.value}>{formatUSD(user.totalLiabilites ?? 0)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Net Worth:</Text>
        <Text style={[styles.value, (user.netWorth ?? 0 >= 0) ? styles.positive : styles.negative]}>
          {formatUSD(user.netWorth ?? 0)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Financial Overview Card
  container: {
    padding: 15,
    backgroundColor: Theme.CFL_card_background,
    borderRadius: 10,
    marginVertical: 10,
  },
  // header container
  headerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  // title container
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  // title username
  titleUsername: {
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.CFL_white,
    fontFamily: Theme.CFL_primary_font,
    maxWidth: "50%",
    overflow: "hidden",
    flexShrink: 1,
  },
  // title
  title: {
    fontSize: 20,
    fontFamily: Theme.CFL_primary_font,
    fontWeight: "bold",
    color: Theme.CFL_white,
    flexShrink: 0,
  },
  // profession container
  professionContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
    flexDirection: "row",
    color: Theme.CFL_light_text,
  },
  // profession icon container
  professionIconContainer: {
    height: 40,
    width: 40,
    backgroundColor: Theme.CFL_light_gray,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  // profession txt
  professionTxt: {
    fontSize: 15,
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_light_text,
    paddingLeft: 15,
  },
  // each row of txt
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  // txt field name
  label: {
    fontSize: 16,
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_light_text,
  },
  // txt value
  value: {
    fontSize: 16,
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_white,
    fontWeight: "500",
  },
  // if $ is positive
  positive: {
    color: Theme.CFL_lime_green,
    fontFamily: Theme.CFL_primary_font,
  },
  // if $ is negative
  negative: {
    color: Theme.CFL_red,
    fontFamily: Theme.CFL_primary_font,
  },
  // dividing line
  separator: {
    height: 1,
    backgroundColor: Theme.CFL_gray,
    marginVertical: 10,
  },
});

// export the component, to be called in index.tsx on home page
export default FinancialOverview;
