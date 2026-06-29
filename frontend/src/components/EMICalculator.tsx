'use client';

import { useState, useCallback, useMemo } from 'react';
import { Calculator, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EMICalculatorProps {
  initialPropertyPrice?: number;
  className?: string;
}

/**
 * EMI Calculator Component
 * Calculates monthly mortgage payments based on:
 * - Principal loan amount (property price)
 * - Interest rate (annual)
 * - Loan tenure (in years)
 *
 * Formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
 */
export function EMICalculator({ initialPropertyPrice = 5000000, className }: EMICalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState(initialPropertyPrice.toString());
  const [downPaymentPercent, setDownPaymentPercent] = useState('20');
  const [interestRate, setInterestRate] = useState('8.5');
  const [tenureYears, setTenureYears] = useState('20');
  const [showDetails, setShowDetails] = useState(false);

  const calculations = useMemo(() => {
    const price = parseFloat(propertyPrice) || 0;
    const downPayment = parseFloat(downPaymentPercent) || 0;
    const rate = parseFloat(interestRate) / 100 / 12 || 0; // Monthly rate
    const tenure = (parseFloat(tenureYears) || 1) * 12 || 12; // Months

    const principal = price * (1 - downPayment / 100);
    const emi = rate === 0 || tenure === 0 ? 0 :
      (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);

    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - principal;

    return {
      principal,
      downPaymentAmount: price * (downPayment / 100),
      emi,
      totalPayment,
      totalInterest,
      tenure,
    };
  }, [propertyPrice, downPaymentPercent, interestRate, tenureYears]);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  }, []);

  const tenureOptions = [5, 10, 15, 20, 25, 30];

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-[#A1834C]" />
        <h3 className="text-lg font-semibold text-gray-900">EMI Calculator</h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="ml-auto text-sm text-[#A1834C] hover:text-[#8a6d3f]"
        >
          {showDetails ? 'Hide' : 'Show'} details
        </button>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        {/* Property Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
            <input
              type="number"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A1834C] focus:border-transparent outline-none"
              min="0"
            />
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Down Payment: {downPaymentPercent}% ({formatCurrency(calculations.downPaymentAmount)})
          </label>
          <input
            type="range"
            min="10"
            max="80"
            step="5"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(e.target.value)}
            className="w-full accent-[#A1834C]"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10%</span>
            <span>80%</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (% per annum)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A1834C] focus:border-transparent outline-none"
            min="0"
            step="0.1"
          />
        </div>

        {/* Tenure */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Tenure
          </label>
          <div className="flex flex-wrap gap-2">
            {tenureOptions.map((years) => (
              <button
                key={years}
                onClick={() => setTenureYears(years.toString())}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  tenureYears === years.toString()
                    ? 'bg-[#A1834C] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {years} yr
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#A1834C]/10 to-[#A1834C]/5 rounded-xl">
        <p className="text-sm text-gray-600 mb-1">Your Monthly EMI</p>
        <p className="text-3xl font-bold text-gray-900">
          {formatCurrency(calculations.emi)}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          for {parseInt(tenureYears)} years at {interestRate}% p.a.
        </p>
      </div>

      {/* Details */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Loan Amount</span>
            <span className="font-medium">{formatCurrency(calculations.principal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Interest</span>
            <span className="font-medium">{formatCurrency(calculations.totalInterest)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Payment</span>
            <span className="font-medium">{formatCurrency(calculations.totalPayment)}</span>
          </div>
        </div>
      )}

      {/* Info Note */}
      <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          EMI calculated using standard formula. Actual EMI may vary based on bank policies,
          processing fees, and interest type (fixed/floating).
        </p>
      </div>
    </div>
  );
}
