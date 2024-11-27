const express = require('express');
const mysql = require("mysql2/promise");
const db = require('./config/db');
const app = express();

db.connect(err => {
    if (err) {
        console.error('데이터베이스 연결 실패:', err);
        return;
    }
    console.log('데이터베이스에 연결됨');
});

const query = `
  SELECT YEARWEEK(time) AS week,  -- 주별로 그룹화
         COUNT(CASE WHEN emotion = 'bark' THEN 1 END) AS bark_count,
         COUNT(CASE WHEN emotion = 'growl' THEN 1 END) AS growl_count,
         COUNT(CASE WHEN emotion = 'grunt' THEN 1 END) AS grunt_count,
         COUNT(CASE WHEN emotion = 'howl' THEN 1 END) AS howl_count,
         COUNT(CASE WHEN emotion = 'whimper' THEN 1 END) AS whimper_count,
         COUNT(CASE WHEN emotion = 'yip' THEN 1 END) AS yip_count
  FROM emotion
  WHERE time >= ? AND time < ?
  GROUP BY YEARWEEK(time)
  ORDER BY YEARWEEK(time);
`;

const startTime = '2024-11-25 00:00:00';  // 시작 시간 예시 (11월 첫째 주)
const startDate = new Date(startTime + ' UTC');
const endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + 7);  // 7일 후 (한 주)

const endTime = endDate.toISOString().slice(0, 19).replace('T', ' ');

console.log("Start Time:", startTime);
console.log("End Time:", endTime);

// async/await 사용
async function fetchEmotionData() {
    try {
        // 쿼리 실행
        const [results] = await db.promise().query(query, [startTime, endTime]);
        console.log(`쿼리 결과 (${startTime} ~ ${endTime}):`, results);

        // 가장 많이 발생한 emotion 찾기
        let maxEmotion = '';
        let maxCount = 0;

        // 각 emotion의 count를 비교하여 가장 큰 값 찾기
        results.forEach(row => {
            const counts = {
                bark: row.bark_count,
                growl: row.growl_count,
                grunt: row.grunt_count,
                howl: row.howl_count,
                whimper: row.whimper_count,
                yip: row.yip_count
            };

            for (const emotion in counts) {
                if (counts[emotion] > maxCount) {
                    maxCount = counts[emotion];
                    maxEmotion = emotion;
                }
            }
        });

        // 가장 많이 발생한 감정 출력
        console.log(`가장 많이 발생한 감정: ${maxEmotion}`);

        // query2 실행
        const query2 = `SELECT * FROM report WHERE emotion = ?`;
        const [reportResults] = await db.promise().query(query2, [maxEmotion]);

        console.log(`가장 많이 발생한 감정인 '${maxEmotion}'에 대한 결과:`, reportResults);

    } catch (err) {
        console.error('쿼리 실행 중 오류 발생:', err);
    } finally {
        db.end((err) => {
            if (err) {
                console.error('MySQL 연결 종료 오류:', err);
                return;
            }
            console.log('MySQL 연결 종료');
        });
    }
}

// 함수 호출
fetchEmotionData();