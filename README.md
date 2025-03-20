# 💰 That Cashflow Life

## 🚀 Overview
A financial calculator app built with [**React Native**](https://reactnative.dev/) and [**Expo**](https://expo.dev/), designed to help players and auditors do the math, checking and balances, their financial activities.

## 🛠 Our Project
- **Framework:** React Native + TypeScript  
- **Workflow:** Expo Go (Managed Workflow)  
- **Platform:** Developed for Android (via Android Studio), tested on iOS through the Expo Go app  

---

## 📦 Installation & Development Setup

### 🔧 Prerequisites
Ensure you have the following installed:
- **Ubuntu/WSL** (Recommended)
- **Node.js** (Latest LTS recommended)
- **Expo CLI**
- **Android Studio** (for Android development)

  Setup instructions:
  ```sh
  git clone https://github.com/Nathanvititoe/cashflow-life
  npm i expo -g # Install Expo globally
  npx expo install # Install all dependencies through Expo for compatibility
  npx expo start --go # Start Expo server in Expo Go mode
  ```

  - **Android Studio Setup:**
    - Install Android Studio and required SDKs
    - Create device and set camera to "webcam0" in the advanced options
    - Run `npx expo start --go` to launch the expo go server and connect via the emulator or physical device

---

## 📖 Basic User Instructions
### 1️⃣ Opening the App
* Launch the app on your phone via Expo Go or run `expo start`.
* The home screen displays options to scan a QR code or review financials.

### 2️⃣ Scanning a QR Code
* Make sure you authorize the app to use the camera.
* Tap the **Scan QR Code** button.
* The app will use your camera to scan a card.
* Once scanned, it will populate the financial statement based on the card.

### 3️⃣ Viewing Financial Statements
* Switch between **Before** and **After** views.
* Changes will be highlighted to show differences.

### 4️⃣ Auditor Verification
* The Auditor reviews the financial statement.
* If everything is correct, they press **Complete** to finalize the transaction.
---

## 📦 Dependencies
- **@expo/server**: ^0.5.1
- **@expo/vector-icons**: ^14.0.4
- **@react-native-async-storage/async-storage**: 1.23.1
- **eas**: ^0.1.0
- **expo**: ~52.0.38
- **expo-blur**: ~14.0.3
- **expo-camera**: ~16.0.18
- **expo-config**: ^1.0.0
- **expo-constants**: ~17.0.7
- **expo-dev-client**: ~5.0.14
- **expo-doctor**: ^1.12.5
- **expo-haptics**: ~14.0.1
- **expo-insights**: ~0.8.2
- **expo-linking**: ~7.0.5
- **expo-module-scripts**: ^4.0.4
- **expo-router**: ~4.0.19
- **expo-symbols**: ~0.2.2
- **expo-system-ui**: ~4.0.8
- **expo-updates**: ~0.27.4
- **expo-web-browser**: ~14.0.2
- **metro-config**: ^0.81.1
- **react**: 18.3.1
- **react-dom**: 18.3.1
- **react-native**: 0.76.7
- **react-native-safe-area-context**: 4.12.0
- **react-native-web**: ~0.19.13
- **react-refresh**: ^0.16.0
- **typescript**: ^5.7.3

## 🔄 Recent Commits
- might as well test (Nathanvititoe)
- test 9 (Nathanvititoe)
- test 8 (Nathanvititoe)

## 👥 Contributors
- [@Nathanvititoe](https://github.com/Nathanvititoe) (⭐ 118 commits)
- [@ClaytonHin](https://github.com/ClaytonHin) (⭐ 12 commits)
- [@D-flyRobotics](https://github.com/D-flyRobotics) (⭐ 2 commits)
- [@expo-bot](https://github.com/expo-bot) (⭐ 1 commits)
- [@rivasjeremy](https://github.com/rivasjeremy) (⭐ 1 commits)


---

_Last updated: 2025-03-19 21:16:42 -0400_
