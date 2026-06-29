import { AreaConverter } from '@/components/AreaConverter';
import { Calculator } from 'lucide-react';

export const metadata = {
  title: 'Area Unit Converter | Real Estate Tools',
  description: 'Convert between sq ft, sq m, Guntha, Acre, and Marla - essential tools for real estate professionals.',
};

export default function AreaConverterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#A1834C]/10 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-[#A1834C]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Area Unit Converter
          </h1>
          <p className="text-gray-600">
            Convert between common Indian land measurement units
          </p>
        </div>

        {/* Converter Component */}
        <AreaConverter showAllUnits />

        {/* Info Section */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
          <h2 className="font-semibold text-gray-900 mb-3">About Land Units in India</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <strong>Square Feet (sq ft):</strong> Most common for residential properties
            </li>
            <li>
              <strong>Square Meters (sq m):</strong> Standard metric unit
            </li>
            <li>
              <strong>Guntha:</strong> Used in Maharashtra, 1 Guntha = 1,089 sq ft
            </li>
            <li>
              <strong>Marla:</strong> Common in North India, 1 Marla = 272.25 sq ft
            </li>
            <li>
              <strong>Acre:</strong> Used for larger plots, 1 Acre = 43,560 sq ft
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
