import React from "react";
import { Image } from "react-native";
import styled from "styled-components";

import { windowWidth } from "../utils/Dimentions";

export const InputWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #2e64e515;
`;

export const InputField = styled.TextInput`
  justify-content: center;
  align-items: center;
  font-size: 24px;
  text-align: center;
  width: 90%;
`;

// export const AddImage = ({ ...props }) => {
//   return (
//     <Image
//       style={{
//         width: windowWidth * 0.9,
//         height: windowWidth * 0.9,
//         marginBottom:15,
//       }}
//       {...props}
//     />
//   );
// };
export const AddImage = styled.Image`
  width: 90%;
  height: 250px;
  margin-bottom: 15px;
`;

export const StatusWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export const SubmitBtn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  background-color: #2e64e515;
  border-radius: 5px;
  padding: 10px 25px;
`;

export const SubmitBtnText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: blue;
`;
