const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
require("dotenv").config({ path: "../dog-info-app-firebase/.env" }); // 정확한 .env 파일 경로

// Firebase 설정을 환경 변수에서 가져오기
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
const auth = getAuth(app);
const db = getFirestore(app);

module.exports = { auth, db };

// 환경 변수 확인 (디버깅용)
console.log("Firebase 설정이 올바르게 로드되었습니다:");
console.log("API Key:", process.env.FIREBASE_API_KEY);
console.log("Auth Domain:", process.env.FIREBASE_AUTH_DOMAIN);
console.log("Project ID:", process.env.FIREBASE_PROJECT_ID);
