'use client';

import { useFilterStore } from '@/lib/stores/filterStore';
import { PriceRangeSlider } from './PriceRangeSlider';
import { LocalityAutocomplete } from './LocalityAutocomplete';
import { BedDouble, Home, Sofa, PawPrint, Users, Compass, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const BHK_OPTIONS = [
  { value: '1_bhk', label: '1 BHK' },
  { value: '2_bhk', label: '2 BHK' },
  { value: '3_bhk', label: '3 BHK' },
  { value: '4_plus_bhk', label: '4+ BHK' },
  { value: 'studio', label: 'Studio' },
  { value: 'villa', label: 'Villa' },
];

const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'condo', label: 'Condo' },
  { value: 'farmhouse', label: 'Farmhouse' },
];

const FURNISHING_OPTIONS = [
  { value: 'furnished', label: 'Furnished' },
  { value: 'semi_furnished', label: 'Semi-Furnished' },
  { value: 'unfurnished', label: 'Unfurnished' },
];

const AMENITY_OPTIONS = [
  { value: 'wifi', label: 'WiFi' },
  { value: 'ac', label: 'Air Conditioning' },
  { value: 'pool', label: 'Pool' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'parking', label: 'Parking' },
  { value: 'tv', label: 'TV' },
  { value: 'gym', label: 'Gym' },
  { value: 'beach_access', label: 'Beach Access' },
  { value: 'hot_tub', label: 'Hot Tub' },
  { value: 'washer', label: 'Washer' },
  { value: 'dryer', label: 'Dryer' },
];

interface FilterSidebarProps {
  className?: string;
}

interface FilterSectionProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ icon: Icon, title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 pb-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {title}
        </h3>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-gray-400 transition-transform',
            isOpen ? 'rotate-180' : ''
          )}
        />
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
}

/**
 * Main filter sidebar component
 * Provides all property filter controls
 */
export function FilterSidebar({ className }: FilterSidebarProps) {
  const {
    bhkTypes,
    toggleBHK,
    propertyTypes,
    togglePropertyType,
    furnishing,
    setFurnishing,
    amenities,
    toggleAmenity,
    petPolicy,
    setPetPolicy,
    tenantPreference,
    setTenantPreference,
  } = useFilterStore();

  return (
    <aside className={cn('space-y-4 p-4 bg-white rounded-lg shadow-sm', className)}>
      <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

      {/* BHK Type */}
      <FilterSection icon={BedDouble} title="BHK Type">
        <div className="flex flex-wrap gap-2">
          {BHK_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleBHK(opt.value)}
              className={cn(
                'px-3 py-1 text-sm rounded-full border transition-colors',
                bhkTypes.includes(opt.value)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Property Type */}
      <FilterSection icon={Home} title="Property Type">
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => togglePropertyType(opt.value)}
              className={cn(
                'px-3 py-1 text-sm rounded-full border transition-colors',
                propertyTypes.includes(opt.value)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection icon={Compass} title="Budget Range">
        <PriceRangeSlider />
      </FilterSection>

      {/* Locality */}
      <FilterSection icon={Home} title="Locality">
        <LocalityAutocomplete />
      </FilterSection>

      {/* Furnishing */}
      <FilterSection icon={Sofa} title="Furnishing">
        <select
          value={furnishing ?? ''}
          onChange={(e) => setFurnishing(e.target.value || null)}
          className={cn(
            'w-full px-3 py-2 border rounded-md text-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          )}
        >
          <option value="">Any</option>
          {FURNISHING_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FilterSection>

      {/* Amenities */}
      <FilterSection icon={Compass} title="Amenities">
        <div className="flex flex-wrap gap-2">
          {AMENITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleAmenity(opt.value)}
              className={cn(
                'px-3 py-1 text-sm rounded-full border transition-colors',
                amenities.includes(opt.value)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Pet Policy */}
      <FilterSection icon={PawPrint} title="Pet Policy" defaultOpen={false}>
        <select
          value={petPolicy ?? ''}
          onChange={(e) => setPetPolicy(e.target.value || null)}
          className={cn(
            'w-full px-3 py-2 border rounded-md text-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          )}
        >
          <option value="">Any</option>
          <option value="pets_allowed">Pets Allowed</option>
          <option value="pets_not_allowed">Pets Not Allowed</option>
          <option value="cats_only">Cats Only</option>
          <option value="dogs_only">Dogs Only</option>
        </select>
      </FilterSection>

      {/* Tenant Preference */}
      <FilterSection icon={Users} title="Guest Type" defaultOpen={false}>
        <select
          value={tenantPreference ?? ''}
          onChange={(e) => setTenantPreference(e.target.value || null)}
          className={cn(
            'w-full px-3 py-2 border rounded-md text-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          )}
        >
          <option value="">Any</option>
          <option value="families">Families</option>
          <option value="couples">Couples</option>
          <option value="business_travelers">Business Travelers</option>
          <option value="anyone">Anyone</option>
        </select>
      </FilterSection>
    </aside>
  );
}
