import React from 'react';
import { View, Image, StyleSheet, Text, TextInput,TouchableOpacity } from 'react-native';
import { useFonts, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import LoginButton from '../components/LoginButton'; // LoginButton 컴포넌트 가져오기
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';


export default function Login() {
  // Inter Extra Bold 폰트를 로드합니다.
  let [fontsLoaded] = useFonts({
    Inter_800ExtraBold,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // 로딩 중 표시
  }

  const navigation = useNavigation(); // 네비게이션 훅 사용

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}></View>
      <Text style={styles.registerText}>sign up</Text>
      <Image source={require('../dogAloneAssets/logo.png')} style={styles.logo} />
      <View style={styles.backBC}>
      <BackButton></BackButton>
      </View>
      <Text style={styles.baseText}></Text>

      <View style={styles.inputID}>
        <TextInput
          style={styles.textInputID}
          placeholder="아이디를 입력하세요" // 입력 전 표시할 기본 텍스트
          placeholderTextColor="#B0B0B0" // 기본 텍스트의 색상 설정
        />
      </View>
      {/* 비밀번호 입력 필드 */}
      <View style={styles.inputPW}>
        <TextInput
          style={styles.textInputPW}
          placeholder="비밀번호를 입력하세요" // 입력 전 표시할 기본 텍스트
          placeholderTextColor="#B0B0B0" // 기본 텍스트의 색상 설정
        />
      </View>
      {/* 반려견 이름 입력 필드 */}
      <View style={styles.inputName}>
        <TextInput
          style={styles.textInputPW}
          placeholder="반려견 이름을 입력하세요" // 입력 전 표시할 기본 텍스트
          placeholderTextColor="#B0B0B0" // 기본 텍스트의 색상 설정
        />
      </View>
      <View style={styles.buttonContainer}>
      <LoginButton
      title="회원가입 완료"
  />
      
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',  
    alignItems: 'center',           
    backgroundColor: '#FFFFFF',     
  },
  rectangle: {
    position: 'absolute',           
    top: 254,                       
    left: 23,                       
    width: 345,                     
    height: 500,                    
    backgroundColor: '#FAF1C3',
    borderRadius: 30,               
  },
  registerText: {
    position: 'absolute',           
    top: 316,                       
    fontSize: 30,                   
    fontFamily: 'Inter_800ExtraBold', 
    color: '#000000',               
    textAlign: 'center',            
  },
  backBC:{
    position: 'absolute',
    top:260,
    left:30,
  },
  logo: {
    width: 100,                     
    height: 102,                    
    marginTop: 114,                
  },
  baseText: {
    fontSize: 20,                   
    color: '#333',                  
    marginTop: 20,                  
  },
  inputID: {
    width: 264.3,                   
    height: 42.35,                  
    borderRadius: 7.84,             
    backgroundColor: '#FFFFFF',     
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1.57,              
    paddingHorizontal: 20,          // 입력 창 안의 텍스트를 왼쪽에서 20px 떨어지게 설정
    justifyContent: 'center',       // 텍스트를 세로 중앙 정렬
    shadowColor: "#000000",         
    shadowOpacity: 0.2,             
    shadowRadius: 4,                
    elevation: 5,                   // 안드로이드에서의 그림자 높이 설정
    marginTop: 130,                  
  },
  textInputID: {
    fontFamily: 'Roboto',           
    fontSize: 11.76,                
    color: '#B0B0B0',               
  },
  inputPW: {
    width: 264.3,                  
    height: 42.35,                  
    borderRadius: 7.84,             
    backgroundColor: '#FFFFFF',     
    borderColor: 'rgba(0, 0, 0, 0.5)', 
    borderWidth: 1.57,              
    paddingHorizontal: 20,         
    justifyContent: 'center',       
    shadowColor: "#000000",         
    shadowOpacity: 0.2,             
    shadowRadius: 4,                
    elevation: 5,                   
    marginTop: 40,                 
  },
  inputName: {
    width: 264.3,                  
    height: 42.35,                  
    borderRadius: 7.84,             
    backgroundColor: '#FFFFFF',     
    borderColor: 'rgba(0, 0, 0, 0.5)', 
    borderWidth: 1.57,              
    paddingHorizontal: 20,         
    justifyContent: 'center',       
    shadowColor: "#000000",         
    shadowOpacity: 0.2,             
    shadowRadius: 4,                
    elevation: 5,                   
    marginTop: 40,                 
  },
  textInputPW: {
    fontFamily: 'Roboto',          
    fontSize: 11.76,               
    color: '#B0B0B0',               
  },
  signupText: {
    fontSize: 11.76,       
    color: '#B0B0B0',        
    fontFamily: 'Roboto',    
    textDecorationLine: 'underline', 
    right: -100,               
    bottom: 95,              // 비밀번호 입력 필드 바로 아래에 배치
  },

});
