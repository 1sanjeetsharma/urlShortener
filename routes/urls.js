const express = require("express");
const {
  handleGenerateNewShortURL,
  HandleUrlGet,
  handleGetAnalytics,
} = require("../controllers/urls");
const router = express.Router();
// router.use(express.json());
// router.use(express.urlencoded({ extended: false }));
router.get("/:id", HandleUrlGet);
router.post("/", handleGenerateNewShortURL);
router.post("/getAnalytics", handleGetAnalytics);
module.exports = router;
