const express = require("express");
const { authController } = require("../controllers");

const router = express.Router();

router.get("", authController.sendCI);

module.exports = router;
