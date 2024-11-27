const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// 회원가입
router.post("/api/register", authController.register);

// 로그인
router.post("/api/login", authController.login);

// Google 로그인
router.post("/api/google-login", authController.googleLogin);

// 세션 만료 확인
router.post("/api/logout-after-inactivity", authController.logoutAfterInactivity);

module.exports = router;
