'use client';

import React from 'react';

interface HeroSectionProps {
  onBookAuditClick: () => void;
  onCallDemoClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookAuditClick,
  onCallDemoClick,
}) => {
  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-28 px-6">
      <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-raised border border-border-subtle mb-8 hover:border-primary/40 transition-colors">
          <span className="w-2 h-2 rounded-full bg-primary radar-pulse"></span>
          <span className="font-code text-xs text-text-muted uppercase tracking-wider">
            Founder-Direct Agency | Built by MA Hakim
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary max-w-5xl tracking-tight leading-[1.15] mb-6">
          Every Missed Call Is a Lost Job. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ff885e] to-secondary">
            Stop Letting Competitors Answer Your Customers First.
          </span>
        </h1>

        {/* H2 / Subhead */}
        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mb-10 leading-relaxed font-normal">
          Callora.pro installs simple, 24/7 automated growth systems that recover missed calls, follow up with leads, collect reviews, reduce no-shows, and keep your business working—even when you're on the job site.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full sm:w-auto">
          <button
            onClick={onBookAuditClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold border-none hover:scale-105 transition-transform text-sm active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,106,61,0.45)] cursor-pointer"
          >
            <span>Book My Free Revenue Audit</span>
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
          </button>
          <a
            onClick={onCallDemoClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-surface-card border border-border-subtle hover:border-white/20 text-text-primary font-semibold text-sm hover:bg-surface-raised transition-all flex items-center justify-center gap-2 cursor-pointer"
            href="#demo-sim"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">phone_in_talk</span>
            <span>Test The AI Now: Call Demo</span>
          </a>
        </div>

        <p className="text-xs font-code text-text-dim mb-14">
          Done-for-you installation · Zero code to learn · Results delivered straight to your phone.
        </p>

        {/* Dual Pathway Cards (Home Services / Contractors) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Pathway 1: Missed Call to Booked Job */}
          <div className="card-border-glow bg-surface-card/80 backdrop-blur-md rounded-2xl p-6 hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-code font-bold tracking-wider bg-surface-raised text-primary uppercase border border-primary/20">
                Pipeline 01
              </span>
              <span className="text-text-dim text-xs font-code flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-status-positive">bolt</span> Instant Response
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Missed Call to Booked Job</h3>
            <p className="text-sm text-text-muted mb-6">
              How incoming emergency customer calls convert into booked visits automatically while you work.
            </p>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-base/60 border border-border-subtle">
                <span className="font-code text-primary font-bold text-xs mt-0.5">01</span>
                <span className="text-text-muted">Incoming customer call is missed while you're busy on a job site</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-base/60 border border-border-subtle">
                <span className="font-code text-primary font-bold text-xs mt-0.5">02</span>
                <span className="text-text-muted">Callora AI dispatches an instant SMS within 3 seconds</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-base/60 border border-border-subtle">
                <span className="font-code text-primary font-bold text-xs mt-0.5">03</span>
                <span className="text-text-muted">Customer replies with their job issue, address, and availability</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-base/60 border border-border-subtle">
                <span className="font-code text-primary font-bold text-xs mt-0.5">04</span>
                <span className="text-text-muted">Appointment auto-booked on your calendar + instant phone alert</span>
              </div>
            </div>
            <a className="inline-flex items-center gap-2 text-primary text-xs font-code font-bold mt-5 hover:underline" href="#lead-engine">
              <span>Inspect call recovery engine</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>

          {/* Pathway 2: Job Done to 5-Star Review & Social Post */}
          <div className="card-border-glow bg-surface-card/80 backdrop-blur-md rounded-2xl p-6 hover:border-secondary/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-code font-bold tracking-wider bg-surface-raised text-secondary uppercase border border-secondary/20">
                Pipeline 02
              </span>
              <span className="text-text-dim text-xs font-code flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-secondary">star</span> Local Authority
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Job Done to 5-Star Review &amp; Social Post</h3>
            <p className="text-sm text-text-muted mb-6">
              How every completed invoice compounds your reputation and Facebook/Instagram presence effortlessly.
            </p>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-base/60 border border-border-subtle">
                <span className="font-code text-secondary font-bold text-xs mt-0.5">01</span>
                <span className="text-text-muted">Job is finished on site and marked complete</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-base/60 border border-border-subtle">
                <span className="font-code text-secondary font-bold text-xs mt-0.5">02</span>
                <span className="text-text-muted">Automatic friendly Google review link sent via SMS to customer</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-base/60 border border-border-subtle">
                <span className="font-code text-secondary font-bold text-xs mt-0.5">03</span>
                <span className="text-text-muted">You text a quick Before/After photo to our dedicated WhatsApp number</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-base/60 border border-border-subtle">
                <span className="font-code text-secondary font-bold text-xs mt-0.5">04</span>
                <span className="text-text-muted">AI creates high-converting caption &amp; automatically posts to Meta</span>
              </div>
            </div>
            <a className="inline-flex items-center gap-2 text-secondary text-xs font-code font-bold mt-5 hover:underline" href="#reputation-engine">
              <span>Inspect reputation &amp; social engine</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
