const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Public endpoints
router.get("/", courseController.getPublicCourses);
router.get("/:id", courseController.getCourseById);

module.exports = router;
