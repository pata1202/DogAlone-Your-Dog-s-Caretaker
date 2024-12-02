import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function OnOffButton() {
  const [isOn, setIsOn] = useState(false); // 초기 상태는 off

  return (
    <View style={styles.container}>
      {/* 버튼 컨테이너 */}
      <View style={styles.OnOffContainer}>
        {/* Off 버튼 */}
        <TouchableOpacity
          style={[
            styles.button,
            !isOn && styles.selectedButton, // off일 경우 빨간색 배경
          ]}
          onPress={() => setIsOn(false)}
        >
          <Text style={[styles.text]}>OFF</Text>
        </TouchableOpacity>

        {/* On 버튼 */}
        <TouchableOpacity
          style={[
            styles.button,
            isOn && styles.selectedButton, // on일 경우 빨간색 배경
          ]}
          onPress={() => setIsOn(true)}
        >
          <Text style={[styles.text]}>ON</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  OnOffContainer: {
    flexDirection: "row", // 버튼을 가로로 배치
    width: 80,
    height: 17,
    borderRadius: 16.5, // 전체 버튼 컨테이너 둥글기
    backgroundColor: "#f5f5f5", // 기본 배경색
    overflow: "hidden", // 컨테이너 내부 자식 요소 잘림
  },
  button: {
    flex: 1, // 버튼을 동일한 크기로 분배
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // 기본 버튼 배경 투명
  },
  selectedButton: {
    backgroundColor: "#FFAAAA", // 선택된 버튼 배경색 (빨간색)
  },
  text: {
    fontSize: 11,
    fontFamily: "Roboto", // 텍스트 스타일
  },
  selectedText: {
    color: "#FFFFFF", // 선택된 텍스트 색상 (흰색)
  },
});
