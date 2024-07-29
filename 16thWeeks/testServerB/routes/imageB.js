const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res, next) => {
  const imgUrl = path.join(__dirname, "../public/ImageB/imageB.png");
  res.sendFile(imgUrl);
});

module.exports = router;
