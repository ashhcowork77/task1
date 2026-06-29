import { EMICalculator } from '@/components/EMICalculator';
import { Calculator } from 'lucide-react';

export const metadata = {
  title: 'EMI Calculator | Real Estate Tools',
  description: 'Calculate your monthly mortgage payments with our easy-to-use EMI calculator.',
};

export default function EMICalculatorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#A1834C]/10 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-[#A1834C]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            EMI Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your home loan monthly payments
          </p>
        </div>

        {/* Calculator Component */}
        <EMICalculator />

        {/* Info Section */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
          <h2 className="font-semibold text-gray-900 mb-3">How EMI Works</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <strong>EMI (Equated Monthly Installment)</strong> is the fixed payment you make to repay your loan.
            </li>
            <li>
              <strong>Principal:</strong> The actual amount borrowed from the bank.
            </li>
            <li>
              <strong>Interest:</strong> The cost of borrowing, charged by the bank.
            </li>
            <li>
              <strong>Tenure:</strong> Longer tenure = lower EMI but higher total interest.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
