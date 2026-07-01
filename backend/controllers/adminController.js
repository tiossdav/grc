const db = require("../config/database");
const emailService = require("../services/emailService");

class AdminController {
  // ============================================
  // DASHBOARD STATS
  // ============================================
  async getDashboardStats(req, res) {
    try {
      // 1. Get donation stats
      const donationQuery = `
        SELECT 
          COUNT(*)::int as count,
          COALESCE(SUM(amount), 0)::float as total
        FROM donations 
        WHERE payment_status = 'success'
      `;
      const donationResult = await db.query(donationQuery);

      // 2. Get subscriber stats
      const subscriberQuery = `
        SELECT COUNT(*)::int as count 
        FROM newsletter_subscribers 
        WHERE status = 'active'
      `;
      const subscriberResult = await db.query(subscriberQuery);

      // 3. Get upcoming events stats
      const eventQuery = `
        SELECT COUNT(*)::int as count 
        FROM events 
        WHERE status = 'upcoming' AND start_date >= NOW()
      `;
      const eventResult = await db.query(eventQuery);

      // 4. Get partner stats
      const partnerQuery = `
        SELECT COUNT(*)::int as count 
        FROM partners 
        WHERE is_active = true
      `;
      const partnerResult = await db.query(partnerQuery);

      // 5. Get recent donations
      const recentDonationsQuery = `
        SELECT reference, donor_name, amount, payment_method, created_at, payment_status
        FROM donations
        ORDER BY created_at DESC
        LIMIT 5
      `;
      const recentDonationsResult = await db.query(recentDonationsQuery);

      res.json({
        success: true,
        stats: {
          donations: {
            count: donationResult.rows[0].count,
            total: donationResult.rows[0].total,
          },
          subscribers: {
            count: subscriberResult.rows[0].count,
          },
          events: {
            count: eventResult.rows[0].count,
          },
          partners: {
            count: partnerResult.rows[0].count,
          }
        },
        recentDonations: recentDonationsResult.rows
      });
    } catch (error) {
      console.error("Dashboard stats error:", error);
      res.status(500).json({ success: false, message: "Failed to load dashboard statistics" });
    }
  }

