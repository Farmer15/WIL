const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res, next) => {
  const imagePath = path.join(__dirname, "../public/ImageA/imageA.png");
  res.sendFile(imagePath);
});

module.exports = router;
