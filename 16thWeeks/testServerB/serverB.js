const express = require("express");
const cors = require("cors");
const app = express();
const imageB = require("./routes/imageB");
const path = require("path");

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "yiseong");
  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.method === "OPTIONS") {
    return res.status(200).send({ message: "ok" });
  }

  next();
});

app.use(cors({
  origin: "http://localhost:3000",
  methods:"GET, POST, OPTIONS, PUT, PATCH, DELETE",
  allowedHeaders: "yiseong",
  credentials: true,
}));

app.use("/", imageB);

app.listen(3002, () => {
  console.log("서버 잘 열렸으니 이거 눌러서 들어가.-> http://localhost:3002/");
});
