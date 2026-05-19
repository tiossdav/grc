require("dotenv").config();
const PagaCollectClient = require("paga-collect");

const pagaClient = new PagaCollectClient()
  .setClientId(process.env.PAGA_PRINCIPAL)
  .setPassword(process.env.PAGA_CREDENTIALS)
  .setApiKey(process.env.PAGA_HMAC_KEY)
  .setTest(false) // 👈 false = live mode since this is production
  .build();

module.exports = pagaClient;