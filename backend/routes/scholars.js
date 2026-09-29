const express = require("express");
const router = express.Router();
const scholarController = require("../controllers/scholarController");

router.get("/", scholarController.getPublicScholars);

module.exports = router;
