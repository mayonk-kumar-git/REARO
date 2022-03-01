import React, { useContext } from "react";
import { View, Text } from "react-native";

// --------------------------------------------------------------
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
// --------------------------------------------------------------

export default function HomeScreen() {
  const { logout } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>HomeScreen</Text>
      <FormButton buttonTitle="Log Out" onPress={() => logout()} />
    </View>
  );
}
