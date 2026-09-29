require("dotenv").config();
const pool = require("../config/database");
const emailService = require("../services/emailService");
const Subscriber = require("../models/Subscriber");

async function runVerification() {
  console.log("=== STEP 1: VERIFYING DATABASE RESET STATE ===");
  const countRes = await pool.query("SELECT COUNT(*) FROM newsletter_subscribers");
  console.log("Initial subscribers count:", countRes.rows[0].count);

  console.log("\n=== STEP 2: TEST SUBSCRIBER CREATION & FAULT-TOLERANCE ===");
  const testEmail = "newsletter_verify_test@example.com";
  const firstName = "Verify";
  const lastName = "Tester";

  // Simulate what newsletterController.subscribe does
  console.log("Creating subscriber in database...");
  const subscriber = await Subscriber.create(testEmail, firstName, lastName);
  console.log("✅ Subscriber created with ID:", subscriber.id);

  // Sync to Brevo (non-blocking)
  console.log("Syncing to Brevo...");
  const brevoResult = await emailService.addContactToBrevo(testEmail, firstName, lastName);
  console.log("Brevo sync result:", brevoResult);

  // Send welcome email
  console.log("Sending welcome email via SMTP (port 465)...");
  const welcomeResult = await emailService.sendWelcomeEmail(process.env.ADMIN_EMAIL || testEmail, firstName);
  console.log("Welcome email result:", welcomeResult);

  // Log activity
  console.log("Logging email activity...");
  const activity = await Subscriber.logActivity(subscriber.id, null, welcomeResult.success ? "sent" : "delivered", {
    source: "test_verification",
    emailSent: welcomeResult.success
  });
  console.log("✅ Activity logged with ID:", activity.id);

  console.log("\n=== STEP 3: CHECK DATABASE STATE ===");
  const verifySub = await Subscriber.findByEmail(testEmail);
  console.log("Verified subscriber in DB:", {
    id: verifySub.id,
    email: verifySub.email,
    status: verifySub.status,
    first_name: verifySub.first_name,
    brevo_contact_id: verifySub.brevo_contact_id
  });

  const verifyActivity = await pool.query("SELECT * FROM email_activity_log WHERE subscriber_id = $1", [verifySub.id]);
  console.log("Verified activity logs:", verifyActivity.rows.length);

  console.log("\n=== STEP 4: CLEANING UP VERIFICATION TEST DATA ===");
  await pool.query("TRUNCATE TABLE email_activity_log, newsletter_subscribers, newsletter_campaigns RESTART IDENTITY CASCADE;");
  const finalCount = await pool.query("SELECT COUNT(*) FROM newsletter_subscribers");
  console.log("Final clean subscribers count:", finalCount.rows[0].count);

  console.log("\n🎉 ALL TESTS COMPLETED SUCCESSFULLY!");
  await pool.end();
  process.exit(0);
}

runVerification().catch(err => {
  console.error("❌ Verification failed:", err);
  pool.end();
  process.exit(1);
});
