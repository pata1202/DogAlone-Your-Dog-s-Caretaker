// React에서 GoogleAuthProvider와 signInWithPopup으로 Google 로그인 구현.
// 로그인 성공 시 Firebase로부터 ID Token을 생성.
// 생성된 ID Token을 백엔드 API(/api/google-login)로 전송.

import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebaseConfig"; // Firebase 초기화가 포함된 파일 가져오기

// Login 컴포넌트
const Login = () => {
  // Google 로그인 핸들러
  const handleGoogleLogin = async () => {
    const auth = getAuth(app); // Firebase 앱과 연결된 인증 객체 가져오기
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      console.log("Generated Google ID Token: ", token);
      alert("Google 로그인 성공!");
    } catch (error) {
      console.error("Google 로그인 에러: ", error);
      alert("Google 로그인 실패");
    }
  };

  // UI 렌더링
  return (
    <div>
      <h1>Google Login</h1>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

// Default export
export default Login;
