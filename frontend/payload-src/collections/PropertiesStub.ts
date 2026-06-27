import { CollectionConfig } from 'payload';

/**
 * Properties Collection — Airbnb Vertical
 *
 * Full-featured collection for managing short-let/Airbnb properties.
 * Fields organized in tabs for optimal admin UX.
 *
 * Demo client: Not Just A Stay
 *
 * @see .planning/phases/02-data-layer/2.1-PLAN.md
 */
export const PropertiesStub: CollectionConfig = {
  slug: 'properties',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'nightlyPrice', 'locality'],
    listSearchableFields: ['title', 'locality'],
    pagination: {
      defaultLimit: 20,
    },
  },

  access: {
    read: () => true, // Public read for published properties
    create: ({ req: { user } }) => Boolean(user), // Admin only
    update: ({ req: { user } }) => Boolean(user), // Admin only
    delete: ({ req: { user } }) => Boolean(user), // Admin only
  },

  fields: [
    // ============================================================
    // TABS ORGANIZATION
    // ============================================================
    {
      type: 'tabs',
      tabs: [
        // --------------------------------------------------------
        // Tab 1: Basic Info
        // --------------------------------------------------------
        {
          label: 'Basic Info',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Property name displayed to guests',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                description: 'URL-friendly identifier (e.g., luna-blanca)',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'Full description of the property',
              },
            },
            {
              name: 'shortDescription',
              type: 'text',
              admin: {
                description: 'Brief tagline for listings (max 150 chars)',
                placeholder: 'A cozy 2-bedroom apartment near the beach',
              },
            },
          ],
        },

        // --------------------------------------------------------
        // Tab 2: Location
        // --------------------------------------------------------
        {
          label: 'Location',
          fields: [
            {
              name: 'address',
              type: 'group',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                  admin: {
                    description: 'Street address',
                  },
                },
                {
                  name: 'city',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'City name',
                  },
                },
                {
                  name: 'state',
                  type: 'text',
                  admin: {
                    description: 'State or region',
                  },
                },
                {
                  name: 'zipCode',
                  type: 'text',
                  admin: {
                    description: 'Postal code',
                  },
                },
                {
                  name: 'country',
                  type: 'text',
                  defaultValue: 'India',
                  admin: {
                    description: 'Country',
                  },
                },
              ],
            },
            {
              name: 'geolocation',
              type: 'point', // PostGIS geometry point for geospatial queries
              admin: {
                description: 'Latitude/longitude coordinates for the map pin',
              },
            },
            {
              name: 'locality',
              type: 'text',
              admin: {
                description: 'Neighborhood or area name (e.g., "Koramangala")',
              },
            },
          ],
        },

        // --------------------------------------------------------
        // Tab 3: Property Details
        // --------------------------------------------------------
        {
          label: 'Property Details',
          fields: [
            {
              name: 'bhkType',
              type: 'select',
              options: [
                { label: '1 BHK', value: '1_bhk' },
                { label: '2 BHK', value: '2_bhk' },
                { label: '3 BHK', value: '3_bhk' },
                { label: '4+ BHK', value: '4_plus_bhk' },
                { label: 'Studio', value: 'studio' },
                { label: 'Villa', value: 'villa' },
                { label: 'Penthouse', value: 'penthouse' },
              ],
              admin: {
                description: 'Number of bedrooms, hall, kitchen',
              },
            },
            {
              name: 'propertyType',
              type: 'select',
              options: [
                { label: 'Apartment', value: 'apartment' },
                { label: 'House', value: 'house' },
                { label: 'Villa', value: 'villa' },
                { label: 'Condo', value: 'condo' },
                { label: 'Farmhouse', value: 'farmhouse' },
              ],
              admin: {},
            },
            {
              name: 'furnishingStatus',
              type: 'select',
              options: [
                { label: 'Furnished', value: 'furnished' },
                { label: 'Semi-Furnished', value: 'semi_furnished' },
                { label: 'Unfurnished', value: 'unfurnished' },
              ],
              admin: {},
            },
            {
              name: 'bedrooms',
              type: 'number',
              min: 0,
              defaultValue: 1,
              admin: {
                description: 'Number of bedrooms',
              },
            },
            {
              name: 'bathrooms',
              type: 'number',
              min: 0,
              defaultValue: 1,
              admin: {
                description: 'Number of bathrooms',
              },
            },
            {
              name: 'maxGuests',
              type: 'number',
              min: 1,
              defaultValue: 2,
              admin: {
                description: 'Maximum number of guests allowed',
              },
            },
            {
              name: 'floor',
              type: 'group',
              label: 'Floor Information',
              fields: [
                {
                  name: 'current',
                  type: 'number',
                  min: 0,
                  admin: {
                    description: 'Current floor number (0 for ground floor)',
                  },
                },
                {
                  name: 'total',
                  type: 'number',
                  min: 1,
                  admin: {
                    description: 'Total number of floors in the building',
                  },
                },
              ],
            },
            {
              name: 'facing',
              type: 'select',
              options: [
                { label: 'North', value: 'north' },
                { label: 'South', value: 'south' },
                { label: 'East', value: 'east' },
                { label: 'West', value: 'west' },
                { label: 'North-East', value: 'north_east' },
                { label: 'North-West', value: 'north_west' },
                { label: 'South-East', value: 'south_east' },
                { label: 'South-West', value: 'south_west' },
              ],
              admin: {
                description: 'Direction the property faces',
              },
            },
          ],
        },

        // --------------------------------------------------------
        // Tab 4: Pricing
        // --------------------------------------------------------
        {
          label: 'Pricing',
          fields: [
            {
              name: 'nightlyPrice',
              type: 'number',
              required: true,
              admin: {
                description: 'Base price per night (e.g., 2500 for ₹2,500)',
              },
            },
            {
              name: 'currency',
              type: 'select',
              defaultValue: 'INR',
              options: [
                { label: 'INR', value: 'INR' },
                { label: 'USD', value: 'USD' },
                { label: 'EUR', value: 'EUR' },
              ],
            },
            {
              name: 'seasonalPricing',
              type: 'array',
              admin: {
                description: 'Special pricing for different seasons',
              },
              fields: [
                {
                  name: 'seasonName',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "Summer", "Holiday Season"',
                  },
                },
                {
                  name: 'startDate',
                  type: 'date',
                  required: true,
                  admin: {
                    description: 'Season start date',
                  },
                },
                {
                  name: 'endDate',
                  type: 'date',
                  required: true,
                  admin: {
                    description: 'Season end date',
                  },
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  admin: {
                    description: 'Price per night during this season',
                  },
                },
              ],
            },
            {
              name: 'minNights',
              type: 'number',
              defaultValue: 1,
              min: 1,
              admin: {
                description: 'Minimum number of nights to book',
                placeholder: 'e.g., 2 for minimum 2 nights stay',
              },
            },
            {
              name: 'maxNights',
              type: 'number',
              min: 1,
              admin: {
                description: 'Maximum number of nights allowed',
                placeholder: 'Leave empty for no limit',
              },
            },
          ],
        },

        // --------------------------------------------------------
        // Tab 5: Amenities & Rules
        // --------------------------------------------------------
        {
          label: 'Amenities & Rules',
          fields: [
            {
              name: 'amenities',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'WiFi', value: 'wifi' },
                { label: 'Air Conditioning', value: 'ac' },
                { label: 'Pool', value: 'pool' },
                { label: 'Kitchen', value: 'kitchen' },
                { label: 'Parking', value: 'parking' },
                { label: 'Washer', value: 'washer' },
                { label: 'Dryer', value: 'dryer' },
                { label: 'TV', value: 'tv' },
                { label: 'Gym', value: 'gym' },
                { label: 'Beach Access', value: 'beach_access' },
                { label: 'Hot Tub', value: 'hot_tub' },
                { label: 'BBQ Grill', value: 'bbq_grill' },
                { label: 'Fireplace', value: 'fireplace' },
                { label: 'Garden', value: 'garden' },
                { label: 'Balcony', value: 'balcony' },
                { label: 'Terrace', value: 'terrace' },
                { label: 'Security', value: 'security' },
                { label: 'First Aid Kit', value: 'first_aid_kit' },
                { label: 'Smoke Detector', value: 'smoke_detector' },
                { label: 'Water Heater', value: 'water_heater' },
              ],
              admin: {
                description: 'Select all amenities available at this property',
              },
            },
            {
              name: 'houseRules',
              type: 'textarea',
              admin: {
                description: 'Rules and guidelines for guests',
                placeholder: 'e.g., No smoking inside, Quiet hours after 10 PM',
              },
            },
            {
              name: 'petPolicy',
              type: 'select',
              options: [
                { label: 'Allowed', value: 'pets_allowed' },
                { label: 'Not Allowed', value: 'pets_not_allowed' },
                { label: 'Cats Welcome', value: 'cats_only' },
                { label: 'Dogs Welcome', value: 'dogs_only' },
              ],
              admin: {},
            },
            {
              name: 'tenantPreference',
              type: 'select',
              options: [
                { label: 'Families with Kids', value: 'families' },
                { label: 'Couples', value: 'couples' },
                { label: 'Business Travelers', value: 'business_travelers' },
                { label: 'Anyone', value: 'anyone' },
              ],
              admin: {
                description: 'Preferred guest type for this property',
              },
            },
          ],
        },

        // --------------------------------------------------------
        // Tab 6: Media
        // --------------------------------------------------------
        {
          label: 'Media',
          fields: [
            {
              name: 'gallery',
              type: 'relationship',
              relationTo: 'media',
              hasMany: true,
              admin: {
                description: 'Property photos (drag to reorder)',
              },
            },
            {
              name: 'featuredImage',
              type: 'relationship',
              relationTo: 'media',
              admin: {
                description: 'This image will be shown as the main photo in search results and listings',
              },
            },
          ],
        },
      ],
    },

    // ============================================================
    // SIDEBAR FIELDS
    // ============================================================
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Draft = not visible to guests, Published = live on website',
      },
    },
    {
      name: 'availabilityCalendar',
      type: 'json',
      admin: {
        description: 'Reserved for Phase 4 - availability calendar',
        readOnly: true,
      },
    },
  ],
};
