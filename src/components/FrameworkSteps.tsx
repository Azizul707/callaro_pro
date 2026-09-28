'use client';

import React from 'react';

interface FrameworkStepsProps {
  onBookAuditClick: () => void;
}

export const FrameworkSteps: React.FC<FrameworkStepsProps> = ({ onBookAuditClick }) => {
  return (
    <section className="py-24 px-6" id="how-it-works">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-code text-xs text-primary uppercase tracking-wider mb-2 block font-semibold">
            Seamless Implementation
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
            Done-For-You. Zero Tech Headaches.
          </h2>
          <p className="text-base text-text-muted">
            We handle the setup, coding, testing, and continuous monitoring so you can stay focused on customer jobs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 01 */}
          <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle hover:border-primary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="font-code text-4xl text-primary font-extrabold mb-4 opacity-80">01</div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Discover</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                We learn how your business works and identify exactly where money is leaking across missed calls and lead channels.
              </p>
            </div>
            <div className="pt-4 border-t border-border-subtle font-code text-xs text-text-dim">
              ✓ 20-min workflow audit
            </div>
          </div>

          {/* Step 02 */}
          <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle hover:border-primary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="font-code text-4xl text-primary font-extrabold mb-4 opacity-80">02</div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Build</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                We create and customize your automation systems for your exact workflow. You touch zero code.
              </p>
            </div>
            <div className="pt-4 border-t border-border-subtle font-code text-xs text-text-dim">
              ✓ Custom AI prompts &amp; routing
            </div>
          </div>

          {/* Step 03 */}
          <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle hover:border-primary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="font-code text-4xl text-primary font-extrabold mb-4 opacity-80">03</div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Launch</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                We connect everything, test it thoroughly, and provide you with a dedicated local number for live calls.
              </p>
            </div>
            <div className="pt-4 border-t border-border-subtle font-code text-xs text-text-dim">
              ✓ Full end-to-end testing
            </div>
          </div>

          {/* Step 04 */}
          <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle hover:border-primary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="font-code text-4xl text-primary font-extrabold mb-4 opacity-80">04</div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Grow</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                Your systems run 24/7 in the background while we monitor, optimize, and improve performance every single month.
              </p>
            </div>
            <div className="pt-4 border-t border-border-subtle font-code text-xs text-text-dim">
              ✓ Continuous monthly tuning
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onBookAuditClick}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold border-none hover:scale-105 transition-transform text-sm shadow-[0_0_20px_rgba(255,106,61,0.35)] cursor-pointer"
          >
            <span>Get Started in Days, Not Months</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FrameworkSteps;
