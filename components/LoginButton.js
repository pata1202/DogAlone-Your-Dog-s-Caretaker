// LoginButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function LoginButton({ onPress,title }) {
  

    return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // 버튼 박스 스타일
  button: {
    width: 224.8,               // 버튼 폭
    height: 50,                 // 버튼 높이
    backgroundColor: '#007BFF', // Primary 색상 (예시로 파란색 설정)
    borderRadius: 7.84,         // 테두리 둥글기
    marginTop: 50,   // 세로 위치
    alignItems: 'center',       // 가로 중앙 정렬
    shadowColor: '#000',        // 그림자 색상
    shadowOpacity: 0.2,         // 그림자 투명도
    shadowRadius: 4,            // 그림자 반경
    elevation: 5,               // 안드로이드에서의 그림자 높이
  },
  // 텍스트 스타일
  buttonText: {
    fontFamily: 'Montserrat',   // 폰트 설정
    fontWeight: 'bold',         // 폰트 두께 설정
    fontSize: 12.55,            // 텍스트 크기 설정
    color: '#FFFFFF',           // 텍스트 색상 (흰색)
    letterSpacing: 0.16,        // 글자 간격
    marginTop:18,
  },
});


