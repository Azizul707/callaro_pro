'use client';

import React, { useState } from 'react';
import { submitAuditLead } from '@/src/app/actions/leadActions';
import { useToast } from '@/src/components/ui/Toast';

export interface SelectedServicePlan {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  description: string;
  isBundle?: boolean;
}

interface ServiceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: SelectedServicePlan | null;
}

export const ServiceOrderModal: React.FC<ServiceOrderModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
}) => {
  const toast = useToast();
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [tradeType, setTradeType] = useState('Plumbing');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !selectedPlan) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      // Constructs descriptive source string with exact plan, trade, and company
      const orderSource = `Service Order: ${selectedPlan.name} (${selectedPlan.price}/${selectedPlan.period}) | Company: ${businessName.trim() || 'N/A'} | Trade: ${tradeType}${additionalNotes ? ` | Notes: ${additionalNotes.trim()}` : ''}`;

      const res = await submitAuditLead({
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        source: orderSource,
      });

      if (!res.success) {
        const err = res.error || 'Failed to submit order. Please check your information.';
        setErrorMsg(err);
        toast.error('Order Submission Failed', err);
        setLoading(false);
        return;
      }

      toast.success(
        'Order Received & Logged!',
        `Your setup for ${selectedPlan.name} ($0 setup) has been saved. We will contact you within 15 mins.`
      );
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFullName('');
        setBusinessName('');
        setPhoneNumber('');
        setEmail('');
        setAdditionalNotes('');
      }, 4000);
    } catch (err: any) {
      const msg = 'Something went wrong. Please try again or email info@callora.pro';
      setErrorMsg(msg);
      toast.error('Error Processing Order', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-base/85 backdrop-blur-md transition-all overflow-y-auto">
      <div className="relative w-full max-w-lg bg-surface-card border border-primary/40 rounded-3xl p-7 md:p-9 shadow-[0_0_50px_rgba(255,106,61,0.3)] my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-text-dim hover:text-text-primary p-2 rounded-full hover:bg-surface-raised transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-status-positive/20 border border-status-positive/40 text-status-positive flex items-center justify-center mx-auto mb-4 animate-bounce">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">Order Confirmed!</h3>
            <p className="text-sm text-text-muted mb-5 leading-relaxed">
              Thank you <span className="text-text-primary font-semibold">{fullName || 'there'}</span>! Your order for <span className="text-primary font-bold">{selectedPlan.name}</span> has been received and logged directly into our agency dashboard.
            </p>

            <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle text-left space-y-2 text-xs font-code mb-5">
              <div className="flex justify-between text-text-muted pb-1 border-b border-border-subtle">
                <span>Selected System:</span>
                <span className="text-text-primary font-bold">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between text-text-muted pb-1 border-b border-border-subtle">
                <span>Rate:</span>
                <span className="text-primary font-bold">{selectedPlan.price}/{selectedPlan.period}</span>
              </div>
              <div className="flex justify-between text-text-muted pb-1 border-b border-border-subtle">
                <span>Setup Fee:</span>
                <span className="text-status-positive font-bold">$0 (Zero Setup Fees)</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Status:</span>
                <span className="text-status-positive font-bold">✓ Pending Setup Call</span>
              </div>
            </div>

            <p className="text-xs text-text-dim font-code">
              MA Hakim will contact you within 15 minutes to configure your custom AI system and assign your dedicated number.
            </p>
          </div>
        ) : (
          <>
            {/* Order Header / Plan summary */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-code bg-primary/20 text-primary border border-primary/30 uppercase font-bold tracking-wider">
                {selectedPlan.badge || 'Service Order'}
              </span>
              <span className="text-xs font-code text-status-positive flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-status-positive"></span>
                $0 Setup · Month-to-Month
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-text-primary mb-1">
              {selectedPlan.name}
            </h3>

            {/* Price banner */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-extrabold font-code text-text-primary">
                {selectedPlan.price}
              </span>
              <span className="text-xs font-code text-text-dim">/{selectedPlan.period}</span>
              <span className="ml-auto text-[11px] font-code text-status-positive bg-status-positive/10 px-2 py-0.5 rounded border border-status-positive/20">
                Cancel Anytime
              </span>
            </div>

            <p className="text-xs text-text-muted mb-6 leading-relaxed">
              Fill out your company details below. We do the full done-for-you installation first and verify live calls before any billing begins.
            </p>

            <form onSubmit={handleSubmitOrder} className="space-y-3.5 text-left">
              <div>
                <label className="block text-[11px] font-code text-text-muted mb-1 uppercase font-semibold">
                  Business Owner / Contact Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dave Miller"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary text-text-primary text-sm outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-code text-text-muted mb-1 uppercase font-semibold">
                    Company / Trade Business Name
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Plumbing LLC"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary text-text-primary text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-code text-text-muted mb-1 uppercase font-semibold">
                    Trade Industry
                  </label>
                  <select
                    value={tradeType}
                    onChange={(e) => setTradeType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary text-text-primary text-sm outline-none transition-all"
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="HVAC">HVAC &amp; Heating</option>
                    <option value="Roofing">Roofing &amp; Gutters</option>
                    <option value="Electrical">Electrician</option>
                    <option value="General Contractor">General Contractor</option>
                    <option value="Landscaping">Landscaping</option>
                    <option value="Home Services">Other Home Services</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-code text-text-muted mb-1 uppercase font-semibold">
                    Business Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. (555) 234-5678"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary text-text-primary text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-code text-text-muted mb-1 uppercase font-semibold">
                    Business Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. dave@apexplumbing.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary text-text-primary text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-code text-text-muted mb-1 uppercase font-semibold">
                  Any Specific Requirements or Notes (Optional)
                </label>
                <input
                  type="text"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. Need after-hours emergency call routing"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary text-text-primary text-sm outline-none transition-all"
                />
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
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold border-none hover:scale-105 transition-transform text-sm font-code flex items-center justify-center gap-2 active:scale-[0.98] shadow-[0_0_20px_rgba(255,106,61,0.4)] cursor-pointer disabled:opacity-60 mt-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-surface-base border-t-transparent rounded-full animate-spin"></span>
                    <span>Recording Order in Supabase...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Order &amp; Start DFY Setup</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-[10px] font-code text-text-dim leading-relaxed">
                ✓ No payment upfront · Pay via Payoneer/Invoice after system is tested &amp; live · Month-to-month
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceOrderModal;
