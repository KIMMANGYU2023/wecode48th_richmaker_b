const express = require("express");
const { myDataController } = require("../controllers");

const router = express.Router();

router.get("", myDataController.sendHistories);
router.get("/account", myDataController.sendAccounts);

module.exports = router;
