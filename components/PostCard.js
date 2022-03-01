import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import * as firebase from "firebase";

// ---------------------------------------------------------------
import { AuthContext } from "../navigation/AuthProvider";
// ---------------------------------------------------------------
import {
  Card,
  UserImg,
  UserInfo,
  UserInfoText,
  UserName,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from "../styles/FeedStyles";
// ---------------------------------------------------------------

export default function PostCard({ item, onDelete, onPressUserInfo }) {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const currentUser = await firebase
      .firestore()
      .collection("users")
      .doc(item.userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          // console.log("user data: ", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  }

  return (
    <Card>
      <UserInfo>
        <TouchableOpacity onPress={onPressUserInfo}>
          <UserImg
            source={
              userData && userData.userImg !== null
                ? { uri: userData.userImg }
                : require("../assets/users/user1.jpg")
            }
          />
        </TouchableOpacity>
        <UserInfoText>
          <TouchableOpacity onPress={onPressUserInfo}>
            <UserName>
              {userData ? `${userData.fname} ${userData.lname}` : "UserName"}
            </UserName>
          </TouchableOpacity>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg == null ? (
        <Divider></Divider>
      ) : (
        <PostImg source={{ uri: item.postImg }} />
      )}

      <InteractionWrapper>
        <Interaction>
          <Ionicons
            name={item.likes == 0 ? "heart" : "heart-outline"}
            size={25}
            color={item.likes == 0 ? "red" : "black"}
          />
          <InteractionText>{item.likes == 0 ? "" : item.likes}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>
            {item.comments == 0 ? "" : item.comments}
          </InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="send-outline" size={25} />
          <InteractionText></InteractionText>
        </Interaction>

        {/* edit this after wards only show this delete button in profile section */}
        {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="md-trash-bin" size={25} color="orange" />
            <InteractionText></InteractionText>
          </Interaction>
        ) : null}
      </InteractionWrapper>
    </Card>
  );
}
