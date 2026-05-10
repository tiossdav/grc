const Donation = require("../models/Donation");
const pagaService = require("../services/pagaService");
const emailService = require("../services/emailService");

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

      // Phone number is required for Paga
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

      // Initialize payment with Paga
      const result = await pagaService.initializePayment({
        amount,
        email,
        phoneNumber,
        reference,
      });

      donations.set(reference, donation);

      // TODO: Save donation record to database
      // await Donation.create({
      //   reference,
      //   amount,
      //   email,
      //   phoneNumber,
      //   status: 'pending'
      // });

      // Return payment instructions
      res.json({
        success: true,
        message: "Payment initialized successfully",
        data: {
          reference,
          amount,
          // If Paga returns account details, include them
          accountNumber: result.data?.accountNumber,
          merchantPublicId: result.data?.merchantPublicId,
          paymentUrl: result.paymentUrl,
          // Payment instructions
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

      // Get payment status from Paga
      const result = await pagaService.verifyPayment(reference);

      // Check if payment was successful
      if (result.isPaid) {
        // TODO: Update donation record in database
        // await Donation.update(
        //   { status: 'completed', paidAt: new Date() },
        //   { where: { reference } }
        // );

        // TODO: Send thank you email
        // await emailService.sendDonationThankYou(result.data.email, result.amount);

        res.json({
          success: true,
          message: "Payment verified successfully",
          isPaid: true,
          data: result.data,
        });
      } else {
        res.json({
          success: false,
          message: "Payment not completed yet",
          isPaid: false,
          status: result.status,
        });
      }
    } catch (error) {
      console.error("Verify payment error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to verify payment",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
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

      // TODO: Save to database
      // await Donation.create({
      //   reference,
      //   amount,
      //   email,
      //   donorName,
      //   paymentMethod: 'bank_transfer',
      //   status: 'pending_confirmation',
      // });

      // TODO: Send admin notification
      // await emailService.sendBankTransferNotification({
      //   amount,
      //   email,
      //   donorName,
      //   reference
      // });

      res.json({
        success: true,
        message:
          "Bank transfer recorded. We will confirm and send you a receipt.",
        data: { reference },
      });
    } catch (error) {
      console.error("Record bank transfer error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to record bank transfer",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Get donation by reference
  async getDonation(req, res) {
    try {
      const { reference } = req.params;

      // TODO: Get from database
      // const donation = await Donation.findOne({ where: { reference } });

      res.json({
        success: true,
        data: {
          reference,
          // ...donation
        },
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