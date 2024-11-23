const express = require("express");
const router = express.Router();
const authController = require("./authController");

// 회원가입
router.post("/api/register", authController.register);

// 로그인
router.post("/api/login", authController.login);

// 자동 로그아웃 확인
router.post("/api/logout-after-inactivity", authController.logoutAfterInactivity);

// Google 로그인
router.post("/api/google-login", authController.googleLogin);

module.exports = router;
