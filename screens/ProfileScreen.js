import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
	Alert,
} from "react-native";
import * as firebase from "firebase";

// ---------------------------------------------------------------
import PostCard from "../components/PostCard";
import { AuthContext } from "../navigation/AuthProvider";
// ---------------------------------------------------------------

export default function ProfileScreen({ navigation, route }) {
  const { logout, user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchPost();
    getUser();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  useEffect(() => {
    if (deleted) {
      fetchPost();
      setDeleted(false);
    }
  }, [deleted]);

  async function getUser() {
    const currentUser = await firebase
      .firestore()
      .collection("users")
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          // console.log("user data: ", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  }

  async function fetchPost() {
    try {
      const list = [];
      await firebase
        .firestore()
        .collection("post")
        .where("userId", "==", route.params ? route.params.userId : user.uid)
        .orderBy("postTime", "desc")
        .get()
        .then((querySnapshot) => {
          console.log("Total Posts Profile Screen : ", querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const { post, postImg, postTime, likes, comments, userId } =
              doc.data();
            list.push({
              id: doc.id,
              //if the field name is same as the value name we can simply write the value. for example : instead of -- userId : userId, i can write only userId. But i prefer the first way of writting
              userId: userId,
              userName: "Test Name",
              userImg: require("../assets/users/user1.jpg"),
              postTime: postTime,
              post: post,
              postImg: postImg,
              liked: true,
              likes: likes,
              comments: comments,
            });
          });
        });

      setPosts(list);
      if (loading) {
        setLoading(false);
      }

      // console.log("Posts : ", list);
    } catch (error) {
      console.log("We have got into an error :", error);
    }
  }

  function deleteFirestoreData(postId) {
    firebase
      .firestore()
      .collection("post")
      .doc(postId)
      .delete()
      .then(() => {
        console.log("Post has been successfully deleted");
        Alert.alert("Deleted!!", "Your post has been deleted successfully!");
      })
      .catch((e) => {
        console.log("We have got into an error ", e);
      });
  }

  function deletePost(postId) {
    console.log("To be deleted Post Id : ", postId);

    firebase
      .firestore()
      .collection("post")
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const { postImg } = documentSnapshot.data();
          console.log("postImg : ", postImg);
          if (postImg != null) {
            console.log("here");
            const storageRef = firebase.storage().refFromURL(postImg);
            const imageRef = firebase.storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully`);
              })
              .catch((e) => {
                console.log("We have got into an error ", e);
              });
          }
          deleteFirestoreData(postId);
          setDeleted(true);
        }
      })
      .catch((e) => {
        console.log("We have an error : ", e);
      });
  }

  function handleDelete(postId) {
    Alert.alert(
      "Delete post",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => deletePost(postId),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: route.params ? 30 : 90,
          paddingBottom: 20,
        }}
        showVerticalScrollIndicator={false}
      >
        <Image
          style={styles.userImg}
          source={
            userData && userData.userImg !== null
              ? { uri: userData.userImg }
              : require("../assets/users/user1.jpg")
          }
        />
        <Text style={styles.userName}>
          {userData ? `${userData.fname} ${userData.lname}` : "UserName"}
        </Text>
        {/* <Text style={styles.aboutUser}>
          {route.params ? route.params.userId : user.uid}
        </Text> */}
        <Text style={styles.aboutUser}>
          {userData ? userData.about : "---About---"}
        </Text>
        <View style={styles.userBtnWrapper}>
          {route.params ? (
            route.params.userId == user.uid ? (
              <>
                <TouchableOpacity
                  style={styles.userBtn}
                  onPress={() => {
                    navigation.navigate("EditProfile");
                  }}
                >
                  <Text style={styles.userBtnTxt}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.userBtn}
                  onPress={() => {
                    logout();
                  }}
                >
                  <Text style={styles.userBtnTxt}>Logout</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.userBtn}
                  onPress={() => {
                    alert("message button pressed");
                  }}
                >
                  <Text style={styles.userBtnTxt}>Messages</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.userBtn}
                  onPress={() => {
                    alert("Follow button pressed");
                  }}
                >
                  <Text style={styles.userBtnTxt}>Follow</Text>
                </TouchableOpacity>
              </>
            )
          ) : (
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
              >
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  logout();
                }}
              >
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{posts.length}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>220</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>200</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>
        {posts.map((item) => (
          <PostCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f5fe",
    paddingHorizontal: 20,
    // paddingVertical: 40,

    // ---------------------------
    // justifyContent: "center",
    // alignItems: "center",
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
