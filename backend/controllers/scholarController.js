const db = require("../config/database");

class ScholarController {
  async getPublicScholars(req, res) {
    try {
      const query = "SELECT * FROM scholars WHERE status = 'active' ORDER BY joined_date DESC, created_at DESC";
      const { rows } = await db.query(query);
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error("Get public scholars error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch scholars" });
    }
  }
}

module.exports = new ScholarController();
