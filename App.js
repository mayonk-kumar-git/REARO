import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// -------------------------------------------------------------
import LoginScreen from "./screens/LoginScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
// -------------------------------------------------------------

export default function App() {
  return <OnboardingScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
