'use client';

import { useState, useEffect, useCallback } from 'react';
import { Scale, X, Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Property } from '@/types';

interface PropertyCompareProps {
  properties: Property[];
  className?: string;
}

interface CompareItem {
  id: string;
  property: Property;
}

export function PropertyCompare({ properties, className }: PropertyCompareProps) {
  const [compareList, setCompareList] = useState<CompareItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const maxCompare = 3;

  // Load compare list from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('compare_properties');
    if (stored) {
      try {
        const ids = JSON.parse(stored);
        const items = ids
          .map((id: string) => {
            const prop = properties.find((p) => p.id === id);
            return prop ? { id, property: prop } : null;
          })
          .filter(Boolean);
        setCompareList(items);
      } catch {
        // Ignore
      }
    }
  }, [properties]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('compare_properties', JSON.stringify(compareList.map((item) => item.id)));
  }, [compareList]);

  const addToCompare = useCallback((property: Property) => {
    if (compareList.length >= maxCompare) return;
    if (compareList.some((item) => item.id === property.id)) return;

    setCompareList((prev) => [...prev, { id: property.id, property }]);
  }, [compareList]);

  const removeFromCompare = useCallback((id: string) => {
    setCompareList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const isInCompare = useCallback((id: string) => {
    return compareList.some((item) => item.id === id);
  }, [compareList]);

  const clearAll = useCallback(() => {
    setCompareList([]);
  }, []);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      {/* Compare Button - shows when items are selected */}
      {compareList.length > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            'fixed bottom-24 right-4 z-40 flex items-center gap-2 bg-[#A1834C] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#8a6d3f] transition-all',
            'md:bottom-6'
          )}
        >
          <Scale className="w-5 h-5" />
          <span className="text-sm font-medium">Compare ({compareList.length})</span>
        </button>
      )}

      {/* Compare Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Compare Properties</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Compare Grid */}
            <div className="overflow-x-auto p-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-600 w-32">Feature</th>
                    {compareList.map((item) => (
                      <th key={item.id} className="p-3 text-center min-w-[200px]">
                        <button
                          onClick={() => removeFromCompare(item.id)}
                          className="float-right p-1 hover:bg-gray-100 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <p className="font-semibold truncate">{item.property.title}</p>
                      </th>
                    ))}
                    {compareList.length < maxCompare && (
                      <th className="p-3 text-center min-w-[200px] border-2 border-dashed border-gray-200">
                        <Plus className="w-6 h-6 mx-auto text-gray-300" />
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="bg-gray-50">
                    <td className="p-3 font-medium">Price</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="p-3 text-center font-semibold">
                        {formatPrice(item.property.nightlyPrice)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Bedrooms</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="p-3 text-center">
                        {item.property.bedrooms || '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 font-medium">Bathrooms</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="p-3 text-center">
                        {item.property.bathrooms || '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Guests</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="p-3 text-center">
                        {item.property.maxGuests || '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 font-medium">Area</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="p-3 text-center">
                        {item.property.area ? `${item.property.area.value} ${item.property.area.unit}` : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Type</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="p-3 text-center capitalize">
                        {item.property.propertyType?.replace(/_/g, ' ') || '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 font-medium">Location</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="p-3 text-center">
                        {item.property.locality || item.property.address?.city || '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Amenities</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="p-3 text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {item.property.amenities?.slice(0, 3).map((a, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">
                              {a}
                            </span>
                          ))}
                          {(item.property.amenities?.length || 0) > 3 && (
                            <span className="px-2 py-1 text-xs text-gray-500">
                              +{(item.property.amenities?.length || 0) - 3}
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 p-4 border-t">
              <button
                onClick={clearAll}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm bg-[#A1834C] text-white rounded-lg hover:bg-[#8a6d3f]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add to Compare Button */}
      <button
        onClick={() => addToCompare(properties[0])}
        disabled={isInCompare(properties[0]?.id) || compareList.length >= maxCompare}
        className={cn(
          'flex items-center gap-1 px-2 py-1 text-sm rounded',
          isInCompare(properties[0]?.id)
            ? 'bg-[#A1834C] text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        )}
      >
        {isInCompare(properties[0]?.id) ? (
          <>
            <Check className="w-4 h-4" />
            Comparing
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Compare
          </>
        )}
      </button>
    </>
  );
}
