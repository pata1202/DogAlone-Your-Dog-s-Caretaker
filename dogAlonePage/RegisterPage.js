import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFonts, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import LoginButton from '../components/LoginButton'; // LoginButton 컴포넌트 가져오기
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
const fetch = require('node-fetch');



export default function Login() {
  // 상태 관리 (useState)
  const [email, setEmail] = useState(''); // 이메일 입력 필드
  const [password, setPassword] = useState(''); // 비밀번호 입력 필드
  const [dogName, setDogName] = useState(''); // 반려견 이름 필드

  const navigation = useNavigation(); // Navigation 훅

  // 폰트 로드 상태
  let [fontsLoaded] = useFonts({
    Inter_800ExtraBold,
  });

  // 폰트 로드 중 처리
  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  // 회원가입 요청 함수
  const handleSignUp = async () => {
    const apiUrl = 'https://6blf-81-82-127-143.ngrok-free.app/register'; // 백엔드 API URL
    try {
      if (!email || !password || !dogName) {
        Alert.alert('Error', '모든 필드를 입력해주세요.');
        return;
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, dogName, dogBreed: 'Shiba Inu' }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', `회원가입이 완료되었습니다! UID: ${data.userId}`);
        navigation.navigate('Login');
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || '회원가입 실패');
      }
    } catch (error) {
      Alert.alert('Error', '서버와의 연결에 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}></View>
      <Text style={styles.registerText}>sign up</Text>
      <Image source={require('../dogAloneAssets/logo.png')} style={styles.logo} />
      <View style={styles.backBC}>
        <BackButton />
      </View>

      <View style={styles.inputID}>
        <TextInput
          style={styles.textInputID}
          placeholder="아이디를 입력하세요"
          placeholderTextColor="#B0B0B0"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputPW}>
        <TextInput
          style={styles.textInputPW}
          placeholder="비밀번호를 입력하세요"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputName}>
        <TextInput
          style={styles.textInputPW}
          placeholder="반려견 이름을 입력하세요"
          placeholderTextColor="#B0B0B0"
          value={dogName}
          onChangeText={setDogName}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp}>
          <LoginButton title="회원가입 완료" />
        </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
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
  backBC: {
    position: 'absolute',
    top: 260,
    left: 30,
  },
  logo: {
    width: 100,
    height: 102,
    marginTop: 114,
  },
  inputID: {
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
    marginTop: 160,
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
});
