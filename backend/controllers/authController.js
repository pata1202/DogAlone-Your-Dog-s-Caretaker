const { auth, db } = require("../config/firebaseConfig");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} = require("firebase/auth");
const { doc, setDoc, getDoc, updateDoc } = require("firebase/firestore");

// 회원가입
exports.register = async (req, res) => {
  const { email, password, dogName } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email,
      dogName,
      lastActiveTime: new Date(),
    });

    res.status(201).json({ message: "User registered successfully", userId: user.uid });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 로그인
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await user.getIdToken();
    await updateDoc(doc(db, "users", user.uid), { lastActiveTime: new Date() });

    res.status(200).json({ message: "Login successful", userId: user.uid, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Google 로그인
exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;

    await setDoc(
      doc(db, "users", user.uid),
      { email: user.email, lastActiveTime: new Date() },
      { merge: true }
    );

    const token = await user.getIdToken();
    res.status(200).json({ message: "Google login successful", userId: user.uid, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 세션 만료 확인
exports.logoutAfterInactivity = async (req, res) => {
  const { userId } = req.body;
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      return res.status(404).json({ message: "User not found" });
    }

    const lastActiveTime = new Date(userDoc.data().lastActiveTime);
    const currentTime = new Date();

    if ((currentTime - lastActiveTime) / (1000 * 60) > 60) {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }

    await updateDoc(doc(db, "users", userId), { lastActiveTime: currentTime });
    res.status(200).json({ message: "Session is active" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
