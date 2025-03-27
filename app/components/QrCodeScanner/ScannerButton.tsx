// import necessary libraries/methods and components
import { useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

import { QRTransaction } from "../../../interfaces/QrScan";
import QRType from "../../../interfaces/QrScan";
import Theme from "../../../interfaces/theme";
import ScannerModal from "./ScannerModal";

interface ScannerButtonProps {
  onScan: (data: QRTransaction) => void; // callback to get data from Scanner Modal
}

const ScannerButton: React.FC<ScannerButtonProps> = ({ onScan }) => {
  const [isCameraVisible, setCameraVisible] = useState(false); // boolean for camera modal visibility
  const [permission, requestPermission] = useCameraPermissions(); // set camera permission hook

  // handle opening the qr code scanner
  const handleOpenScanner = async () => {
    if (!permission?.granted) {
      // if we don't have permission, get it
      const permissionResult = await requestPermission();
      if (!permissionResult?.granted) {
        // If permission is denied, notify user
        Alert.alert("Permission required", "Camera permission is required to scan QR Codes.");
        return;
      }
    }
    setCameraVisible(true); // open modal if we have permission
  };

  // handles the logic post scan
  const handleScan = (scan: QRType) => {
    if (scan.type === "qr") {
      onScan(scan.data); // pass data back to home.tsx
      setCameraVisible(false); // close the modal
    } else {
      Alert.alert("Not a QR Code", "The Scanned item must be a QR code.");
    }
  };

  // Tsx Section
  return (
    <>
      {/* Button to Open Modal */}
      <TouchableOpacity style={styles.button} onPress={handleOpenScanner}>
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>

      {/* QR Scanner Modal Component */}
      {isCameraVisible && (
        <ScannerModal
          visible={isCameraVisible}
          onClose={() => setCameraVisible(false)}
          onScan={handleScan}
        />
      )}
    </>
  );
};

// Styling Section
const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.CFL_card_background,
    padding: 15,
    marginVertical: 4,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

// exported to be called within Index.tsx
export default ScannerButton;
