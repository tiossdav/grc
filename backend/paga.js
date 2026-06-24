require("dotenv").config();
const PagaCollectClient = require("paga-collect");

const isTest = process.env.PAGA_TEST === "true" || process.env.NODE_ENV !== "production";

const pagaClient = new PagaCollectClient()
  .setClientId(process.env.PAGA_PRINCIPAL)
  .setPassword(process.env.PAGA_CREDENTIALS)
  .setApiKey(process.env.PAGA_HMAC_KEY)
  .setTest(isTest)
  .build();

module.exports = pagaClient;