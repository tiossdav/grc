const express = require("express");
const router = express.Router();
const researchProjectController = require("../controllers/researchProjectController");

router.get("/", researchProjectController.getPublicResearchProjects);

module.exports = router;
