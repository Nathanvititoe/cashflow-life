// import necessary libraries/methods and components
import User from "@/interfaces/user";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import formatUSD from "@/utils/currencyUtil";
import { AntDesign } from "@expo/vector-icons";
import FinancialStatement from "./FinancialStatement";
import addValuesTogether from "@/utils/additionUtil";

// component properties type definition
interface FinancialOverviewProps {
  user: User;
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({ user }) => {
  const [statementVisibile, setStatementVisible] = useState(false); // visibility of full financial statement
  // Logic/Functions Section

  // Calculate net worth (Assets - Liabilities)
  const calculateNetWorth = () => {
    const totalAssets = Object.values(user.Assets).reduce(
      (sum, value) => sum + value,
      0
    );
    const totalLiabilities = Object.values(user.Liabilities).reduce(
      (sum, value) => sum + value,
      0
    );
    return totalAssets - totalLiabilities;
  };

  const handleOpenStatement = () => {
    console.log("look its the full statement");
    setStatementVisible(true);
  };

  // Tsx Section
  return (
    <View style={styles.container}>
      <View>
        {/* Header Container */}
        <View style={styles.headerContainer}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text
              style={styles.titleUsername}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {user.name}'s
            </Text>
            <Text style={styles.title}> Financial Overview</Text>
          </View>

          {/* Full Financial Statement Btn */}
          <TouchableOpacity
            style={styles.statementBtn}
            onPress={handleOpenStatement}
          >
            <View style={styles.btnContent}>
              <AntDesign name="file1" size={16} color="#ffffff" />
              <Text style={styles.btnText}>View Financial Statement</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Separator Line */}
      <View style={styles.separator} />

      {/* Profession Section */}
      <View style={styles.professionContainer}>
        <View style={styles.professionIconContainer}>
          <AntDesign name="questioncircle" size={35} color="#000000" />
        </View>
        <Text style={styles.professionTxt}>{user.profession}</Text>
      </View>

      {/* Separator Line */}
      <View style={styles.separator} />

      {/* Monthly Overview */}
      <View style={styles.row}>
        <Text style={styles.label}>Salary:</Text>
        <Text style={styles.value}>
          {formatUSD(user.incomeExplained.Salary)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Passive Income:</Text>
        <Text style={styles.value}>
          {formatUSD(addValuesTogether(user.incomeExplained["Passive Income"]))}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Monthly Expenses:</Text>
        <Text style={styles.value}>{formatUSD(user.totalExpenses)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Cashflow:</Text>
        <Text
          style={[
            styles.value,
            addValuesTogether(user.incomeExplained["Passive Income"]) -
              user.totalExpenses >
            0
              ? styles.positive
              : styles.negative,
          ]}
        >
          {formatUSD(
            addValuesTogether(user.incomeExplained["Passive Income"]) -
              user.totalExpenses
          )}
        </Text>
      </View>

      {/* Separator Line */}
      <View style={styles.separator} />

      {/* Assets/Liabilities Overview */}
      <View style={styles.row}>
        <Text style={styles.label}>Total Assets:</Text>
        <Text style={styles.value}>
          {formatUSD(
            Object.values(user.Assets).reduce((sum, value) => sum + value, 0)
          )}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total Liabilities:</Text>
        <Text style={styles.value}>
          {formatUSD(
            Object.values(user.Liabilities).reduce(
              (sum, value) => sum + value,
              0
            )
          )}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Net Worth:</Text>
        <Text
          style={[
            styles.value,
            calculateNetWorth() > 0 ? styles.positive : styles.negative,
          ]}
        >
          {formatUSD(calculateNetWorth())}
        </Text>
      </View>

      {/* Full Financial Statement */}
      {statementVisibile && (
        <View>
          <FinancialStatement
            user={user}
            isVisible={statementVisibile}
            onClose={() => setStatementVisible(false)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Financial Overview Card
  container: {
    padding: 15,
    backgroundColor: "#121212",
    borderRadius: 10,
    marginVertical: 10,
  },
  // header container
  headerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
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
    color: "#ffffff",
    marginBottom: 15,
    maxWidth: "50%",
    overflow: "hidden",
    flexShrink: 1,
  },
  // title
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 15,
    flexShrink: 0,
  },
  // full financial statement btn
  statementBtn: {
    backgroundColor: "#333333",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
  },
  // statement btn content
  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  // statement btn txt
  btnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  // profession container
  professionContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
    flexDirection: "row",
    color: "#bbbbbb",
  },
  // profession icon container
  professionIconContainer: {
    height: 40,
    width: 40,
    backgroundColor: "#bbbbbb",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  // profession txt
  professionTxt: {
    fontSize: 15,
    color: "#bbbbbb",
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
    color: "#bbbbbb",
  },
  // txt value
  value: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  // if $ is positive
  positive: {
    color: "#3e9c35",
  },
  // if $ is negative
  negative: {
    color: "#ff4444",
  },
  // dividing line
  separator: {
    height: 1,
    backgroundColor: "#333333",
    marginVertical: 10,
  },
});

// export the component, to be called in index.tsx
export default FinancialOverview;
