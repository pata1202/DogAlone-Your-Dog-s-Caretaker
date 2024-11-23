import { getAuth } from "firebase/auth";
import { app } from "./firebase"; // firebase.js의 경로에 맞게 수정

// Firebase 인증 초기화
const auth = getAuth(app);

export default auth;