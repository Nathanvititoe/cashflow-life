import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Theme from "../../../interfaces/theme";
import { Icon } from "../../../interfaces/User";
import ProfessionIcon from "./ProfessionIcon";

// define modal props
interface ConfirmationModalProps {
  isVisible: boolean;
  title?: string; // optional title
  message: string; // required message
  confirmText?: string; // can be passed custom msg, has default
  cancelText?: string; // can be passed custom msg, has default
  onConfirm: () => void;
  onCancel: () => void;
  professionIcon?: Icon;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  title = "", // default title
  message,
  confirmText = "Confirm", // default confirm text
  cancelText = "Cancel", // default cancel text
  onConfirm,
  onCancel,
  professionIcon,
}) => {
  // Logic/Functions Section
  if (!isVisible) return null;

  return (
    <Modal visible={isVisible} transparent animationType="none" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Title */}
          {title.length > 0 && <Text style={styles.title}>{title}</Text>}

          {/* Message Container */}
          <View style={styles.messageContainer}>
            {professionIcon && (
              <View style={styles.professionIconContainer}>
                <ProfessionIcon icon={professionIcon} size={35} color={Theme.CFL_midnight} />
              </View>
            )}
            {/* Message Text */}
            <Text style={styles.message}>{message}</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// export to be imported where its needed
export default ConfirmationModal;

// Styling Section
const styles = StyleSheet.create({
  // modal overlay/background
  overlay: {
    flex: 1,
    backgroundColor: Theme.CFL_camera_overlay, // opaque overlay
    justifyContent: "center",
    alignItems: "center",
  },
  // whole modal container
  modalContainer: {
    width: 300,
    backgroundColor: Theme.CFL_app_background,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: Theme.CFL_light_gray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  // confirmation title
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.CFL_white,
    fontFamily: Theme.CFL_title_font,
    marginBottom: 10,
  },
  // message container
  messageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
    flexDirection: "row",
    color: Theme.CFL_light_text,
  },
  // confirmation message
  message: {
    fontSize: 16,
    color: Theme.CFL_light_text,
    fontFamily: Theme.CFL_primary_font,
    textAlign: "center",
    paddingLeft: 15,
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
  // btn container
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  // cancel btn
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: Theme.CFL_danger_button,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 5,
  },
  // confirm btn
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: Theme.CFL_green,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 5,
  },
  // cancel btn txt
  cancelText: {
    color: Theme.CFL_white,
    fontWeight: "bold",
    fontFamily: Theme.CFL_primary_font,
  },
  // confirm btn text
  confirmText: {
    color: Theme.CFL_white,
    fontWeight: "bold",
    fontFamily: Theme.CFL_primary_font,
  },
});
