//Express 서버 설정 및 실행

require("dotenv").config(); // .env 파일 로드
const express = require("express");
const app = express();
const authRoutes = require("./routes"); // 라우트 가져오기

app.use(express.json()); // JSON 요청 파싱
app.use(authRoutes); // 라우트 등록

const PORT = process.env.PORT || 3000; // 포트 설정
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
