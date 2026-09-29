const db = require("../config/database");

class BoardMemberController {
  async getPublicBoardMembers(req, res) {
    try {
      // Only fetch active board members, order by display_order
      const query = "SELECT * FROM board_members WHERE is_active = true ORDER BY display_order ASC, name ASC";
      const { rows } = await db.query(query);
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error("Get public board members error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch board members" });
    }
  }
}

module.exports = new BoardMemberController();
