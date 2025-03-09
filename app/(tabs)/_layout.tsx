// this file tells expo what our layout is, for the tab menu
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import blankUser from "../../data/testData/blankUser";
import Theme from "../../interfaces/theme";
import User from "../../interfaces/User";
import Header from "../components/Header/Header";

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
// allows user to be accessed globally
const UserContext = createContext<UserContextType>({
  user: blankUser,
  setUser: () => {},
});

// this is what can be called to get User in other components (has to be names useUser for custom react-hook)
export function useUser() {
  return useContext(UserContext);
}
export const TabLayout = () => {
  const [user, setUser] = useState<User>(blankUser);

  // load the user when the component mounts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          setUser(blankUser);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    loadUser();
  }, []); // runs only on initial mount

  // save user to storage every time it changes
  useEffect(() => {
    const saveUser = async () => {
      try {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Error saving user:", error);
      }
    };
    saveUser();
  }, [user]); // runs every time user is updated

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <View style={styles.container}>
        {/* Safe Area avoids the phones header (battery, cell service) */}
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <Header />

          {/* Tab Menu, controls page display */}
          <Tabs
            screenOptions={{
              headerShown: false,
              // green tabbar active colors
              tabBarActiveTintColor: Theme.CFL_dark_text,
              tabBarActiveBackgroundColor: "#3C8F3A",
              // green tabbar inactive colors
              tabBarInactiveTintColor: Theme.CFL_black,
              tabBarInactiveBackgroundColor: Theme.CFL_green,
              // icon size
              tabBarIconStyle: { width: 24, height: 24, marginTop: 5 },
              // more styling
              tabBarStyle: styles.tabBar,
              tabBarAllowFontScaling: true,
              tabBarItemStyle: {
                flex: 1,
                width: "25%",
                height: 65,
              },
              // // dark tabbar active colors
              // tabBarActiveTintColor: Theme.CFL_white,
              // tabBarActiveBackgroundColor: Theme.CFL_active_tab,
              // // dark tabbarinactive colors
              // tabBarInactiveTintColor: Theme.CFL_inactive_tab_font,
              // tabBarInactiveBackgroundColor: Theme.CFL_inactive_tab,
            }}
          >
            <Tabs.Screen
              name="home"
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="home" size={size} color={color} />
                ),
                tabBarLabelStyle: styles.tabLabel,
              }}
            />
            <Tabs.Screen
              name="finances"
              options={{
                tabBarLabel: "Finances",
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons
                    name="attach-money"
                    size={size}
                    color={color}
                  />
                ),
                tabBarLabelStyle: styles.tabLabel,
              }}
            />
            <Tabs.Screen
              name="transactions"
              options={{
                tabBarLabel: "Transactions",
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="receipt" size={size} color={color} />
                ),
                tabBarLabelStyle: styles.tabLabel,
              }}
            />
            <Tabs.Screen
              name="assets"
              options={{
                tabBarLabel: "Properties",
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="apartment" size={size} color={color} />
                ),
                tabBarLabelStyle: styles.tabLabel,
              }}
            />
          </Tabs>
        </SafeAreaView>
      </View>
    </UserContext.Provider>
  );
};
// Styling Section
const styles = StyleSheet.create({
  // whole app container
  container: {
    flex: 1, // ensure app takes up whole screen
    backgroundColor: Theme.CFL_app_background,
  },
  // label for each
  tabLabel: {
    fontSize: 12,
    fontFamily: Theme.CFL_primary_font,
    paddingTop: 5,
  },
  // whole tab menu bar
  tabBar: {
    height: 65,
  },
});

export default TabLayout;
