import React, {useContext} from "react";
import { View, Text } from "react-native";
// --------------------------------------------------------------
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
// --------------------------------------------------------------

export default function ProfileScreen() {
  const { logout } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ProfileScreen</Text>
      <FormButton buttonTitle="Log Out" onPress={() => logout()} />
    </View>
  );
}
