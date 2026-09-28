'use client';

import React, { useState } from 'react';
import { submitAuditLead } from '@/src/app/actions/leadActions';
import { useToast } from '@/src/components/ui/Toast';

interface AuditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSource?: string;
}

export const AuditBookingModal: React.FC<AuditBookingModalProps> = ({
  isOpen,
  onClose,
  defaultSource = 'Audit Booking',
}) => {
  const toast = useToast();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [tradeType, setTradeType] = useState('Plumbing');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await submitAuditLead({
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        source: `${defaultSource} (${tradeType})`,
      });

      if (!res.success) {
        const err = res.error || 'Failed to submit. Please check your details.';
        setErrorMsg(err);
        toast.error('Audit Booking Error', err);
        setLoading(false);
        return;
      }

      toast.success(
        'Audit Booked Successfully!',
        `Thanks ${fullName.trim() || 'there'}, our engineer will reach out within 15 minutes.`
      );
      setIsSuccess(true);
      // Auto close after 3 seconds or allow manual close
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFullName('');
        setPhoneNumber('');
        setEmail('');
      }, 3500);
    } catch (err: any) {
      const msg = 'Something went wrong. Please try again or reach out to info@callora.pro';
      setErrorMsg(msg);
      toast.error('Submission Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-base/80 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-lg bg-surface-card border border-primary/40 rounded-3xl p-7 md:p-9 shadow-[0_0_50px_rgba(255,106,61,0.3)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-text-dim hover:text-text-primary p-2 rounded-full hover:bg-surface-raised transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-status-positive/20 border border-status-positive/40 text-status-positive flex items-center justify-center mx-auto mb-4 animate-bounce">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">Audit Confirmed!</h3>
            <p className="text-sm text-text-muted mb-4 leading-relaxed">
              Thanks <span className="text-text-primary font-semibold">{fullName || 'there'}</span>. We received your details and MA Hakim or our lead automation engineer will reach out to you within 15 minutes to inspect your missed call leaks.
            </p>
            <div className="p-3 rounded-xl bg-surface-raised border border-border-subtle font-code text-xs text-status-positive">
              ✓ Saved to Callora Agency Pipeline
            </div>
          </div>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-raised border border-border-subtle mb-4">
              <span className="w-2 h-2 rounded-full bg-primary radar-pulse"></span>
              <span className="font-code text-xs text-primary font-bold uppercase tracking-wider">
                Free 15-Minute Audit
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-text-primary mb-2">
              Book My Free Revenue Audit
            </h3>
            <p className="text-xs sm:text-sm text-text-muted mb-6 leading-relaxed">
              We'll map your missed calls, calculate leaked revenue, and test a live SMS recovery simulation on your real phone number. Zero pressure, 100% free.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-code text-text-muted mb-1.5 uppercase font-semibold">
                  Full Name / Business Owner Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dave Miller"
                  className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary text-text-primary text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-code text-text-muted mb-1.5 uppercase font-semibold">
                  Business Phone (We'll send test SMS)
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. (555) 234-5678"
                  className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary text-text-primary text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-code text-text-muted mb-1.5 uppercase font-semibold">
                  Business Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. dave@apexplumbing.com"
                  className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary text-text-primary text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-code text-text-muted mb-1.5 uppercase font-semibold">
                  Your Primary Trade / Service
                </label>
                <select
                  value={tradeType}
                  onChange={(e) => setTradeType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary text-text-primary text-sm outline-none transition-all"
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="HVAC">HVAC &amp; Heating</option>
                  <option value="Roofing">Roofing &amp; Gutters</option>
                  <option value="Electrical">Electrician</option>
                  <option value="General Contractor">General Contractor / Remodeling</option>
                  <option value="Landscaping">Landscaping &amp; Tree Service</option>
                  <option value="Other Home Services">Other Trade / Home Service</option>
                </select>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-status-negative/10 border border-status-negative/30 text-status-negative text-xs font-code flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold border-none hover:scale-105 transition-transform text-sm font-code flex items-center justify-center gap-2 active:scale-[0.98] shadow-[0_0_20px_rgba(255,106,61,0.4)] cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-surface-base border-t-transparent rounded-full animate-spin"></span>
                    <span>Securing Your Audit Slot...</span>
                  </>
                ) : (
                  <>
                    <span>Book My Free Revenue Audit Now</span>
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  </>
                )}
              </button>

              <p className="text-[11px] font-code text-text-dim text-center pt-1">
                Founder-Direct Access · Done-For-You Installation · No Contracts
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuditBookingModal;
