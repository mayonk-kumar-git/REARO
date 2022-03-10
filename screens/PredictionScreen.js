import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";

// --------------------------------------------------------------

// ---------------------------------------------------------------
import PredictionInput from "../components/PredictionInput";
import LocationPicker from "../components/LocationPicker";
import { locationCodeData } from "../config/locationCodeData";
import { windowWidth, windowHeight } from "../utils/Dimentions";

// ---------------------------------------------------------------
const BASE_URI = "http://192.168.137.218:5000/";
export default function PredictionScreen() {
  // const [locationCodeData, setLocationCodeData] = useState([]);
  const [location, setLocation] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(-1);
  const [sqft, setSqft] = useState(0.0);
  const [bath, setBath] = useState(0);
  const [bhk, setBhk] = useState(0);

  // -----------------------------------------------------------------------------
  const [predicting, setPredicting] = useState(false);
  const [price, setPrice] = useState(0.0);
  // -----------------------------------------------------------------------------

  // -----------------------------------------------------------------------------
  useEffect(() => {
    // console.log("monk-it1");
    if (predicting && location != "" && bath != 0 && bhk != 0 && sqft != 0.0) {
      // console.log("inside if");
      fetch(BASE_URI + `/predict/${location}/${sqft}/${bath}/${bhk}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("monk-it3");
          // console.log(data);
          setPrice(parseFloat(data.prediction));
        })
        .catch((error) => {
          // console.log("monk-it4");
          console.log(error);
        });
    } else {
      setPrice(0.0);
    }
    setPredicting(false);
  }, [predicting]);
  // -----------------------------------------------------------------------------

  // -----------------------------------------------------------------------------
  // useEffect(() => {
  //   fetch(BASE_URI + `/locations`)
  //     .then((response) => response.json())
  //     .then((data) => {

  //       setLocationCodeData(data.location);
  //       console.log({locationCodeData});
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  // -----------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/predict-price.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>Prediction Screen</Text>

      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.picker}
      >
        <Text
          style={{
            ...styles.pickerText,
            color: location == "" ? "#A3A3A3" : "#333",
          }}
        >
          {location == "" ? "Select a Location" : location}
        </Text>
      </TouchableOpacity>
      <LocationPicker
        data={locationCodeData}
        isVisible={isVisible}
        selectedCountry={selectedLocation}
        setIsVisible={setIsVisible}
        setSelectedCountry={setSelectedLocation}
        setCountry={setLocation}
      />
      <PredictionInput
        labelValue={sqft == 0.0 ? "" : String(sqft)}
        placeholderText="Total Square Feet"
        keyboardType="numeric"
        onChangeText={(text) => {
          text == "" ? setSqft(0.0) : setSqft(parseFloat(text));
        }}
      />
      <PredictionInput
        labelValue={bath == 0 ? "" : String(bath)}
        placeholderText="Number of Bathrooms"
        keyboardType="numeric"
        onChangeText={(text) => {
          text == "" ? setBath(0) : setBath(parseInt(text));
        }}
      />
      <PredictionInput
        labelValue={bhk == 0 ? "" : String(bhk)}
        placeholderText="Number of BHK"
        keyboardType="numeric"
        onChangeText={(text) => {
          text == "" ? setBhk(0) : setBhk(parseInt(text));
        }}
      />
      <Pressable
        style={styles.buttonContainer}
        onPress={() => {
          console.log("Predict Pressed");
          setPredicting(true);
        }}
      >
        <Text style={styles.buttonText}>Predict</Text>
      </Pressable>
      <View style={styles.predictionContainer}>
        <Text style={styles.predictionText}>
          {price == 0.0 ? "Price" : `₹ ${price}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DEE5F6",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  text: {
    fontSize: 30,
    color: "#333333",
    marginBottom: 25,
  },
  logo: {
    height: 150,
    width: 190,
    resizeMode: "cover",
    marginBottom: 20,
  },
  predictionContainer: {
    marginTop: 20,
    marginBottom: 10,
    width: "50%",
    height: windowHeight / 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8EEC90",
  },
  predictionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  picker: {
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    height: windowHeight / 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  pickerText: {
    padding: 20,
    flex: 1,
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: "#2e64e5",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
