import { cache } from 'react';
import type { PaginatedResponse, Property } from '@/types';

type PayloadClient = Awaited<ReturnType<typeof import('payload')['getPayload']>>;

const demoProperties: Property[] = [
  {
    id: 'villa-solace',
    slug: 'villa-solace',
    title: 'Villa Solace',
    description:
      'A private pool villa in peaceful Assagao with generous living spaces, shaded verandas and garden views. Designed for groups who want a quiet North Goa base with the comfort of a hosted stay.',
    shortDescription:
      'A private pool villa in peaceful Assagao with generous living spaces and garden views.',
    address: {
      city: 'Mapusa',
      state: 'Goa',
      locality: 'Assagao',
      country: 'India',
    },
    locality: 'Assagao',
    geolocation: { lat: 15.5989, lng: 73.7696 },
    bhkType: 'villa',
    propertyType: 'villa',
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 10,
    nightlyPrice: 18000,
    currency: 'INR',
    minNights: 2,
    amenities: ['wifi', 'ac', 'parking', 'pool', 'kitchen'],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=85&auto=format&fit=crop',
      alt: 'Villa Solace private pool',
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=85&auto=format&fit=crop',
        alt: 'Villa Solace pool',
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&q=85&auto=format&fit=crop',
        alt: 'Villa Solace living room',
      },
    ],
    status: 'published',
  },
  {
    id: 'rosa-blanca',
    slug: 'rosa-blanca',
    title: 'Rosa Blanca',
    description:
      'A Portuguese-style Anjuna villa with an infinity pool, gardens and generous gathering spaces for families, celebrations and long weekends near the coast.',
    shortDescription:
      'A Portuguese-style Anjuna villa with an infinity pool, gardens, and grand gathering spaces.',
    address: {
      city: 'Mapusa',
      state: 'Goa',
      locality: 'Anjuna',
      country: 'India',
    },
    locality: 'Anjuna',
    geolocation: { lat: 15.5752, lng: 73.7407 },
    bhkType: 'villa',
    propertyType: 'villa',
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 12,
    nightlyPrice: 25000,
    currency: 'INR',
    minNights: 2,
    amenities: ['wifi', 'ac', 'parking', 'pool', 'tv'],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&auto=format&fit=crop',
      alt: 'Rosa Blanca villa exterior',
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&auto=format&fit=crop',
        alt: 'Rosa Blanca exterior',
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=85&auto=format&fit=crop',
        alt: 'Rosa Blanca dining experience',
      },
    ],
    status: 'published',
  },
  {
    id: 'nova-solace',
    slug: 'nova-solace',
    title: 'Nova Solace',
    description:
      'A modern Chapora villa with a plunge pool, calm interiors and easy access to Vagator beach, Chapora fort and North Goa evenings.',
    shortDescription:
      'A modern Chapora villa with a plunge pool near Vagator beach and the fort.',
    address: {
      city: 'Mapusa',
      state: 'Goa',
      locality: 'Vagator',
      country: 'India',
    },
    locality: 'Vagator',
    geolocation: { lat: 15.5981, lng: 73.7448 },
    bhkType: 'villa',
    propertyType: 'villa',
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 8,
    nightlyPrice: 14000,
    currency: 'INR',
    minNights: 2,
    amenities: ['wifi', 'ac', 'parking', 'pool'],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85&auto=format&fit=crop',
      alt: 'Nova Solace modern exterior',
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85&auto=format&fit=crop',
        alt: 'Nova Solace exterior',
      },
      {
        url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1400&q=85&auto=format&fit=crop',
        alt: 'Nova Solace pool',
      },
    ],
    status: 'published',
  },
];

let payloadInstance: PayloadClient | null = null;

function isProductionBuild() {
  return process.env.NEXT_PHASE === 'phase-production-build';
}

