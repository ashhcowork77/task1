import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { getPropertiesByLocality } from '@/lib/data/properties';
import { PropertyCard } from '@/components/PropertyCard';

interface LocationPageProps {
  params: Promise<{
    locality: string;
  }>;
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { locality } = await params;
  const formattedLocality = locality.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `Properties in ${formattedLocality} | Find Your Perfect Home`,
    description: `Browse ${formattedLocality} properties. View photos, prices, and amenities. Find your ideal home in ${formattedLocality}.`,
    openGraph: {
      title: `Properties in ${formattedLocality}`,
      description: `Find your dream property in ${formattedLocality}. Browse listings with photos, prices, and more.`,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { locality } = await params;
  const formattedLocality = locality.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const properties = await getPropertiesByLocality(formattedLocality);

  if (!properties || properties.length === 0) {
    return (
      <main className="min-h-screen bg-[#F8F8F8] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              No properties in {formattedLocality} yet
            </h1>
            <p className="text-gray-500">
              We are expanding to this area soon. Check back later!
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F8F8] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[#A1834C] text-sm font-medium uppercase tracking-wide mb-2">
            Location
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Properties in {formattedLocality}
          </h1>
          <p className="text-gray-600">
            {properties.length} propert{properties.length === 1 ? 'y' : 'ies'} available
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              priority={index < 3}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
