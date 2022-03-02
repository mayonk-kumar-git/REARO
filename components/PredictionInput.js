import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

//--------------------------------------------------------------------------
import { windowHeight, windowWidth } from "../utils/Dimentions";
//--------------------------------------------------------------------------

export default function PredictionInput({
  labelValue,
  placeholderText,
  ...rest
}) {
  return (
    <View style={styles.inputContainer}>
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
    margin:10,
    width: "100%",
    height: windowHeight / 15,
    borderColor: "#ccc",
    borderRadius: 15,
    // borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal:20,
    flex: 1,
    fontSize: 16,
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
});
