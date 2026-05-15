import { useState, useEffect, startTransition } from "react";
import {
  sanitizeInput,
  sanitizeName,
  isValidEmail,
  isValidAmount,
} from "@/utils/sanitize";
import {
  X,
  Heart,
  CreditCard,
  Building2,
  CheckCircle2,
  Copy,
  Check,
  ArrowLeft,
  Wallet,
  Phone,
  User,
  Mail,
  ArrowRight,
} from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";
import { TbCurrencyNaira } from "react-icons/tb";
import { trackButtonClick, trackDonation } from "@/utils/analytics";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedAmount?: number | null;
}

interface PagaData {
  reference: string;
  paymentUrl?: string;
  accountNumber?: string; // FIXED: Added missing property
  amount: number;
  currency: string;
  status?: string;
}

export const DonationModal = ({
  isOpen,
  onClose,
  preselectedAmount,
}: DonationModalProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
  "paypal" | "paga" | "bank" | null
>(null);
  const [step, setStep] = useState<
    | "amount"
    | "method"
    | "processing"
    | "paga-instructions"
    | "success"
    | "error"
  >("amount");
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [donationReference] = useState(
    () => `GRC-DON-${Date.now().toString().slice(-8)}`,
  );
  const [donorEmail, setDonorEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [donorName, setDonorName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pagaData, setPagaData] = useState<PagaData | null>(null);

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-NG").format(amount);

  const donationAmounts = [50000, 250000, 1000000, 10000000];

  const bankDetails = {
    accountName: "The Graduate Research Clinic",
    accountNumber: "2043971459",
    bankName: "Pagatech Limited (PAGA)",
  };

  // Reset and sync with preselected amount
  useEffect(() => {
    if (isOpen) {
      if (preselectedAmount) {
        startTransition(() => {
          setSelectedAmount(preselectedAmount);
          setCustomAmount("");
          setStep("method");
          setPaymentMethod(null);
        });
      } else {
        startTransition(() => {
          setStep("amount");
          setPaymentMethod(null);
        });
      }
    }
  }, [isOpen, preselectedAmount]);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    const numValue = value.replace(/[^\d]/g, "");
    const amount = Number(numValue);

    if (amount > 100000000) {
      alert("Amount cannot exceed ₦100,000,000");
      return;
    }

    setCustomAmount(numValue);
    setSelectedAmount(null);
  };

  const handleEmailChange = (value: string) => {
    const sanitized = sanitizeInput(value);
    setDonorEmail(sanitized);
  };

  const handleNameChange = (value: string) => {
    const sanitized = sanitizeName(value);
    setDonorName(sanitized);
  };

  const handlePhoneChange = (value: string) => {
    const sanitized = value.replace(/[^\d]/g, "").slice(0, 11);
    setPhoneNumber(sanitized);
  };

  const validateBeforePayment = () => {
    if (!donorName || donorName.length < 2) {
      setErrorMessage("Please enter a valid name");
      return false;
    }

    if (!isValidEmail(donorEmail)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    if (!isValidAmount(getCurrentAmount())) {
      setErrorMessage("Please enter a valid donation amount");
      return false;
    }

    if (paymentMethod === "paga") {
      if (!phoneNumber || phoneNumber.length < 10) {
        setErrorMessage("Please enter a valid phone number (10-11 digits)");
        return false;
      }
    }

    setErrorMessage("");
    return true;
  };

  const getCurrentAmount = () => {
    return selectedAmount || Number(customAmount) || 0;
  };

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(field);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handlePagaPayment = async () => {
    if (!validateBeforePayment()) {
      return;
    }

    setStep("processing");
    setErrorMessage("");

    try {
      const response = await fetch(API_ENDPOINTS.DONATION_INITIALIZE_PAGA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: getCurrentAmount(),
          email: donorEmail,
          phoneNumber: phoneNumber,
          donorName: donorName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPagaData(data.data);
        trackDonation(getCurrentAmount(), "paga");

        // If there's a payment URL, you can either redirect or show instructions
        // For now, we'll show instructions
        setStep("paga-instructions");
      } else {
        setErrorMessage(data.message || "Payment initialization failed");
        setStep("error");
      }
    } catch (error) {
      console.error("Paga payment error:", error);
      setErrorMessage(
        "Network error. Please check your connection and try again.",
      );
      setStep("error");
    }
  };

  const handlePayPalPayment = () => {
    const amount = getCurrentAmount();
    setStep("processing");

    setTimeout(() => {
      window.open(
        `https://www.paypal.com/donate?hosted_button_id=YOUR_PAYPAL_BUTTON_ID&amount=${amount}&currency_code=NGN`,
        "_blank",
      );
      setStep("success");
    }, 1000);
  };

  const handleBankTransferConfirm = async () => {
    if (!validateBeforePayment()) {
      return;
    }

    setStep("processing");
    setErrorMessage("");

    try {
      const response = await fetch(API_ENDPOINTS.DONATION_BANK_TRANSFER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: getCurrentAmount(),
          email: donorEmail,
          donorName: donorName,
          reference: donationReference,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStep("success");
      } else {
        setErrorMessage(data.message || "Failed to record transfer");
        setStep("error");
      }
    } catch (error) {
      console.error("Bank transfer error:", error);
      setErrorMessage("Network error. Please try again.");
      setStep("error");
    }
  };

  const resetModal = () => {
    setStep("amount");
    setSelectedAmount(null);
    setCustomAmount("");
    setPaymentMethod(null);
    setDonorEmail("");
    setDonorName("");
    setPhoneNumber("");
    setErrorMessage("");
    setPagaData(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleBackButton = () => {
    if (step === "method" && !preselectedAmount) {
      setStep("amount");
      setPaymentMethod(null);
    } else if (step === "method" && preselectedAmount) {
      handleClose();
    } else if (step === "error" || step === "paga-instructions") {
      setStep("method");
      setErrorMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto animate-slideUp">
          {/* Header - FIXED: Changed bg-linear-to-r to bg-linear-to-r */}
          <div className="bg-linear-to-r from-[#95111c] to-[#7a0e16] p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8" fill="currentColor" />
                <div>
                  <h2 className="text-2xl font-bold">Make a Donation</h2>
                  <p className="text-white/90 text-sm">
                    Support African scholars
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Step 1: Select Amount */}
            {step === "amount" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Select Donation Amount
                  </h3>
                  <p className="text-gray-600">
                    Choose an amount or enter a custom value
                  </p>
                </div>

                {/* Preset Amounts */}
                <div className="grid grid-cols-2 gap-4">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedAmount === amount
                          ? "border-[#95111c] bg-[#95111c] text-white shadow-lg scale-105"
                          : "border-gray-200 hover:border-[#95111c] hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                        <TbCurrencyNaira className="w-6 h-6 sm:w-7 sm:h-7 " />
                        {formatAmount(amount)}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or enter custom amount
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <TbCurrencyNaira />
                    </div>
                    <input
                      type="text"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#95111c] focus:outline-none text-lg"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep("method")}
                  disabled={getCurrentAmount() === 0}
                  className="w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold py-4 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue - ₦{formatAmount(getCurrentAmount())}
                </button>
              </div>
            )}

            {/* Step 2: Select Payment Method */}
            {step === "method" && (
              <div className="space-y-6">
                <div>
                  <button
                    onClick={handleBackButton}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Choose Payment Method
                  </h3>
                  <div className="flex items-center gap-1 text-[#95111c] font-semibold">
                    <TbCurrencyNaira className="w-5 h-5 sm:w-6 sm:h-6 " />
                    <span className="text-2xl">
                      {formatAmount(getCurrentAmount())}
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{errorMessage}</p>
                  </div>
                )}

                {/* Donor Information */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900">
                    Your Information
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={donorName}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#95111c] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={donorEmail}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        placeholder="john@example.com"
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#95111c] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone number field - only show if Paga is selected */}
                  {paymentMethod === "paga" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number (Paga Account){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder="08012345678"
                          required
                          maxLength={11}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#95111c] focus:outline-none"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Enter your 11-digit Nigerian phone number registered
                        with Paga
                      </p>
                    </div>
                  )}
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  {/* Paga */}
                  <button
                    onClick={() => setPaymentMethod("paga")}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === "paga"
                        ? "border-[#95111c] bg-red-50"
                        : "border-gray-200 hover:border-[#95111c]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#95111c] rounded-lg flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          Paga Payment
                        </div>
                        <div className="text-sm text-gray-600">
                          Secure payment via Paga Nigeria
                        </div>
                      </div>
                      {paymentMethod === "paga" && (
                        <CheckCircle2 className="w-6 h-6 text-[#95111c]" />
                      )}
                    </div>
                  </button>

                  {/* PayPal */}
                  <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === "paypal"
                        ? "border-[#95111c] bg-blue-50"
                        : "border-gray-200 hover:border-[#95111c]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          PayPal
                        </div>
                        <div className="text-sm text-gray-600">
                          For international donors
                        </div>
                      </div>
                      {paymentMethod === "paypal" && (
                        <CheckCircle2 className="w-6 h-6 text-[#95111c]" />
                      )}
                    </div>
                  </button>

                  {/* Bank Transfer */}
                  <button
                    onClick={() => setPaymentMethod("bank")}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === "bank"
                        ? "border-[#95111c] bg-green-50"
                        : "border-gray-200 hover:border-[#95111c]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          Bank Transfer
                        </div>
                        <div className="text-sm text-gray-600">
                          Direct bank transfer (Manual)
                        </div>
                      </div>
                      {paymentMethod === "bank" && (
                        <CheckCircle2 className="w-6 h-6 text-[#95111c]" />
                      )}
                    </div>
                  </button>
                </div>

                {/* Bank Details (if bank transfer selected) */}
                {paymentMethod === "bank" && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-green-800 font-semibold">
                      <Building2 className="w-5 h-5" />
                      <span>Bank Account Details</span>
                    </div>
                    {Object.entries(bankDetails).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between bg-white p-3 rounded-lg"
                      >
                        <div>
                          <div className="text-xs text-gray-600 uppercase">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                          <div className="font-semibold text-gray-900">
                            {value}
                          </div>
                        </div>
                        <button
                          onClick={() => handleCopyToClipboard(value, key)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {copiedAccount === key ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : (
                            <Copy className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    ))}
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-xs text-gray-600 uppercase mb-1">
                        Reference
                      </div>
                      <div className="font-mono font-semibold text-[#95111c]">
                        {donationReference}
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
                        Please use this reference for your transfer
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => {
                    if (paymentMethod === "paga") {
                      trackButtonClick("Donate Now");

                      handlePagaPayment();
                    } else if (paymentMethod === "paypal") {
                      trackButtonClick("Donate Now");

                      handlePayPalPayment();
                    } else if (paymentMethod === "bank") {
                      trackButtonClick("Donate Now");

                      handleBankTransferConfirm();
                    }
                  }}
                  disabled={
                    !paymentMethod ||
                    !donorEmail ||
                    !donorName ||
                    (paymentMethod === "paga" && !phoneNumber)
                  }
                  className="w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {paymentMethod === "bank"
                    ? "I've Made the Transfer"
                    : "Proceed to Payment"}
                </button>
              </div>
            )}

            {/* Step 3: Processing */}
            {step === "processing" && (
              <div className="py-12 text-center">
                <div className="w-20 h-20 border-4 border-[#95111c] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Processing Payment...
                </h3>
                <p className="text-gray-600">
                  Please wait while we process your donation
                </p>
              </div>
            )}

            {/* Step 4: Paga Payment Instructions */}
            {step === "paga-instructions" && (
              <div className="space-y-6">
                <div>
                  <button
                    onClick={() => setStep("method")}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-[#95111c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wallet className="w-10 h-10 text-[#95111c]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Complete Payment on Paga
                    </h3>
                    <p className="text-gray-600">
                      Follow these steps to complete your ₦
                      {formatAmount(getCurrentAmount())} donation
                    </p>
                  </div>
                </div>

                {/* Payment Instructions - FIXED: Changed bg-linear-to-br to bg-linear-to-br */}
                <div className="bg-linear-to-br from-red-50 to-orange-50 border-2 border-[#95111c]/20 rounded-xl p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#95111c] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        Open Paga
                      </p>
                      <p className="text-sm text-gray-600">
                        Open your Paga mobile app or dial <strong>*242#</strong>{" "}
                        on your phone
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#95111c] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        Send Money
                      </p>
                      <p className="text-sm text-gray-600">
                        Select "Send Money" or "Pay Merchant"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#95111c] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        Enter Details
                      </p>
                      <div className="space-y-2 mt-2">
                        {pagaData?.accountNumber && (
                          <div className="bg-white p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">
                              Account Number
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold text-[#95111c]">
                                {pagaData.accountNumber}
                              </span>
                              <button
                                onClick={() =>
                                  handleCopyToClipboard(
                                    pagaData.accountNumber!,
                                    "account",
                                  )
                                }
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                {copiedAccount === "account" ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4 text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-xs text-gray-600 mb-1">
                            Merchant Name
                          </div>
                          <div className="font-semibold">
                            Graduate Research Clinic
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-xs text-gray-600 mb-1">
                            Amount
                          </div>
                          <div className="font-bold text-lg">
                            ₦{formatAmount(getCurrentAmount())}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#95111c] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      4
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        Use This Reference
                      </p>
                      <div className="bg-white p-3 rounded-lg mt-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-semibold text-[#95111c]">
                            {pagaData?.reference || donationReference}
                          </span>
                          <button
                            onClick={() =>
                              handleCopyToClipboard(
                                pagaData?.reference || donationReference,
                                "reference",
                              )
                            }
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            {copiedAccount === "reference" ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alternative: Use Paga Link */}
                {pagaData?.paymentUrl && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3">Or pay online:</p>
                    <a
                      href={pagaData.paymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold px-6 py-3 rounded-xl"
                    >
                      Open Paga Payment Page
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                )}

                {/* Confirmation Button */}
                <button
                  onClick={async () => {
  try {
    setStep("processing");
    console.log(getCurrentAmount())
    const reference = pagaData?.reference || donationReference;
    console.log(`${API_ENDPOINTS.DONATION_VERIFY}/${reference}`);
    const response = await fetch(API_ENDPOINTS.DONATION_VERIFY(reference), {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    reference,
    amount: getCurrentAmount(),
  }),
});

    const data = await response.json();
    console.log(data);

    if (data.success /*&& data.isPaid*/) {
      setStep("success");
    } else {
      setErrorMessage("Payment not confirmed yet. Please try again in a few seconds.");
      setStep("error");
    }
  } catch (err) {
    console.error(err);
    setErrorMessage("Verification failed. Please try again.");
    setStep("error");
  }
}}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl"
                >
                  I've Completed the Payment
                </button>

                <p className="text-xs text-center text-gray-600">
                  Once you complete the payment, we'll send you a confirmation
                  email within 24 hours.
                </p>
              </div>
            )}

            {/* Step 5: Error */}
            {step === "error" && (
              <div className="py-8 text-center space-y-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <X className="w-12 h-12 text-red-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Failed
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {errorMessage || "Something went wrong. Please try again."}
                  </p>
                </div>
                <button
                  onClick={handleBackButton}
                  className="w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold py-4 rounded-xl"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Step 6: Success */}
            {step === "success" && (
              <div className="py-8 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Your generous donation of{" "}
                    <span className="font-bold text-[#95111c]">
                      ₦{formatAmount(getCurrentAmount())}
                    </span>{" "}
                    has been received.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-mono font-semibold">
                      {donationReference}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">
                      ₦{formatAmount(getCurrentAmount())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold">{donorEmail}</span>
                  </div>
                </div>
                <p className="text-gray-600">
                  {paymentMethod === "bank"
                    ? "We'll confirm your bank transfer shortly and send you a receipt via email."
                    : "A confirmation email has been sent to your inbox."}
                </p>
                <div className="bg-[#95111c]/10 border-2 border-[#95111c]/20 rounded-xl p-6">
                  <p className="text-gray-700">
                    Your contribution helps empower African scholars and advance
                    research across the continent. Together, we're building a
                    brighter future!
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold py-4 rounded-xl"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

// import { useState, useEffect, startTransition } from "react";
// import {
//   sanitizeInput,
//   sanitizeName,
//   isValidEmail,
//   isValidAmount,
// } from "@/utils/sanitize";
// import {
//   X,
//   Heart,
//   Building2,
//   CheckCircle2,
//   Copy,
//   Check,
//   ArrowLeft,
// } from "lucide-react";
// import { TbCurrencyNaira } from "react-icons/tb";
// import { trackButtonClick } from "@/utils/analytics";

// interface DonationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   preselectedAmount?: number | null;
// }

// export const DonationModal = ({
//   isOpen,
//   onClose,
//   preselectedAmount,
// }: DonationModalProps) => {
//   const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
//   const [customAmount, setCustomAmount] = useState("");
//   const [step, setStep] = useState<"amount" | "bank-details">("amount");
//   const [copiedAccount, setCopiedAccount] = useState<string | null>(null);


//   const formatAmount = (amount: number) =>
//     new Intl.NumberFormat("en-NG").format(amount);

//   const donationAmounts = [50000, 250000, 1000000, 10000000];

//   const bankDetails = {
//     accountName: "The Graduate Research Clinic",
//     accountNumber: "2043971459",
//     bankName: "Pagatech Limited (PAGA)",
//   };

//   // Reset and sync with preselected amount
//   useEffect(() => {
//     if (isOpen) {
//       if (preselectedAmount) {
//         startTransition(() => {
//           setSelectedAmount(preselectedAmount);
//           setCustomAmount("");
//           setStep("bank-details");
//         });
//       } else {
//         startTransition(() => {
//           setStep("amount");
//         });
//       }
//     }
//   }, [isOpen, preselectedAmount]);

//   const handleAmountSelect = (amount: number) => {
//     setSelectedAmount(amount);
//     setCustomAmount("");
//   };

//   const handleCustomAmountChange = (value: string) => {
//     const numValue = value.replace(/[^\d]/g, "");
//     const amount = Number(numValue);

//     if (amount > 100000000) {
//       alert("Amount cannot exceed ₦100,000,000");
//       return;
//     }

//     setCustomAmount(numValue);
//     setSelectedAmount(null);
//   };

//   const getCurrentAmount = () => {
//     return selectedAmount || Number(customAmount) || 0;
//   };

//   const handleCopyToClipboard = (text: string, field: string) => {
//     navigator.clipboard.writeText(text);
//     setCopiedAccount(field);
//     setTimeout(() => setCopiedAccount(null), 2000);
//   };

//   const resetModal = () => {
//     setStep("amount");
//     setSelectedAmount(null);
//     setCustomAmount("");
//     setCopiedAccount(null);
//   };

//   const handleClose = () => {
//     resetModal();
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         onClick={handleClose}
//         className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
//       />

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto animate-slideUp">
//           {/* Header */}
//           <div className="bg-linear-to-r from-[#95111c] to-[#7a0e16] p-6 text-white">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Heart className="w-8 h-8" fill="currentColor" />
//                 <div>
//                   <h2 className="text-2xl font-bold">Make a Donation</h2>
//                   <p className="text-white/90 text-sm">
//                     Support African scholars
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleClose}
//                 className="p-2 hover:bg-white/20 rounded-full transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
//             {/* Step 1: Select Amount */}
//             {step === "amount" && (
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">
//                     Select Donation Amount
//                   </h3>
//                   <p className="text-gray-600">
//                     Choose an amount or enter a custom value
//                   </p>
//                 </div>

//                 {/* Preset Amounts */}
//                 <div className="grid grid-cols-2 gap-4">
//                   {donationAmounts.map((amount) => (
//                     <button
//                       key={amount}
//                       onClick={() => handleAmountSelect(amount)}
//                       className={`p-4 rounded-xl border-2 transition-all ${
//                         selectedAmount === amount
//                           ? "border-[#95111c] bg-[#95111c] text-white shadow-lg scale-105"
//                           : "border-gray-200 hover:border-[#95111c] hover:shadow-md"
//                       }`}
//                     >
//                       <div className="flex items-center justify-center gap-1 text-2xl font-bold">
//                         <TbCurrencyNaira className="w-6 h-6 sm:w-7 sm:h-7" />
//                         {formatAmount(amount)}
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 {/* Custom Amount */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Or enter custom amount
//                   </label>
//                   <div className="relative">
//                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//                       <TbCurrencyNaira />
//                     </div>
//                     <input
//                       type="text"
//                       value={customAmount}
//                       onChange={(e) => handleCustomAmountChange(e.target.value)}
//                       placeholder="Enter amount"
//                       className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#95111c] focus:outline-none text-lg"
//                     />
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => {
//                     trackButtonClick("Continue Donation");
//                     setStep("bank-details");
//                   }}
//                   disabled={getCurrentAmount() === 0}
//                   className="w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold py-4 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   Continue - ₦{formatAmount(getCurrentAmount())}
//                 </button>
//               </div>
//             )}

//             {/* Step 2: Bank Transfer Details */}
//             {step === "bank-details" && (
//               <div className="space-y-6">
//                 {/* Back button (only if no preselected amount) */}
//                 {!preselectedAmount && (
//                   <button
//                     onClick={() => setStep("amount")}
//                     className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
//                   >
//                     <ArrowLeft className="w-4 h-4" />
//                     Back
//                   </button>
//                 )}

//                 {/* Amount Summary */}
//                 <div className="text-center bg-gray-50 rounded-xl p-4">
//                   <p className="text-sm text-gray-500 mb-1">Donation Amount</p>
//                   <div className="flex items-center justify-center gap-1 text-[#95111c] font-bold text-3xl">
//                     <TbCurrencyNaira className="w-7 h-7" />
//                     {formatAmount(getCurrentAmount())}
//                   </div>
//                 </div>

//                 {/* Bank Details */}
//                 <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 space-y-3">
//                   <div className="flex items-center gap-2 text-green-800 font-semibold mb-1">
//                     <Building2 className="w-5 h-5" />
//                     <span>Bank Account Details</span>
//                   </div>

//                   {Object.entries(bankDetails).map(([key, value]) => (
//                     <div
//                       key={key}
//                       className="flex items-center justify-between bg-white p-3 rounded-lg"
//                     >
//                       <div>
//                         <div className="text-xs text-gray-500 uppercase tracking-wide">
//                           {key.replace(/([A-Z])/g, " $1").trim()}
//                         </div>
//                         <div className="font-semibold text-gray-900">
//                           {value}
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => handleCopyToClipboard(value, key)}
//                         className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                       >
//                         {copiedAccount === key ? (
//                           <Check className="w-5 h-5 text-green-600" />
//                         ) : (
//                           <Copy className="w-5 h-5 text-gray-400" />
//                         )}
//                       </button>
//                     </div>
//                   ))}


//                 </div>

//                 {/* Info note */}
//                 <div className="bg-[#95111c]/5 border border-[#95111c]/20 rounded-xl p-4">
//                   <div className="flex items-start gap-3">
//                     <CheckCircle2 className="w-5 h-5 text-[#95111c] shrink-0 mt-0.5" />
//                     <p className="text-sm text-gray-700">
//                       After completing your transfer, we'll confirm and send you
//                       a receipt within 24 hours. Thank you for supporting
//                       African scholars!
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleClose}
//                   className="w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold py-4 rounded-xl"
//                 >
//                   Done
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes slideUp {
//           from { 
//             opacity: 0;
//             transform: translateY(20px) scale(0.95);
//           }
//           to { 
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
        
//         .animate-slideUp {
//           animation: slideUp 0.3s ease-out;
//         }
//       `}</style>
//     </>
//   );
// };