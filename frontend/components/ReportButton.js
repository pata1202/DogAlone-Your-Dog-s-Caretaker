import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ReportButton() {
  const navigation = useNavigation(); // 네비게이션 훅 사용
  const route = useRoute(); // 현재 페이지 확인

  // 현재 페이지가 ReportPage인지 확인
  const isActive = route.name === "ReportPage";

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("ReportPage")} // ReportPage로 이동
    >
      <Image
        source={require("../dogAloneAssets/report.png")} // report.png 이미지 사용
        style={[styles.image, isActive && styles.activeImage]} // 조건부 스타일 적용
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
    tintColor: "#000", // 기본 아이콘 색상 (검정색)
  },
  activeImage: {
    tintColor: "#007BFF", // 활성화된 아이콘 색상 (파란색)
  },
});
