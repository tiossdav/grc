const pool = require("../config/database");
const bcrypt = require("bcrypt");

async function seedAdmin() {
  const email = "graduateresearchclinic@gmail.com";
  const plainPassword = "admin66";
  const role = "admin";

  try {
    console.log("Seeding admin user...");
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(plainPassword, saltRounds);

    // Check if user already exists
    const checkQuery = "SELECT * FROM users WHERE email = $1";
    const checkResult = await pool.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      console.log(`User ${email} already exists. Updating password and role to admin...`);
      const updateQuery = "UPDATE users SET password_hash = $1, role = $2, updated_at = CURRENT_TIMESTAMP WHERE email = $3 RETURNING *";
      const updateResult = await pool.query(updateQuery, [passwordHash, role, email]);
      console.log("✅ Admin user updated successfully:", updateResult.rows[0].email);
    } else {
      console.log(`User ${email} does not exist. Creating new admin user...`);
      const insertQuery = "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *";
      const insertResult = await pool.query(insertQuery, [email, passwordHash, role]);
      console.log("✅ Admin user created successfully:", insertResult.rows[0].email);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding admin user failed:", error);
    process.exit(1);
  }
}

seedAdmin();
