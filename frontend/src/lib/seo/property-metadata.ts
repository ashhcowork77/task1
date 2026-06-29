import type { Property } from '@/types';

/**
 * Generate SEO metadata for a property
 */
export function generatePropertyMetadata(property: Property) {
  const title = `${property.title} | ${property.address?.city || 'Property'} | Real Estate`;
  const description = property.shortDescription ||
    ` ${property.bedrooms ? `${property.bedrooms} BHK ` : ''}property in ${property.locality || property.address?.city || 'prime location'}. ${property.description?.slice(0, 120) || ''}...`;

  const keywords = [
    property.title,
    property.propertyType,
    property.bhkType?.replace(/_/g, ' '),
    property.locality,
    property.address?.city,
    'real estate',
    'property',
    'buy',
    'rent',
    ...(property.amenities || []),
  ].filter(Boolean);

  return {
    title,
    description: description.slice(0, 160),
    keywords: keywords.join(', '),
    openGraph: {
      title: property.title,
      description: property.shortDescription || description.slice(0, 160),
      images: property.featuredImage ? [{ url: property.featuredImage.url, alt: property.featuredImage.alt || property.title }] : [],
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: property.title,
      description: property.shortDescription || description.slice(0, 160),
      images: property.featuredImage ? [property.featuredImage.url] : [],
    },
  };
}

/**
 * Generate Schema.org structured data for a property
 */
export function generatePropertySchema(property: Property) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description || property.shortDescription,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/properties/${property.slug || property.id}`,
    ...(property.geolocation && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: property.geolocation.lat,
        longitude: property.geolocation.lng,
      },
    }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address?.street,
      addressLocality: property.address?.locality || property.address?.city,
      addressRegion: property.address?.state,
      postalCode: property.address?.zipCode,
      addressCountry: property.address?.country || 'IN',
    },
    ...(property.nightlyPrice && {
      offers: {
        '@type': 'Offer',
        price: property.nightlyPrice,
        priceCurrency: property.currency || 'INR',
        availability: 'https://schema.org/InStock',
      },
    }),
    ...(property.bedrooms && { numberOfRooms: property.bedrooms }),
    ...(property.bathrooms && { numberOfBathroomsTotal: property.bathrooms }),
    ...(property.featuredImage && { image: property.featuredImage.url }),
  };

  return schema;
}
