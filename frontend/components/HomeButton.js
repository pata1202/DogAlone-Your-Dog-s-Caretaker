import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function HomeButton() {
  const navigation = useNavigation();
  const route = useRoute();

  // 현재 페이지가 MainPage인지 확인
  const isActive = route.name === "MainPage";

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("MainPage")}
    >
      <Image
        source={require("../dogAloneAssets/home.png")}
        style={[styles.image, isActive && styles.activeImage]} // 조건부 스타일
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    left: 37,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: 65, // 버튼 너비
    height: 65, // 버튼 높이
    borderRadius: 5, // 둥근 버튼
    backgroundColor: "#FFFFFF", // 버튼 배경색
    justifyContent: "center", // 이미지 수직 중앙 정렬
    alignItems: "center", // 이미지 수평 중앙 정렬
  },
  image: {
    width: 65, // 이미지 너비
    height: 65, // 이미지 높이
    tintColor: "#000", // 기본 아이콘 색상 (검정색)
  },
  activeImage: {
    tintColor: "#007BFF", // 활성화된 아이콘 색상 (파란색)
  },
});
