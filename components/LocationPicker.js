import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

export default function LocationPicker({
  isVisible,
  data,
  setIsVisible,
  selectedCountry,
  setSelectedCountry,
  setCountry,
}) {
  // ------------------------------------------------------------------------------
  const renderItemView = ({ item }) => {
    // console.log("item : " + item);
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          setIsVisible(false);
          setSelectedCountry(item.id);
          setCountry(item.label);
        }}
      >
        <Text style={styles.listItemText}>{item.label}</Text>
        {item.id == selectedCountry && (
          <Image
            source={require("../assets/done.png")}
            style={{ height: 20, width: 20 }}
          />
        )}
      </TouchableOpacity>
    );
  };
  // ------------------------------------------------------------------------------
  // console.log("data :" + data);
  return (
    // do not edit the style of this <View> that is wraping all other component
    <View>
      <Modal visible={isVisible}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={styles.flatList}
            data={data}
            renderItem={renderItemView}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    width: "80%",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 40,
    marginTop: 10,
    // backgroundColor: "red",
  },
  listItemText: {
    color: "black",
    fontSize: 18,
    letterSpacing: 2,
  },
  flatList: {
    flex: 1,
    margin: 20,
  },
});
