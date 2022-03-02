import React, { useRef, useContext, useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

// ---------------------------------------------------------------
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
import { windowHeight } from "../utils/Dimentions";

// ---------------------------------------------------------------

export default function EditProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------
  async function uploadImageToFirebaseStore() {
    if (image == null) return null;

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const uploadUri = image;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

    // Adding timestamp to file Name to give every file a unique name
    const fileExtension = fileName.split(".").pop();
    const name = fileName.split(".").slice(0, -1).join(".");
    fileName = name + "_" + Date.now() + "." + fileExtension;

    setUploading(true);
    setTransferred(0);

    const storageRef = firebase
      .storage()
      .ref()
      .child(`profilePhotos/${fileName}`);
    const task = storageRef.put(blob);

    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100
      );
    });

    task.then(() => {
      console.log("Image uploaded to the bucket!");
    });

    try {
      //This below line of code uploads the image to the url
      await task;

      const url = await storageRef.getDownloadURL();
      // setUploading(false);
      // Alert.alert("Successfull!!", "Your post has been successfully uploaded.");
      // setImage(null);
      return url;
    } catch (e) {
      console.log(e);
      setImage(null);
      return null;
    }
  }
  // ------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }
  // ------------------------------------------------------------------
  // ------------------------------------------------------------------

  useEffect(() => {
    getUser();
  }, []);

  const bs = useRef(null);
  const fall = new Animated.Value(1);

  function renderInner() {
    return (
      <View style={styles.panel}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose your profile picture</Text>
        </View>
        <TouchableOpacity style={styles.panelButton}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => {
            console.log("gallary");
            pickImage();
          }}
        >
          <Text style={styles.panelButtonTitle}>Choose from Liberary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            bs.current.snapTo(1);
          }}
          style={styles.panelButton}
        >
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle}></View>
        </View>
      </View>
    );
  }

  async function getUser() {
    const currentUser = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("user data: ", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  }

  async function handleUpdate() {
    let imageUrl = await uploadImageToFirebaseStore();

    if (imageUrl == null && userData.userImg) {
      imageUrl = userData.userImg;
    }

    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({
        fname: userData.fname,
        lname: userData.lname,
        about: userData.about,
        phone: userData.phone,
        country: userData.country,
        city: userData.city,
        userImg: imageUrl,
      })
      .then(() => {
        console.log("User Updated!!");
        Alert.alert("Successfull", "Profile Updated Successfully");
      });
  }

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.2, Animated.multiply(fall, 1.0)),
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              bs.current.snapTo(0);
            }}
          >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={
                  image !== null
                    ? { uri: image }
                    : userData && userData.userImg !== null
                    ? { uri: userData.userImg }
                    : require("../assets/users/user1.jpg")
                }
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera"
                    size={45}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            {userData ? userData.fname : ""} {userData ? userData.lname : ""}
          </Text>
          <Text>{user.uid}</Text>
        </View>
        <View style={styles.action}>
          <AntDesign name="user" size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            value={userData ? userData.fname : ""}
            onChangeText={(text) => {
              setUserData({ ...userData, fname: text });
            }}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <AntDesign name="user" size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.lname : ""}
            onChangeText={(text) => {
              setUserData({ ...userData, lname: text });
            }}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <MaterialCommunityIcons name="note-text-outline" size={20} />
          <TextInput
            placeholder="About"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            value={userData ? userData.about : ""}
            onChangeText={(text) => {
              setUserData({ ...userData, about: text });
            }}
          />
        </View>
        <View style={styles.action}>
          <AntDesign name="phone" size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            keyboardType="number-pad"
            value={userData ? userData.phone : ""}
            onChangeText={(text) => {
              setUserData({ ...userData, phone: text });
            }}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            value={userData ? userData.country : ""}
            onChangeText={(text) => {
              setUserData({ ...userData, country: text });
            }}
          />
        </View>
        <View style={styles.action}>
          <EvilIcons name="location" size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            value={userData ? userData.city : ""}
            onChangeText={(text) => {
              setUserData({ ...userData, city: text });
            }}
          />
        </View>
        <FormButton
          buttonTitle="Update"
          onPress={() => {
            handleUpdate();
          }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor: "red",
    height: windowHeight,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    width: "100%",
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#2e64e5",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    // marginTop: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    alignItems: "center",
    // paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    // marginTop: Platform.OS === "ios" ? 0 : -12,
    padding: 10,
    fontSize: 15,
    color: "#333333",
  },
});