function getDatabaseUrl() {
  const value = process.env.DATABASE_URL?.trim();

  if (!value || value === '""' || value === "''") {
    return null;
  }

  try {
    const parsed = new URL(value.replace(/^['"]|['"]$/g, ''));
    if (!['postgres:', 'postgresql:'].includes(parsed.protocol)) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

function createPaginatedResponse<T>(
  docs: T[],
  limit: number,
  page: number,
): PaginatedResponse<T> {
  const totalDocs = docs.length;
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit));

  return {
    docs,
    totalDocs,
    limit,
    page,
    totalPages,
    pagingCounter: totalDocs > 0 ? (page - 1) * limit + 1 : 0,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  };
}

function getDemoProperties(options?: { limit?: number; page?: number }) {
  const limit = options?.limit ?? 20;
  const page = options?.page ?? 1;
  const start = (page - 1) * limit;
  const docs = demoProperties.slice(start, start + limit);

  return createPaginatedResponse(docs, limit, page);
}

async function getPayloadInstance() {
  if (isProductionBuild() || !getDatabaseUrl()) {
    return null;
  }

  if (!payloadInstance) {
    const [{ getPayload }, configModule] = await Promise.all([
      import('payload'),
      import('../../../payload.config'),
    ]);

    payloadInstance = await getPayload({ config: configModule.default });
  }

  return payloadInstance;
}

export const getPublishedProperties = cache(async (options?: {
  limit?: number;
  page?: number;
}): Promise<PaginatedResponse<Property>> => {
  const limit = options?.limit ?? 20;
  const page = options?.page ?? 1;
  const fallback = getDemoProperties({ limit, page });

  try {
    const payload = await getPayloadInstance();

    if (!payload) {
      return fallback;
    }

    const result = await payload.find({
      collection: 'properties',
      limit,
      page,
      sort: '-createdAt',
      depth: 2,
    });

    return result.docs.length > 0
      ? (result as unknown as PaginatedResponse<Property>)
      : fallback;
  } catch (error) {
    console.error('Error fetching properties from Payload:', error);
    return fallback;
  }
});

export const getFeaturedProperties = cache(async (): Promise<Property[]> => {
  const fallback = demoProperties.slice(0, 6);

  try {
    const payload = await getPayloadInstance();

    if (!payload) {
      return fallback;
    }

    const result = await payload.find({
      collection: 'properties',
      limit: 6,
      sort: '-createdAt',
      depth: 2,
    });

    return result.docs.length > 0
      ? (result.docs as unknown as Property[])
      : fallback;
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return fallback;
  }
});

export const getPropertyBySlug = cache(async (slug: string): Promise<Property | null> => {
  const fallback = demoProperties.find(
    (property) => property.slug === slug || property.id === slug,
  ) ?? null;

  try {
    const payload = await getPayloadInstance();

    if (!payload) {
      return fallback;
    }

    const titleFromSlug = slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    const result = await payload.find({
      collection: 'properties',
      where: {
        or: [
          { title: { equals: titleFromSlug } },
          { slug: { equals: slug } },
          { title: { like: slug.replace(/-/g, ' ') } },
        ],
      },
      limit: 1,
      depth: 2,
    });

    return (result.docs[0] as unknown as Property | undefined) ?? fallback;
  } catch (error) {
    console.error('Error fetching property by slug:', error);
    return fallback;
  }
});

export const getPropertiesByBHKType = cache(async (bhkType: string): Promise<Property[]> => {
  const fallback = demoProperties.filter((property) => property.bhkType === bhkType);

  try {
    const payload = await getPayloadInstance();

    if (!payload) {
      return fallback;
    }

    const result = await payload.find({
      collection: 'properties',
      where: {
        and: [
          { bhkType: { equals: bhkType } },
          { status: { equals: 'published' } },
        ],
      },
      limit: 50,
      sort: '-createdAt',
    });

    return result.docs.length > 0
      ? (result.docs as unknown as Property[])
      : fallback;
  } catch (error) {
    console.error('Error fetching properties by BHK type:', error);
    return fallback;
  }
});
