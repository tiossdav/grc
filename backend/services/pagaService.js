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
        callBackUrl: "https://graduateresearchclinic.org/webhook/paga",
        isSuppressMessages: false,
        payerCollectionFeeShare: 1,
        payeeCollectionFeeShare: 0,
        isAllowPartialPayments: false,
        paymentMethods: null,
        displayBankDetailToPayer: true,
      });

      console.log("Paga Response:", response);

      if (response.responseCode === 0) {
        return {
          success: true,
          data: response,
        };
      } else {
        throw new Error(response.responseMessage || "Payment initialization failed");
      }
    } catch (error) {
      console.error("Paga initialization error:", error.message);
      throw new Error(error.message || "Payment initialization failed");
    }
  }
}

module.exports = new PagaService();