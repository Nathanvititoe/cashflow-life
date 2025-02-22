// import necessary libraries/methods and components
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Theme from "../../../interfaces/theme";

const LatestTransaction = () => {
  // Logic/Functions Section

  // Tsx Section
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}> Latest Transaction Here</Text>
      </View>
    </>
  );
};

// Styling Section
const styles = StyleSheet.create({
  // Latest Transaction Card Container
  container: {
    padding: 15,
    marginVertical: 4,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.CFL_card_background,
  },
  // Latest Transaction Title
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.CFL_white,
  },
});

// exported to be called within Index.tsx
export default LatestTransaction;
