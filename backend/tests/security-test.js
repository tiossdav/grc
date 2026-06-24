// backend/tests/security-test.js

const axios = require("axios");

const API_URL = "http://localhost:5000";
const results = [];

// Helper to make requests
async function makeRequest(path, method = "GET", data = null) {
  try {
    const config = {
      method,
      url: `${API_URL}${path}`,
      validateStatus: () => true, // Don't throw on any status
    };

    if (data) {
      config.data = data;
      config.headers = { "Content-Type": "application/json" };
    }

    return await axios(config);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      throw new Error(
        "Server is not running. Please start it with: npm run dev",
      );
    }
    throw error;
  }
}

// Test 1: Server Health Check
async function testServerHealth() {
  console.log("🧪 Testing Server Health...");

  try {
    const response = await makeRequest("/health");

    if (response.status === 200) {
      results.push({
        test: "Server Health",
        status: "✅ PASSED",
        detail: "Server is running",
      });
      return true;
    } else {
      results.push({
        test: "Server Health",
        status: "❌ FAILED",
        detail: `Server returned status ${response.status}`,
      });
      return false;
    }
  } catch (error) {
    results.push({
      test: "Server Health",
      status: "❌ FAILED",
      detail: error.message,
    });
    return false;
  }
}

// Test 2: XSS Protection
async function testXSS() {
  console.log("🧪 Testing XSS Protection...");

  const xssPayload = '<script>alert("XSS")</script>';

  try {
    const response = await makeRequest("/api/donations/initialize-paga", "POST", {
      amount: 1000,
      email: "test@test.com",
      phoneNumber: "08012345678",
      donorName: xssPayload,
    });

    const responseText = JSON.stringify(response.data);

    if (responseText.includes("<script>") || responseText.includes("alert")) {
      results.push({
        test: "XSS Protection",
        status: "❌ FAILED",
        detail: "XSS payload not sanitized",
      });
    } else {
      results.push({
        test: "XSS Protection",
        status: "✅ PASSED",
        detail: "XSS payload blocked/sanitized",
      });
    }
  } catch (error) {
    results.push({
      test: "XSS Protection",
      status: "⚠️  ERROR",
      detail: error.message,
    });
  }
}

// Test 3: Input Validation
async function testValidation() {
  console.log("🧪 Testing Input Validation...");

  try {
    // Test invalid amount (negative)
    const response = await makeRequest("/api/donations/initialize-paga", "POST", {
      amount: -1000,
      email: "test@test.com",
      phoneNumber: "08012345678",
      donorName: "Test User",
    });

    if (response.status === 400) {
      results.push({
        test: "Input Validation",
        status: "✅ PASSED",
        detail: "Invalid amounts rejected",
      });
    } else {
      results.push({
        test: "Input Validation",
        status: "❌ FAILED",
        detail: `Invalid amount accepted (status: ${response.status})`,
      });
    }
  } catch (error) {
    results.push({
      test: "Input Validation",
      status: "⚠️  ERROR",
      detail: error.message,
    });
  }
}

// Test 4: Rate Limiting
async function testRateLimiting() {
  console.log("🧪 Testing Rate Limiting (this may take a moment)...");

  try {
    const requests = [];

    // Send 15 requests rapidly
    for (let i = 0; i < 15; i++) {
      requests.push(
        makeRequest("/api/donations/initialize-paga", "POST", {
          amount: 1000,
          email: "test@test.com",
          phoneNumber: "08012345678",
          donorName: "Test User",
        }),
      );
    }

    const responses = await Promise.all(requests);
    const rateLimited = responses.filter((r) => r.status === 429);

    if (rateLimited.length > 0) {
      results.push({
        test: "Rate Limiting",
        status: "✅ PASSED",
        detail: `${rateLimited.length}/15 requests blocked`,
      });
    } else {
      results.push({
        test: "Rate Limiting",
        status: "⚠️  WARNING",
        detail:
          "No rate limiting detected (may need more requests or rate limit is higher)",
      });
    }
  } catch (error) {
    results.push({
      test: "Rate Limiting",
      status: "⚠️  ERROR",
      detail: error.message,
    });
  }
}

