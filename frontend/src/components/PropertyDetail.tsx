import {
  MapPin,
  Users,
  Star,
  Wifi,
  Wind,
  Waves,
  Utensils,
  Car,
  Tv,
  Dumbbell,
  Bed,
  Bath,
  Home,
  Ruler,
  Sofa,
} from 'lucide-react';
import type { Property, PropertyMedia } from '@/types';
import InquiryForm from './InquiryForm';
import { POIOverlay } from './poi/POIOverlay';
import { PropertyGallery } from './PropertyGallery';

/**
 * Property Detail Component
 * Server Component that displays full property information including:
 * - Image gallery with lightbox
 * - Header with title, location, and badges
 * - Pricing section
 * - Description and house rules
 * - Amenities grid
 * - Details grid
 * - Inquiry form and POI overlay
 */
interface PropertyDetailProps {
  property: Property;
}

// Map amenity keywords to icons
const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  internet: Wifi,
  'air conditioning': Wind,
  ac: Wind,
  'air conditioner': Wind,
  pool: Waves,
  swimming: Waves,
  kitchen: Utensils,
  cooking: Utensils,
  parking: Car,
  car: Car,
  'tv': Tv,
  television: Tv,
  gym: Dumbbell,
  fitness: Dumbbell,
  exercise: Dumbbell,
};

/**
 * Get icon component for an amenity string
 */
function getAmenityIcon(amenity: string): React.ComponentType<{ className?: string }> {
  const normalized = amenity.toLowerCase();
  for (const [key, icon] of Object.entries(amenityIcons)) {
    if (normalized.includes(key)) {
      return icon;
    }
  }
  return Home; // Default icon
}

/**
 * Format BHK type for display
 */
function formatBHKType(bhkType?: string): string {
  if (!bhkType) return '';
  return bhkType
    .replace(/_/g, ' ')
    .replace('plus', '+')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format furnishing status for display
 */
function formatFurnishingStatus(status?: string): string {
  if (!status) return '';
  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  // Prepare images array for gallery
  const images = property.gallery?.length
    ? property.gallery.map((img: PropertyMedia) => ({ url: img.url, alt: img.alt }))
    : property.featuredImage
      ? [{ url: property.featuredImage.url, alt: property.featuredImage.alt }]
      : [];

  // Location string
  const locationString = [
    property.locality,
    property.address?.city,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="space-y-8">
      {/* Gallery Section */}
      <section aria-label="Property images">
        <PropertyGallery images={images} title={property.title} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 lg:px-0">
        {/* Main Content Column (spans 2 columns) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Section */}
          <section className="space-y-4">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{property.title}</h1>

            {/* Location with BHK badge, guests, rating */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Location */}
              {locationString && (
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{locationString}</span>
                </div>
              )}

              {/* BHK Type Badge */}
              {property.bhkType && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {formatBHKType(property.bhkType)}
                </span>
              )}

              {/* Max Guests */}
              {property.maxGuests && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>Up to {property.maxGuests} guests</span>
                </div>
              )}

              {/* Rating Placeholder */}
              <div className="flex items-center gap-1 text-amber-600">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-medium">4.5</span>
                <span className="text-gray-500">(12 reviews)</span>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">
                {property.currency || 'INR'} {property.nightlyPrice.toLocaleString()}
              </span>
              <span className="text-xl text-gray-600">/ night</span>
            </div>
            {property.minNights && (
              <p className="text-sm text-gray-600 mt-2">
                Minimum {property.minNights} night{property.minNights > 1 ? 's' : ''} stay
              </p>
            )}
          </section>

          {/* Description Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">About this property</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
            </div>

            {/* House Rules */}
            {property.houseRules && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">House Rules</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-line">{property.houseRules}</p>
                </div>
              </div>
            )}
          </section>

          {/* Amenities Section */}
          {property.amenities && property.amenities.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity: string, index: number) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-blue-600" />
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Details Grid */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Property Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Bedrooms */}
              {property.bedrooms !== undefined && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Bed className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="font-medium text-gray-900">{property.bedrooms}</p>
                  </div>
                </div>
              )}

              {/* Bathrooms */}
              {property.bathrooms !== undefined && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Bath className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="font-medium text-gray-900">{property.bathrooms}</p>
                  </div>
                </div>
              )}

              {/* Max Guests */}
              {property.maxGuests !== undefined && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Max Guests</p>
                    <p className="font-medium text-gray-900">{property.maxGuests}</p>
                  </div>
                </div>
              )}

              {/* Floor */}
              {property.floor && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Ruler className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Floor</p>
                    <p className="font-medium text-gray-900">
                      {property.floor.current} of {property.floor.total}
                    </p>
                  </div>
                </div>
              )}

              {/* Furnishing Status */}
              {property.furnishingStatus && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Sofa className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Furnishing</p>
                    <p className="font-medium text-gray-900">
                      {formatFurnishingStatus(property.furnishingStatus)}
                    </p>
                  </div>
                </div>
              )}

              {/* Property Type */}
              {property.propertyType && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Home className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium text-gray-900 capitalize">
                      {property.propertyType.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Inquiry Form */}
          <section>
            <InquiryForm
              propertyId={property.id}
              propertyTitle={property.title}
            />
          </section>

          {/* POI Overlay */}
          {property.geolocation && (
            <section>
              <POIOverlay
                propertyId={property.id}
                lat={property.geolocation.lat}
                lng={property.geolocation.lng}
              />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
