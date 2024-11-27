// authController.js
// 내용: 사용자 인증 및 데이터를 처리하는 API 엔드포인트 로직입니다.
// 주요 함수:
// 회원가입 (register):
// 이메일, 비밀번호, 반려견 이름 및 품종 정보를 받아 Firestore에 저장합니다.
// Firebase Auth를 통해 사용자 인증 정보를 생성합니다.
// 로그인 (login):
// 이메일과 비밀번호로 로그인하고 Firebase에서 JWT 토큰을 반환합니다.
// 사용자 정보 조회 (getUserInfo):
// userId를 받아 Firestore에서 해당 사용자의 정보를 가져옵니다.
// 백엔드에서 회원가입, 로그인, 사용자 정보 조회를 수행하는 API를 제공합니다.

const { auth, db } = require("../config/firebaseConfig"); // Firebase 설정 가져오기
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const { doc, setDoc, getDoc } = require("firebase/firestore");

/**
 * 회원가입 API
 * 이메일, 비밀번호, 반려견 이름 및 품종 정보를 받아 사용자 등록 후 Firestore에 저장
 */
exports.register = async (req, res) => {
  const { email, password, dogName, dogBreed } = req.body; // 요청 본문에서 데이터 추출
  try {
    console.log("회원가입 시도:", email); // 디버깅용 로그
    // Firebase Auth로 사용자 생성
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("Firebase Auth 사용자 생성 완료:", user.uid); // 사용자 생성 확인 로그

    // Firestore에 사용자 정보 저장
    await setDoc(doc(db, "users", user.uid), {
      email,
      dogName,
      dogBreed,
    });

    console.log("Firestore에 사용자 정보 저장 완료:", user.uid); // Firestore 저장 확인 로그

    res.status(201).json({ message: "User registered successfully", userId: user.uid });
  } catch (error) {
    console.error("회원가입 에러:", error.message); // 에러 로그 출력
    if (error.code === "auth/email-already-in-use") {
      res.status(400).json({ message: "Email is already in use. Please log in." });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

/**
 * 로그인 API
 * 이메일과 비밀번호를 받아 Firebase 인증을 통해 사용자 로그인
 */
exports.login = async (req, res) => {
  const { email, password } = req.body; // 요청 본문에서 데이터 추출
  try {
    console.log("로그인 시도:", email); // 디버깅용 로그
    // Firebase Auth로 로그인 시도
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("로그인 성공, 사용자 UID:", user.uid); // 로그인 성공 확인 로그

    // JWT 토큰 가져오기
    const token = await user.getIdToken();

    res.status(200).json({
      message: "Login successful",
      userId: user.uid, // UID 반환
      token, // JWT 토큰 반환
    });
  } catch (error) {
    console.error("로그인 에러:", error.message); // 에러 로그 출력
    if (error.code === "auth/wrong-password") {
      res.status(400).json({ message: "Incorrect password." });
    } else if (error.code === "auth/user-not-found") {
      res.status(400).json({ message: "User not found. Please register first." });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

/**
 * 사용자 정보 조회 API
 * Firestore에서 사용자 정보를 가져와 반환
 */
exports.getUserInfo = async (req, res) => {
  const { userId } = req.params; // URL 경로에서 userId 추출
  try {
    console.log("사용자 정보 조회 요청, UID:", userId); // 디버깅용 로그
    // Firestore에서 사용자 문서 가져오기
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      console.error("사용자 정보 없음:", userId); // 디버깅용 로그
      res.status(404).json({ message: "User not found" });
    } else {
      console.log("사용자 정보 반환 성공:", userDoc.data()); // 디버깅용 로그
      res.status(200).json(userDoc.data());
    }
  } catch (error) {
    console.error("사용자 정보 조회 에러:", error.message); // 에러 로그 출력
    res.status(400).json({ message: error.message });
  }
};
