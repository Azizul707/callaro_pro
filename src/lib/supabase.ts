/**
 * Supabase client and agency_leads storage handler.
 * Supports both real Supabase integration and robust client/fallback storage.
 */
import { createClient } from '@supabase/supabase-js';

export type LeadStatus = 'New' | 'Contacted' | 'Meeting Booked' | 'Closed';

export interface AgencyLead {
  id?: string;
  full_name?: string | null;
  business_name?: string | null;
  phone_number?: string | null;
  email: string;
  source: string; // e.g. 'Calculator', 'Contact Form', 'Audit Booking'
  status?: LeadStatus;
  created_at?: string;
}

// Retrieve environment variables (Next.js / Vite / Node environments)
let rawUrl =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.SUPABASE_URL) ||
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) ||
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL) ||
  '';

// Ensure protocol is present
if (rawUrl && rawUrl.startsWith('//')) {
  rawUrl = 'https:' + rawUrl;
} else if (rawUrl && !rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
  rawUrl = 'https://' + rawUrl;
}

const supabaseUrl = rawUrl;

const supabaseAnonKey =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) ||
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')
);

// Initialize Supabase client if configured
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local fallback store for offline / preview demo mode
const LOCAL_STORAGE_KEY = 'callora_agency_leads';

export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  tableExists: boolean;
  url: string;
  error?: string;
}> {
  if (!supabase) {
    return {
      connected: false,
      tableExists: false,
      url: supabaseUrl,
      error: 'Supabase credentials are not configured.',
    };
  }

  try {
    const { data, error } = await supabase.from('agency_leads').select('id').limit(1);
    if (error) {
      if (error.code === 'PGRST205' || error.message.includes('Could not find the table')) {
        return {
          connected: true,
          tableExists: false,
          url: supabaseUrl,
          error: "Table 'agency_leads' does not exist yet in your Supabase database.",
        };
      }
      return {
        connected: false,
        tableExists: false,
        url: supabaseUrl,
        error: error.message,
      };
    }
    return {
      connected: true,
      tableExists: true,
      url: supabaseUrl,
    };
  } catch (err: any) {
    return {
      connected: false,
      tableExists: false,
      url: supabaseUrl,
      error: err?.message || 'Connection failed',
    };
  }
}

