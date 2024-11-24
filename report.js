const mysql = require("mysql2/promise");
var db = require('./db');
const _ = require("lodash");

(async () => {
    try {
        // 1. DB에서 데이터 가져오기
        const [rows] = await db.execute("SELECT * FROM your_table");

        // 2. Lodash를 이용한 데이터 가공
        // 예제 데이터 형태
        // rows = [
        //   { id: 1, date: "2024-11-01", emotion: 'happy' },
        //   { id: 2, date: "2024-11-01", emotion: 'sad' },
        //   { id: 3, date: "2024-11-02", emotion: 'scared' },
        // ];

        // 3. 일별 데이터 정리
        const dailyData = _(rows)
            .groupBy((row) => row.date) // 날짜별 그룹화
            .map((group, date) => ({
                date,
                emotionCounts: _.countBy(group, "emotion"), // emotion별 개수
                totalEntries: group.length, // 총 항목 개수
            }))
            .value();

        console.log("일별 데이터:", dailyData);

        // 4. 월별 데이터 정리
        const monthlyData = _(rows)
            .groupBy((row) => row.date.slice(0, 7)) // YYYY-MM 형식으로 그룹화
            .map((group, month) => ({
                month,
                emotionCounts: _.countBy(group, "emotion"), // emotion별 개수
                totalEntries: group.length, // 총 항목 개수
            }))
            .value();

        console.log("월별 데이터:", monthlyData);

        // 5. DB 연결 종료
        await db.end();
    } catch (error) {
        console.error("Error:", error);
    }
})();
