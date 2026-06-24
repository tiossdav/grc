const nodemailer = require("nodemailer");
const { contactsApi, emailsApi, brevo, config } = require("../config/brevo");
require("dotenv").config();

// SMTP Transporter for Brevo
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: process.env.BREVO_SMTP_PORT,
  secure: false, // Use TLS
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

// Verify SMTP connection on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ SMTP connection error:", error);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

class EmailService {
  // Add contact to Brevo
  async addContactToBrevo(email, firstName = "", lastName = "") {
    try {
      const createContact = new brevo.CreateContact();
      createContact.email = email;
      createContact.attributes = {
        FIRSTNAME: firstName || "",
        LASTNAME: lastName || "",
      };
      createContact.listIds = [config.listId];
      createContact.updateEnabled = true;

      const data = await contactsApi.createContact(createContact);
      console.log("✅ Contact added to Brevo:", email);
      return { success: true, data };
    } catch (error) {
      // If contact already exists, that's okay
      if (
        error.response &&
        error.response.body &&
        error.response.body.code === "duplicate_parameter"
      ) {
        console.log("ℹ️ Contact already exists in Brevo:", email);
        return { success: true, message: "Contact already exists" };
      }
      console.error("❌ Error adding contact to Brevo:", error.message);
      throw error;
    }
  }

  // Remove contact from Brevo list
  async removeContactFromBrevo(email) {
    try {
      const contactEmails = new brevo.RemoveContactFromList();
      contactEmails.emails = [email];

      await contactsApi.removeContactFromList(config.listId, contactEmails);
      console.log("✅ Contact removed from Brevo list:", email);
      return { success: true };
    } catch (error) {
      console.error("❌ Error removing contact from Brevo:", error.message);
      // Don't throw error - we still want to unsubscribe locally even if Brevo fails
      return { success: false, error: error.message };
    }
  }

