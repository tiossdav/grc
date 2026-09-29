const Subscriber = require("../models/Subscriber");
const emailService = require("../services/emailService");

class NewsletterController {
  // Subscribe to newsletter
  async subscribe(req, res) {
    try {
      const { email, firstName, lastName, interests } = req.body;

      // Check if subscriber already exists
      const existingSubscriber = await Subscriber.findByEmail(email);

      if (existingSubscriber) {
        if (existingSubscriber.status === "active") {
          return res.status(400).json({
            success: false,
            message: "This email is already subscribed to our newsletter",
          });
        } else {
          // Resubscribe
          await Subscriber.updateStatus(email, "active");

          // Sync to Brevo (non-blocking)
          try {
            const brevoResult = await emailService.addContactToBrevo(
              email,
              firstName,
              lastName,
            );
            if (brevoResult?.data?.id) {
              await Subscriber.updateBrevoContactId(
                email,
                brevoResult.data.id.toString(),
              );
            }
          } catch (brevoErr) {
            console.warn("⚠️ Brevo sync warning on resubscribe:", brevoErr.message);
          }

          // Send welcome email
          try {
            await emailService.sendWelcomeEmail(email, firstName);
          } catch (emailErr) {
            console.warn("⚠️ Welcome email error on resubscribe:", emailErr.message);
          }

          // Send admin notification
          try {
            await emailService.sendAdminNotification({
              subscriberEmail: email,
              subscriberName: `${firstName || ""} ${lastName || ""}`.trim() || email,
              interests: interests || [],
            });
          } catch (adminErr) {
            console.warn("⚠️ Admin notification error on resubscribe:", adminErr.message);
          }

          return res.status(200).json({
            success: true,
            message: "Welcome back! You've been resubscribed to our newsletter",
          });
        }
      }

      // Create new subscriber in database
      const subscriber = await Subscriber.create(email, firstName, lastName);

      // Add to Brevo
      try {
        const brevoResult = await emailService.addContactToBrevo(
          email,
          firstName,
          lastName,
        );

        // Update subscriber with Brevo contact ID if available
        if (brevoResult && brevoResult.data && brevoResult.data.id) {
          await Subscriber.updateBrevoContactId(
            email,
            brevoResult.data.id.toString(),
          );
        }
      } catch (brevoErr) {
        console.warn("⚠️ Brevo contact sync warning:", brevoErr.message);
      }

      // Send welcome email
      let emailSent = false;
      try {
        const emailResult = await emailService.sendWelcomeEmail(email, firstName);
        emailSent = !!emailResult?.success;
      } catch (emailErr) {
        console.warn("⚠️ Welcome email sending warning:", emailErr.message);
      }

      // Send admin notification
      try {
        await emailService.sendAdminNotification({
          subscriberEmail: email,
          subscriberName: `${firstName || ""} ${lastName || ""}`.trim() || email,
          interests: interests || [],
        });
      } catch (adminErr) {
        console.warn("⚠️ Admin notification sending warning:", adminErr.message);
      }

      // Log activity
      try {
        await Subscriber.logActivity(subscriber.id, null, emailSent ? "sent" : "delivered", {
          source: "website",
          ip: req.ip,
          emailSent,
        });
      } catch (logErr) {
        console.warn("⚠️ Activity log warning:", logErr.message);
      }

      res.status(201).json({
        success: true,
        message:
          "Successfully subscribed! Check your email for a welcome message.",
        data: {
          email: subscriber.email,
          subscribedAt: subscriber.subscribed_at,
        },
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);

      // Handle duplicate email error
      if (error.code === "23505") {
        return res.status(400).json({
          success: false,
          message: "This email is already subscribed",
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to subscribe. Please try again later.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Unsubscribe from newsletter
  async unsubscribe(req, res) {
    try {
      const { email } = req.body;

      const subscriber = await Subscriber.findByEmail(email);

      if (!subscriber) {
        return res.status(404).json({
          success: false,
          message: "Email not found in our subscription list",
        });
      }

      if (subscriber.status === "unsubscribed") {
        return res.status(400).json({
          success: false,
          message: "This email is already unsubscribed",
        });
      }

      // Update status in database
      await Subscriber.updateStatus(email, "unsubscribed");

      // Remove from Brevo list
      try {
        await emailService.removeContactFromBrevo(email);
      } catch (brevoErr) {
        console.warn("⚠️ Brevo remove contact warning:", brevoErr.message);
      }

      // Send confirmation email
      try {
        await emailService.sendUnsubscribeEmail(email, subscriber.first_name);
      } catch (emailErr) {
        console.warn("⚠️ Unsubscribe confirmation email warning:", emailErr.message);
      }

      // Log activity
      try {
        await Subscriber.logActivity(subscriber.id, null, "unsubscribed", {
          ip: req.ip,
        });
      } catch (logErr) {
        console.warn("⚠️ Activity log warning:", logErr.message);
      }

      res.status(200).json({
        success: true,
        message: "Successfully unsubscribed from our newsletter",
      });
    } catch (error) {
      console.error("Newsletter unsubscribe error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to unsubscribe. Please try again later.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Get subscriber stats (admin only)
  async getStats(req, res) {
    try {
      const stats = await Subscriber.getCountByStatus();

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch statistics",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

// ✅ FIXED: Export instance (works with your routes)
module.exports = new NewsletterController();
