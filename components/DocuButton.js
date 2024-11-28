import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function DocuButton() {
  const navigation = useNavigation();
  const route = useRoute();

  // 현재 페이지가 DocuPage인지 확인
  const isActive = route.name === "DocuPage";

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("DocuPage")}
    >
      <Image
        source={require("../dogAloneAssets/docu.png")}
        style={[styles.image, isActive && styles.activeImage]} // 조건부 스타일
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    left: 206,
    position: "absolute",
    bottom: 0,
    alignSelf: "center", // 화면 중앙에 정렬
    width: 65,
    height: 65,
    borderRadius: 5,
    backgroundColor: "#FFFFFF", // 버튼 배경색
    justifyContent: "center", // 이미지 수직 중앙 정렬
    alignItems: "center", // 이미지 수평 중앙 정렬
  },
  image: {
    width: 65,
    height: 65,
    tintColor: "#000", // 기본 아이콘 색상 (검정색)
  },
  activeImage: {
    tintColor: "#007BFF", // 활성화된 아이콘 색상 (파란색)
  },
});
