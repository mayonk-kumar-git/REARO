import React, { useEffect, useState } from "react";
import { Alert, RefreshControl, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import * as firebase from "firebase";

// ---------------------------------------------------------------
import PostCard from "../components/PostCard";
import { Container } from "../styles/FeedStyles";
// ---------------------------------------------------------------

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (deleted) {
      fetchPost();
      setDeleted(false);
    }
  }, [deleted]);

  useEffect(() => {
    fetchPost();
  }, []);

  function handleRefresh() {
    setIsRefreshing(true);
    fetchPost();
    setIsRefreshing(false);
  }

  async function fetchPost() {
    try {
      const list = [];
      await firebase
        .firestore()
        .collection("post")
        .orderBy("postTime", "desc")
        .get()
        .then((querySnapshot) => {
          console.log("Total Posts : ", querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              post,
              postImg,
              postTime,
              likes,
              comments,
              userId,
            } = doc.data();
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
        // console.log("Post has been successfully deleted");
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
          // console.log("postImg : ", postImg);
          if (postImg != null) {
            // console.log("here");
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
    <Container>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard
            item={item}
            onDelete={handleDelete}
            onPressUserInfo={() =>
              navigation.navigate("HomeProfile", { userId: item.userId })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f5fe",
    padding: 10,
  },
});
