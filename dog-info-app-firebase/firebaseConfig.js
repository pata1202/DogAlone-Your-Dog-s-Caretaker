//Firebase 초기화 및 인증 객체 설정
//Firebase를 초기화하고 Firestore 및 인증 서비스를 구성합니다.
// 목적:
// Firebase 초기화를 통해 인증과 Firestore 사용을 가능하게 합니다.
// 다른 파일에서 auth와 db를 가져와 Firebase 서비스를 활용할 수 있도록 합니다.

// firebaseConfig.js
const { initializeApp } = require("firebase/app"); // Firebase 앱 초기화 모듈
const { getAuth } = require("firebase/auth"); // Firebase 인증 모듈
const { getFirestore } = require("firebase/firestore"); // Firestore 데이터베이스 모듈
require("dotenv").config(); // .env 파일에서 환경 변수 로드

// Firebase 설정 가져오기
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Auth 및 Firestore 객체 생성
const auth = getAuth(app);
const db = getFirestore(app);

module.exports = { auth, db }; // Auth와 Firestore를 다른 파일에서 사용할 수 있도록 내보냄
