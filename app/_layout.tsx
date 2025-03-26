import { Stack } from "expo-router/stack";

export const unstable_settings = {
  initialRouteName: "/(tabs)/home",
};

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      {/* uses (tabs) directory in the stack */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
