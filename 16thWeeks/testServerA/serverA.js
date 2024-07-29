const express = require("express");
const cors = require("cors");
const app = express();
const imageA = require("./routes/imageA");
const path = require("path");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.method === "OPTIONS") {
    return res.status(200).send({ message: "ok" });
  }

  next();
});

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true,
//   methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
// }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", imageA);

app.listen(3001, () => {
  console.log("서버 잘 열렸으니 이거 눌러서 들어가.-> http://localhost:3001/");
});
