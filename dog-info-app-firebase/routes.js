//API 라우팅 처리

const express = require("express");
const router = express.Router();
const authController = require("./authController"); // 컨트롤러 가져오기

// 회원가입 엔드포인트
router.post("/api/register", authController.register);

// 로그인 엔드포인트
router.post("/api/login", authController.login);

module.exports = router;
