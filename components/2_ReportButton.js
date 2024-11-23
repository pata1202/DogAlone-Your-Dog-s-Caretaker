import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function OnReportButton() {
  const navigation = useNavigation(); // 네비게이션 훅 사용

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("ReportPage")} // MainPage로 이동
    >
      <Image
        source={require("../dogAloneAssets/onreport.png")} // home.png 이미지 사용
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    left: 122,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
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
