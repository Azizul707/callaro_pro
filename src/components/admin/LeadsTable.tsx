'use client';

import React, { useState } from 'react';
import {
  Download,
  Upload,
  Search,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  Building,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Database,
} from 'lucide-react';
import Papa from 'papaparse';
import { AgencyLead, LeadStatus } from '@/src/lib/supabase';
import { updateLeadStatusAction } from '@/src/app/actions/leadActions';
import { useToast } from '@/src/components/ui/Toast';

interface LeadsTableProps {
  leads: AgencyLead[];
  loading: boolean;
  onRefresh: () => void;
  onOpenImport: () => void;
  storageSource: 'supabase' | 'local';
}

const STATUS_CONFIG: Record<LeadStatus, { label: string; badgeClass: string; dotClass: string }> = {
  New: {
    label: 'New',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    dotClass: 'bg-blue-400',
  },
  Contacted: {
    label: 'Contacted',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dotClass: 'bg-amber-400',
  },
  'Meeting Booked': {
    label: 'Meeting Booked',
    badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    dotClass: 'bg-purple-400',
  },
  Closed: {
    label: 'Closed',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dotClass: 'bg-emerald-400',
  },
};

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  loading,
  onRefresh,
  onOpenImport,
  storageSource,
}) => {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter sources dynamically
  const uniqueSources = Array.from(new Set(leads.map((l) => l.source || 'General'))).filter(Boolean);

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (lead.full_name && lead.full_name.toLowerCase().includes(q)) ||
      (lead.email && lead.email.toLowerCase().includes(q)) ||
      (lead.phone_number && lead.phone_number.includes(q)) ||
      (lead.business_name && lead.business_name.toLowerCase().includes(q));

    const matchesStatus =
      statusFilter === 'ALL' || (lead.status || 'New') === statusFilter;

    const matchesSource =
      sourceFilter === 'ALL' || (lead.source || 'General') === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / pageSize));
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Status Change Handler with Server Action
  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setUpdatingId(leadId);
    try {
      const res = await updateLeadStatusAction(leadId, newStatus);
      if (res.success) {
        toast.success('Status Updated', `Lead status changed to "${newStatus}"`);
        onRefresh();
      } else {
        toast.error('Update Failed', res.error || 'Could not update status');
      }
    } catch (err: any) {
      toast.error('Error', err.message || 'Status update failed');
    } finally {
      setUpdatingId(null);
    }
  };

  // CSV Export Handler
  const handleExportCsv = () => {
    if (filteredLeads.length === 0) {
      toast.info('No Data to Export', 'There are no leads matching your current filters.');
      return;
    }

    const exportData = filteredLeads.map((l) => ({
      ID: l.id || '',
      Date: l.created_at ? new Date(l.created_at).toLocaleString() : '',
      'Full Name': l.full_name || '',
      'Business Name': l.business_name || '',
      Phone: l.phone_number || '',
      Email: l.email,
      Source: l.source,
      Status: l.status || 'New',
    }));

    const csvString = Papa.unparse(exportData);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `callora-leads-export-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(
      'CSV Exported!',
      `Exported ${filteredLeads.length} leads ready for email campaigns.`
    );
  };

  return (
    <div className="bg-[#0f0f13] border border-zinc-800/90 rounded-2xl p-5 sm:p-7 shadow-2xl">
      {/* Top Controls Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Agency Leads
            </h2>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[#ff6a3d]">
              {filteredLeads.length} Total
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-800/80">
              <Database className="w-3 h-3 text-[#ff6a3d]" />
              <span>{storageSource === 'supabase' ? 'Supabase Table' : 'Local Cache'}</span>
            </div>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time pipeline from ROI calculators, audit requests, and service checkout orders.
          </p>
        </div>

        {/* Action Buttons: Export & Import & Refresh */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="p-2.5 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#ff6a3d]' : ''}`} />
          </button>

          <button
            type="button"
            onClick={onOpenImport}
            className="py-2 px-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/70 hover:bg-zinc-800/70 text-zinc-200 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[#ff6a3d]" />
            <span>Import CSV</span>
          </button>

          <button
            type="button"
            onClick={handleExportCsv}
            className="py-2 px-3.5 rounded-xl bg-[#ff6a3d] hover:bg-[#ff7d54] text-[#09090b] font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(255,106,61,0.35)] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, email, phone..."
            className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff6a3d] transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <Filter className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl pl-9 pr-8 py-2 text-xs text-zinc-300 focus:outline-none focus:border-[#ff6a3d] transition-colors appearance-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Meeting Booked">Meeting Booked</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Source Filter */}
        <div>
          <select
            value={sourceFilter}
            onChange={(e) => {
              setSourceFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-300 focus:outline-none focus:border-[#ff6a3d] transition-colors appearance-none cursor-pointer"
          >
            <option value="ALL">All Sources</option>
            {uniqueSources.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table Container */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-950/80 text-zinc-400 font-mono text-[11px] uppercase tracking-wider border-b border-zinc-800">
            <tr>
              <th className="py-3 px-4">Lead</th>
              <th className="py-3 px-4">Contact Details</th>
              <th className="py-3 px-4">Source</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Created Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 bg-zinc-950/30">
            {paginatedLeads.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-zinc-500 font-mono">
                  {loading ? 'Fetching pipeline leads...' : 'No leads matching the current filter criteria.'}
                </td>
              </tr>
            ) : (
              paginatedLeads.map((lead) => {
                const currentStatus: LeadStatus = lead.status || 'New';
                const statusMeta = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.New;
                const formattedDate = lead.created_at
                  ? new Date(lead.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Recent';

                return (
                  <tr key={lead.id} className="hover:bg-zinc-900/40 transition-colors">
                    {/* Lead Name & Business */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">
                        {lead.full_name || 'Valued Business Owner'}
                      </div>
                      {lead.business_name && (
                        <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-0.5">
                          <Building className="w-3 h-3 text-zinc-500" />
                          <span>{lead.business_name}</span>
                        </div>
                      )}
                      <div className="font-mono text-[10px] text-zinc-600 mt-1">
                        ID: {lead.id ? lead.id.slice(0, 8) : 'anon'}
                      </div>
                    </td>

                    {/* Contact Details */}
                    <td className="py-3.5 px-4 space-y-1">
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <Mail className="w-3.5 h-3.5 text-[#ff6a3d]" />
                        <a
                          href={`mailto:${lead.email}`}
                          className="hover:underline hover:text-white transition-colors"
                        >
                          {lead.email}
                        </a>
                      </div>
                      {lead.phone_number ? (
                        <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-mono">
                          <Phone className="w-3.5 h-3.5 text-zinc-500" />
                          <a
                            href={`tel:${lead.phone_number}`}
                            className="hover:underline hover:text-zinc-200"
                          >
                            {lead.phone_number}
                          </a>
                        </div>
                      ) : (
                        <span className="text-[10px] text-zinc-600 font-mono">No phone</span>
                      )}
                    </td>

                    {/* Source */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block max-w-[200px] truncate px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                        {lead.source}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        disabled={updatingId === lead.id}
                        value={currentStatus}
                        onChange={(e) =>
                          handleStatusChange(lead.id || '', e.target.value as LeadStatus)
                        }
                        className={`text-xs font-semibold font-mono rounded-lg px-2.5 py-1 border transition-colors cursor-pointer appearance-none bg-zinc-900 ${statusMeta.badgeClass}`}
                      >
                        <option value="New">● New</option>
                        <option value="Contacted">● Contacted</option>
                        <option value="Meeting Booked">● Meeting Booked</option>
                        <option value="Closed">● Closed</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-zinc-400 font-mono text-[11px]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-500" />
                        <span>{formattedDate}</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {filteredLeads.length > pageSize && (
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400 font-mono">
          <div>
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, filteredLeads.length)} of {filteredLeads.length} leads
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 rounded bg-zinc-900 text-white font-bold">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default LeadsTable;
