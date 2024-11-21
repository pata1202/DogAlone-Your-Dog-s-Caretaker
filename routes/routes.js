// routes.js
// 내용: API 경로를 정의하고 authController.js와 연결합니다.
// 목적:
// API 요청을 처리할 경로를 정의하고 컨트롤러와 연결합니다

const express = require("express");
const router = express.Router();
const authController = require("./authController");

// 회원가입 엔드포인트
router.post("/api/register", authController.register);

// 로그인 엔드포인트
router.post("/api/login", authController.login);

// 사용자 정보 호출 엔드포인트
router.get("/api/user/:userId", authController.getUserInfo);

module.exports = router;
