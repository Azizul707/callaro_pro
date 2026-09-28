'use server';

import { validateEmail } from '@/src/lib/email-validator';
import { insertAgencyLead } from '@/src/lib/supabase';

export interface ActionResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

/**
 * Server Action: Validates an email for disposable/fake domains
 * and instantly registers the lead into the Supabase agency_leads table.
 */
export async function validateAndSaveCalculatorEmail(
  rawEmail: string
): Promise<ActionResponse<{ email: string }>> {
  try {
    const trimmed = (rawEmail || '').trim().toLowerCase();

    // 1. Email format and disposable domain verification
    const validation = validateEmail(trimmed);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errorMessage || 'Please use a valid personal or business email.',
      };
    }

    // 2. Insert into Supabase table agency_leads with source 'Calculator'
    const insertResult = await insertAgencyLead({
      email: trimmed,
      source: 'Calculator',
      full_name: null,
      phone_number: null,
    });

    if (!insertResult.success) {
      return {
        success: false,
        error: insertResult.error || 'Failed to record entry. Please try again.',
      };
    }

    return {
      success: true,
      message: 'Instant access granted.',
      data: { email: trimmed },
    };
  } catch (err: any) {
    console.error('Error in validateAndSaveCalculatorEmail:', err);
    return {
      success: false,
      error: 'An unexpected error occurred. Please use a valid personal or business email.',
    };
  }
}

/**
 * Server Action: Validates and stores email leads from the Lead Triage Simulator
 */
export async function validateAndSaveSimulatorEmail(
  rawEmail: string
): Promise<ActionResponse<{ email: string }>> {
  try {
    const trimmed = (rawEmail || '').trim().toLowerCase();

    // 1. Email format and disposable domain verification
    const validation = validateEmail(trimmed);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errorMessage || 'Please use a valid personal or business email.',
      };
    }

    // 2. Insert into Supabase table agency_leads with source 'Lead Simulator'
    const insertResult = await insertAgencyLead({
      email: trimmed,
      source: 'Lead Simulator',
      full_name: null,
      phone_number: null,
    });

    if (!insertResult.success) {
      return {
        success: false,
        error: insertResult.error || 'Failed to record entry. Please try again.',
      };
    }

    return {
      success: true,
      message: 'Analysis unlocked.',
      data: { email: trimmed },
    };
  } catch (err: any) {
    console.error('Error in validateAndSaveSimulatorEmail:', err);
    return {
      success: false,
      error: 'An unexpected error occurred. Please use a valid personal or business email.',
    };
  }
}

/**
 * Server Action: Submits full contact / audit leads to the Supabase agency_leads table.
 */
export async function submitAuditLead(formData: {
  fullName: string;
  phoneNumber: string;
  email: string;
  source?: string;
}): Promise<ActionResponse> {
  try {
    const { fullName, phoneNumber, email, source = 'Contact Form' } = formData;

    const validation = validateEmail(email);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errorMessage || 'Please enter a valid personal or business email.',
      };
    }

    if (!phoneNumber || phoneNumber.trim().length < 6) {
      return {
        success: false,
        error: 'Please enter a valid phone number for SMS dispatch testing.',
      };
    }

    const insertResult = await insertAgencyLead({
      full_name: fullName.trim() || 'Valued Business Owner',
      phone_number: phoneNumber.trim(),
      email: email.trim().toLowerCase(),
      source,
    });

    return {
      success: true,
      message: 'Your revenue audit request has been booked successfully! Our team will reach out within 15 minutes.',
      data: insertResult.data,
    };
  } catch (err: any) {
    console.error('Error in submitAuditLead:', err);
    return {
      success: false,
      error: 'Failed to submit booking. Please try again or contact info@callora.pro directly.',
    };
  }
}

/**
 * Server Action: Update lead status in agency_leads
 */
export async function updateLeadStatusAction(
  leadId: string,
  newStatus: 'New' | 'Contacted' | 'Meeting Booked' | 'Closed'
): Promise<ActionResponse> {
  try {
    const { updateLeadStatus } = await import('@/src/lib/supabase');
    const result = await updateLeadStatus(leadId, newStatus);
    return {
      success: result.success,
      message: `Status updated to ${newStatus}`,
      error: result.error,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to update lead status',
    };
  }
}

/**
 * Server Action: Bulk import leads into agency_leads
 */
export async function bulkImportLeadsAction(
  leads: Array<{
    name?: string;
    email: string;
    phone?: string;
    business_name?: string;
    source?: string;
  }>
): Promise<ActionResponse<{ count: number }>> {
  try {
    const { bulkInsertAgencyLeads } = await import('@/src/lib/supabase');
    const result = await bulkInsertAgencyLeads(leads);
    if (!result.success && result.insertedCount === 0) {
      return {
        success: false,
        error: result.error || 'No valid leads could be imported',
      };
    }
    return {
      success: true,
      message: `Successfully imported ${result.insertedCount} leads into agency_leads`,
      data: { count: result.insertedCount },
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to import leads',
    };
  }
}

