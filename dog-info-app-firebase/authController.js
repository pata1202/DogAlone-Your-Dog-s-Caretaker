//회원가입 및 로그인 API 로직 처리

const { auth } = require("./firebaseConfig"); // Firebase Auth 가져오기
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");

// 회원가입 API
exports.register = async (req, res) => {
  const { email, password } = req.body; // 클라이언트에서 전달된 이메일, 비밀번호
  try {
    // Firebase를 사용하여 사용자 생성
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user; // 생성된 사용자 정보
    res.status(201).json({ message: "User registered successfully", userId: user.uid });
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      res.status(400).json({
        message: "This email is already registered. Please try another email.",
      });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

// 로그인 API
exports.login = async (req, res) => {
  const { email, password } = req.body; // 클라이언트에서 전달된 이메일, 비밀번호
  try {
    // Firebase를 사용하여 로그인
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user; // 로그인된 사용자 정보
    const token = await user.getIdToken(); // JWT 토큰 발급
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
