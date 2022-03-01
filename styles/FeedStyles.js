import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { windowWidth } from "../utils/Dimentions";

export const Container = styled.View`
  flex: 1;
  background-color: #f2f5fe;
  padding: 5px 20px;
`;

export const Card = styled.View`
  background-color: white;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 15px;
  flex-wrap: wrap;
`;

export const UserInfo = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: flex-start;
`;

export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const UserInfoText = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
  max-width: 95%;
`;

export const PostText = styled.Text`
  font-size: 14px;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 95%;
`;

export const PostImg = styled.Image`
  width: 100%;
  height: 250px;
  margin-top: 15px;
`;

export const Divider = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #dddddd;
  width: 92%;
  align-self: center;
  margin-top: 15px;
`;

export const InteractionWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px;
`;

export const Interaction = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 2px 5px;
  margin: auto 5px;
`;

export const InteractionText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #333;
`;
