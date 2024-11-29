const express = require("express");
const routes = require("./routes/routes");
require("dotenv").config(); // .env 파일 로드

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});