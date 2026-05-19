const express = require("express");
const router = express.Router();
const db = require("../config/database"); // 👈 updated path

router.post("/paga", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    // 1. Parse the payload from Paga
    const event = JSON.parse(req.body);
    console.log("📩 Paga Webhook received:", JSON.stringify(event, null, 2));

    const {
      referenceNumber,
      transactionId,
      status,
      amount,
    } = event;

    if (!referenceNumber) {
      return res.status(400).json({ message: "No reference number in payload" });
    }

    if (status === "SUCCESS") {
      // 2. Update the donations table
      await db.query(
        `UPDATE donations 
         SET 
           payment_status = 'success',
           paga_transaction_id = $1,
           completed_at = NOW(),
           updated_at = NOW()
         WHERE reference = $2`,
        [transactionId || null, referenceNumber]
      );

      console.log(`✅ Donation ${referenceNumber} marked as success`);

    } else if (status === "FAILED" || status === "CANCELLED") {
      // 3. Mark as failed or cancelled
      await db.query(
        `UPDATE donations 
         SET 
           payment_status = $1,
           updated_at = NOW()
         WHERE reference = $2`,
        [status.toLowerCase(), referenceNumber]
      );

      console.log(`❌ Donation ${referenceNumber} marked as ${status.toLowerCase()}`);
    }

    // 4. Always return 200 immediately so Paga stops retrying
    res.status(200).json({ message: "Webhook received" });

  } catch (error) {
    console.error("Webhook error:", error);
    // Still return 200 so Paga doesn't keep retrying
    res.status(200).json({ message: "Received" });
  }
});

module.exports = router;