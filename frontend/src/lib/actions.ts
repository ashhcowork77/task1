'use server';

import { inquirySchema, activityInquirySchema, type InquiryFormData, type ActivityInquiryFormData } from '@/lib/schemas';

/**
 * Server Action for submitting property inquiry forms
 * Validates input with Zod and creates a lead in Payload CMS
 */
export async function submitInquiry(data: InquiryFormData): Promise<{
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}> {
  // 1. Validate input with Zod
  const validation = inquirySchema.safeParse(data);
  if (!validation.success) {
    const fieldErrors: Record<string, string[]> = {};
    validation.error.errors.forEach((err) => {
      const field = err.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field].push(err.message);
    });
    return { success: false, fieldErrors };
  }

  // 2. Submit to Payload CMS
  try {
    // For demo, just log the inquiry (Payload integration requires database setup)
    console.log('[submitInquiry] Inquiry received:', validation.data);
    console.log('Property reference:', validation.data.propertyReference);
    console.log('Message:', validation.data.message);

    // In production with database, this would create a lead in Payload:
    // const payload = await getPayloadInstance();
    // await payload.create({ collection: 'leads', data: {...} });

    return { success: true };
  } catch (error) {
    console.error('[submitInquiry] Error:', error);
    return {
      success: false,
      error: 'Failed to submit inquiry. Please try again.',
    };
  }
}

/**
 * Server Action for submitting activity inquiry forms
 * Validates input with Zod and creates a lead in Payload CMS
 */
export async function submitActivityInquiry(data: ActivityInquiryFormData): Promise<{
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}> {
  // 1. Validate input with Zod
  const validation = activityInquirySchema.safeParse(data);
  if (!validation.success) {
    const fieldErrors: Record<string, string[]> = {};
    validation.error.errors.forEach((err) => {
      const field = err.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field].push(err.message);
    });
    return { success: false, fieldErrors };
  }

  // 2. Submit to Payload CMS
  try {
    // For demo, just log the inquiry (Payload integration requires database setup)
    console.log('[submitActivityInquiry] Inquiry received:', validation.data);
    console.log('Activity reference:', validation.data.activityReference);

    return { success: true };
  } catch (error) {
    console.error('[submitActivityInquiry] Error:', error);
    return {
      success: false,
      error: 'Failed to submit inquiry. Please try again.',
    };
  }
}
