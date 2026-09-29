const express = require("express");
const router = express.Router();
const podcastController = require("../controllers/podcastController");

// Public endpoints
router.get("/", podcastController.getPublicPodcasts);
router.get("/:id", podcastController.getPodcastById);

module.exports = router;
