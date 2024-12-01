const mysql = require('mysql2');
require("dotenv").config();

// 데이터베이스 연결 풀 설정
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,  // 최대 연결 수
    queueLimit: 0
});

// Promise 기반 쿼리 실행 함수
function executeQuery(query, params) {
    return pool.promise().query(query, params)
        .then(results => results)
        .catch(error => { throw error; });
}

// DB 연결 함수
async function connectDatabase() {
    try {
        await pool.promise().query('SELECT 1');  // 연결 확인용 쿼리
        console.log('DB connected');
    } catch (e) {
        console.error('DB connection error:', e);
    }
}

// DB 연결 객체 반환
async function getDatabase() {
    if (!pool) {
        throw new Error('DB not connected');
    }
    return pool;
}

// 내보내기
module.exports = { executeQuery, connectDatabase, getDatabase };
