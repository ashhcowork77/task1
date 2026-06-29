import { NextRequest, NextResponse } from 'next/server';

interface LeadPayload {
  type: 'callback_request' | 'inquiry' | 'whatsapp_lead';
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  propertyId?: string;
  propertyTitle?: string;
  source?: string;
}

/**
 * API Route: /api/leads
 * Handles lead submissions (callback requests, inquiries, etc.)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LeadPayload;

    // Validate required fields
    if (!body.type) {
      return NextResponse.json(
        { success: false, error: 'Lead type is required' },
        { status: 400 }
      );
    }

    if (body.type === 'callback_request') {
      if (!body.phone) {
        return NextResponse.json(
          { success: false, error: 'Phone number is required' },
          { status: 400 }
        );
      }

      // In production, this would save to Payload CMS or send to a CRM
      // For now, we'll log it and return success
      console.log('Callback request received:', {
        name: body.name,
        phone: body.phone,
        propertyId: body.propertyId,
        propertyTitle: body.propertyTitle,
        timestamp: new Date().toISOString(),
      });

      // TODO: Integrate with Payload CMS Leads collection
      // TODO: Send notification to agent via webhook/email

      return NextResponse.json({
        success: true,
        message: 'Callback request submitted successfully',
      });
    }

    // Handle other lead types
    return NextResponse.json({
      success: true,
      message: 'Lead received',
    });
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET handler for fetching leads (admin only)
 */
export async function GET() {
  // TODO: Add authentication check
  // TODO: Fetch leads from Payload CMS

  return NextResponse.json({
    success: true,
    message: 'Leads API - POST to submit leads',
  });
}
