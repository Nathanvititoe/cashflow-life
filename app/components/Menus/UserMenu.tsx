// import necessary libraries/methods and components
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Theme from "../../../interfaces/theme";

// type definition for menu properties
interface UserMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onNewGame: () => void;
  onEditUsername: () => void;
  anchorPosition: { top: number; right: number }; // positioning relative to the menu btn
}

const UserMenu: React.FC<UserMenuProps> = ({
  isVisible,
  onClose,
  onNewGame,
  onEditUsername,
  anchorPosition,
}) => {
  // Logic/Functions Section
  if (!isVisible) return null;

  // Tsx Section
  return (
    // Modal for overlay
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      {/* Allows menu close */}
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        {/* Menu Container */}
        <View
          style={[
            styles.menuContainer,
            {
              top: anchorPosition.top + 40, // keep menu below the header
              right: anchorPosition.right + 16, // align left/right with menu btn
            },
          ]}>
          {/* Edit Username Btn */}
          <TouchableOpacity style={styles.menuItem} onPress={onEditUsername}>
            <Feather name="edit" size={18} color={Theme.CFL_light_gray} />
            <Text style={styles.menuItemText}>Edit Username</Text>
          </TouchableOpacity>

          {/* New Game btn */}
          <TouchableOpacity style={[styles.menuItem, styles.newGameBtn]} onPress={onNewGame}>
            <Feather name="trash-2" size={18} color={Theme.CFL_red} />
            <Text style={[styles.menuItemText, styles.newGameTxt]}>Reset Game</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Styling Section
const styles = StyleSheet.create({
  // overlay/background
  overlay: {
    flex: 1,
    backgroundColor: Theme.CFL_camera_overlay,
  },
  // menu container
  menuContainer: {
    backgroundColor: Theme.CFL_app_background,
    borderRadius: 12,
    shadowColor: Theme.CFL_gray,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 180,
    borderWidth: 1,
    borderColor: Theme.CFL_border_black,
    position: "absolute",
  },
  // general menu item
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.CFL_gray,
  },
  // general menu item txt
  menuItemText: {
    marginLeft: 12,
    fontSize: 14,
    color: Theme.CFL_light_text,
    fontFamily: Theme.CFL_primary_font,
    fontWeight: 500,
  },
  // new game btn
  newGameBtn: {
    borderBottomWidth: 0,
  },
  // new game txt
  newGameTxt: {
    color: Theme.CFL_red,
    fontFamily: Theme.CFL_primary_font,
    fontWeight: 600,
  },
});

// exported to be called within Header.tsx
export default UserMenu;
