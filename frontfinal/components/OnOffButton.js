import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function OnOffButton() {
  const [isOn, setIsOn] = useState(false); // 초기 상태는 off

  return (
    <View style={styles.container}>
      {/* 버튼 컨테이너 */}
      <View style={styles.OnOffContainer}>
        {/* On 버튼 */}
        <TouchableOpacity
          style={[
            styles.button,
            isOn && styles.selectedButton, // isOn일 경우 색상 변경
          ]}
          onPress={() => setIsOn(true)}
        >
          <Text
            style={[
              styles.text,
              isOn && styles.selectedText, // isOn일 경우 텍스트 색상 변경
            ]}
          >
            on
          </Text>
        </TouchableOpacity>

        {/* Off 버튼 */}
        <TouchableOpacity
          style={[
            styles.button,
            !isOn && styles.selectedButton, // isOff일 경우 색상 변경
          ]}
          onPress={() => setIsOn(false)}
        >
          <Text
            style={[
              styles.text,
              !isOn && styles.selectedText, // isOff일 경우 텍스트 색상 변경
            ]}
          >
            off
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  OnOffContainer: {
    flexDirection: 'row', // 버튼을 가로로 배치
    width: 100.34,
    height: 25,
    borderRadius: 16.5, // 전체 버튼 컨테이너 둥글기
    backgroundColor: 'ffffff', // 기본 배경색
    borderWidth: 1,
    borderColor: '#8A8A8A', // 외곽선 색상
    overflow: 'hidden', // 컨테이너 내부 자식 요소 잘림
  },
  button: {
    flex: 1, // 버튼을 동일한 크기로 분배
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // 기본 버튼 배경 투명
  },
  selectedButton: {
    backgroundColor: 'rgba(193, 184, 255, 1)', // 선택된 버튼 배경색
  },
  text: {
    fontSize: 16,
    fontFamily: 'Roboto', // 텍스트 스타일
    color: '#000000', // 기본 텍스트 색상
  },
  selectedText: {
    color: '#FFFFFF', // 선택된 텍스트 색상
  },
});
