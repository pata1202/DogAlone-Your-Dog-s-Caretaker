// routes.js
// 내용: API 경로를 정의하고 authController.js와 연결합니다.
// 목적:
// API 요청을 처리할 경로를 정의하고 컨트롤러와 연결합니다

const express = require("express");
const router = express.Router();
const authController = require("./authController");
const recommendation = require("./recommendation")
const report_daily = require("./report_daily")
const report_weekly = require("./report_weekly")
const report_monthly = require("./report_monthly")

// 회원가입 엔드포인트
router.post("/api/register", authController.register);

// 로그인 엔드포인트
router.post("/api/login", authController.login);

// 사용자 정보 호출 엔드포인트
router.get("/api/user/:userId", authController.getUserInfo);

// 시스템 추천
router.get("/recommendation", recommendation)

// 울음리포트 일, 주, 월별 
router.get("/report.daily", report_daily)
router.get("/report.weekly", report_weekly)
router.get("/report.monthly", report_monthly)


module.exports = router;
