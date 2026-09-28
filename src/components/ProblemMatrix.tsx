'use client';

import React from 'react';

interface ProblemMatrixProps {
  onBookAuditClick: () => void;
}

export const ProblemMatrix: React.FC<ProblemMatrixProps> = ({ onBookAuditClick }) => {
  return (
    <section className="py-24 border-t border-border-subtle px-6 bg-surface-raised/30" id="services">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-code text-xs text-primary uppercase tracking-wider mb-2 block font-semibold">
            The Reality of Running a Trade Business
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
            You do the heavy lifting on the job site. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              We handle the pipeline.
            </span>
          </h2>
          <p className="text-base text-text-muted">
            Two very different outcomes. One simple system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* The Old Way */}
          <div className="p-8 rounded-2xl bg-surface-card border border-status-negative/20 flex flex-col justify-between hover:border-status-negative/40 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-status-negative"></span>
                <span className="font-code text-xs text-status-negative uppercase font-bold tracking-wider">
                  The Old Way
                </span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Leaking revenue on every busy workday
              </h3>
              <ul className="space-y-4 text-sm text-text-muted mb-8">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-status-negative text-[20px] mt-0.5">cancel</span>
                  <span>Phone rings while you're under a sink, in an attic, or on a roof.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-status-negative text-[20px] mt-0.5">cancel</span>
                  <span>The customer leaves no voicemail.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-status-negative text-[20px] mt-0.5">cancel</span>
                  <span>They immediately call your competitor on Google.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-status-negative text-[20px] mt-0.5">cancel</span>
                  <span>A $300–$1,500 job disappears instantly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-status-negative text-[20px] mt-0.5">cancel</span>
                  <span>Customer reviews are forgotten once the job is paid.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-status-negative text-[20px] mt-0.5">cancel</span>
                  <span>Web leads slip through the cracks while driving.</span>
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-status-negative/10 border border-status-negative/20 text-xs font-code text-status-negative font-medium">
              Result: High stress, lost thousands every month, and wasted marketing spend.
            </div>
          </div>

          {/* The Callora Way */}
          <div className="p-8 rounded-2xl bg-surface-card border border-primary/30 card-border-glow flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-status-positive"></span>
                <span className="font-code text-xs text-status-positive uppercase font-bold tracking-wider">
                  The Callora Way
                </span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                24/7 Automated Revenue Capture
              </h3>
              <ul className="space-y-4 text-sm text-text-primary mb-8">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-status-positive text-[20px] mt-0.5">check_circle</span>
                  <span>You miss a call while working.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-status-positive text-[20px] mt-0.5">check_circle</span>
                  <span>Our AI instantly sends a friendly text within seconds.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-status-positive text-[20px] mt-0.5">check_circle</span>
                  <span>The customer gets answers immediately and stops calling competitors.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-status-positive text-[20px] mt-0.5">check_circle</span>
                  <span>Appointments are booked automatically straight to your calendar.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-status-positive text-[20px] mt-0.5">check_circle</span>
                  <span>Review requests are sent after every job, driving free Google traffic.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-status-positive text-[20px] mt-0.5">check_circle</span>
                  <span>More jobs. Less stress. No extra work for you or your crew.</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onBookAuditClick}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold border-none hover:scale-105 transition-transform text-xs font-code text-center flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,106,61,0.35)]"
            >
              <span>Plug the Revenue Leaks in Your Business</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemMatrix;
