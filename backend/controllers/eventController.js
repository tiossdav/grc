const db = require("../config/database");

class EventController {
  // Get all public events (with optional filtering)
  async getPublicEvents(req, res) {
    try {
      const { status, type, limit } = req.query;
      let query = "SELECT * FROM events WHERE 1=1";
      const params = [];
      let paramCount = 1;

      if (status) {
        query += ` AND status = $${paramCount}`;
        params.push(status);
        paramCount++;
      }

      if (type) {
        query += ` AND event_type = $${paramCount}`;
        params.push(type);
        paramCount++;
      }

      query += " ORDER BY start_date DESC";

      if (limit) {
        query += ` LIMIT $${paramCount}`;
        params.push(parseInt(limit, 10));
      }

      const { rows } = await db.query(query, params);
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error("Get public events error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch events" });
    }
  }

  // Get single event by ID
  async getEventById(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await db.query("SELECT * FROM events WHERE id = $1", [id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: "Event not found" });
      }

      res.json({ success: true, data: rows[0] });
    } catch (error) {
      console.error("Get single event error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch event" });
    }
  }
}

module.exports = new EventController();
