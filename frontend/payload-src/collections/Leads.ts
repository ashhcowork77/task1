import type { CollectionConfig } from 'payload';

/**
 * Leads Collection
 * Captures inquiry data from property inquiry forms.
 *
 * Access Control:
 * - create: Public (anyone can submit an inquiry)
 * - read/update/delete: Authenticated users only (admin)
 *
 * @see D-09: Leads collection for inquiry capture
 * @see D-12: Owner role with full access
 */
export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'propertyReference', 'status', 'createdAt'],
    description: 'Captures inquiry leads from property contact forms',
  },
  access: {
    // Public create - anyone can submit an inquiry form
    create: () => true,
    // Admin only - authenticated users can read leads
    read: ({ req: { user } }) => Boolean(user),
    // Admin only - authenticated users can update leads
    update: ({ req: { user } }) => Boolean(user),
    // Admin only - authenticated users can delete leads
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Guest or lead name',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Contact email address',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Phone number with country code',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Inquiry message from guest',
      },
    },
    {
      name: 'propertyReference',
      type: 'relationship',
      relationTo: 'properties',
      admin: {
        description: 'Property this lead inquired about',
      },
    },
    {
      name: 'activityReference',
      type: 'relationship',
      relationTo: 'activities',
      admin: {
        description: 'Activity this lead inquired about',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      required: true,
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'Contacted',
          value: 'contacted',
        },
        {
          label: 'Qualified',
          value: 'qualified',
        },
        {
          label: 'Converted',
          value: 'converted',
        },
        {
          label: 'Lost',
          value: 'lost',
        },
      ],
      admin: {
        description: 'Lead status in the sales pipeline',
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this lead',
        position: 'sidebar',
      },
    },
    {
      name: 'source',
      type: 'select',
      options: [
        {
          label: 'Property Inquiry',
          value: 'property_inquiry',
        },
        {
          label: 'Contact Form',
          value: 'contact_form',
        },
        {
          label: 'Activity Inquiry',
          value: 'activity_inquiry',
        },
      ],
      admin: {
        description: 'Source channel of the inquiry',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, operation }) => {
        // Future: Send email notification on new lead creation
        // TODO: Implement email notification service
        // - Check if operation === 'create' and status === 'new'
        // - Call email service with lead data
        // - Log notification for debugging

        if (operation === 'create' && doc.status === 'new') {
          // Placeholder for future email notification logic
          // Example: emailService.sendLeadNotification(doc);
          console.log(`[Leads] New lead created: ${doc.name} <${doc.email}>`);
        }

        return doc;
      },
    ],
  },
  timestamps: true,
};
