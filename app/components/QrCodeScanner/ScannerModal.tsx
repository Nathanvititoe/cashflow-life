// import necessary libraries/methods and components
import { BarcodeScanningResult, CameraView } from "expo-camera";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AirlinePilotData from "../../../data/Professions/AirlinePilot/Airline_Pilot.json";
// import DoctorData from "../../../data/Professions/Doctor/Doctor.json";
// import TruckDriverData from "../../../data/Professions/TruckDriver/Truck_Driver.json";
import QRType from "../../../interfaces/qrTypes";
import Theme from "../../../interfaces/theme";
import { Icon } from "../../../interfaces/User";
import ConfirmationModal from "../features/ConfirmationModal";
import { getIcon } from "./ScannerLogic";

// Scanner modal properties definition
interface ScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onScan: (scan: QRType) => void;
}
// ScannerModal function, passing it the properties object
const ScannerModal: React.FC<ScannerModalProps> = ({ visible, onClose, onScan }) => {
  // Logic/Functions Section
  const [isScanning, setIsScanning] = useState(true); // state to know when it is actively scanning
  const [popupVisible, setPopupVisible] = useState(false); // state controls post scan popup
  const [scanData, setScanData] = useState<QRType | null>(null);
  const [popupInfo, setPopupInfo] = useState<{
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    professionIcon?: Icon;
  }>({ title: "", message: "", confirmText: "", cancelText: "" });

  // // TODO: remove after finalized functionality
  const simulatedResult: BarcodeScanningResult = {
    type: "qr",
    data: JSON.stringify(AirlinePilotData),
    cornerPoints: [
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
      { x: 100, y: 200 },
    ],
    bounds: {
      origin: { x: 100, y: 100 },
      size: { width: 100, height: 100 },
    },
  };

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
      if (popup) setPopupInfo(popup);

      // open popup and set state data for scan
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
            onPress: () => setIsScanning(true),
          },
        ]
      );
    }
  };

  // returns an obj to display the popup message
  const getPopupMessage = (
    scan: QRType
  ):
    | {
        title: string;
        professionIcon?: Icon;
        message: string;
        confirmText: string;
        cancelText: string;
      }
    | undefined => {
    if (scan && scan.data) {
      switch (scan.data.scanType) {
        case "Transaction":
          return {
            ...popupInfo,
            title: `Transaction`,
            message: `A change has been made to ${scan.data.type}: \n  ${scan.data.amount}`,
            confirmText: `Confirm`,
            cancelText: `Cancel`,
          };
        case "Profession":
          return {
            ...popupInfo,
            title: `Congrats, You're Hired!`,
            professionIcon: getIcon(scan.data.name),
            message: `${scan.data.name}`,
            confirmText: `Thanks!`,
            cancelText: `Cancel`,
          };
        default:
          return {
            ...popupInfo,
            title: "",
            message: `Unfortunately... We didn't recognize this scan`,
            confirmText: `Ok`,
            cancelText: `Cancel`,
          };
      }
    }
  };

  const handleScanConfirm = () => {
    setPopupVisible(false);
    if (scanData) {
      onScan(scanData!);
    } else {
      Alert.alert("Data failed to load from scan");
    }
  };

  // // TODO: remove after finalized functionality
  const testScan = () => {
    handleScan(simulatedResult);
  };

  // Tsx Section
  return (
    // Modal to hold the CameraView
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      presentationStyle="fullScreen">
      {/* Camera Container */}
      <View style={styles.container}>
        {/* Camera */}
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={isScanning ? handleScan : undefined}>
          {/* Overlay with QR scan frame */}
          <View style={styles.backgroundOverlay}>
            <View style={styles.innerOverlay}>
              <View style={styles.scanFrame} />
              <Text style={styles.scanText}>Place QR Code here</Text>
            </View>
          </View>

          {/* TODO: FIX THIS AFTER TESTING */}
          {/* Close button */}
          {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}> */}
          <TouchableOpacity style={styles.closeButton} onPress={testScan}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>

          {/* Post Scan Confirmation Popup */}
          {popupVisible && (
            <ConfirmationModal
              isVisible={popupVisible}
              title={popupInfo.title ? popupInfo.title : undefined}
              professionIcon={popupInfo.professionIcon ? popupInfo.professionIcon : undefined}
              message={popupInfo.message}
              onConfirm={handleScanConfirm}
              onCancel={() => {
                setPopupVisible(false);
                setIsScanning(true);
              }}
            />
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
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.CFL_camera_overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  // inner overlay
  innerOverlay: {
    width: 300,
    height: 300,
    backgroundColor: "rgba(255,255,255,0)",
    borderColor: Theme.CFL_white,
    borderWidth: 2,
    borderRadius: 12,
  },
  // scanner frame
  scanFrame: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: Theme.CFL_white,
    backgroundColor: "rgba(255,255,255,0)",
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
});

// export to call in ScannerButton.tsx
export default ScannerModal;
