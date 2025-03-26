import { Platform } from "react-native";

const titleFont =
  Platform.OS === "ios"
    ? "System"
    : Platform.OS === "android"
      ? "sans-serif-condensed"
      : "sans-serif";

const primaryFont =
  Platform.OS === "ios" ? "System" : Platform.OS === "android" ? "sans-serif-medium" : "sans-serif";

export const Theme = {
  // colors
  CFL_midnight: "#000000",
  CFL_yellow: "#E6E335",
  CFL_lime_green: "#76D618",
  CFL_green: "#4CB348",
  CFL_dark_green: "#519C4F",
  CFL_orange: "#DE8F33",
  CFL_white: "#FFFFFF",
  CFL_offwhite: "#DDDDDD",
  CFL_black: "#2F2F30",
  CFL_red: "#ff4444",
  CFL_purple: "#4444ff",
  CFL_light_gray: "#bbbbbb",
  CFL_gray: "#424242",
  CFL_app_background: "#121212",
  CFL_card_background: "#1F1F1F",
  CFL_pink: "#9B6B9E",
  CFL_cyan: "#4A9690",
  CFL_border_black: "rgba(255, 255, 255, 0.1)",
  CFL_active_tab: "#2E2E2E",
  CFL_inactive_tab: "#1E1E1E",
  CFL_inactive_tab_font: "#666666",
  CFL_camera_overlay: "rgba(0, 0, 0, 0.3)",
  CFL_danger_button: "#ff4444",

  // spacings
  CFL_card_spacing: 7,

  // text colors
  CFL_dark_text: "#121212",
  CFL_light_text: "#bbbbbb",

  // font families
  CFL_title_font: titleFont,
  CFL_primary_font: primaryFont,
};

export default Theme;
