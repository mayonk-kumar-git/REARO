import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// ---------------------------------------------------------------------------
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
// import { AuthContext } from "../navigation/AuthProvider";
// ---------------------------------------------------------------------------

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  // const { register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an Account</Text>
      <FormInput
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
      />
      <FormInput
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
      />
      <FormInput
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
      />
      <FormButton
        buttonTitle="Sign Up"
        onPress={() => {}}
        // onPress={() => register(email, password)}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our
        </Text>
        <TouchableOpacity
          onPress={() => {
            alert("Terms of service");
          }}
        >
          <Text style={{ ...styles.color_textPrivate, color: "#e88832" }}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> ans </Text>
        <TouchableOpacity
          onPress={() => {
            alert("Privacy Policy");
          }}
        >
          <Text style={{ ...styles.color_textPrivate, color: "#e88832" }}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

      <SocialButton
        buttonTitle="Sign Up with FaceBook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#B5D3FD"
        onPress={() => {
          alert("facebook Button clicked");
        }}
      />

      <SocialButton
        buttonTitle="Sign Up with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {
          alert("google Button clicked");
        }}
      />

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.navButtonText}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
//Styling------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DEE5F6",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 35,
    marginBottom: 60,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    color: "grey",
  },
});
