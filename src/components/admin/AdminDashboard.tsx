'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Send,
  LogOut,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import Image from '@/src/components/ui/NextImage';
import { AgencyLead, fetchAdminLeads, supabase } from '@/src/lib/supabase';
import LeadsTable from './LeadsTable';
import ImportLeadsModal from './ImportLeadsModal';
import AdminLogin from './AdminLogin';
import { useToast } from '@/src/components/ui/Toast';

const CALLORA_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1U7jZn5H_sMtfVJbmgCCCSYwS-Hm2PU2H_QqNT6qnkn-HqUcCPZ8flaUJr5GQPplS4MvnS8yb5_wA2i89oAvJQS4E3GsL7uga5qu3nS9N0mZCLbkZxzCGQg58a8LX-3kt5JttbIilqhOm-TSoZ6-ZkvsfuH53iGkaYBETHOhzx1kBtO2FyYA3BcE4dcT7q2qbmhumVGDnMOID4KEvCzlnH05sly4A62oTBymlorpAyphB-LqRqWnt_lqw0';

export const AdminDashboard: React.FC = () => {
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUserEmail, setAdminUserEmail] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'campaigns'>('leads');

  // Leads Data
  const [leads, setLeads] = useState<AgencyLead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [storageSource, setStorageSource] = useState<'supabase' | 'local'>('local');
  const [isImportOpen, setIsImportOpen] = useState<boolean>(false);

  // Check auth state on load
  useEffect(() => {
    const checkAuth = async () => {
      // 1. Check Supabase session
      if (supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data.session?.user) {
            setIsAuthenticated(true);
            setAdminUserEmail(data.session.user.email || 'Admin');
            return;
          }
        } catch (e) {
          // ignore
        }
      }

      // 2. Check local session storage fallback
      const storedAuth = sessionStorage.getItem('callora_admin_auth');
      const storedEmail = sessionStorage.getItem('callora_admin_email');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
        setAdminUserEmail(storedEmail || 'admin@callora.pro');
      }
    };

    checkAuth();
  }, []);

  // Fetch leads
  const loadLeads = async () => {
    setLoading(true);
    try {
      const result = await fetchAdminLeads();
      setLeads(result.leads);
      setStorageSource(result.source);
    } catch (err: any) {
      toast.error('Failed to load leads', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch {
        // ignore
      }
    }
    sessionStorage.removeItem('callora_admin_auth');
    sessionStorage.removeItem('callora_admin_email');
    setIsAuthenticated(false);
    toast.info('Logged Out', 'You have been signed out of the admin panel.');
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={(email) => {
          setIsAuthenticated(true);
          setAdminUserEmail(email);
        }}
      />
    );
  }

  // Quick stats
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => (l.status || 'New') === 'New').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contacted').length;
  const closedLeads = leads.filter((l) => l.status === 'Closed' || l.status === 'Meeting Booked').length;

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col antialiased">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0f0f13]/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2.5">
              <Image
                src={CALLORA_LOGO_URL}
                alt="Callora.pro"
                width={130}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </a>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ff6a3d]" />
              <span>Admin Center</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800">
              <Image
                src="https://i.ibb.co.com/fdLzRRFn/ma-hakim-image.png"
                alt="Muhammad - Avatar"
                width={40}
                height={40}
                className="w-8 h-8 rounded-full object-cover border border-zinc-700/60"
              />
              <span className="hidden md:inline-block text-xs font-mono text-zinc-300">
                {adminUserEmail}
              </span>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 transition-colors flex items-center gap-1.5"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>
            <button
              onClick={handleLogout}
              className="text-xs font-mono text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-900/30 hover:bg-red-950/40 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 w-full flex-1 flex flex-col lg:flex-row gap-8">
        {/* Left Navigation Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="bg-[#0f0f13] border border-zinc-800 rounded-2xl p-3">
            <nav className="space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-[#ff6a3d] text-[#09090b] shadow-[0_0_15px_rgba(255,106,61,0.35)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('leads')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                  activeTab === 'leads'
                    ? 'bg-[#ff6a3d] text-[#09090b] shadow-[0_0_15px_rgba(255,106,61,0.35)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>All Leads</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeTab === 'leads' ? 'bg-[#09090b]/20 text-[#09090b]' : 'bg-zinc-900 text-zinc-400'
                  }`}
                >
                  {totalLeads}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('campaigns')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                  activeTab === 'campaigns'
                    ? 'bg-[#ff6a3d] text-[#09090b] shadow-[0_0_15px_rgba(255,106,61,0.35)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Send className="w-4 h-4" />
                  <span>Campaigns</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500 font-mono">
                  Beta
                </span>
              </button>
            </nav>
          </div>

          {/* Pipeline Quick Snapshot */}
          <div className="bg-[#0f0f13] border border-zinc-800 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              Pipeline Snapshot
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>New Inquiries</span>
                </span>
                <span className="font-mono font-bold text-white">{newLeads}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  <span>In Follow-Up</span>
                </span>
                <span className="font-mono font-bold text-white">{contactedLeads}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Booked / Closed</span>
                </span>
                <span className="font-mono font-bold text-white">{closedLeads}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Main Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#0f0f13] border border-zinc-800 rounded-2xl p-5">
                  <span className="text-xs font-mono text-zinc-400 uppercase">Total Captured</span>
                  <div className="text-3xl font-bold text-white font-mono mt-1">{totalLeads}</div>
                  <span className="text-xs text-zinc-500 mt-2 block">Direct agency inquiries</span>
                </div>
                <div className="bg-[#0f0f13] border border-zinc-800 rounded-2xl p-5">
                  <span className="text-xs font-mono text-[#ff6a3d] uppercase">Need Attention</span>
                  <div className="text-3xl font-bold text-[#ff6a3d] font-mono mt-1">{newLeads}</div>
                  <span className="text-xs text-zinc-500 mt-2 block">Awaiting response</span>
                </div>
                <div className="bg-[#0f0f13] border border-zinc-800 rounded-2xl p-5">
                  <span className="text-xs font-mono text-emerald-400 uppercase">Conversion Rate</span>
                  <div className="text-3xl font-bold text-emerald-400 font-mono mt-1">
                    {totalLeads > 0 ? `${Math.round((closedLeads / totalLeads) * 100)}%` : '0%'}
                  </div>
                  <span className="text-xs text-zinc-500 mt-2 block">Meeting / Closed ratio</span>
                </div>
              </div>

              {/* Data Table */}
              <LeadsTable
                leads={leads}
                loading={loading}
                onRefresh={loadLeads}
                onOpenImport={() => setIsImportOpen(true)}
                storageSource={storageSource}
              />
            </div>
          )}

          {activeTab === 'leads' && (
            <LeadsTable
              leads={leads}
              loading={loading}
              onRefresh={loadLeads}
              onOpenImport={() => setIsImportOpen(true)}
              storageSource={storageSource}
            />
          )}

          {activeTab === 'campaigns' && (
            <div className="bg-[#0f0f13] border border-zinc-800 rounded-2xl p-8 text-center max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-xl bg-[#ff6a3d]/15 border border-[#ff6a3d]/30 text-[#ff6a3d] flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Automated Email &amp; SMS Sequences</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Export your current filtered leads list to CSV to sync directly into Lemlist, Instantly, or your local cold outbound engine. In-app drip campaign automation module is currently in active staging.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('leads')}
                className="py-2.5 px-5 rounded-xl bg-[#ff6a3d] text-[#09090b] font-mono text-xs font-bold inline-flex items-center gap-2 hover:bg-[#ff7d54] transition-all"
              >
                <span>Go to Leads &amp; Export CSV</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* CSV Import Modal */}
      <ImportLeadsModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportComplete={loadLeads}
      />
    </div>
  );
};
export default AdminDashboard;
