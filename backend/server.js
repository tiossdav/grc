const express = require("express");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const webhookRoute = require("./routes/webhook");

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1); // 👈 add this before any middleware
// Security middleware (apply FIRST)
app.use(helmet());
// Allow both local dev and live production origins
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  process.env.LIVE_URL || "",
  "https://graduateresearchclinic.org",
  "https://www.graduateresearchclinic.org",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.warn(`⚠️ CORS blocked origin: ${origin}`);
      return callback(new Error(`CORS policy: Origin ${origin} is not allowed`));
    },
    credentials: true,
  }),
);

// ⚠️ Webhook must be registered BEFORE express.json()
// because it needs the raw body
app.use("/webhook", webhookRoute);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP",
});

const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: "Too many payment attempts",
});

// Apply rate limiting to API routes
app.use("/api", apiLimiter);

// Import database connection
const pool = require("./config/database");

// Test database connection on startup
(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Database connected successfully at:", result.rows[0].now);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.error("Check your .env file and make sure PostgreSQL is running");
  }
})();

// ============================================
// ROUTES (ORDER MATTERS!)
// ============================================

// Health check endpoint (for testing) - NO /api prefix
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// API Health check with database
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "healthy",
      database: "connected",
      timestamp: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      database: "disconnected",
      error: error.message,
    });
  }
});

// Serve sitemap.xml
app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "sitemap.xml"));
});

// Serve robots.txt
app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "robots.txt"));
});

app.use("/api/newsletter", require("./routes/newsletter"));
app.use("/api/donations", require("./routes/donations"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));

// ============================================
// ERROR HANDLERS (MUST BE LAST!)
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    availableRoutes: [
      "GET /health",
      "GET /api/health",
      "POST /api/donations/initialize-paga",
      "POST /api/donations/bank-transfer",
      "GET/POST /api/donations/verify-payment/:reference",
      "GET /api/donations/donation/:reference",
      "GET /api/donations/list",
      "POST /api/newsletter/subscribe",
      "POST /api/newsletter/unsubscribe",
      "GET /api/newsletter/stats",
    ],
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});
