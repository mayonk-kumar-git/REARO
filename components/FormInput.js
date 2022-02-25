import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

//--------------------------------------------------------------------------
import { windowHeight } from "../utils/Dimentions";
//--------------------------------------------------------------------------

export default function FormInput({
  iconType,
  labelValue,
  placeholderText,
  ...rest
}) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#666" />
      </View>
      <TextInput
        value={labelValue}
        placeholder={placeholderText}
        placeholderTextColor="#A3A3A3"
        numberOfLines={1}
        style={styles.input}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    height: windowHeight / 15,
    borderRadius: 15,
    // borderColor: "#ccc",
    // borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderRightColor: "#ccc",
    // borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
});
