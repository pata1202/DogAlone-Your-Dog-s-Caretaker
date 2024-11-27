const express = require('express');
const mysql = require("mysql2/promise");
const db = require('./config/db');
const app = express();

// emotion_table과 recommendation_table을 JOIN하여 데이터 조회
const query = `
  SELECT e.*, r.recommendation
  FROM emotion e
  JOIN recommendation r ON e.emotion = r.emotion
  ORDER BY e.id DESC
  LIMIT 1;
`;

// 쿼리 실행
db.query(query, (err, results) => {
    if (err) {
        console.error('쿼리 실행 중 오류 발생:', err);
        return;
    }

    // 결과 출력
    if (results.length > 0) {
        const row = results[0];
        console.log(`최신 Emotion: ${row.emotion}, Recommendation: ${row.recommendation}`);
    } else {
        console.log('결과가 없습니다.');
    }
});

// 연결 종료
db.end();
