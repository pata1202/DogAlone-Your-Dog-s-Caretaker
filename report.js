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

const specificDate = '2024-11-25'; // 동적으로 설정 가능

const query = `
  SELECT time AS date,
         COUNT(CASE WHEN emotion = 'happy' THEN 1 END) AS happy_count,
         COUNT(CASE WHEN emotion = 'sad' THEN 1 END) AS sad_count
  FROM emotion
  WHERE time = ?
  GROUP BY time
  ORDER BY time;
`;

db.query(query, [specificDate], (err, results) => {
    if (err) {
        console.error('쿼리 실행 오류:', err);
        return;
    }

    // 결과 출력
    console.log(`쿼리 결과 (날짜: ${specificDate}):`, results);

});

db.end((err) => {
    if (err) {
        console.error('MySQL 연결 종료 오류:', err);
        return;
    }
    console.log('MySQL 연결 종료');
});