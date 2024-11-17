import React from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator, TextInput,TouchableOpacity } from 'react-native';
import { useFonts, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import LoginButton from '../components/LoginButton'; // LoginButton 컴포넌트 가져오기

export default function Login() {
  // Inter Extra Bold 폰트를 로드합니다.
  let [fontsLoaded] = useFonts({
    Inter_800ExtraBold,
  });

   // 로그인 버튼 클릭 시 동작할 함수
   const handleLoginPress = function(){
    alert('로그인 버튼을 눌렀습니다.');
    // 나중에 페이지 이동 코드를 추가하기
  };

  const handleSignupPress = function(){
    alert("회원가입 창으로 이동합니다."); // 회원가입 클릭 시 동작
    // 나중에 회원가입 이동코드 작성하기
  }

  // 폰트가 로드되지 않은 경우 로딩 화면을 표시합니다.
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {/* 백그라운드 사각형 도형 */}
      <View style={styles.rectangle}></View>

      {/* Register 텍스트 */}
      <Text style={styles.registerText}>Register</Text>

      {/* 로고 이미지 */}
      <Image source={require('../dogAloneAssets/logo.png')} style={styles.logo} />

      {/* 기본 텍스트 */}
      <Text style={styles.baseText}></Text>

      {/* 아이디 입력 필드 */}
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
      {/* 로그인 버튼 컴포넌트 */}
      <View style={styles.buttonContainer}>
      <LoginButton onPress={handleLoginPress} title="로그인" />
    </View>
      {/* 회원가입 텍스트 */}
      <TouchableOpacity onPress={handleSignupPress}>
          <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',  // 위에서부터 배치 시작
    alignItems: 'center',           // 가로로 중앙 정렬
    backgroundColor: '#FFFFFF',     // 배경색 설정
  },
  rectangle: {
    position: 'absolute',           // 위치 고정을 위해 absolute 사용
    top: 254,                       // 위에서부터 254 위치에 배치
    left: 23,                       // 왼쪽에서부터 23 위치에 배치
    width: 345,                     // 도형 폭 설정
    height: 416,                    // 도형 높이 설정
    backgroundColor: 'rgba(247, 229, 136, 0.21)',  // 배경색과 불투명도 설정
    borderRadius: 30,               // 테두리 둥글기 설정
  },
  registerText: {
    position: 'absolute',           // 위치 고정을 위해 absolute 사용
    top: 316,                       // 위에서부터 316 위치에 배치
    fontSize: 30,                   // 폰트 크기 설정
    fontFamily: 'Inter_800ExtraBold', // Inter Extra Bold 폰트 사용
    color: '#000000',               // 텍스트 색상 설정
    textAlign: 'center',            // 텍스트 가로 중앙 정렬
  },
  logo: {
    width: 100,                     // 로고 이미지 폭 설정
    height: 102,                    // 로고 이미지 높이 설정
    marginTop: 114,                 // 위에서부터 114 위치에 배치
  },
  baseText: {
    fontSize: 20,                   // 기본 텍스트 폰트 크기 설정
    color: '#333',                  // 텍스트 색상 설정
    marginTop: 20,                  // 위 요소와의 간격 설정
  },
  inputID: {
    width: 264.3,                   // 입력 창의 폭 설정
    height: 42.35,                  // 입력 창의 높이 설정
    borderRadius: 7.84,             // 테두리 둥글기 설정
    backgroundColor: '#FFFFFF',     // 배경색 설정
    borderColor: 'rgba(0, 0, 0, 0.5)', // 테두리 색상과 투명도 설정
    borderWidth: 1.57,              // 테두리 두께 설정
    paddingHorizontal: 20,          // 입력 창 안의 텍스트를 왼쪽에서 20px 떨어지게 설정
    justifyContent: 'center',       // 텍스트를 세로 중앙 정렬
    shadowColor: "#000000",         // 그림자 색상 설정
    shadowOpacity: 0.2,             // 그림자 투명도 설정
    shadowRadius: 4,                // 그림자 반경 설정
    elevation: 5,                   // 안드로이드에서의 그림자 높이 설정
    marginTop: 130,                  // 기본 텍스트 아래 간격
  },
  textInputID: {
    fontFamily: 'Roboto',           // 텍스트 폰트 설정
    fontSize: 11.76,                // 텍스트 크기 설정
    color: '#B0B0B0',               // 텍스트 색상 (회색)
  },
  inputPW: {
    width: 264.3,                   // 입력 창의 폭 설정
    height: 42.35,                  // 입력 창의 높이 설정
    borderRadius: 7.84,             // 테두리 둥글기 설정
    backgroundColor: '#FFFFFF',     // 배경색 설정
    borderColor: 'rgba(0, 0, 0, 0.5)', // 테두리 색상과 투명도 설정
    borderWidth: 1.57,              // 테두리 두께 설정
    paddingHorizontal: 20,          // 입력 창 안의 텍스트를 왼쪽에서 20px 떨어지게 설정
    justifyContent: 'center',       // 텍스트를 세로 중앙 정렬
    shadowColor: "#000000",         // 그림자 색상 설정
    shadowOpacity: 0.2,             // 그림자 투명도 설정
    shadowRadius: 4,                // 그림자 반경 설정
    elevation: 5,                   // 안드로이드에서의 그림자 높이 설정
    marginTop: 40,                  // 기본 텍스트 아래 간격
  },
  textInputPW: {
    fontFamily: 'Roboto',           // 텍스트 폰트 설정
    fontSize: 11.76,                // 텍스트 크기 설정
    color: '#B0B0B0',               // 텍스트 색상 (회색)
  },
  signupText: {
    fontSize: 11.76,         // 텍스트 크기
    color: '#B0B0B0',        // 회색 텍스트 색상
    fontFamily: 'Roboto',    // Roboto 폰트
    textDecorationLine: 'underline', // 밑줄
    right: -100,               // 오른쪽 끝에서 약간 떨어뜨림
    bottom: 95,              // 비밀번호 입력 필드 바로 아래에 배치
  },

});
