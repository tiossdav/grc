const express = require("express");
const router = express.Router();
const boardMemberController = require("../controllers/boardMemberController");

router.get("/", boardMemberController.getPublicBoardMembers);

module.exports = router;
