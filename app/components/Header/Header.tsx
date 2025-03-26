// import necessary libraries/methods and components
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import blankUser from "../../../data/testData/blankUser";
import Theme from "../../../interfaces/theme";
import { useTransactions } from "../context/TransactionProvider";
import { useUser } from "../context/UserProvider";
import ConfirmationModal from "../features/ConfirmationModal";
import UserMenu from "../Menus/UserMenu";

const Header = () => {
  const { user, setUser } = useUser();
  const { clearTransactions } = useTransactions();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name); // user typed input
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const menuButtonRef = React.useRef<View>(null);

  const handleMenuVisibility = () => {
    // Logic/ Functions Section
    // Get the position of the menu button
    menuButtonRef.current?.measureInWindow((x, y, width, height) => {
      setMenuPosition({
        top: y,
        right: Dimensions.get("window").width - x - width,
      });
      setIsMenuVisible(true);
    });
  };

  const handleEditUsername = () => {
    setIsMenuVisible(false); // close the menu
    setTempName(user.name); // reset temp name to current username
    // short delay for smoothness
    setTimeout(() => {
      setIsEditing(true); // trigger text input to be visible in header
    }, 100);
  };

  const handleSubmit = () => {
    if (tempName.trim()) {
      setUser({ ...user, name: tempName.trim() }); // set to user input
    } else {
      setTempName(user.name); // set back to original
    }
    setIsEditing(false);
  };

  // clear async storage (wipes all saved data)
  const resetGame = async () => {
    try {
      // clear local storage
      await AsyncStorage.clear();
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("transactions");

      // clear state
      setUser(blankUser);
      clearTransactions();
      setTempName(blankUser.name);

      // close menus
      setIsConfirmModalVisible(false);
      setIsMenuVisible(false);
    } catch (error) {
      console.error("Failed to clear async storage:", error);
    }
  };

  const newGameRequest = () => {
    setIsConfirmModalVisible(true);
  };

  // Tsx Section
  return (
    <>
      {/* Header Container */}
      <View style={styles.header}>
        {/* Header Text Container */}
        <View style={styles.headerText}>
          {/* Title */}
          <Text style={styles.title}>Cashflow Life</Text>

          {/* Username display */}
          {isEditing ? (
            <TextInput
              style={styles.usernameInput}
              value={tempName}
              onChangeText={setTempName}
              onBlur={handleSubmit}
              cursorColor={Theme.CFL_black}
              autoFocus
              selectTextOnFocus
              onSubmitEditing={handleSubmit}
              placeholder={user.name}
              placeholderTextColor="rgba(34, 65, 29, 0.5)"
            />
          ) : (
            <Text style={styles.username}>{user.name}</Text>
          )}
        </View>

        {/* Menu Btn */}
        <TouchableOpacity
          style={styles.menu}
          onPress={handleMenuVisibility}
          activeOpacity={0.7}
          ref={menuButtonRef}>
          <Feather name="menu" size={30} color={Theme.CFL_black} />
        </TouchableOpacity>
      </View>

      {/* User Menu  */}
      <UserMenu
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        onNewGame={newGameRequest}
        onEditUsername={handleEditUsername}
        anchorPosition={menuPosition}
      />
      {/* Confirmation Modal */}
      <ConfirmationModal
        isVisible={isConfirmModalVisible}
        title=""
        message="Are you sure you want to reset the game? All progress will be lost."
        confirmText="Reset"
        cancelText="Cancel"
        onConfirm={resetGame}
        onCancel={() => setIsConfirmModalVisible(false)}
      />
    </>
  );
};

// Styling Section
const styles = StyleSheet.create({
  // header container
  header: {
    marginTop: 5,
    width: "100%",
    backgroundColor: Theme.CFL_green,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  // header txt
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.CFL_yellow,
    alignItems: "center",
    maxWidth: 200,
  },
  // CashFlow Life title
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Theme.CFL_yellow,
    textAlign: "center",
    fontFamily: Theme.CFL_title_font,
  },
  // username txt
  username: {
    fontSize: 16,
    color: Theme.CFL_dark_text,
    fontFamily: Theme.CFL_primary_font,
    textAlign: "center",
    marginTop: 4,
  },
  // username txt while editing
  usernameInput: {
    fontSize: 16,
    color: Theme.CFL_dark_text,
    fontFamily: Theme.CFL_primary_font,
    textAlign: "center",
    marginTop: 4,
    padding: 3,
    minWidth: 120,
    backgroundColor: Theme.CFL_dark_green,
    borderRadius: 8,
  },
  // menu btn
  menu: {
    padding: 8,
    position: "absolute",
    right: 20,
  },
});

// exported to be called within Index.tsx
export default Header;
