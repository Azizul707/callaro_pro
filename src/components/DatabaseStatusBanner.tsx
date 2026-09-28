'use client';

import React, { useState, useEffect } from 'react';
import { checkSupabaseConnection, getStoredLeads } from '@/src/lib/supabase';

export const DatabaseStatusBanner: React.FC = () => {
  const [status, setStatus] = useState<{
    loading: boolean;
    connected: boolean;
    tableExists: boolean;
    url: string;
    error?: string;
  }>({
    loading: true,
    connected: false,
    tableExists: false,
    url: '',
  });

  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [leadsCount, setLeadsCount] = useState(0);

  const checkStatus = async () => {
    setStatus((prev) => ({ ...prev, loading: true }));
    const result = await checkSupabaseConnection();
    setStatus({
      loading: false,
      connected: result.connected,
      tableExists: result.tableExists,
      url: result.url,
      error: result.error,
    });
    setLeadsCount(getStoredLeads().length);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const sqlCode = `-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/gumsaoddnjhgptmxembc/sql/new)
CREATE TABLE IF NOT EXISTS public.agency_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT,
    phone_number TEXT,
    email TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'Contact Form',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.agency_leads ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts from website forms & calculator
CREATE POLICY "Allow public anonymous inserts" 
ON public.agency_leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated reads
CREATE POLICY "Allow authenticated read access" 
ON public.agency_leads 
FOR SELECT 
TO authenticated 
USING (true);`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // If table exists, show subtle green indicator with sync capability
  if (status.connected && status.tableExists) {
    return (
      <div className="bg-surface-raised/80 border-b border-status-positive/20 px-4 py-1.5 text-xs font-code">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-status-positive">
            <span className="w-2 h-2 rounded-full bg-status-positive"></span>
            <span className="font-semibold">Supabase Connected: Table &apos;agency_leads&apos; is Live &amp; Accepting Submissions</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin"
              className="text-[#ff6a3d] hover:underline font-bold transition-colors flex items-center gap-1 text-[11px] bg-[#ff6a3d]/10 px-2 py-0.5 rounded border border-[#ff6a3d]/20"
            >
              <span>Open Admin Dashboard</span>
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </a>
            <a
              href="https://supabase.com/dashboard/project/gumsaoddnjhgptmxembc/editor"
              target="_blank"
              rel="noreferrer"
              className="text-text-muted hover:text-primary transition-colors flex items-center gap-1 text-[11px]"
            >
              <span>View in Supabase</span>
              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-card border-b border-primary/40 px-4 py-2.5 text-xs font-code">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span className="text-text-primary font-bold">Supabase Project Connected:</span>
          <span className="text-text-muted hidden md:inline truncate max-w-[280px]">
            {status.url}
          </span>
          <span className="px-2 py-0.5 rounded bg-status-negative/20 text-status-negative border border-status-negative/40 text-[10px] font-bold">
            Table &apos;agency_leads&apos; Missing
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary hover:underline font-bold cursor-pointer flex items-center gap-1"
          >
            <span>{isOpen ? 'Hide 1-Click SQL Fix' : 'Show 1-Click SQL Fix'}</span>
            <span className="material-symbols-outlined text-[14px]">
              {isOpen ? 'expand_less' : 'terminal'}
            </span>
          </button>
          <button
            onClick={checkStatus}
            disabled={status.loading}
            className="px-2.5 py-1 rounded bg-surface-raised border border-border-subtle hover:border-primary text-text-muted hover:text-text-primary transition-all cursor-pointer"
          >
            {status.loading ? 'Checking...' : 'Re-check Connection'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="max-w-[1200px] mx-auto mt-3 p-4 rounded-xl bg-surface-base border border-primary/30">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-text-primary text-xs">
              Run this SQL script in your Supabase Dashboard:
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://supabase.com/dashboard/project/gumsaoddnjhgptmxembc/sql/new"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded bg-primary/20 text-primary border border-primary/40 hover:bg-primary hover:text-surface-base transition-colors flex items-center gap-1 text-[11px]"
              >
                <span>Open Supabase SQL Editor</span>
                <span className="material-symbols-outlined text-[12px]">open_in_new</span>
              </a>
              <button
                onClick={copySql}
                className="px-2.5 py-1 rounded bg-primary text-surface-base font-bold flex items-center gap-1 text-[11px] cursor-pointer hover:bg-white"
              >
                <span className="material-symbols-outlined text-[12px]">content_copy</span>
                <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
              </button>
            </div>
          </div>
          <pre className="text-[11px] p-3 rounded-lg bg-surface-raised text-text-muted overflow-x-auto border border-border-subtle font-code">
            {sqlCode}
          </pre>
          <p className="text-[10px] text-text-dim mt-2">
            * Once you run this in Supabase, click &quot;Re-check Connection&quot; above. All submitted leads are also safely captured in your browser so zero data is lost.
          </p>
        </div>
      )}
    </div>
  );
};

export default DatabaseStatusBanner;
