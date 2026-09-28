-- ==============================================================================
-- Callora.pro Supabase Table Definition: agency_leads
-- Description: Stores high-intent leads from Contact Form, Audit Bookings, and ROI Calculator
-- ==============================================================================

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.agency_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT,
    phone_number TEXT,
    email TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'Contact Form',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Indexes for fast analytics and deduplication queries
CREATE INDEX IF NOT EXISTS idx_agency_leads_email ON public.agency_leads(email);
CREATE INDEX IF NOT EXISTS idx_agency_leads_source ON public.agency_leads(source);
CREATE INDEX IF NOT EXISTS idx_agency_leads_created_at ON public.agency_leads(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.agency_leads ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies:
-- Allow anonymous inserts from web clients / public forms
CREATE POLICY "Allow public anonymous inserts" 
ON public.agency_leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow service role or authenticated agency admins full access
CREATE POLICY "Allow authenticated read access" 
ON public.agency_leads 
FOR SELECT 
TO authenticated 
USING (true);
