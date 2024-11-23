import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function OnDocuButton() {
  const navigation = useNavigation(); // 네비게이션 훅 사용

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("DocuPage")}
    >
      <Image
        source={require("../dogAloneAssets/onDocu.png")}
        style={styles.image}
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
    backgroundColor: "#FFFFFF",

    justifyContent: "center", // 이미지 수직 중앙 정렬
    alignItems: "center", // 이미지 수평 중앙 정렬
  },
  image: {
    width: 65,
    height: 65,
  },
});
