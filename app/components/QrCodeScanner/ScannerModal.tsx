// import necessary libraries/methods and components
import { BarcodeScanningResult, CameraView } from "expo-camera";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import QRType from "../../../interfaces/qrTypes";
import Theme from "../../../interfaces/theme";
import ConfirmationModal from "../features/ConfirmationModal";

// Scanner modal properties definition
interface ScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onScan: (scan: QRType) => void;
}
// ScannerModal function, passing it the properties object
const ScannerModal: React.FC<ScannerModalProps> = ({
  visible,
  onClose,
  onScan,
}) => {
  // Logic/Functions Section
  const [isScanning, setIsScanning] = useState(true); // state to know when it is actively scanning
  const [popupVisible, setPopupVisible] = useState(false); // state controls post scan popup
  const [scanData, setScanData] = useState<QRType | null>(null);
  const [popupInfo, setPopupInfo] = useState<{
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
  }>({ title: "", message: "", confirmText: "", cancelText: "" });

  // how app will handle a scanned qr code
  const handleScan = (result: BarcodeScanningResult) => {
    if (!isScanning) return;

    setIsScanning(false);
    try {
      const scan: QRType = {
        type: result.type,
        data: JSON.parse(result.data),
      };
      // get popup info based on scan type
      const popup = getPopupMessage(scan);
      onScan(scan);
      if (popup) setPopupInfo(popup);

      //open popup and set state data for scan
      setPopupVisible(true);
      setScanData(scan);
    } catch (error) {
      console.error("QR does not contain valid JSON data", error);
      Alert.alert(
        "QR Code Error", // title
        "QR Code does not contain the expected format.", // message
        [
          {
            text: "OK",
            onPress: () => {
              // allow rescan after clearing error
              setIsScanning(true);
            },
          },
        ]
      );
    }
  };
  // figures out if scanned data is transaction, profession or other and returns a popup info obj
  const getPopupMessage = (
    scan: QRType
  ):
    | {
        title: string;
        message: string;
        confirmText: string;
        cancelText: string;
      }
    | undefined => {
    if (scan && scan.data) {
      if (scan.data.scanType === "Transaction") {
        return {
          ...popupInfo,
          title: `Transaction`,
          message: `Change to ${scan.data.type}`,
          confirmText: `Confirm`,
          cancelText: `Cancel`,
        };
      } else if (scan.data.scanType === "Profession") {
        return {
          ...popupInfo,
          title: `New Job!`,
          message: `Congrats you're a ${scan.data.name}!`,
          confirmText: `Thanks!`,
          cancelText: `Cancel`,
        };
      }
      // user case here?
      return {
        ...popupInfo,
        title: "",
        message: `Unfortunately... We didn't recognize this scan`,
        confirmText: `Ok`,
        cancelText: `Cancel`,
      };
    }
  };

  // Tsx Section
  return (
    // Modal to hold the CameraView
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
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

          {popupVisible && (
            <ConfirmationModal
              isVisible={popupVisible}
              message={popupInfo.message}
              onConfirm={() => {
                setPopupVisible(false);
                onScan(scanData!);
              }}
              onCancel={() => setPopupVisible(false)}
            />
          )}
          {/* Scan again / Redo button */}
          {!isScanning && (
            <Modal
              visible={!isScanning}
              onRequestClose={onClose}
              presentationStyle="fullScreen"
              animationType="none"
            >
              <View style={styles.tryAgainContainer}>
                <TouchableOpacity
                  style={styles.tryAgainButton}
                  onPress={() => setIsScanning(true)}
                >
                  <Text style={styles.tryAgainText}>Try Again</Text>
                </TouchableOpacity>
              </View>
            </Modal>
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
    backgroundColor: Theme.CFL_card_background,
  },
  // Camera
  camera: {
    flex: 1,
  },
  // overlay/background
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.CFL_camera_overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  // scanner frame
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: Theme.CFL_white,
    backgroundColor: "transparent",
    borderRadius: 12,
  },
  // text below frame
  scanText: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_white,
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
    backgroundColor: Theme.CFL_danger_button,
    borderRadius: 8,
    zIndex: 2,
  },
  // Close camera btn txt
  closeText: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_white,
    fontSize: 16,
    fontWeight: "600",
  },
  // try again container
  tryAgainContainer: {
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: Theme.CFL_primary_font,
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

// export to call in ScannerButton.tsx
export default ScannerModal;
