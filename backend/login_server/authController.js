const { auth, db } = require("./firebaseConfig");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} = require("firebase/auth");
const { doc, setDoc, getDoc, updateDoc } = require("firebase/firestore");

// **회원가입 API**
exports.register = async (req, res) => {
  const { email, password, dogName, dogBreed } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore에 사용자 정보 저장
    await setDoc(doc(db, "users", user.uid), {
      email,
      dogName,
      dogBreed,
      lastActiveTime: new Date(),
    });

    res.status(201).json({ message: "User registered successfully", userId: user.uid });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// **로그인 API**
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore에 마지막 활동 시간 업데이트
    await updateDoc(doc(db, "users", user.uid), { lastActiveTime: new Date() });

    const token = await user.getIdToken();
    res.status(200).json({
      message: "Login successful",
      userId: user.uid,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// **자동 로그아웃 확인 API**
exports.logoutAfterInactivity = async (req, res) => {
  const { userId } = req.body;
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();
    const lastActiveTime = new Date(userData.lastActiveTime);
    const currentTime = new Date();

    const timeDifference = (currentTime - lastActiveTime) / (1000 * 60); // 분 단위
    if (timeDifference > 60) {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }

    // 세션 유지 - 활동 시간 갱신
    await updateDoc(doc(db, "users", userId), { lastActiveTime: currentTime });
    res.status(200).json({ message: "Session is active" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **Google 로그인 API**
exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        email: user.email,
        lastActiveTime: new Date(),
      },
      { merge: true }
    );

    const token = await user.getIdToken();
    res.status(200).json({ message: "Google Login successful", userId: user.uid, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
