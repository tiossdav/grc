const db = require("../config/database");

class CourseController {
  // Get all public courses
  async getPublicCourses(req, res) {
    try {
      const { limit } = req.query;
      let query = "SELECT * FROM courses WHERE status = 'active' ORDER BY created_at DESC";
      const params = [];
      let paramCount = 1;

      if (limit) {
        query += ` LIMIT $${paramCount}`;
        params.push(parseInt(limit, 10));
      }

      const { rows } = await db.query(query, params);
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error("Get public courses error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch courses" });
    }
  }

  // Get single course by ID
  async getCourseById(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await db.query("SELECT * FROM courses WHERE id = $1 AND status = 'active'", [id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: "Course not found" });
      }

      res.json({ success: true, data: rows[0] });
    } catch (error) {
      console.error("Get single course error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch course" });
    }
  }
}

module.exports = new CourseController();
