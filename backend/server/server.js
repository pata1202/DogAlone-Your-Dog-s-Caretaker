require("dotenv").config();
const express = require("express");
const routes = require("../routes/routes");
const { connectDatabase, getDatabase } = require("../config/db");
const { findHost } = require("../utils/host-finder");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

console.log(connectDatabase);

const PORT = process.env.PORT || 3000;
const HOST = "192.168.0.47"; // IP 주소 명시

app.listen(PORT, HOST, async () => { // IP와 포트를 함께 지정
  await connectDatabase();

  // 실행 시 --host 옵션이 있다면 호스트 반환
  if (process.argv.includes("--host")) {
    findHost(PORT);
  }

  console.log(`Server is running on http://${HOST}:${PORT}`);
});

app.get("/check-updates", async (req, res) => {
  try {
    // 최신 데이터 가져오기 (예시)
    const [rows] = await executeQuery(
      "SELECT * FROM recommendations ORDER BY updated_at DESC LIMIT 1"
    );
    const latestData = rows[0];

    // 최신 데이터 반환
    res.json({ newData: latestData });
  } catch (error) {
    console.error("Failed to check for updates:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.on("finish", async () => {
  const db = await getDatabase();
  db.end();
  console.log("DB closed");
});
