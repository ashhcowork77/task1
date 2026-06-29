'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft, Trash2, Share2 } from 'lucide-react';
import { PropertyCard } from '@/components/PropertyCard';
import { useSavedProperties } from '@/lib/hooks/useSavedProperties';
import type { Property } from '@/types';

export default function SavedPropertiesPage() {
  const { savedIds, isSaved, toggleSaved, clearAll, count } = useSavedProperties();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedProperties() {
      if (savedIds.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/properties?ids=${savedIds.join(',')}`);
        if (response.ok) {
          const data = await response.json();
          setProperties(data.docs || []);
        }
      } catch (error) {
        console.error('Failed to fetch saved properties:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSavedProperties();
  }, [savedIds]);

  return (
    <main className="min-h-screen bg-[#F8F8F8] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#A1834C] mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to properties
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Heart className="w-8 h-8 fill-red-500 text-red-500" />
              Saved Properties
              {count > 0 && (
                <span className="text-lg font-normal text-gray-500">({count})</span>
              )}
            </h1>
          </div>

          {savedIds.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No saved properties yet</h2>
            <p className="text-gray-500 mb-6">
              Start exploring and save properties you like by clicking the heart icon.
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#A1834C] text-white rounded-lg hover:bg-[#8a6d3f] transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="relative">
                <PropertyCard property={property} />
                <button
                  onClick={() => toggleSaved(property.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-md"
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
