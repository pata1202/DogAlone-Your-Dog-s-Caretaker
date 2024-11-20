// LoginButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginButton({ title }) {
  const navigation = useNavigation(); // 네비게이션 훅 사용

    return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainPage')}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // 버튼 박스 스타일
  button: {
    width: 224.8,               
    height: 50,                 
    backgroundColor: '#007BFF', // Primary 색상 (예시로 파란색 설정)
    borderRadius: 7.84,         
    marginTop: 50,   
    alignItems: 'center',      
    shadowColor: '#000',        
    shadowOpacity: 0.2,         
    shadowRadius: 4,            
    elevation: 5,               
  },
  // 텍스트 스타일
  buttonText: {
    fontFamily: 'Montserrat',   
    fontWeight: 'bold',         
    fontSize: 12.55,            
    color: '#FFFFFF',           // 텍스트 색상 (흰색)
    letterSpacing: 0.16,        // 글자 간격
    marginTop:18,
  },
});


