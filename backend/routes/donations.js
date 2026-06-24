// backend/routes/donations.js

const express = require("express");
const router = express.Router();
const pagaService = require("../services/pagaService");
const emailService = require("../services/emailService");
const DonationController = require("../controllers/donationController");
const { body, validationResult } = require("express-validator");
const db = require("../config/database"); // 👈 updated path

// Sanitize input to prevent XSS
const sanitizeInput = (value) => {
  if (typeof value !== "string") return value;

  return value
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

// Base validation rules
const baseValidation = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number")
    .custom((value) => {
      const amount = parseFloat(value);
      if (amount < 100) {
        throw new Error("Amount must be at least ₦100");
      }
      if (amount > 100000000) {
        throw new Error("Amount cannot exceed ₦100,000,000");
      }
      if (amount <= 0) {
        throw new Error("Amount must be positive");
      }
      return true;
    })
    .toFloat(),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .customSanitizer(sanitizeInput),

  body("donorName")
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .matches(/^[a-zA-Z\s\-']+$/)
    .withMessage(
      "Name can only contain letters, spaces, hyphens, and apostrophes",
    )
    .customSanitizer(sanitizeInput),
];

// Paga-specific validation
const pagaValidation = [
  ...baseValidation,
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^0[789][01]\d{8}$/)
    .withMessage("Please provide a valid Nigerian phone number"),
];

// Bank transfer validation
const bankTransferValidation = [
  ...baseValidation,
  body("reference")
    .notEmpty()
    .withMessage("Reference is required")
    .customSanitizer(sanitizeInput),
];

// Check validation results middleware
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("❌ Validation failed:", errors.array());
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array().map((err) => ({
        field: err.path || err.param,
        message: err.msg,
      })),
    });
  }

  next();
};

// Generate unique reference
const generateReference = () => {
  return `GRC-DON-${Date.now().toString().slice(-8)}`;
};

// ============================================
// PAGA PAYMENT
// ============================================
router.post(
  "/initialize-paga",
  pagaValidation,
  checkValidation,
  DonationController.initializePaga,
  /*async (req, res) => {
    try {
      const { amount, email, phoneNumber, donorName } = req.body;
      const reference = generateReference();

      donations.set(reference, {
        amount,
        email,
        phoneNumber,
        donorName,
        paymentMethod: "paga",
        status: "pending",
        createdAt: new Date(),
        expectedAmount: amount,
      });

      console.log("✅ Paga payment initialized:", {
        reference,
        amount,
        email,
        phoneNumber,
        donorName,
      });

      res.json({
        success: true,
        message: "Payment initialized successfully",
        data: {
          reference: reference,
          // paymentUrl: 'https://paga.com/...' // Add when Paga API is integrated
        },
      });
    } catch (error) {
      console.error("❌ Paga initialization error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to initialize payment. Please try again.",
      });
    }
  },*/
);

// ============================================
// BANK TRANSFER
// ============================================
router.post(
  "/bank-transfer",
  bankTransferValidation,
  checkValidation,
  DonationController.recordBankTransfer
);

// ============================================
// VERIFICATION
// ============================================
// Support both GET and POST to handle client callback redirect (GET) and manual clicks (POST)
router.get("/verify-payment/:reference", DonationController.verifyPayment);
router.post("/verify-payment/:reference", DonationController.verifyPayment);

// ============================================
// GET ROUTES
// ============================================

// Get donation by reference
router.get("/donation/:reference", DonationController.getDonation);

// Get all donations (admin/testing)
router.get("/list", async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM donations ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      count: rows.length,
      total: rows.reduce((sum, d) => sum + Number(d.amount), 0),
      data: rows.map(d => ({
        reference: d.reference,
        amount: Number(d.amount),
        donorName: d.donor_name,
        email: d.donor_email,
        paymentMethod: d.payment_method,
        status: d.payment_status,
        createdAt: d.created_at,
      })),
    });
  } catch (error) {
    console.error("❌ Fetch donations error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch donations",
    });
  }
});

module.exports = router;
