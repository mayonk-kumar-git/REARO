import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  LogBox,
} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";

// ---------------------------------------------------------------
import { AuthContext } from "../navigation/AuthProvider";
// ---------------------------------------------------------------
import {
  InputWrapper,
  InputField,
  AddImage,
  StatusWrapper,
  SubmitBtn,
  SubmitBtnText,
} from "../styles/AddPost";
// ---------------------------------------------------------------
// this line of code is just to ignore the timer warning by react native
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default function AppPostScreen() {
  const { user } = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

  // -------------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------

  async function submitPost() {
    const imageUrl = await uploadImageToFirebaseStore();
    console.log("Image Url : ", imageUrl);

    // var db = firebase.firestore();

    firebase
      .firestore()
      .collection("post")
      .add({
        userId: user.uid,
        post: post,
        postImg: imageUrl,
        postTime: firebase.firestore.Timestamp.fromDate(new Date()),
        likes: null,
        comments: null,
      })
      .then((docRef) => {
        // console.log("Document written with the id : ", docRef);
        console.log("Post written to the database successfully");
        setImage(null);
        setPost(null);
        setUploading(false);
        Alert.alert(
          "Successfull!!",
          "Your post has been successfully uploaded."
        );
      })
      .catch((error) => {
        console.log("We have got into an error : ", error);
        setImage(null);
        setPost(null);
        setUploading(false);
      });
  }

  // ---------------------------------------------------------------------------
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

    const storageRef = firebase.storage().ref().child(`photos/${fileName}`);
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

  // ---------------------------------------------------------------------------

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image !== null ? <AddImage source={{ uri: image }} /> : null}
        <InputField
          value={post}
          placeholder="What's in your mind..."
          multiline
          numberOfLines={4}
          onChangeText={(content) => setPost(content)}
        />
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % completed</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={submitPost}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}
      </InputWrapper>
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={() => console.log("Take photo")}
        >
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photos"
          onPress={() => {
            pickImage();
          }}
        >
          <Icon name="md-image-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
