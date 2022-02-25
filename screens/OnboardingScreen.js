import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
// ---------------------------------------------------------------
import Onboarding from "react-native-onboarding-swiper";
// ---------------------------------------------------------------
const skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ color: "black", fontSize: 16 }}>Skip</Text>
  </TouchableOpacity>
);
const next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ color: "black", fontSize: 16 }}>Next</Text>
  </TouchableOpacity>
);
const done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ color: "black", fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
);
const dots = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.3)";
  return (
    <View
      style={{
        width: 5,
        height: 5,
        marginHorizontal: 3,
        backgroundColor,
        borderRadius: 5,
      }}
    />
  );
};

export default function OnboardingScreen({ navigation }) {
  return (
    <Onboarding
      SkipButtonComponent={skip}
      NextButtonComponent={next}
      DoneButtonComponent={done}
      DotComponent={dots}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.replace("Login")}
      pages={[
        {
          backgroundColor: "#FCFFCE",
          image: (
            <Image
              source={require("../assets/predict-price.png")}
              style={{
                height: 210,
                width: 260,
                marginTop: 30,
                marginBottom: 20,
              }}
            />
          ),
          title: "Predict Price",
          subtitle:
            "With the power of Machine Learning and AI get accurate price predictions",
        },
        {
          backgroundColor: "#FFED86",
          image: (
            <Image
              source={require("../assets/find-new-home.png")}
              style={{ height: 250, width: 250 }}
            />
          ),
          title: "Find new Home",
          subtitle:
            "Want a new place? We got your back.. Get the best resident for your budget",
        },
        {
          backgroundColor: "#FFF0E2",
          image: (
            <Image
              source={require("../assets/share-image.png")}
              style={{
                height: 140,
                width: 310,
                marginTop: 60,
                marginBottom: 50,
              }}
            />
          ),
          title: "Click and Sale",
          subtitle:
            "Click a photo and share, to connent with potential customers. Its as simple as that!",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
