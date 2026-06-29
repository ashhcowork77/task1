'use client';

import { useState, useCallback } from 'react';
import { ArrowLeftRight, Calculator } from 'lucide-react';
import { convertArea, convertToAllUnits, formatArea, getAreaUnits, type AreaUnit } from '@/lib/units';
import { cn } from '@/lib/utils';

interface AreaConverterProps {
  initialValue?: number;
  initialUnit?: AreaUnit;
  showAllUnits?: boolean;
  className?: string;
}

export function AreaConverter({
  initialValue = 1000,
  initialUnit = 'sqft',
  showAllUnits = false,
  className,
}: AreaConverterProps) {
  const [value, setValue] = useState(initialValue.toString());
  const [fromUnit, setFromUnit] = useState<AreaUnit>(initialUnit);
  const [toUnit, setToUnit] = useState<AreaUnit>('sqm');
  const [allConversions, setAllConversions] = useState(false);

  const numericValue = parseFloat(value) || 0;
  const units = getAreaUnits();

  const handleSwap = useCallback(() => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }, [fromUnit, toUnit]);

  const convertedValue = convertArea(numericValue, fromUnit, toUnit);
  const allUnits = convertToAllUnits(numericValue, fromUnit);

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-[#A1834C]" />
        <h3 className="text-lg font-semibold text-gray-900">Area Unit Converter</h3>
      </div>

      {/* Input Section */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A1834C] focus:border-transparent outline-none text-gray-900"
            placeholder="Enter area"
            min="0"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as AreaUnit)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A1834C] focus:border-transparent outline-none text-gray-900 bg-white min-w-[100px]"
          >
            {units.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          className="mx-auto flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
          title="Swap units"
        >
          <ArrowLeftRight className="w-4 h-4 text-gray-600" />
        </button>

        {/* Result */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Converted value</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatArea(convertedValue, toUnit)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {numericValue.toLocaleString()} {units.find((u) => u.value === fromUnit)?.label} ={' '}
            {convertedValue.toLocaleString(undefined, { maximumFractionDigits: 4 })}{' '}
            {units.find((u) => u.value === toUnit)?.label}
          </p>
        </div>

        {/* Unit Selector for result */}
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value as AreaUnit)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A1834C] focus:border-transparent outline-none text-gray-900 bg-white"
        >
          {units.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>

      {/* Show All Conversions Toggle */}
      {showAllUnits && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setAllConversions(!allConversions)}
            className="text-sm text-[#A1834C] hover:text-[#8a6d3f] font-medium"
          >
            {allConversions ? 'Hide' : 'Show'} all conversions
          </button>

          {allConversions && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {units.map((unit) => (
                <div key={unit.value} className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">{unit.label}</p>
                  <p className="font-medium text-gray-900">
                    {formatArea(allUnits[unit.value], unit.value)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
