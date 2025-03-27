// import necessary libraries/methods and components
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import testProperties from "../../../data/testData/testProperties";
import { RealEstate } from "../../../interfaces/Assets";
import Theme from "../../../interfaces/theme";
import { useUser } from "../context/UserProvider";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { formatUSD } from "../../../utils/currencyUtil";
import { formatTimestamp } from "../../../utils/timeUtil";

const Properties = () => {
  // import user from react context
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useUser();

  // determines the color based on the transaction type
  const getTypeColor = (type: RealEstate["type"]) => {
    switch (type) {
      case "house":
        return Theme.CFL_pink;
      case "business":
        return Theme.CFL_cyan;
      default:
        return Theme.CFL_lime_green; // default green
    }
  };

  // Tsx for every property
  const renderProperty = (property: RealEstate) => {
    const cashflow = property["Cash Flow"] ?? 0;
    return (
      <View key={property.name} style={styles.card}>
        <View style={styles.propertyCard}>
          <View style={styles.propertyHeader}>
            <Text style={styles.timestamp}>{formatTimestamp(property.purchaseTime)}</Text>
            <View style={[styles.typeTag, { backgroundColor: getTypeColor(property.type) }]}>
              <Text style={styles.typeText}>{property.type.toUpperCase()}</Text>
            </View>
          </View>

          <Text style={styles.propertyName}>{property.name}</Text>
          <Text style={styles.description}>{property.description}</Text>

          <View style={styles.changesContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.fieldName}>Purchase Price:</Text>
              <Text style={styles.value}>{formatUSD(property["Purchase Price"])}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.fieldName}>Monthly Cash Flow:</Text>
              <Text style={cashflow > 0 ? styles.positiveAmount : styles.negativeAmount}>
                {formatUSD(cashflow)}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.fieldName}>Mortgage:</Text>
              <Text style={styles.value}>{formatUSD(property.Mortgage)}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.fieldName}>Sale Range:</Text>
              <Text style={styles.value}>{`${formatUSD(
                Number(property["Sale Range"].split("-")[0])
              )} - ${formatUSD(Number(property["Sale Range"].split("-")[1]))}`}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Overall tsx section
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.content}>{testProperties.map(renderProperty)}</View>
    </ScrollView>
  );
};

// Styling Section
const styles = StyleSheet.create({
  // scrollable container
  scrollContainer: {
    flex: 1,
  },
  // component container
  content: {
    padding: 16,
    backgroundColor: Theme.CFL_app_background,
  },
  // each property card
  card: {
    marginVertical: Theme.CFL_card_spacing,
    backgroundColor: Theme.CFL_black,
    padding: 7,
    paddingVertical: 13,
    borderRadius: 10,
  },
  // inner property card
  propertyCard: {
    backgroundColor: Theme.CFL_card_background,
    padding: 10,
    borderRadius: 10,
  },
  // header section (each card)
  propertyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  // timestamp
  timestamp: {
    color: Theme.CFL_light_text,
    fontFamily: Theme.CFL_primary_font,
    fontSize: 14,
  },
  // property type tag
  typeTag: {
    fontFamily: Theme.CFL_primary_font,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    margin: 2,
  },
  // property type text
  typeText: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_white,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  // name of property
  propertyName: {
    fontFamily: Theme.CFL_title_font,
    color: Theme.CFL_white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  // property description
  description: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_offwhite,
    fontSize: 14,
    marginBottom: 8,
  },
  // container for values
  changesContainer: {
    borderTopWidth: 1,
    borderTopColor: Theme.CFL_gray,
    paddingTop: 8,
  },
  // each value row
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  // name of change
  fieldName: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_light_text,
    fontSize: 14,
  },
  // value of change (neutral)
  value: {
    color: Theme.CFL_white,
    fontSize: 14,
    fontWeight: "500",
  },
  // if its positive
  positiveAmount: {
    color: Theme.CFL_lime_green,
    fontFamily: Theme.CFL_primary_font,
    fontSize: 14,
    fontWeight: "500",
  },
  // if its negative
  negativeAmount: {
    color: Theme.CFL_red,
    fontFamily: Theme.CFL_primary_font,
    fontSize: 14,
    fontWeight: "500",
  },
});

// exported to be called in index.tsx by tab navigation
export default Properties;
