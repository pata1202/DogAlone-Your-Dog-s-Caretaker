const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const recommendation = require("../utils/recommendation");
const report_daily = require("../utils/report_daily");
const report_weekly = require("../utils/report_weekly");
const report_monthly = require("../utils/report_monthly");


// 회원가입
router.post("/api/register", authController.register);

// 로그인
router.post("/api/login", authController.login);

// Google 로그인
router.post("/api/google-login", authController.googleLogin);

// 세션 만료 확인
router.post("/api/logout-after-inactivity", authController.logoutAfterInactivity);

//시스템 추천
router.get("/recommendation", recommendation);

//울음리포트 
router.get("/report.daily", report_daily);
router.get("/report.weekly", report_weekly);
router.get("/report.monthly", report_monthly);

module.exports = router;