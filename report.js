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
  SELECT time AS date,
         COUNT(CASE WHEN emotion = 'bark' THEN 1 END) AS bark_count,
         COUNT(CASE WHEN emotion = 'growl' THEN 1 END) AS growl_count,
         COUNT(CASE WHEN emotion = 'grunt' THEN 1 END) AS grunt_count,
         COUNT(CASE WHEN emotion = 'howl' THEN 1 END) AS howl_count,
         COUNT(CASE WHEN emotion = 'whimper' THEN 1 END) AS whimper_count,
         COUNT(CASE WHEN emotion = 'yip' THEN 1 END) AS yip_count
  FROM emotion2
  WHERE time >= ? AND time < ?
  GROUP BY DATE(time)
  ORDER BY time;
`;

const startTime = '2024-11-26 00:00:00';

// startTime을 Date 객체로 변환
const startDate = new Date(startTime + ' UTC');

// endTime은 startTime에서 하루를 더한 시간으로 설정
const endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + 1);  // 하루를 더함

// endTime을 MySQL에서 사용할 수 있는 형식으로 변환 (YYYY-MM-DD HH:mm:ss)
const endTime = endDate.toISOString().slice(0, 19).replace('T', ' ');

console.log("Start Time:", startTime);
console.log("End Time:", endTime);

db.query(query, [startTime, endTime], (err, results) => {
    if (err) {
        console.error('쿼리 실행 오류:', err);
        return;
    }

    // 결과 출력
    console.log(`쿼리 결과 (${startTime} ~ ${endTime}):`, results);

});

db.end((err) => {
    if (err) {
        console.error('MySQL 연결 종료 오류:', err);
        return;
    }
    console.log('MySQL 연결 종료');
});