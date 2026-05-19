const pagaService = require("../services/pagaService");
const emailService = require("../services/emailService");
const db = require("../db");

class DonationController {
  // Initialize Paga payment
  async initializePaga(req, res) {
    try {
      const { amount, email, phoneNumber, donorName } = req.body;

      // Validate input
      if (!amount || !email) {
        return res.status(400).json({
          success: false,
          message: "Amount and email are required",
        });
      }

      if (!phoneNumber) {
        return res.status(400).json({
          success: false,
          message: "Phone number is required for Paga payments",
        });
      }

      // Generate unique reference
      const reference = `GRC-${Date.now()}`;

      console.log("Initializing Paga payment:", {
        amount,
        email,
        phoneNumber,
        reference,
      });

      // Initialize payment with Paga first
      const result = await pagaService.initializePayment({
  amount,
  email,
  phoneNumber,
  reference,
  donorName, // 👈 make sure to pass this
});

// result.data is the raw Paga response now
res.json({
  success: true,
  message: "Payment initialized successfully",
  data: {
    reference,
    amount,
    instructions: {
      step1: "Open your Paga app or dial *242#",
      step2: 'Select "Send Money"',
      step3: `Send ₦${Number(amount).toLocaleString()} to: Graduate Research Clinic`,
      step4: `Use reference: ${reference}`,
    },
  },
});

      // ✅ Save pending donation to DB
      await db.query(
        `INSERT INTO donations 
          (reference, donor_name, donor_email, amount, currency, payment_method, payment_status, metadata)
         VALUES ($1, $2, $3, $4, 'NGN', 'paga', 'pending', $5)`,
        [
          reference,
          donorName || "Anonymous",
          email,
          amount,
          JSON.stringify({ phoneNumber }),
        ]
      );

      console.log(`💾 Donation ${reference} saved to DB as pending`);

      // Return payment instructions
      res.json({
        success: true,
        message: "Payment initialized successfully",
        data: {
          reference,
          amount,
          accountNumber: result.data?.accountNumber,
          merchantPublicId: result.data?.merchantPublicId,
          paymentUrl: result.paymentUrl,
          instructions: {
            step1: "Open your Paga app or dial *242#",
            step2: 'Select "Send Money"',
            step3: `Send ₦${amount.toLocaleString()} to: ${result.data?.accountNumber || "Graduate Research Clinic"}`,
            step4: `Use reference: ${reference}`,
          },
        },
      });
    } catch (error) {
      console.error("Initialize Paga payment error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to initialize payment",
      });
    }
  }

  // Verify Paga payment
  async verifyPayment(req, res) {
    try {
      const { reference } = req.params;

      if (!reference) {
        return res.status(400).json({
          success: false,
          message: "Reference is required",
        });
      }

      console.log("Verifying payment:", reference);

      // ✅ Just check the DB — webhook already updated it
      const { rows } = await db.query(
        `SELECT * FROM donations WHERE reference = $1`,
        [reference]
      );

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Donation record not found",
        });
      }

      const donation = rows[0];

      if (donation.payment_status === "success") {
        // TODO: Send thank you email
        // await emailService.sendDonationThankYou(donation.donor_email, donation.amount);

        return res.json({
          success: true,
          message: "Payment verified successfully",
          isPaid: true,
          data: {
            reference: donation.reference,
            amount: donation.amount,
            donorName: donation.donor_name,
            email: donation.donor_email,
            paidAt: donation.completed_at,
          },
        });
      } else {
        return res.json({
          success: false,
          message: "Payment not completed yet",
          isPaid: false,
          status: donation.payment_status, // pending, failed, cancelled
        });
      }
    } catch (error) {
      console.error("Verify payment error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to verify payment",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Record bank transfer donation
  async recordBankTransfer(req, res) {
    try {
      const { amount, email, donorName, reference } = req.body;

      if (!amount || !email || !reference) {
        return res.status(400).json({
          success: false,
          message: "Amount, email, and reference are required",
        });
      }

      // ✅ Save bank transfer to DB as pending
      await db.query(
        `INSERT INTO donations 
          (reference, donor_name, donor_email, amount, currency, payment_method, payment_status)
         VALUES ($1, $2, $3, $4, 'NGN', 'bank_transfer', 'pending')`,
        [reference, donorName || "Anonymous", email, amount]
      );

      // TODO: Send admin notification
      // await emailService.sendBankTransferNotification({ amount, email, donorName, reference });

      res.json({
        success: true,
        message: "Bank transfer recorded. We will confirm and send you a receipt.",
        data: { reference },
      });
    } catch (error) {
      console.error("Record bank transfer error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to record bank transfer",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Get donation by reference
  async getDonation(req, res) {
    try {
      const { reference } = req.params;

      // ✅ Fetch from DB
      const { rows } = await db.query(
        `SELECT * FROM donations WHERE reference = $1`,
        [reference]
      );

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Donation not found",
        });
      }

      res.json({
        success: true,
        data: rows[0],
      });
    } catch (error) {
      console.error("Get donation error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get donation",
      });
    }
  }
}

module.exports = new DonationController();