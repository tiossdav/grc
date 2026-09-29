const db = require("../config/database");

class PartnerController {
  async getPublicPartners(req, res) {
    try {
      // Only fetch active partners, maybe order by name
      const query = "SELECT * FROM partners WHERE is_active = true ORDER BY name ASC";
      const { rows } = await db.query(query);
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error("Get public partners error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch partners" });
    }
  }
}

module.exports = new PartnerController();
