import React, { useState } from "react";

interface CalculationResult {
  totalCost: number;
  monthlyRepayment: number;
}

export default function LoanCalculator(): React.ReactElement {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [term, setTerm] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<string>("");
  const [upfrontFees, setUpfrontFees] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateRepayments = (): void => {
    const principal = parseFloat(loanAmount.replace(/,/g, ""));
    const fees = parseFloat(upfrontFees.replace(/,/g, ""));
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const numberOfPayments = term * 12;

    if (isNaN(principal) || isNaN(rate) || isNaN(numberOfPayments)) {
      return;
    }

    // Calculate monthly payment using amortization formula
    const monthlyPayment =
      (principal * rate * Math.pow(1 + rate, numberOfPayments)) /
      (Math.pow(1 + rate, numberOfPayments) - 1);

    const totalPayments = monthlyPayment * numberOfPayments;
    const totalCost = totalPayments + fees;

    setResult({
      totalCost: totalCost,
      monthlyRepayment: monthlyPayment,
    });
  };

  const formatCurrency = (value: number): string => {
    return `£${value.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleLoanAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setLoanAmount(value);
  };

  const handleUpfrontFeesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setUpfrontFees(value);
  };

  const handleInterestRateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setInterestRate(value);
  };

  return (
    <div className="py-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-indigo-900 mb-8">
          Find out how much your loan could cost
        </h1>

        <div className="space-y-6">
          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-2">
              Enter loan amount
            </label>
            <input
              type="text"
              value={`£${loanAmount}`}
              onChange={handleLoanAmountChange}
              placeholder="£100000.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Term Slider */}
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-2">
              Term
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="30"
                value={term}
                onChange={(e) => setTerm(parseInt(e.target.value))}
                className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <span className="text-lg font-semibold text-indigo-900 min-w-[100px] text-right">
                {term} years
              </span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-2">
              Enter interest rate
            </label>
            <p className="text-xs text-gray-600 italic mb-2">
              This rate is subject to change depending on your specific
              circumstances
            </p>
            <input
              type="text"
              value={`${interestRate}%`}
              onChange={handleInterestRateChange}
              placeholder="6.5%"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Upfront Fees */}
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-2">
              Enter upfront fees
            </label>
            <p className="text-xs text-gray-600 italic mb-2">
              Fees are variable and maybe charged as a % of borrowing or as a
              fixed fee. If you are unsure you can leave this box blank but
              remember to check what fees you might be expected to pay.
            </p>
            <input
              type="text"
              value={`£${upfrontFees}`}
              onChange={handleUpfrontFeesChange}
              placeholder="£10000.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Calculate Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={calculateRepayments}
              className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Calculate repayments
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="pt-6 space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <div>
                  <p className="text-sm font-semibold text-indigo-900">
                    Total cost of social investment
                  </p>
                  <p className="text-xs text-gray-600 italic">
                    Includes capital repayment, interest and fees
                  </p>
                </div>
                <p className="text-3xl font-bold text-indigo-900">
                  {formatCurrency(result.totalCost)}
                </p>
              </div>

              <div className="flex justify-between items-center py-4">
                <p className="text-sm font-semibold text-indigo-900">
                  Monthly repayments
                </p>
                <p className="text-3xl font-bold text-indigo-900">
                  {formatCurrency(result.monthlyRepayment)}
                </p>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 italic mb-3">
              This website and calculator are designed as an educational tool
              only, and is not intended to constitute investment, legal, tax or
              other professional advice.
            </p>
            <p className="text-xs text-gray-600 italic mb-3">
              Nothing on this page or on this website should be construed as a
              solicitation or offer, or recommendation to acquire or dispose of
              any investment or to engage in any other transaction, or to
              provide or obtain any investment advice or service.
            </p>
            <p className="text-xs text-gray-600 italic">
              No guarantee, representation or warranty of any kind is given as
              to the accuracy, timeliness or completeness of the information and
              we do not accept any responsibility for any errors or omissions in
              this information or any of the information on the websites of such
              service providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
