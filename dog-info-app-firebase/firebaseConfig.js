//Firebase 초기화 및 인증 객체 설정

const { initializeApp } = require("firebase/app"); // Firebase 앱 초기화
const { getAuth } = require("firebase/auth"); // Firebase Auth 가져오기
require("dotenv").config(); // .env 파일 로드

// Firebase 설정
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY, // API Key
  authDomain: process.env.FIREBASE_AUTH_DOMAIN, // Auth Domain
  projectId: process.env.FIREBASE_PROJECT_ID, // Project ID
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Storage Bucket
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, // Messaging Sender ID
  appId: process.env.FIREBASE_APP_ID, // App ID
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase Auth 객체 생성
const auth = getAuth(app);

module.exports = { auth };
