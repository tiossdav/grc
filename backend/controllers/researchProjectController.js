const db = require("../config/database");

class ResearchProjectController {
  async getPublicResearchProjects(req, res) {
    try {
      // Only fetch non-suspended/ongoing/completed maybe? Let's just fetch all public ones for now
      const query = "SELECT * FROM research_projects ORDER BY created_at DESC";
      const { rows } = await db.query(query);
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error("Get public research projects error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch research projects" });
    }
  }
}

module.exports = new ResearchProjectController();