// Test 5: Security Headers
async function testSecurityHeaders() {
  console.log("🧪 Testing Security Headers...");

  try {
    const response = await makeRequest("/health");
    const headers = response.headers;

    const securityHeaders = {
      "x-content-type-options": headers["x-content-type-options"],
      "x-frame-options": headers["x-frame-options"],
      "strict-transport-security": headers["strict-transport-security"],
    };

    const missing = Object.entries(securityHeaders)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missing.length === 0) {
      results.push({
        test: "Security Headers",
        status: "✅ PASSED",
        detail: "All required headers present",
      });
    } else {
      results.push({
        test: "Security Headers",
        status: "⚠️  WARNING",
        detail: `Missing: ${missing.join(", ")}`,
      });
    }
  } catch (error) {
    results.push({
      test: "Security Headers",
      status: "⚠️  ERROR",
      detail: error.message,
    });
  }
}

// Test 6: Email Validation
async function testEmailValidation() {
  console.log("🧪 Testing Email Validation...");

  try {
    const response = await makeRequest("/api/donations/initialize-paga", "POST", {
      amount: 1000,
      email: "notanemail",
      phoneNumber: "08012345678",
      donorName: "Test User",
    });

    if (response.status === 400 && response.data.errors) {
      results.push({
        test: "Email Validation",
        status: "✅ PASSED",
        detail: "Invalid email rejected",
      });
    } else {
      results.push({
        test: "Email Validation",
        status: "❌ FAILED",
        detail: "Invalid email accepted",
      });
    }
  } catch (error) {
    results.push({
      test: "Email Validation",
      status: "⚠️  ERROR",
      detail: error.message,
    });
  }
}

// Main test runner
async function runTests() {
  console.log("\n🔒 Starting Security Tests...\n");
  console.log("═".repeat(60));
  console.log("Make sure your server is running: npm run dev\n");

  // Check if server is running first
  const serverRunning = await testServerHealth();

  if (!serverRunning) {
    console.log("\n❌ Server is not running or not responding!");
    console.log("\n📝 To fix this:");
    console.log("   1. Open a new terminal");
    console.log("   2. Run: cd backend");
    console.log("   3. Run: npm run dev");
    console.log('   4. Wait for "Server running on port 5000"');
    console.log("   5. Then run tests again: npm test\n");
    process.exit(1);
  }

  // Run all tests
  await testXSS();
  await testValidation();
  await testEmailValidation();
  await testRateLimiting();
  await testSecurityHeaders();

  // Print results
  console.log("\n📊 TEST RESULTS:\n");
  console.log("═".repeat(60));

  results.forEach((result) => {
    console.log(`\n${result.status} ${result.test}`);
    console.log(`   ${result.detail}`);
  });

  console.log("\n" + "═".repeat(60));

  const passed = results.filter((r) => r.status.includes("PASSED")).length;
  const failed = results.filter((r) => r.status.includes("FAILED")).length;
  const warnings = results.filter((r) => r.status.includes("WARNING")).length;
  const errors = results.filter((r) => r.status.includes("ERROR")).length;

  console.log(`\n✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  console.log(`⚠️  Errors: ${errors}\n`);

  if (failed > 0 || errors > 0) {
    console.log("⚠️  Security issues detected! Please review failed tests.\n");
    process.exit(1);
  } else {
    console.log("✅ All critical security tests passed!\n");
    if (warnings > 0) {
      console.log(
        `⚠️  ${warnings} warning(s) - review recommended but not critical.\n`,
      );
    }
    process.exit(0);
  }
}

// Run tests with error handling
runTests().catch((error) => {
  console.error("\n❌ Test suite crashed:", error.message);
  console.log("\n📝 Common fixes:");
  console.log("   - Make sure server is running: npm run dev");
  console.log("   - Check if port 5000 is available");
  console.log("   - Install axios: npm install axios\n");
  process.exit(1);
});