export async function insertAgencyLead(lead: {
  full_name?: string | null;
  phone_number?: string | null;
  email: string;
  source: string;
}): Promise<{ success: boolean; data?: any; error?: string; savedToSupabase?: boolean }> {
  const timestamp = new Date().toISOString();
  const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}`;
  
  const leadPayload: AgencyLead = {
    id,
    full_name: lead.full_name || null,
    phone_number: lead.phone_number || null,
    email: lead.email.trim().toLowerCase(),
    source: lead.source || 'General',
    created_at: timestamp,
  };

  // Try inserting into Supabase if configured
  if (supabase) {
    try {
      // Note: We do plain insert without .select().single() because anon clients typically
      // do not have SELECT permissions under standard Supabase RLS policies (preventing 42501).
      const { error } = await supabase
        .from('agency_leads')
        .insert([leadPayload]);

      if (error) {
        console.warn('Supabase insert warning, falling back to local capture:', error.message);
        saveToLocalFallback(leadPayload);
        return {
          success: true,
          data: leadPayload,
          savedToSupabase: false,
          error: error.message,
        };
      }

      console.log('✅ Lead captured in Supabase table agency_leads:', leadPayload);
      saveToLocalFallback(leadPayload); // keep in sync
      return { success: true, data: leadPayload, savedToSupabase: true };
    } catch (err: any) {
      console.warn('Supabase exception, falling back to local capture:', err);
      saveToLocalFallback(leadPayload);
      return {
        success: true,
        data: leadPayload,
        savedToSupabase: false,
        error: err.message,
      };
    }
  }

  // Graceful fallback for local development or preview
  saveToLocalFallback(leadPayload);
  return { success: true, data: leadPayload, savedToSupabase: false };
}

function saveToLocalFallback(lead: AgencyLead) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      existing.unshift(lead);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing.slice(0, 100)));
    }
    console.log('📝 Lead captured in local storage (Supabase ready):', lead);
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
}

export function getStoredLeads(): AgencyLead[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

/**
 * Fetch leads for the admin dashboard.
 * Queries Supabase `agency_leads` table, ordered newest first,
 * with seamless fallback/merging with local storage.
 */
export async function fetchAdminLeads(): Promise<{ leads: AgencyLead[]; error?: string; source: 'supabase' | 'local' }> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('agency_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const mapped = data.map((d: any) => ({
          id: d.id,
          full_name: d.full_name || '',
          business_name: d.business_name || '',
          phone_number: d.phone_number || '',
          email: d.email || '',
          source: d.source || 'General',
          status: (d.status as LeadStatus) || 'New',
          created_at: d.created_at || new Date().toISOString(),
        }));
        return { leads: mapped, source: 'supabase' };
      }
      console.warn('Error querying Supabase leads table, using local fallback:', error?.message);
    } catch (e: any) {
      console.warn('Exception querying Supabase leads:', e);
    }
  }

  // Fallback to local store
  const local = getStoredLeads().map((l) => ({
    ...l,
    status: l.status || 'New',
  }));
  return { leads: local, source: 'local' };
}

/**
 * Updates the status of an agency lead.
 */
export async function updateLeadStatus(
  leadId: string,
  newStatus: LeadStatus
): Promise<{ success: boolean; error?: string }> {
  // Update in local fallback first
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const existing: AgencyLead[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      const updated = existing.map((item) =>
        item.id === leadId ? { ...item, status: newStatus } : item
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  // Update in Supabase if online
  if (supabase) {
    try {
      const { error } = await supabase
        .from('agency_leads')
        .update({ status: newStatus })
        .eq('id', leadId);

      if (error) {
        console.warn('Supabase status update error:', error.message);
        return { success: true, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: true, error: err.message };
    }
  }

  return { success: true };
}

/**
 * Bulk inserts leads from CSV upload.
 */
export async function bulkInsertAgencyLeads(
  leads: Array<{
    name?: string;
    email: string;
    phone?: string;
    business_name?: string;
    source?: string;
  }>
): Promise<{ success: boolean; insertedCount: number; error?: string }> {
  const timestamp = new Date().toISOString();
  const payloads: AgencyLead[] = leads
    .filter((l) => l.email && l.email.includes('@'))
    .map((l) => ({
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}_${Math.random()}`,
      full_name: l.name || null,
      business_name: l.business_name || null,
      phone_number: l.phone || null,
      email: l.email.trim().toLowerCase(),
      source: l.source || 'CSV Import',
      status: 'New',
      created_at: timestamp,
    }));

  if (payloads.length === 0) {
    return { success: false, insertedCount: 0, error: 'No valid leads found in CSV' };
  }

  // Save to local storage
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const existing: AgencyLead[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      const combined = [...payloads, ...existing].slice(0, 500);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(combined));
    } catch {
      // ignore
    }
  }

  // Insert into Supabase
  if (supabase) {
    try {
      const { error } = await supabase.from('agency_leads').insert(payloads);
      if (error) {
        console.warn('Supabase bulk insert warning:', error.message);
        return { success: true, insertedCount: payloads.length, error: error.message };
      }
    } catch (e: any) {
      console.warn('Supabase bulk insert error:', e);
    }
  }

  return { success: true, insertedCount: payloads.length };
}

/**
 * Pushes any previously cached local leads up to Supabase agency_leads table.
 */
export async function syncLocalLeadsToSupabase(): Promise<{ syncedCount: number; errors: number }> {
  if (!supabase) return { syncedCount: 0, errors: 0 };
  const leads = getStoredLeads();
  if (!leads.length) return { syncedCount: 0, errors: 0 };

  let synced = 0;
  let errors = 0;

  for (const lead of leads) {
    try {
      const { error } = await supabase.from('agency_leads').insert([
        {
          full_name: lead.full_name || null,
          phone_number: lead.phone_number || null,
          email: lead.email,
          source: lead.source || 'Local Sync',
          created_at: lead.created_at || new Date().toISOString(),
        },
      ]);
      if (!error) {
        synced++;
      } else {
        errors++;
      }
    } catch {
      errors++;
    }
  }

  return { syncedCount: synced, errors };
}
