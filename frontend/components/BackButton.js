import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.goBack()} // 이전 화면으로 이동
    >
      <Text style={styles.text}>←</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 16, 
    top: 10, 
    padding: 10, 
    backgroundColor: '#FAF1C3', // 버튼 배경색 
    borderRadius: 5, // 모서리 둥글기
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    elevation: 2, 
  },
  text: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#000000', 
  },
});