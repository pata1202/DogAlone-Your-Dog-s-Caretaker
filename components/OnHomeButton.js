import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function OnHomeButton() {
  const navigation = useNavigation(); // 네비게이션 훅 사용

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("MainPage")}
    >
      <Image
        source={require("../dogAloneAssets/onhome.png")}
        style={styles.image}
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
  },
});
