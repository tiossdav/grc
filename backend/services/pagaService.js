const pagaClient = require("../paga");

class PagaService {
  // Initialize payment request
  async initializePayment({ amount, email, phoneNumber, reference, donorName }) {
    try {
      const response = await pagaClient.paymentRequest({
        referenceNumber: reference,
        amount,
        currency: "NGN",
        payer: {
          email,
          name: donorName || "Anonymous",
          phoneNumber,
          bankId: null,
        },
        payee: {
          name: "The Graduate Research Clinic",
          accountNumber: "2043971459",
          phoneNumber: null,
          bankId: null,
          bankAccountNumber: null,
          financialIdentificationNumber: null,
        },
        callBackUrl: (process.env.PAGA_CALLBACK_URL || "https://graduateresearchclinic.org/webhook/paga").trim(),
        isSuppressMessages: false,
        payerCollectionFeeShare: 1,
        payeeCollectionFeeShare: 0,
        isAllowPartialPayments: false,
        paymentMethods: null,
        displayBankDetailToPayer: true,
      });

      console.log("Paga Response:", JSON.stringify(response, null, 2));

      // Paga SDK wraps response as: { error: bool, response: { statusCode, statusMessage, ... } }
      const pagaBody = response?.response || response;
      const statusCode = String(pagaBody?.statusCode ?? pagaBody?.responseCode ?? "");
      const isSuccess = !response.error && (statusCode === "0");

      if (isSuccess) {
        return {
          success: true,
          data: pagaBody,
        };
      } else {
        const errMsg = pagaBody?.statusMessage || pagaBody?.responseMessage || "Payment initialization failed";
        console.error(`❌ Paga rejected request — statusCode: ${statusCode}, message: ${errMsg}`);
        throw new Error(`Paga error [${statusCode}]: ${errMsg}`);
      }
    } catch (error) {
      console.error("Paga initialization error:", error.message);
      throw new Error(error.message || "Payment initialization failed");
    }
  }
}

module.exports = new PagaService();