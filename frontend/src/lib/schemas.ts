import { z } from 'zod';

/**
 * Property inquiry form validation schema
 * Validates property inquiry form submissions
 */
export const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Please enter a message of at least 10 characters'),
  propertyReference: z.string().min(1, 'Property reference is required'),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

/**
 * Activity inquiry form validation schema
 * Validates activity inquiry form submissions
 */
export const activityInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Please enter a message of at least 10 characters'),
  activityReference: z.string().min(1, 'Activity reference is required'),
});

export type ActivityInquiryFormData = z.infer<typeof activityInquirySchema>;
