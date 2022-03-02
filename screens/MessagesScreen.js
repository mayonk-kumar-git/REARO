import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

// ---------------------------------------------------------------
import {
  Container,
  Card,
  UserImg,
  UserName,
  UserImgWrapper,
  UserInfo,
  UserInfoText,
  PostTime,
  MessageText,
  TextSection,
} from "../styles/MessageStyles";
// ---------------------------------------------------------------

const messages = [
  {
    id: "1",
    userName: "Lois Lane",
    userImg: require("../assets/users/user1.jpg"),
    messageTime: "4 min ago",
    messageText: "is it a bird? is it a plane? it's superman!!",
  },
  {
    id: "2",
    userName: "Mr. Laufeyson",
    userImg: require("../assets/users/user5.jpg"),
    messageTime: "30 min ago",
    messageText: "Brute force is no substitute for diplomacy and guile",
  },
  {
    id: "3",
    userName: "Agent J",
    userImg: require("../assets/users/user3.jpg"),
    messageTime: "10 min ago",
    messageText: "Just a click and your brain's formated",
  },
  {
    id: "4",
    userName: "Bruce Wayne",
    userImg: require("../assets/users/user4.jpg"),
    messageTime: "17 min ago",
    messageText:
      "I may not have a bigger bank balance than Mr. Stark but I definitly have a biggest ego",
  },
  {
    id: "5",
    userName: "Jean Grey",
    userImg: require("../assets/users/user7.jpg"),
    messageTime: "6 min ago",
    messageText:
      "I am fire and life incarnate! Now and forever — I am Phoenix!",
  },
  {
    id: "6",
    userName: "Peggy Carter",
    userImg: require("../assets/users/user6.jpg"),
    messageTime: "46 min ago",
    messageText: "I love you Captain America",
  },
];

export default function MessagesScreen({navigation}) {
  function messageTiles(item) {
    const { userImg, userName, messageText, messageTime } = item;
    return (
      <Card onPress={()=>navigation.navigate("Chat", {userName: item.userName})}>
        <UserInfo>
          <UserImgWrapper>
            <UserImg source={userImg} />
          </UserImgWrapper>
          <TextSection>
            <UserInfoText>
              <UserName>{userName}</UserName>
              <PostTime>{messageTime}</PostTime>
            </UserInfoText>
            <MessageText>{messageText}</MessageText>
          </TextSection>
        </UserInfo>
      </Card>
    );
  }
  return (
    <Container>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        // Note: important there while passing item in renderItem we need to pass it as { item } like a object but while receiving the item in the user-made function in our case renderComponent we need to receive it as a normal variable without {}
        renderItem={({ item }) => messageTiles(item)}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  text: {
    fontSize: 20,
    color: "#333333",
  },
});
