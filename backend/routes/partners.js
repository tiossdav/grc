const express = require("express");
const router = express.Router();
const partnerController = require("../controllers/partnerController");

router.get("/", partnerController.getPublicPartners);

module.exports = router;
