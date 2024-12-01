const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { getRecommendation } = require("../services/recommendation")
const { getDailyReport, getMonthlyReport, getWeeklyReport } = require("../services/report")

/**
 * GET /
 * 서버 상태 확인
 */
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
})

/**
 * POST /auth/register
 * 회원가입
 */
router.post("/auth/register", authController.register);

/**
 * POST /auth/login
 * 로그인
 */
router.post("/auth/login", authController.login);

// 용도 확인 필요
// // Google 로그인
// // router.post("/api/google-login", authController.googleLogin);
//
// // 세션 만료 확인
// // router.post("/api/logout-after-inactivity", authController.logoutAfterInactivity);


/**
 * GET /recommendation
 * 시스템 추천 정보
 */
router.get("/recommendation", async (req, res) => {
    const data = await getRecommendation();
    res.status(200).json({ data });
})

/**
 * GET /report/daily
 * 일일 울음 리포트
 */
router.get("/report/daily", async (req, res) => {
    const { date } = req.query;  // 쿼리 파라미터에서 date를 받아오기

    if (!date) {
        return res.status(400).json({ error: "날짜가 제공되지 않았습니다." });  // 날짜가 없으면 400 에러 반환
    }

    try {
        const data = await getDailyReport(date);  // 날짜를 매개변수로 전달
        res.status(200).json({ data });
    } catch (error) {
        console.error("일일 보고서 조회 중 오류 발생:", error);
        res.status(500).json({ error: "서버에서 오류가 발생했습니다." });
    }
});


/**
 * GET /report/weekly
 * 주간 울음 리포트
 */
router.get('/report/weekly', async (req, res) => {
    const data = await getWeeklyReport();

    res.status(200).json({ data });
});

/**
 * GET /report/monthly
 * 월간 울음 리포트
 */
router.get('/report/monthly', async (req, res) => {
    const data = await getMonthlyReport();

    res.status(200).json({ data });
});

module.exports = router;
