import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// ----------------------------------------------------------------------------
import { windowHeight } from "../utils/Dimentions";
// ----------------------------------------------------------------------------

export default function SocialButton({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  ...rest
}) {
  return (
    <TouchableOpacity
      style={{ ...styles.buttonContainer, backgroundColor: backgroundColor }}
      {...rest}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome
          style={styles.icon}
          name={btnType}
          size={22}
          color={color}
        />
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={[styles.buttonText, { color: color }]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 15,
    padding: 10,
    borderRadius: 15,
    flexDirection: "row",
  },
  iconWrapper: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontWeight: "bold",
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
