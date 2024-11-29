import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFonts, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import LoginButton from '../components/LoginButton'; // LoginButton 컴포넌트 가져오기
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import {register} from "../libs/api";

export default function ResgisterPage() {
  // 상태 관리 (useState)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dogName, setDogName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // 추가된 상태

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (isProcessing) return; // 중복 클릭 방지
    setIsProcessing(true);

    const apiUrl = 'https://6e60-61-82-127-143.ngrok-free.app/register';
    try {
      if (!email || !password || !dogName) {
        Alert.alert('Error', '모든 필드를 입력해주세요.');
        setIsProcessing(false); // 처리 상태 초기화
        return;
      }

      const data = await register({
        email,
        password,
        dogName,
        dogBreed: 'Shiba Inu'
      });

      Alert.alert('Success', `회원가입이 완료되었습니다! UID: ${data.userId}`);

      navigation.navigate('Login'); // 로그인 페이지로 이동
    } catch (error) {
      console.error(error);
      Alert.alert('Error', '회원가입 중 문제가 발생했습니다.');
    } finally {
      setIsProcessing(false); // 처리 상태 초기화
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
      <LoginButton
        title="회원가입 완료"
        onPress={handleSignUp} // 버튼 클릭 이벤트
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