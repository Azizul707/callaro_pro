'use client';

import React, { useState, useEffect } from 'react';
import { validateAndSaveCalculatorEmail } from '@/src/app/actions/leadActions';
import { useToast } from '@/src/components/ui/Toast';

interface GatedRoiCalculatorProps {
  onBookAuditClick?: () => void;
}

export const GatedRoiCalculator: React.FC<GatedRoiCalculatorProps> = ({ onBookAuditClick }) => {
  const toast = useToast();
  // Gating state
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');

  // Slider inputs
  // 1. Average Value of a Job ($100 - $5,000)
  const [jobValue, setJobValue] = useState<number>(400);
  // 2. Calls Missed Per Week (1 - 50)
  const [missedCalls, setMissedCalls] = useState<number>(5);
  // 3. Lead Conversion Rate (10% - 80%)
  const [conversionRate, setConversionRate] = useState<number>(40);

  // Check persistent unlock state from localStorage on mount
  useEffect(() => {
    try {
      const storedUnlocked = localStorage.getItem('callora_roi_unlocked');
      const storedEmail = localStorage.getItem('callora_user_email');
      if (storedUnlocked === 'true' && storedEmail) {
        setIsUnlocked(true);
        setUserEmail(storedEmail);
      }
    } catch {
      // LocalStorage access handling
    }
  }, []);

  // Strict formulas:
  // Monthly Lost Revenue: (Value * Missed Calls * 4)
  const monthlyLostRevenue = Math.round(jobValue * missedCalls * 4);
  
  // Estimated Annual Recovered Revenue with Callora: (Monthly Lost Revenue * 12) * 0.65
  const annualRecoveredRevenue = Math.round(monthlyLostRevenue * 12 * 0.65);
  
  // Monthly Recovered Revenue (for monthly metric card)
  const monthlyRecoveredRevenue = Math.round(monthlyLostRevenue * 0.65);
  
  // Estimated recovered jobs per month based on conversion rate
  const monthlyMissedTotal = missedCalls * 4;
  const recoveredJobsMonthly = Math.max(1, Math.round(monthlyMissedTotal * (conversionRate / 100)));

  const handleUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const email = emailInput.trim();
    if (!email) {
      setErrorMsg('Please enter your business email to unlock the calculator.');
      return;
    }

    setLoading(true);

    try {
      // Call Server Action with disposable check & Supabase storage
      const result = await validateAndSaveCalculatorEmail(email);

      if (!result.success) {
        const err = result.error || 'Please use a valid personal or business email.';
        setErrorMsg(err);
        toast.error('Email Verification', err);
        setLoading(false);
        return;
      }

      // Success: instantly unlock without OTP
      setIsUnlocked(true);
      setUserEmail(email);
      toast.success(
        'ROI Calculator Unlocked!',
        'Adjust the sliders to view your live leaked revenue simulation.'
      );
      try {
        localStorage.setItem('callora_roi_unlocked', 'true');
        localStorage.setItem('callora_user_email', email);
      } catch {
        // LocalStorage fallback
      }
    } catch (err: any) {
      console.error('Unlock error:', err);
      const errText = 'Please use a valid personal or business email.';
      setErrorMsg(errText);
      toast.error('Verification Error', errText);
    } finally {
      setLoading(false);
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    if (onBookAuditClick) {
      e.preventDefault();
      onBookAuditClick();
    } else {
      const target = document.getElementById('book');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-24 border-t border-border-subtle px-6 bg-surface-base" id="calculator">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-code text-xs text-primary uppercase tracking-wider mb-2 block font-semibold">
            Interactive Calculator
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-3">
            See Your Hidden Revenue
          </h2>
          <p className="text-base text-text-muted">
            Move the sliders below to estimate how much revenue your business may be losing—and how much Callora can help recover.
          </p>
        </div>

        <div className="card-border-glow bg-surface-card rounded-3xl p-6 md:p-10 max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
          {/* SOFT GATE OVERLAY (Frictionless Email Access Control) */}
          {!isUnlocked && (
            <div className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-surface-base/80 backdrop-blur-md transition-all duration-500">
              <div className="w-full max-w-lg bg-surface-card/95 border border-primary/40 rounded-2xl p-7 md:p-9 shadow-[0_0_50px_rgba(255,106,61,0.25)] text-center relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-5 text-primary shadow-[0_0_20px_rgba(255,106,61,0.3)]">
                  <span className="material-symbols-outlined text-[28px]">lock_open</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary font-code text-xs mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  Instant Free Access · No Verification Link
                </div>

                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Unlock the Free ROI Calculator
                </h3>
                <p className="text-sm text-text-muted mb-6 leading-relaxed">
                  Enter your business email to unlock the Free ROI Calculator instantly.
                </p>

                <form onSubmit={handleUnlockSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      id="roi-unlock-email"
                      type="email"
                      aria-label="Business Email Address"
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        if (errorMsg) setErrorMsg(null);
                      }}
                      placeholder="e.g. dave@apexplumbing.com"
                      required
                      disabled={loading}
                      className="w-full px-4 py-3.5 rounded-xl bg-surface-raised border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary text-text-primary placeholder:text-text-dim text-sm font-sans outline-none transition-all"
                    />
                    <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-text-dim pointer-events-none">
                      mail
                    </span>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-status-negative/10 border border-status-negative/30 text-status-negative text-xs font-code text-left flex items-start gap-2 animate-shake">
                      <span className="material-symbols-outlined text-[16px] mt-0.5 shrink-0">error</span>
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold border-none hover:scale-105 transition-transform text-sm font-code flex items-center justify-center gap-2 active:scale-[0.98] shadow-[0_0_25px_rgba(255,106,61,0.45)] cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-surface-base border-t-transparent rounded-full animate-spin"></span>
                        <span>Verifying &amp; Unlocking...</span>
                      </>
                    ) : (
                      <>
                        <span>Unlock Free Calculator Instantly</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] font-code text-text-dim pt-2 flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-status-positive">verified_user</span>
                    Zero spam. Real data calculation customized to your trades.
                  </p>
                </form>
              </div>
            </div>
          )}

          {/* CALCULATOR INTERFACE */}
          <div
            className={`transition-all duration-500 ${
              !isUnlocked ? 'filter blur-[8px] pointer-events-none select-none opacity-40' : 'opacity-100'
            }`}
          >
            {isUnlocked && (
              <div className="mb-6 pb-4 border-b border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-status-positive animate-pulse"></span>
                  <span className="text-xs font-code text-status-positive font-bold uppercase tracking-wider">
                    Unlocked for: {userEmail}
                  </span>
                </div>
                <span className="text-[11px] font-code text-text-dim">
                  Interactive Live Formulas Active
                </span>
              </div>
            )}

            {/* Slider 1: Average Job Value ($100 - $5,000) */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-text-primary" htmlFor="roi-job-slider">
                  Average Value of a Job ($)
                </label>
                <span className="font-code text-primary font-bold text-base" id="roi-job-val">
                  ${jobValue.toLocaleString()}
                </span>
              </div>
              <input
                id="roi-job-slider"
                type="range"
                min="100"
                max="5000"
                step="50"
                value={jobValue}
                onChange={(e) => setJobValue(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] font-code text-text-dim mt-1.5">
                <span>$100</span>
                <span>$2,500</span>
                <span>$5,000</span>
              </div>
            </div>

            {/* Slider 2: Calls Missed Per Week (1 - 50) */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-text-primary" htmlFor="roi-calls-slider">
                  Calls Missed Per Week
                </label>
                <span className="font-code text-secondary font-bold text-base" id="roi-calls-val">
                  {missedCalls} {missedCalls === 1 ? 'call' : 'calls'}/week
                </span>
              </div>
              <input
                id="roi-calls-slider"
                type="range"
                min="1"
                max="50"
                step="1"
                value={missedCalls}
                onChange={(e) => setMissedCalls(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] font-code text-text-dim mt-1.5">
                <span>1 call</span>
                <span>25 calls</span>
                <span>50 calls</span>
              </div>
            </div>

            {/* Slider 3: Conversion Rate (%) */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-text-primary" htmlFor="roi-rate-slider">
                  Lead Conversion Rate (%)
                </label>
                <span className="font-code text-status-positive font-bold text-base" id="roi-rate-val">
                  {conversionRate}%
                </span>
              </div>
              <input
                id="roi-rate-slider"
                type="range"
                min="10"
                max="80"
                step="5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] font-code text-text-dim mt-1.5">
                <span>10%</span>
                <span>40% (Average)</span>
                <span>80%</span>
              </div>
            </div>

            {/* KPI Metrics Grid with Exact Outputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-surface-base border border-border-subtle mb-8 text-center">
              {/* Output 1: Monthly Lost / Recovered */}
              <div className="p-4 rounded-xl bg-surface-raised border border-status-positive/20 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-status-positive font-code" id="roi-out-monthly">
                  ${monthlyRecoveredRevenue.toLocaleString()}/mo
                </div>
                <div className="text-xs text-text-dim font-code mt-1">
                  Monthly Revenue Recovery
                </div>
                <div className="text-[10px] font-code text-status-negative/80 mt-1">
                  Baseline Loss: -${monthlyLostRevenue.toLocaleString()}/mo
                </div>
              </div>

              {/* Output 2: Estimated Annual Recovered Revenue with Callora */}
              <div className="p-4 rounded-xl bg-surface-raised border border-primary/20 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-primary font-code" id="roi-out-annual">
                  ${annualRecoveredRevenue.toLocaleString()}/yr
                </div>
                <div className="text-xs text-text-dim font-code mt-1">
                  Estimated Annual Recovered with Callora
                </div>
                <div className="text-[10px] font-code text-status-positive mt-1">
                  (Based on 65% benchmark capture rate)
                </div>
              </div>

              {/* Output 3: Lost Jobs Recovered */}
              <div className="p-4 rounded-xl bg-surface-raised border border-secondary/20 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-secondary font-code" id="roi-out-jobs">
                  ~{recoveredJobsMonthly} jobs/mo
                </div>
                <div className="text-xs text-text-dim font-code mt-1">
                  Lost Jobs Recovered
                </div>
                <div className="text-[10px] font-code text-text-dim mt-1">
                  ~{(missedCalls * 4)} missed inbound calls/mo
                </div>
              </div>
            </div>

            {/* Prominent CTA Button as specified */}
            <div className="text-center">
              <a
                href="#book"
                onClick={handleCtaClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold border-none hover:scale-105 transition-transform text-sm md:text-base active:scale-[0.98] shadow-[0_0_25px_rgba(255,106,61,0.45)]"
              >
                <span>Stop Losing This Money - Book Your Setup Call</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </a>
              <p className="text-xs font-code text-text-dim mt-3">
                15-Minute Zero-Pressure Workflow Audit · Month-to-Month · $0 Setup Fee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GatedRoiCalculator;
