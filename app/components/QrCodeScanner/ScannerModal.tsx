// import necessary libraries/methods and components
import { BarcodeScanningResult, CameraView } from "expo-camera";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Scanner modal properties definition
interface ScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onScan: (result: { type: string; data: string }) => void;
}
// ScannerModal function, passing it the properties object
const ScannerModal: React.FC<ScannerModalProps> = ({
  visible,
  onClose,
  onScan,
}) => {
  // Logic/Functions Section
  const [isScanning, setIsScanning] = useState(true); // state to know when it is actively scanning

  // how app will handle a scanned qr code
  const handleScan = (result: BarcodeScanningResult) => {
    if (!isScanning) return;

    setIsScanning(false);
    onScan({ type: result.type, data: result.data });
  };

  // Tsx Section
  return (
    // Modal to hold the CameraView
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="none"
      presentationStyle="fullScreen"
    >
      {/* Camera Container */}
      <View style={styles.container}>
        {/* Camera */}
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={isScanning ? handleScan : undefined}
        >
          {/* Overlay with QR scan frame */}
          <View style={styles.overlay}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanText}>Place QR Code here</Text>
          </View>

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>

          {/* Scan again / Redo button */}
          {!isScanning && (
            <TouchableOpacity
              style={styles.tryAgainButton}
              onPress={() => setIsScanning(true)}
            >
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>
          )}
        </CameraView>
      </View>
    </Modal>
  );
};

// Styling Section
const styles = StyleSheet.create({
  // Modal Container
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  // Camera
  camera: {
    flex: 1,
  },
  // overlay/background
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  // scanner frame
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "transparent",
    borderRadius: 12,
  },
  // text below frame
  scanText: {
    color: "#ffffff",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  // close scanner btn
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 8,
    zIndex: 2,
  },
  // Close camera btn txt
  closeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  // try again btn
  tryAgainButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 8,
  },
  // try again txt
  tryAgainText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

// export to call in ScannerButton.tsx
export default ScannerModal;
