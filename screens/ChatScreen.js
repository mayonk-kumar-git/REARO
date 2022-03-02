import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import {
  Bubble,
  GiftedChat,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// ---------------------------------------------------------------

// ---------------------------------------------------------------

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "Hey whats up",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  function scrollToBottomComponent(props) {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  }

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        //this is to modifie the bubble color
        wrapperStyle={{
          //right refers the styles related to right bubbles, similarly left refers to left bubble
          right: {
            backgroundColor: "rgba(255,255,255,0.5)",
            // backgroundColor: "#2e64e5",
            padding: 5,
            // opacity: 0.5
            // minWidth: 100,
          },
        }}
        textProps={{
          style: {
            color: props.position === "left" ? "black" : "black",
            // color: props.position === 'left' ? '#fff' : '#000',
          },
        }}
        // testStyle={{
        //   left: {
        //     color: 'black',
        //   },
        //   right: {
        //     color: 'black',
        //   },
        // }}
      />
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View>
          <FontAwesome
            name="send"
            style={{ marginVertical: 15, marginHorizontal: 15 }}
            size={25}
            color="black"
            // color="#2e64e5"
          />
        </View>
      </Send>
    );
  }
  function renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderRadius: 25,
          // padding: 5,
          marginHorizontal: 20,
          marginBottom: 20,
          // backgroundColor: "red",
          height: 50,
        }}
        textInputStyle={{
          marginBottom: 25,
          marginHorizontal:10,
        }}
      />
    );
  }

  return (
    // using this i can add image background to the gifted-chat
    <ImageBackground
      source={require("../assets/chat-background.jpg")}
      style={{ flex: 1 }}
    >
      <GiftedChat
        //using this listProps style background i can style the background with a solid color
        listViewProps={{
          style: {
            // backgroundColor: "purple",
            marginBottom: 30,
          },
        }}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        // if we dont write alwaysShowSend then the send button will only appear when we start typing
        alwaysShowSend
        //scrollToBottom enables the scroll-to-bottom functionality
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderInputToolbar={renderInputToolbar}
      />
    </ImageBackground>
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
