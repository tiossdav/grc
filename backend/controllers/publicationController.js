const db = require("../config/database");

class PublicationController {
  async getPublicPublications(req, res) {
    try {
      const query = "SELECT * FROM publications ORDER BY publication_date DESC, created_at DESC";
      const { rows } = await db.query(query);
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error("Get public publications error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch publications" });
    }
  }
}

module.exports = new PublicationController();
