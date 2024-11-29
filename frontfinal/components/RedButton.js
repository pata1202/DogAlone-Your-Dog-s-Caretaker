import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

const RedButton = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  return (
    <TouchableOpacity
      style={[styles.button, isPressed ? styles.pressed : styles.default]}
      onPress={handlePress}
    >
      <View
        style={[styles.circle, isPressed ? styles.circlePressed : styles.circleDefault]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 41, // Layout의 Width
    height: 19, // Layout의 Height
    borderRadius: 10, // Appearance의 Corner Radius
    justifyContent: "center",
    paddingHorizontal: 2, // 동그라미와 버튼 경계 간 여백
  },
  default: {
    backgroundColor: "#CC4547", // Fill 색상 (1번 상태)
  },
  pressed: {
    backgroundColor: "#FFFFFF", // Fill 색상 (2번 상태)
    borderWidth: 1.5, // Stroke의 두께
    borderColor: "#DDAAAB", // Stroke 색상
  },
  circle: {
    width: 15, // 동그라미 크기
    height: 15,
    borderRadius: 15 / 2, // 완전한 원형
  },
  circleDefault: {
    backgroundColor: "#FFFFFF", // 기본 동그라미 색상
    alignSelf: "flex-end", // 오른쪽 정렬
  },
  circlePressed: {
    backgroundColor: "#DDAAAB", // 눌린 상태의 동그라미 색상
    alignSelf: "flex-start", // 왼쪽 정렬
  },
});

export default RedButton;