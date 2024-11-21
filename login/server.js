// server.js
// 내용: Express 서버를 초기화하고 routes.js를 설정합니다


const express = require("express");
const app = express();
const routes = require("./routes");
require("dotenv").config(); // .env 파일에서 환경 변수 로드

app.use(express.json()); // JSON 요청 본문 파싱
app.use(routes); // 라우트 설정

const PORT = process.env.PORT || 3000; // 포트 설정
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