  // Send welcome email via SMTP
  async sendWelcomeEmail(email, firstName) {
    try {
      const mailOptions = {
        from: `"${config.senderName}" <${config.senderEmail}>`,
        to: email,
        subject: "Welcome to Graduate Research Clinic Newsletter! 🎓",
        html: this.getWelcomeEmailTemplate(firstName),
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(
        "✅ Welcome email sent to:",
        email,
        "- Message ID:",
        info.messageId,
      );
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Error sending welcome email:", error);
      throw error;
    }
  }

  // Add this method to the EmailService class in emailService.js

  async sendAdminNotification({ subscriberEmail, subscriberName, interests }) {
    try {
      const interestsList =
        interests.length > 0
          ? interests.map((i) => `<li style="color: #666;">${i}</li>`).join("")
          : '<li style="color: #999;">No interests selected</li>';

      const mailOptions = {
        from: `"${config.senderName}" <${config.senderEmail}>`,
        to: process.env.ADMIN_EMAIL || "tiossdav@gmail.com", // Your admin email
        subject: "🎉 New Newsletter Subscription - GRC",
        html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 20px;">
                <table role="presentation" style="width: 500px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #95111c 0%, #7a0e16 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                      <h2 style="color: #ffffff; margin: 0; font-size: 22px;">
                        🎊 New Newsletter Subscriber!
                      </h2>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 30px;">
                      <p style="color: #333; margin: 0 0 20px 0; font-size: 16px;">
                        You have a new subscriber:
                      </p>
                      
                      <table style="width: 100%; margin-bottom: 20px;">
                        <tr>
                          <td style="padding: 10px; background-color: #f8f8f8; border-radius: 4px;">
                            <p style="margin: 0; color: #666; font-size: 14px;">
                              <strong style="color: #95111c;">Name:</strong><br>
                              ${subscriberName}
                            </p>
                          </td>
                        </tr>
                        <tr><td style="height: 10px;"></td></tr>
                        <tr>
                          <td style="padding: 10px; background-color: #f8f8f8; border-radius: 4px;">
                            <p style="margin: 0; color: #666; font-size: 14px;">
                              <strong style="color: #95111c;">Email:</strong><br>
                              ${subscriberEmail}
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="color: #333; margin: 20px 0 10px 0; font-size: 14px;">
                        <strong>Interests:</strong>
                      </p>
                      <ul style="margin: 0; padding-left: 20px;">
                        ${interestsList}
                      </ul>
                      
                      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                        <a href="https://app.brevo.com" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #95111c 0%, #7a0e16 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
                          View in Brevo Dashboard
                        </a>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 20px; text-align: center; background-color: #f8f8f8; border-radius: 0 0 8px 8px;">
                      <p style="margin: 0; color: #999; font-size: 12px;">
                        Graduate Research Clinic - Admin Notification
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Admin notification sent to: ${mailOptions.to}`);
      return { success: true };
    } catch (error) {
      console.error("❌ Error sending admin notification:", error);
      // Don't throw - subscription should succeed even if notification fails
      return { success: false };
    }
  }

  // Send unsubscribe confirmation email
  async sendUnsubscribeEmail(email, firstName) {
    try {
      const mailOptions = {
        from: `"${config.senderName}" <${config.senderEmail}>`,
        to: email,
        subject: "You've been unsubscribed from our newsletter",
        html: this.getUnsubscribeEmailTemplate(firstName),
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Unsubscribe email sent to:", email);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Error sending unsubscribe email:", error);
      throw error;
    }
  }

  // Welcome email template
  getWelcomeEmailTemplate(firstName) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to GRC Newsletter</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #95111c 0%, #7a0e16 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                      Welcome to GRC! 🎓
                    </h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px;">
                      Hello ${firstName || "there"}! 👋
                    </h2>
                    
                    <p style="color: #666666; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                      Thank you for subscribing to the Graduate Research Clinic newsletter!
                    </p>
                    
                    <p style="color: #666666; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                      You're now part of a vibrant community of African scholars, researchers, and development practitioners committed to excellence and innovation.
                    </p>
                    
                    <p style="color: #666666; line-height: 1.6; margin: 0 0 25px 0; font-size: 16px;">
                      Here's what you can expect from us:
                    </p>
                    
                    <ul style="color: #666666; line-height: 1.8; margin: 0 0 25px 0; padding-left: 20px; font-size: 16px;">
                      <li>Research opportunities and funding calls</li>
                      <li>Upcoming workshops and training programs</li>
                      <li>Success stories from our scholar community</li>
                      <li>Expert insights on academic excellence</li>
                      <li>Partnership announcements and collaborations</li>
                    </ul>
                    
                    <table role="presentation" style="margin: 30px 0;">
                      <tr>
                        <td style="border-radius: 8px; background: linear-gradient(135deg, #95111c 0%, #7a0e16 100%);">
                          <a href="${process.env.FRONTEND_URL}" style="display: inline-block; padding: 15px 30px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">
                            Explore Our Programs
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="color: #666666; line-height: 1.6; margin: 25px 0 0 0; font-size: 16px;">
                      We're excited to have you on this journey!
                    </p>
                    
                    <p style="color: #666666; line-height: 1.6; margin: 10px 0 0 0; font-size: 16px;">
                      Best regards,<br>
                      <strong>The Graduate Research Clinic Team</strong>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f8f8; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                    <p style="color: #999999; margin: 0 0 10px 0; font-size: 14px;">
                      Graduate Research Clinic<br>
                      Empowering African Scholars
                    </p>
                    <p style="color: #999999; margin: 0; font-size: 12px;">
                      <a href="${process.env.FRONTEND_URL}/unsubscribe" style="color: #95111c; text-decoration: none;">Unsubscribe</a>
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  // Unsubscribe email template
  getUnsubscribeEmailTemplate(firstName) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff;">
                <tr>
                  <td style="padding: 40px 30px; text-align: center;">
                    <h2 style="color: #333333; margin: 0 0 20px 0;">
                      You've been unsubscribed
                    </h2>
                    <p style="color: #666666; line-height: 1.6; margin: 0 0 15px 0;">
                      Hi ${firstName || "there"}, we're sorry to see you go!
                    </p>
                    <p style="color: #666666; line-height: 1.6; margin: 0 0 15px 0;">
                      You won't receive any more newsletter emails from us.
                    </p>
                    <p style="color: #666666; line-height: 1.6; margin: 0;">
                      Changed your mind? <a href="${process.env.FRONTEND_URL}/newsletter" style="color: #95111c;">Resubscribe here</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  // Add these methods to the EmailService class

  async sendDonationReceipt(email, name, amount, reference) {
    try {
      const mailOptions = {
        from: `"${config.senderName}" <${config.senderEmail}>`,
        to: email,
        subject: "Thank You for Your Donation! 🎓",
        html: this.getDonationReceiptTemplate(name, amount, reference),
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Donation receipt sent to:", email);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Error sending donation receipt:", error);
      throw error;
    }
  }

  async sendBankTransferConfirmation(email, name, amount, reference) {
    try {
      const mailOptions = {
        from: `"${config.senderName}" <${config.senderEmail}>`,
        to: email,
        subject: "Bank Transfer Received - Pending Confirmation",
        html: this.getBankTransferTemplate(name, amount, reference),
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Bank transfer confirmation sent to:", email);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Error sending bank transfer confirmation:", error);
      throw error;
    }
  }

  getDonationReceiptTemplate(name, amount, reference) {
    const formattedAmount = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              
              <tr>
                <td style="background: linear-gradient(135deg, #95111c 0%, #7a0e16 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                    Thank You! 🎓
                  </h1>
                </td>
              </tr>
              
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px;">
                    Dear ${name},
                  </h2>
                  
                  <p style="color: #666666; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                    We have successfully received your generous donation of <strong>${formattedAmount}</strong>.
                  </p>
                  
                  <p style="color: #666666; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                    Your support makes a real difference in empowering African scholars and advancing research excellence across the continent.
                  </p>
                  
                  <div style="background-color: #f8f8f8; border-left: 4px solid #95111c; padding: 20px; margin: 25px 0;">
                    <h3 style="margin: 0 0 10px 0; color: #95111c;">Receipt Details</h3>
                    <p style="margin: 5px 0; color: #666666;"><strong>Amount:</strong> ${formattedAmount}</p>
                    <p style="margin: 5px 0; color: #666666;"><strong>Reference:</strong> ${reference}</p>
                    <p style="margin: 5px 0; color: #666666;"><strong>Date:</strong> ${new Date().toLocaleDateString("en-NG")}</p>
                  </div>
                  
                  <p style="color: #666666; line-height: 1.6; margin: 25px 0 0 0; font-size: 16px;">
                    With gratitude,<br>
                    <strong>The Graduate Research Clinic Team</strong>
                  </p>
                </td>
              </tr>
              
              <tr>
                <td style="background-color: #f8f8f8; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                  <p style="color: #999999; margin: 0; font-size: 14px;">
                    Graduate Research Clinic<br>
                    Empowering African Scholars
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
  }

  getBankTransferTemplate(name, amount, reference) {
    const formattedAmount = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0;">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff;">
              <tr>
                <td style="padding: 40px 30px; text-align: center;">
                  <h2 style="color: #333333; margin: 0 0 20px 0;">
                    Bank Transfer Received
                  </h2>
                  <p style="color: #666666; line-height: 1.6; margin: 0 0 15px 0;">
                    Hi ${name}, we've recorded your bank transfer of <strong>${formattedAmount}</strong>.
                  </p>
                  <p style="color: #666666; line-height: 1.6; margin: 0 0 15px 0;">
                    Reference: <strong>${reference}</strong>
                  </p>
                  <p style="color: #666666; line-height: 1.6; margin: 0;">
                    We'll verify your transfer and send you a receipt within 24 hours.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
  }
}

module.exports = new EmailService();
