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

module.exports = router;
