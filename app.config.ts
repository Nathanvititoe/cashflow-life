import { ConfigContext, ExpoConfig } from "expo/config";

const defineConfig = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "CashFlow Life",
  slug: "cashflow-life",
  version: "1.0.1",
  orientation: "portrait",
  icon: "./app/assets/icons/cashFlowLifeIcon.png",
  scheme: "cashflowlife",
  newArchEnabled: true,
  splash: {
    image: "./app/assets/icons/cashFlowLifeIcon.png",
    resizeMode: "cover",
    backgroundColor: "#121212",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.nathanvititoe.cashflowlife",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./app/assets/icons/cashFlowLifeIcon.png",
      backgroundColor: "#121212",
    },
    package: "com.nathanvititoe.cashflowlife",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./app/assets/icons/cashFlowLifeIcon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-camera",
      {
        cameraPermission: "Allow CashFlow Life to access your camera?",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: "49a8415e-83d0-4d4e-b737-3c87919841bc",
    },
  },
  owner: "cashflowlife",
  updates: {
    url: "https://u.expo.dev/49a8415e-83d0-4d4e-b737-3c87919841bc",
  },
  runtimeVersion: "1.0.0",
});

export default defineConfig;
