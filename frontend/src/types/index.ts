// Inline types from shared package
// Using relative imports to avoid module resolution issues

// Property types matching Payload collection
export interface Address {
  street?: string;
  locality?: string;
  city: string;
  state: string;
  zipCode?: string;
  country?: string;
}

export interface Geolocation {
  lat: number;
  lng: number;
}

export interface PropertyMedia {
  id?: string;
  url: string;
  alt?: string;
  filename?: string;
  mimeType?: string;
  width?: number;
  height?: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  address: Address;
  geolocation?: Geolocation;
  locality?: string;
  bhkType?: '1_bhk' | '2_bhk' | '3_bhk' | '4_bhk' | '5_bhk' | '4_plus_bhk' | 'studio' | 'villa' | 'penthouse';
  propertyType?: 'apartment' | 'house' | 'villa' | 'condo' | 'farmhouse';
  furnishingStatus?: 'furnished' | 'semi_furnished' | 'unfurnished';
  bedrooms?: number;
  bathrooms?: number;
  maxGuests?: number;
  floor?: { current: number; total: number };
  facing?: string;
  nightlyPrice: number;
  currency?: string;
  seasonalPricing?: Array<{
    seasonName: string;
    startDate: string;
    endDate: string;
    price: number;
  }>;
  minNights?: number;
  maxNights?: number;
  amenities?: string[];
  houseRules?: string;
  petPolicy?: 'pets_allowed' | 'pets_not_allowed' | 'cats_only' | 'dogs_only';
  tenantPreference?: 'families' | 'couples' | 'business_travelers' | 'anyone';
  featuredImage?: PropertyMedia;
  gallery?: PropertyMedia[];
  status?: 'draft' | 'published' | 'archived';
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Tenant types
export type VerticalType = 'airbnb' | 'agent' | 'builder';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  verticalType: VerticalType;
}

// Frontend-specific types
export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  prevPage?: number | null;
  nextPage?: number | null;
  limit?: number;
  pagingCounter?: number;
}
