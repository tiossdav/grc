const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// Public endpoints
router.get("/", eventController.getPublicEvents);
router.get("/:id", eventController.getEventById);

module.exports = router;
