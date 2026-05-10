const axios = require("axios");
const crypto = require("crypto");

class PagaService {
  constructor() {
    this.principal = process.env.PAGA_PRINCIPAL;
    this.credentials = process.env.PAGA_CREDENTIALS;
    this.hmacKey = process.env.PAGA_HMAC_KEY;
    this.baseUrl =
      process.env.PAGA_BASE_URL || "https://beta.mypaga.com/paga-webservices";
  }

  // Generate HMAC hash for request authentication
  generateHash(requestBody) {
    const message = JSON.stringify(requestBody);
    return crypto
      .createHmac("sha512", this.hmacKey)
      .update(message)
      .digest("hex");
  }

  // Initialize payment (Register Persistent Payment Account)
  async initializePayment({ amount, email, reference, phoneNumber }) {
    try {
      const requestData = {
        referenceNumber: reference,
        phoneNumber: phoneNumber || email, // Paga uses phone numbers
        accountName: "Graduate Research Clinic Donation",
        firstName: "Donor",
        lastName: "User",
        email: email,
        accountReference: reference,
        financialIdentificationNumber: this.credentials,
        callbackUrl: `${process.env.FRONTEND_URL}/donation/verify?reference=${reference}`,
      };

      const hash = this.generateHash(requestData);

      console.log("Paga Request:", {
        url: `${this.baseUrl}/merchant-rest/secured/registerPersistentPaymentAccount`,
        headers: {
          principal: this.principal,
          credentials: this.credentials,
        },
        data: requestData,
      });

      const response = await axios.post(
        `${this.baseUrl}/merchant-rest/secured/registerPersistentPaymentAccount`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            principal: this.principal,
            credentials: this.credentials,
            hash: hash,
          },
        },
      );

      console.log("Paga Response:", response.data);

      return {
        success: true,
        data: response.data,
        // Construct payment URL
        paymentUrl: response.data.merchantPublicId
          ? `https://www.mypaga.com/paga-webservices/customer-payment/${response.data.merchantPublicId}/${response.data.accountNumber}`
          : null,
      };
    } catch (error) {
      console.error("Paga initialization error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw new Error(
        error.response?.data?.errorMessage || "Payment initialization failed",
      );
    }
  }

  // Get transaction details
  async getTransactionDetails(referenceNumber) {
    try {
      const requestData = {
        referenceNumber,
        merchantAccount: this.credentials,
      };

      const hash = this.generateHash(requestData);
      const response = await axios.post(
        `${this.baseUrl}/merchant-rest/secured/getTransactionDetails`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            principal: this.principal,
            credentials: this.credentials,
            hash: hash,
          },
        },
      );
      console.log("Verified")
      console.log(response)
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(
        "Paga get transaction error:",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  // Verify payment status
  async verifyPayment(referenceNumber) {
    try {
      const result = await this.getTransactionDetails(referenceNumber);

      return {
        success: true,
        isPaid:
          result.data.status === "SUCCESS" ||
          result.data.status === "SUCCESSFUL",
        status: result.data.status,
        amount: result.data.amount,
        data: result.data,
      };
    } catch (error) {
      console.error(
        "Paga verification error:",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  // Alternative: Money Transfer (Direct Payment)
  async makePayment({ amount, email, reference, phoneNumber }) {
    try {
      const requestData = {
        referenceNumber: reference,
        amount: parseFloat(amount),
        currency: "NGN",
        destinationAccount: phoneNumber,
        transferReference: reference,
        merchantAccount: this.credentials,
        merchantCustomerReference: email,
        merchantServiceProductCode: "DONATION",
      };

      const hash = this.generateHash(requestData);

      const response = await axios.post(
        `${this.baseUrl}/merchant-rest/secured/moneyTransfer`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            principal: this.principal,
            credentials: this.credentials,
            hash: hash,
          },
        },
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(
        "Paga payment error:",
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}

module.exports = new PagaService();
