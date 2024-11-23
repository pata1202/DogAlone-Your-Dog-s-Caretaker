import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text, TextInput,TouchableOpacity } from 'react-native';
import { useFonts, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import LoginButton from '../components/LoginButton'; // LoginButton 컴포넌트 가져오기
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

// Firebase 세션 관리 완료 처리
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const navigation = useNavigation();

  // Google 로그인 요청 생성
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
    "437880776451-1go4av5u8hr2lc7b4p2fctd8ukbesfgf.apps.googleusercontent.com",// Firebase Web Client ID
      redirectUri: 'https://auth.expo.io/@leedongryul/MyNewProject1', // 예: ngrok URL 또는 Cloud에서 승인된 URI
  });

 // 백엔드와 통신하는 함수
 const sendTokenToBackend = async (idToken) => {
  try {
    const response = await fetch("https://6blf-81-82-127-143.ngrok-free.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }), // 백엔드로 ID Token 전송
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Backend Response:", result); // 백엔드 응답 출력
      Alert.alert("Login Successful", "You are successfully logged in!");
    } else {
      console.error("Failed to authenticate with backend:", response.status);
      Alert.alert("Login Failed", "Backend authentication failed.");
    }
  } catch (error) {
    console.error("Error sending token to backend:", error);
    Alert.alert("Error", "Failed to communicate with the backend.");
  }
};

  // Firebase 인증 함수
  const handleFirebaseGoogleSignIn = async (idToken) => {
    const auth = getAuth(); // Firebase 인증 객체
    const credential = GoogleAuthProvider.credential(idToken); // Google 자격 증명 생성

    try {
      const result = await signInWithCredential(auth, credential);
      console.log("Firebase User:", result.user); // Firebase에 저장된 사용자 정보
    } catch (error) {
      console.error("Firebase Authentication Error:", error);
    }
  };

  // Google 로그인 결과 처리
  useEffect(() => {
    
    if (response?.type === "success") {
      const { authentication } = response;

      if (authentication && authentication.idToken) {
        handleFirebaseGoogleSignIn(authentication.idToken);

        // 백엔드로 ID 토큰 전송
      sendTokenToBackend(authentication.idToken);
      }
    }
  }, [response]);

  // 폰트 로딩
  let [fontsLoaded] = useFonts({
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // 로딩 중 표시
  }

  
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}></View>
      <Text style={styles.registerText}>Register</Text>
      <Image source={require('../dogAloneAssets/logo.png')} style={styles.logo} />
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
      <View style={styles.buttonContainer}>
      <LoginButton
      title="로그인"
      
  />
    </View>
      {/* 회원가입 텍스트 */}
      <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
          <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>
      <View style={styles.container}>
      
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
        disabled={!request} // Google 로그인 요청 생성 실패 시 버튼 비활성화
      >
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
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
  rectangle: {
    position: 'absolute',           
    top: 254,                       
    left: 23,                       
    width: 345,                     
    height: 460,                    
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
  googleButton: {
    position:'absolute',
    top: 10,
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
