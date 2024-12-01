const mysql = require("mysql2");
const connection = require('../config/db');

// 데이터베이스 연결
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

// 급식 스케줄 테이블 생성
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS FeedingSchedule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    feeding_time VARCHAR(10) NOT NULL,
    day_of_week VARCHAR(10) NOT NULL,
    feeding_count INT NOT NULL,
    status ENUM('ON', 'OFF') DEFAULT 'ON'
  )
`;

connection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error("Error creating table:", err);
    return;
  }
  console.log("Table created or already exists.");
});

// 연결 종료
connection.end();
