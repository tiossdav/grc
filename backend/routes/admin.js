const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/auth");

// Protect all admin endpoints with auth middleware
router.use(authMiddleware);

// Stats
router.get("/stats", adminController.getDashboardStats);

// Events CRUD
router.get("/events", adminController.getEvents);
router.post("/events", adminController.createEvent);
router.put("/events/:id", adminController.updateEvent);
router.delete("/events/:id", adminController.deleteEvent);

// Partners CRUD
router.get("/partners", adminController.getPartners);
router.post("/partners", adminController.createPartner);
router.put("/partners/:id", adminController.updatePartner);
router.delete("/partners/:id", adminController.deletePartner);

// Board Members CRUD
router.get("/board-members", adminController.getBoardMembers);
router.post("/board-members", adminController.createBoardMember);
router.put("/board-members/:id", adminController.updateBoardMember);
router.delete("/board-members/:id", adminController.deleteBoardMember);

// Donations List
router.get("/donations", adminController.getDonations);

// Newsletter CRUD
router.get("/subscribers", adminController.getSubscribers);
router.post("/send-campaign", adminController.sendCampaign);

// Podcasts CRUD
router.get("/podcasts", adminController.getPodcasts);
router.post("/podcasts", adminController.createPodcast);
router.put("/podcasts/:id", adminController.updatePodcast);
router.delete("/podcasts/:id", adminController.deletePodcast);

// Courses CRUD
router.get("/courses", adminController.getCourses);
router.post("/courses", adminController.createCourse);
router.put("/courses/:id", adminController.updateCourse);
router.delete("/courses/:id", adminController.deleteCourse);

// Publications CRUD
router.get("/publications", adminController.getPublications);
router.post("/publications", adminController.createPublication);
router.put("/publications/:id", adminController.updatePublication);
router.delete("/publications/:id", adminController.deletePublication);

// Research Projects CRUD
router.get("/research-projects", adminController.getResearchProjects);
router.post("/research-projects", adminController.createResearchProject);
router.put("/research-projects/:id", adminController.updateResearchProject);
router.delete("/research-projects/:id", adminController.deleteResearchProject);

// Scholars CRUD
router.get("/scholars", adminController.getScholars);
router.post("/scholars", adminController.createScholar);
router.put("/scholars/:id", adminController.updateScholar);
router.delete("/scholars/:id", adminController.deleteScholar);

module.exports = router;
