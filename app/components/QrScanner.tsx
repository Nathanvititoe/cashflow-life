// import necessary libraries/methods and components
import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Alert } from "react-native";
import {
  CameraView,
  BarcodeScanningResult,
  useCameraPermissions,
} from "expo-camera";

// component properties definition
interface QRScannerProps {
  onScan: (data: CardData) => void; // callback function that receives the scanned card data
}

// QR Scanner component
const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false); // controls camera visibility

  // get camera permissions
  const [permission, requestPermission] = useCameraPermissions();

  // how to handle data from scan
  const handleScan = (result: BarcodeScanningResult) => {
    // do nothing if not in scanning mode
    if (!isScanning) return;

    try {
      // parse qr code string into json
      const cardInfo = JSON.parse(result.data) as CardData;
      onScan(cardInfo); // pass json to parent
    } catch (error) {
      Alert.alert(
        "Invalid QR Code",
        "The scanned code is not in the correct format."
      );
    }
  };

  // check and/or request camera permissions when component mounts
  const handlePermissions = async () => {
    if (!permission?.granted) {
      const permissionResult = await requestPermission();
      if (!permissionResult?.granted) {
        Alert.alert(
          "Permission required",
          "Camera permission is required to scan QR Codes."
        );
        console.log("Permission not granted.");
        setIsScanning(false);
        return; // close scanner if permission isnt given
      }
    }
    console.log("Permission granted, opening camera.");
    setIsScanning(true);
    return;
  };

  // show camera when scanning
  if (isScanning) {
    return (
      // Scanner Container
      <View style={styles.container}>
        {/* Camera */}
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={handleScan}
        >
          {/* Overlay w/ frame */}
          <View style={styles.overlay}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanText}>Place QR code here</Text>
          </View>

          {/* Close btn */}
          <View style={styles.closeBtnContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsScanning(false)}
            >
              <Text style={styles.closeText}>Close Scanner</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  } else {
    // show scan button when not scanning
    return (
      <TouchableOpacity style={styles.scanButton} onPress={handlePermissions}>
        <Text style={styles.scanButtonText}>Scan QR Code</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  // scanner container
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  // camera
  camera: {
    flex: 1,
  },
  // black border overlay
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  // scan frame
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "transparent",
    borderRadius: 12,
  },
  // scan frame txt
  scanText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  // container for close btn
  closeBtnContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  // close btn
  closeButton: {
    backgroundColor: "rgba(62, 156, 53, 0.7)",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: "80%",
    maxWidth: 300,
  },
  // close btn txt
  closeText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  // scan btn
  scanButton: {
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  // scan btn txt
  scanButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default QRScanner;
