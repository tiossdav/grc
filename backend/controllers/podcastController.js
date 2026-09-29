const db = require("../config/database");

class PodcastController {
  // Get all public podcasts (with optional filtering)
  async getPublicPodcasts(req, res) {
    try {
      const { status, limit } = req.query;
      let query = "SELECT * FROM podcasts WHERE 1=1";
      const params = [];
      let paramCount = 1;

      if (status) {
        query += ` AND status = $${paramCount}`;
        params.push(status);
        paramCount++;
      } else {
        query += ` AND status != 'archived'`;
      }

      query += " ORDER BY date DESC, created_at DESC";

      if (limit) {
        query += ` LIMIT $${paramCount}`;
        params.push(parseInt(limit, 10));
      }

      const { rows } = await db.query(query, params);
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error("Get public podcasts error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch podcasts" });
    }
  }

  // Get single podcast by ID
  async getPodcastById(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await db.query("SELECT * FROM podcasts WHERE id = $1", [id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: "Podcast not found" });
      }

      res.json({ success: true, data: rows[0] });
    } catch (error) {
      console.error("Get single podcast error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch podcast" });
    }
  }
}

module.exports = new PodcastController();
