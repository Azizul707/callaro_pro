'use client';

import React, { useState } from 'react';

export const LeadRecoveryDeepDive: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(4); // All messages visible by default

  return (
    <section className="py-24 border-t border-border-subtle px-6 bg-surface-raised/30" id="lead-engine">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-code text-xs text-primary uppercase tracking-wider mb-2 block font-semibold">
              Deep Dive · High Speed Pipeline
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary max-w-2xl">
              Never Lose Another Lead to a Missed Call
            </h2>
          </div>
          <a
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold border-none hover:scale-105 transition-transform text-xs font-code shadow-[0_0_20px_rgba(255,106,61,0.35)]"
            href="#pricing"
          >
            <span>Explore $50/mo Plans</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="demo-sim">
          {/* Feature Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary">phone_missed</span>
                <h3 className="font-bold text-lg text-text-primary">AI Missed Call Recovery</h3>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                If you miss a call, our system instantly sends a text: <span className="text-text-primary font-semibold">&quot;Hey, sorry we missed your call. I&apos;m on a job site right now. How can we help?&quot;</span> The conversation continues automatically, even while you&apos;re busy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-secondary">flash_on</span>
                <h3 className="font-bold text-lg text-text-primary">5-Minute Speed-to-Lead Responder</h3>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Customers contact the first company that replies. Our automation responds within minutes to any web or Facebook lead, collects information, and keeps leads engaged until you are ready. Quietly running in the background. Working 24/7. Capturing opportunities while you work.
              </p>
            </div>
          </div>

          {/* Interactive Phone SMS Simulation */}
          <div className="lg:col-span-7">
            <div className="card-border-glow bg-surface-card rounded-3xl p-6 max-w-md mx-auto border border-border-subtle shadow-2xl">
              {/* Simulated Phone Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">
                    AI
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text-primary flex items-center gap-1.5">
                      Callora Auto-Response
                      <span className="w-2 h-2 rounded-full bg-status-positive"></span>
                    </div>
                    <div className="text-[11px] font-code text-text-dim">
                      Triggered &lt;3s after missed call
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-code text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                  Active
                </span>
              </div>

              {/* Messages Stream */}
              <div className="space-y-3 text-xs sm:text-sm">
                {/* Outgoing Bot */}
                <div className="flex flex-col items-start max-w-[85%]">
                  <span className="text-[10px] font-code text-text-dim mb-1">
                    Apex Plumbing System · 10:14 AM
                  </span>
                  <div className="bg-surface-raised p-3 rounded-2xl rounded-tl-sm border border-border-subtle text-text-primary">
                    Hey, sorry we missed your call! I'm on a job site right now. How can we help you today?
                  </div>
                </div>

                {/* Customer */}
                <div className="flex flex-col items-end ml-auto max-w-[85%]">
                  <span className="text-[10px] font-code text-text-dim mb-1">
                    Customer · 10:15 AM
                  </span>
                  <div className="bg-primary text-[#09090b] font-medium p-3 rounded-2xl rounded-tr-sm">
                    Hi! I have a burst water line under the bathroom sink. Can someone come by this afternoon?
                  </div>
                </div>

                {/* Outgoing Bot */}
                <div className="flex flex-col items-start max-w-[85%]">
                  <span className="text-[10px] font-code text-text-dim mb-1">
                    Apex Plumbing System · 10:15 AM
                  </span>
                  <div className="bg-surface-raised p-3 rounded-2xl rounded-tl-sm border border-border-subtle text-text-primary">
                    We can definitely get that fixed for you today. What is your home address, and would 2:30 PM work for our lead technician to arrive?
                  </div>
                </div>

                {/* Customer */}
                <div className="flex flex-col items-end ml-auto max-w-[85%]">
                  <span className="text-[10px] font-code text-text-dim mb-1">
                    Customer · 10:16 AM
                  </span>
                  <div className="bg-primary text-[#09090b] font-medium p-3 rounded-2xl rounded-tr-sm">
                    Yes, 2:30 PM is perfect! Address is 742 Evergreen Terrace.
                  </div>
                </div>

                {/* Outgoing Bot Confirmation */}
                <div className="flex flex-col items-start max-w-[85%]">
                  <span className="text-[10px] font-code text-text-dim mb-1">
                    Apex Plumbing System · 10:16 AM
                  </span>
                  <div className="bg-surface-raised p-3 rounded-2xl rounded-tl-sm border border-status-positive/30 text-text-primary">
                    <span className="text-status-positive font-bold block mb-1">
                      ✓ Appointment Locked: 2:30 PM
                    </span>
                    You're all set! Dave will text you when he's 15 mins away.
                  </div>
                </div>
              </div>

              {/* Footer indicator */}
              <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] font-code text-text-dim">
                <span>Customer locked before dialing competitor</span>
                <span className="text-status-positive font-semibold">+$450 Job Saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadRecoveryDeepDive;
