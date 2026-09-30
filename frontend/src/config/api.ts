// Detect environment & API URL
// Prioritize VITE_API_URL from environment (.env, .env.production, etc.)
const envApiUrl = import.meta.env.VITE_API_URL?.trim();

export const API_BASE_URL = envApiUrl
  ? envApiUrl.replace(/\/+$/, "")
  : import.meta.env.PROD
  ? "https://graduateresearchclinic.org"
  : "http://localhost:5000";

export const API_ENDPOINTS = {
  // Newsletter
  NEWSLETTER_SUBSCRIBE: `${API_BASE_URL}/api/newsletter/subscribe`,
  NEWSLETTER_UNSUBSCRIBE: `${API_BASE_URL}/api/newsletter/unsubscribe`,

  // Donations
  DONATION_INITIALIZE_PAGA: `${API_BASE_URL}/api/donations/initialize-paga`,
  DONATION_VERIFY: (reference: string) =>
    `${API_BASE_URL}/api/donations/verify-payment/${reference}`,
  DONATION_BANK_TRANSFER: `${API_BASE_URL}/api/donations/bank-transfer`,
  DONATION_GET: (reference: string) =>
    `${API_BASE_URL}/api/donations/${reference}`,

  // Health
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;