  // ============================================
  // EVENTS CRUD
  // ============================================
  async getEvents(req, res) {
    try {
      const { rows } = await db.query("SELECT * FROM events ORDER BY start_date DESC");
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error("Get events error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch events" });
    }
  }

  async createEvent(req, res) {
    try {
      const { title, description, event_type, start_date, end_date, location, is_virtual, max_participants, status } = req.body;

      if (!title || !event_type || !start_date) {
        return res.status(400).json({ success: false, message: "Title, event type, and start date are required" });
      }

      const query = `
        INSERT INTO events (title, description, event_type, start_date, end_date, location, is_virtual, max_participants, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `;
      const values = [
        title,
        description,
        event_type,
        start_date,
        end_date || null,
        location || null,
        is_virtual || false,
        max_participants || null,
        status || "upcoming"
      ];

      const { rows } = await db.query(query, values);
      res.status(201).json({ success: true, message: "Event created successfully", data: rows[0] });
    } catch (error) {
      console.error("Create event error:", error);
      res.status(500).json({ success: false, message: "Failed to create event" });
    }
  }

  async updateEvent(req, res) {
    try {
      const { id } = req.params;
      const { title, description, event_type, start_date, end_date, location, is_virtual, max_participants, status } = req.body;

      if (!title || !event_type || !start_date) {
        return res.status(400).json({ success: false, message: "Title, event type, and start date are required" });
      }

      const query = `
        UPDATE events 
        SET title = $1, description = $2, event_type = $3, start_date = $4, end_date = $5, location = $6, is_virtual = $7, max_participants = $8, status = $9, updated_at = CURRENT_TIMESTAMP
        WHERE id = $10
        RETURNING *
      `;
      const values = [
        title,
        description,
        event_type,
        start_date,
        end_date || null,
        location || null,
        is_virtual || false,
        max_participants || null,
        status,
        id
      ];

      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: "Event not found" });
      }

      res.json({ success: true, message: "Event updated successfully", data: rows[0] });
    } catch (error) {
      console.error("Update event error:", error);
      res.status(500).json({ success: false, message: "Failed to update event" });
    }
  }

  async deleteEvent(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await db.query("DELETE FROM events WHERE id = $1 RETURNING *", [id]);

      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: "Event not found" });
      }

      res.json({ success: true, message: "Event deleted successfully", data: rows[0] });
    } catch (error) {
      console.error("Delete event error:", error);
      res.status(500).json({ success: false, message: "Failed to delete event" });
    }
  }

  // ============================================
  // PARTNERS CRUD
  // ============================================
  async getPartners(req, res) {
    try {
      const { rows } = await db.query("SELECT * FROM partners ORDER BY created_at DESC");
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error("Get partners error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch partners" });
    }
  }

  async createPartner(req, res) {
    try {
      const { name, full_name, type, description, logo_url, website_url, contact_email, contact_phone, partnership_since, partnership_focus, is_active } = req.body;

      if (!name || !type) {
        return res.status(400).json({ success: false, message: "Name and partner type are required" });
      }

      const query = `
        INSERT INTO partners (name, full_name, type, description, logo_url, website_url, contact_email, contact_phone, partnership_since, partnership_focus, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `;
      const values = [
        name,
        full_name || null,
        type,
        description || null,
        logo_url || null,
        website_url || null,
        contact_email || null,
        contact_phone || null,
        partnership_since || null,
        partnership_focus || null,
        is_active !== undefined ? is_active : true
      ];

      const { rows } = await db.query(query, values);
      res.status(201).json({ success: true, message: "Partner added successfully", data: rows[0] });
    } catch (error) {
      console.error("Create partner error:", error);
      res.status(500).json({ success: false, message: "Failed to add partner" });
    }
  }

  async updatePartner(req, res) {
    try {
      const { id } = req.params;
      const { name, full_name, type, description, logo_url, website_url, contact_email, contact_phone, partnership_since, partnership_focus, is_active } = req.body;

      if (!name || !type) {
        return res.status(400).json({ success: false, message: "Name and partner type are required" });
      }

      const query = `
        UPDATE partners 
        SET name = $1, full_name = $2, type = $3, description = $4, logo_url = $5, website_url = $6, contact_email = $7, contact_phone = $8, partnership_since = $9, partnership_focus = $10, is_active = $11, updated_at = CURRENT_TIMESTAMP
        WHERE id = $12
        RETURNING *
      `;
      const values = [
        name,
        full_name || null,
        type,
        description || null,
        logo_url || null,
        website_url || null,
        contact_email || null,
        contact_phone || null,
        partnership_since || null,
        partnership_focus || null,
        is_active !== undefined ? is_active : true,
        id
      ];

      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: "Partner not found" });
      }

      res.json({ success: true, message: "Partner updated successfully", data: rows[0] });
    } catch (error) {
      console.error("Update partner error:", error);
      res.status(500).json({ success: false, message: "Failed to update partner" });
    }
  }

  async deletePartner(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await db.query("DELETE FROM partners WHERE id = $1 RETURNING *", [id]);

      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: "Partner not found" });
      }

      res.json({ success: true, message: "Partner deleted successfully", data: rows[0] });
    } catch (error) {
      console.error("Delete partner error:", error);
      res.status(500).json({ success: false, message: "Failed to delete partner" });
    }
  }

  // ============================================
  // BOARD MEMBERS CRUD
  // ============================================
  async getBoardMembers(req, res) {
    try {
      const { rows } = await db.query("SELECT * FROM board_members ORDER BY display_order ASC, name ASC");
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error("Get board members error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch board members" });
    }
  }

  async createBoardMember(req, res) {
    try {
      const { name, role, bio, affiliation, image_url, expertise, email, linkedin_url, twitter_url, display_order, is_active } = req.body;

      if (!name || !role) {
        return res.status(400).json({ success: false, message: "Name and role are required" });
      }

      const query = `
        INSERT INTO board_members (name, role, bio, affiliation, image_url, expertise, email, linkedin_url, twitter_url, display_order, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `;
      const values = [
        name,
        role,
        bio || null,
        affiliation || null,
        image_url || null,
        expertise || [],
        email || null,
        linkedin_url || null,
        twitter_url || null,
        display_order || 0,
        is_active !== undefined ? is_active : true
      ];

      const { rows } = await db.query(query, values);
      res.status(201).json({ success: true, message: "Board member created successfully", data: rows[0] });
    } catch (error) {
      console.error("Create board member error:", error);
      res.status(500).json({ success: false, message: "Failed to add board member" });
    }
  }

  async updateBoardMember(req, res) {
    try {
      const { id } = req.params;
      const { name, role, bio, affiliation, image_url, expertise, email, linkedin_url, twitter_url, display_order, is_active } = req.body;

      if (!name || !role) {
        return res.status(400).json({ success: false, message: "Name and role are required" });
      }

      const query = `
        UPDATE board_members 
        SET name = $1, role = $2, bio = $3, affiliation = $4, image_url = $5, expertise = $6, email = $7, linkedin_url = $8, twitter_url = $9, display_order = $10, is_active = $11, updated_at = CURRENT_TIMESTAMP
        WHERE id = $12
        RETURNING *
      `;
      const values = [
        name,
        role,
        bio || null,
        affiliation || null,
        image_url || null,
        expertise || [],
        email || null,
        linkedin_url || null,
        twitter_url || null,
        display_order || 0,
        is_active !== undefined ? is_active : true,
        id
      ];

      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: "Board member not found" });
      }

      res.json({ success: true, message: "Board member updated successfully", data: rows[0] });
    } catch (error) {
      console.error("Update board member error:", error);
      res.status(500).json({ success: false, message: "Failed to update board member" });
    }
  }

  async deleteBoardMember(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await db.query("DELETE FROM board_members WHERE id = $1 RETURNING *", [id]);

      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: "Board member not found" });
      }

      res.json({ success: true, message: "Board member deleted successfully", data: rows[0] });
    } catch (error) {
      console.error("Delete board member error:", error);
      res.status(500).json({ success: false, message: "Failed to delete board member" });
    }
  }

  // ============================================
  // DONATIONS & SUBSCRIBERS
  // ============================================
  async getDonations(req, res) {
    try {
      const { rows } = await db.query("SELECT * FROM donations ORDER BY created_at DESC");
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error("Get donations error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch donations" });
    }
  }

  async getSubscribers(req, res) {
    try {
      const { rows } = await db.query("SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC");
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error("Get subscribers error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch subscribers" });
    }
  }

  async sendCampaign(req, res) {
    try {
      const { subject, htmlContent } = req.body;

      if (!subject || !htmlContent) {
        return res.status(400).json({ success: false, message: "Subject and htmlContent are required" });
      }

      const result = await emailService.sendNewsletterCampaign(subject, htmlContent);
      res.json({
        success: true,
        message: `Newsletter campaign dispatched successfully to ${result.sent}/${result.total} subscribers!`,
        result
      });
    } catch (error) {
      console.error("Send campaign error:", error);
      res.status(500).json({ success: false, message: "Failed to dispatch email campaign: " + error.message });
    }
  }
}

module.exports = new AdminController();
