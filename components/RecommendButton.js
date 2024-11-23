import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const RecommendButton = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity style={[styles.box, style]} onPress={onPress}>
      <Text style={styles.boxText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // 버튼 박스 스타일
  box: {
    width: 156, // 상자 너비
    height: 30, // 상자 높이
    backgroundColor: "#FFFFFF", // 상자 색상
    borderRadius: 10, // 모서리 둥글게
    justifyContent: "center", // 텍스트 세로 정렬
    marginBottom: 4, // 각 상자 사이 간격
    shadowColor: "#000", // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0.2, // 그림자 투명도
    shadowRadius: 4, // 그림자 반경
    elevation: 3, // Android 그림자
  },
  boxText: {
    marginLeft: 38,
    fontSize: 12, // 텍스트 크기
    color: "#000000", // 텍스트 색상
    fontWeight: "bold", // 텍스트 굵기
  },
});

export default RecommendButton;