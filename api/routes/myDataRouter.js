const express = require("express");
const { myDataController } = require("../controllers");

const router = express.Router();

router.get("", myDataController.sendHistories);

module.exports = router;
