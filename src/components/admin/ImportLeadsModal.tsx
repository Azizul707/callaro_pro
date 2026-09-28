'use client';

import React, { useState } from 'react';
import { Upload, X, FileSpreadsheet, Check, AlertCircle, Loader2 } from 'lucide-react';
import Papa from 'papaparse';
import { bulkImportLeadsAction } from '@/src/app/actions/leadActions';
import { useToast } from '@/src/components/ui/Toast';

interface ImportLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

interface ParsedRow {
  name?: string;
  fullName?: string;
  full_name?: string;
  email?: string;
  Email?: string;
  phone?: string;
  phoneNumber?: string;
  phone_number?: string;
  Phone?: string;
  business?: string;
  businessName?: string;
  business_name?: string;
  company?: string;
  Company?: string;
  source?: string;
  Source?: string;
  [key: string]: any;
}

export const ImportLeadsModal: React.FC<ImportLeadsModalProps> = ({
  isOpen,
  onClose,
  onImportComplete,
}) => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [previewRows, setPreviewRows] = useState<any[]>([]);
  const [totalParsed, setTotalParsed] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.name.endsWith('.csv')) {
      setErrorMsg('Please select a valid CSV (.csv) file.');
      return;
    }

    setFile(selected);

    Papa.parse<ParsedRow>(selected, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length && !results.data.length) {
          setErrorMsg('Failed to parse CSV file. Please ensure it has valid headers.');
          return;
        }

        const normalized = results.data.map((row) => ({
          name: row.name || row.fullName || row.full_name || row.Name || '',
          email: row.email || row.Email || '',
          phone: row.phone || row.phoneNumber || row.phone_number || row.Phone || '',
          business_name: row.business || row.businessName || row.business_name || row.company || row.Company || '',
          source: row.source || row.Source || 'CSV Import',
        })).filter(r => r.email && r.email.includes('@'));

        setTotalParsed(normalized.length);
        setPreviewRows(normalized.slice(0, 4));
      },
      error: (err) => {
        setErrorMsg(`CSV Parse Error: ${err.message}`);
      },
    });
  };

  const handleExecuteImport = async () => {
    if (!file) {
      setErrorMsg('Please select a CSV file first.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    Papa.parse<ParsedRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const payload = results.data
          .map((row) => ({
            name: (row.name || row.fullName || row.full_name || row.Name || '').trim(),
            email: (row.email || row.Email || '').trim().toLowerCase(),
            phone: (row.phone || row.phoneNumber || row.phone_number || row.Phone || '').trim(),
            business_name: (row.business || row.businessName || row.business_name || row.company || row.Company || '').trim(),
            source: (row.source || row.Source || 'CSV Import').trim(),
          }))
          .filter((r) => r.email && r.email.includes('@'));

        if (payload.length === 0) {
          setErrorMsg('No valid contacts with email addresses were found.');
          setLoading(false);
          return;
        }

        const res = await bulkImportLeadsAction(payload);

        if (!res.success) {
          setErrorMsg(res.error || 'Failed to import leads.');
          toast.error('Import Failed', res.error || 'Server error occurred during import.');
          setLoading(false);
          return;
        }

        toast.success(
          'Leads Imported Successfully!',
          `Added ${res.data?.count || payload.length} new leads to your Supabase pipeline.`
        );
        setLoading(false);
        onImportComplete();
        onClose();
      },
      error: (err) => {
        setErrorMsg(err.message);
        setLoading(false);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0f0f13] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-500 hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-900 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#ff6a3d]/15 border border-[#ff6a3d]/30 text-[#ff6a3d] flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Import Leads from CSV</h3>
            <p className="text-xs text-zinc-400">Bulk upload contacts to Supabase agency_leads</p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-2.5 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Upload area */}
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-zinc-800 hover:border-zinc-700 rounded-xl cursor-pointer bg-zinc-950/50 hover:bg-zinc-900/40 transition-all p-4 text-center">
            <FileSpreadsheet className="w-8 h-8 text-[#ff6a3d] mb-2" />
            <span className="text-xs font-medium text-zinc-300">
              {file ? file.name : 'Click to upload or drag & drop CSV'}
            </span>
            <span className="text-[11px] text-zinc-500 mt-1 font-mono">
              Headers: name, email, phone, company/business
            </span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Preview parsed data */}
        {previewRows.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
              <span className="font-mono text-zinc-300 font-semibold">
                Found {totalParsed} valid contacts
              </span>
              <span className="text-[11px] text-zinc-500">Previewing first {previewRows.length}:</span>
            </div>
            <div className="max-h-36 overflow-y-auto rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-2.5 space-y-1.5 font-mono text-[11px]">
              {previewRows.map((row, idx) => (
                <div key={idx} className="flex items-center justify-between text-zinc-300 py-1 px-2 rounded bg-zinc-900/40">
                  <div className="truncate max-w-[180px]">
                    <span className="text-white font-medium">{row.name || 'Unnamed'}</span>
                    <span className="text-zinc-500 text-[10px] ml-1.5">{row.email}</span>
                  </div>
                  <span className="text-zinc-400 text-[10px] shrink-0">{row.phone || 'No phone'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-300 text-xs font-mono transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!file || totalParsed === 0 || loading}
            onClick={handleExecuteImport}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#ff6a3d] hover:bg-[#ff7d54] text-[#09090b] font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,106,61,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Importing...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Import {totalParsed > 0 ? `${totalParsed} Leads` : ''}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImportLeadsModal;
