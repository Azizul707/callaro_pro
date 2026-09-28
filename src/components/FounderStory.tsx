'use client';

import React from 'react';
import FounderAvatar from '@/src/assets/founderAvatar';

export const FounderStory: React.FC = () => {
  return (
    <section className="py-24 bg-surface-raised/40 border-y border-border-subtle px-6" id="about">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Founder Profile Card with Image Placement */}
          <div className="lg:col-span-5">
            <div className="card-border-glow bg-surface-card rounded-2xl p-6 overflow-hidden">
              <div className="w-full aspect-square rounded-xl bg-surface-raised flex flex-col items-center justify-center relative overflow-hidden border border-border-subtle p-6">
                {/* Founder Headshot Asset (matching ma_hakim_image.png) */}
                <FounderAvatar className="w-40 h-40 mb-4" />

                <h4 className="text-xl font-bold text-text-primary">MA Hakim</h4>
                <p className="font-code text-xs text-text-dim">Founder &amp; Principal Systems Architect</p>
                <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-surface-base border border-border-subtle">
                  <span className="w-2 h-2 rounded-full bg-status-positive"></span>
                  <span className="font-code text-[11px] text-text-muted">
                    Direct Founder Access · Fast Delivery
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-2 font-code text-xs text-text-muted">
                <div className="flex justify-between py-1 border-b border-border-subtle">
                  <span>Role</span>
                  <span className="text-text-primary">Founder, Callora.pro</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border-subtle">
                  <span>Model</span>
                  <span className="text-text-primary">100% Founder-Direct</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Target Focus</span>
                  <span className="text-text-primary">Contractors &amp; Home Services</span>
                </div>
              </div>
            </div>
          </div>

          {/* Founder Story Message */}
          <div className="lg:col-span-7">
            <span className="font-code text-xs text-primary uppercase tracking-wider mb-2 block font-semibold">
              Founder Message
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-6">
              Built for Hardworking Business Owners
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-text-muted leading-relaxed mb-8">
              <p>
                &quot;Hi, I&apos;m MA Hakim, founder of Callora.pro. I saw local businesses paying $1,500–$5,000 per month to marketing agencies while simple problems—missed calls, slow responses, forgotten reviews—continued to cost them jobs.&quot;
              </p>
              <p>
                &quot;That&apos;s why I built Callora.pro. Instead of expensive retainers and complicated software, we install small, affordable automation systems that solve real business problems and produce measurable results. You focus on the work. We handle the systems.&quot;
              </p>
            </div>

            {/* Proof Points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-surface-card border border-border-subtle text-center">
                <div className="font-code text-lg font-bold text-primary">100%</div>
                <div className="text-[11px] text-text-dim font-code mt-0.5">Done-For-You</div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-card border border-border-subtle text-center">
                <div className="font-code text-lg font-bold text-status-positive">&lt; 5s</div>
                <div className="text-[11px] text-text-dim font-code mt-0.5">Instant Response</div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-card border border-border-subtle text-center">
                <div className="font-code text-lg font-bold text-secondary">$0</div>
                <div className="text-[11px] text-text-dim font-code mt-0.5">Setup Fees</div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-card border border-border-subtle text-center">
                <div className="font-code text-lg font-bold text-accent-cyan">24/7</div>
                <div className="text-[11px] text-text-dim font-code mt-0.5">Pipeline Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table "Why Business Owners Choose Callora" */}
        <div className="rounded-2xl border border-border-subtle bg-surface-card overflow-hidden">
          <div className="p-5 bg-surface-raised border-b border-border-subtle flex items-center justify-between">
            <span className="text-sm font-bold text-text-primary">Why Business Owners Choose Callora</span>
            <span className="text-xs font-code text-text-dim">Head-to-Head Comparison</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border-subtle bg-surface-base/60 font-code text-xs text-text-dim uppercase">
                  <th className="p-4">Feature</th>
                  <th className="p-4 text-primary font-bold">Callora.pro</th>
                  <th className="p-4">Traditional Agencies</th>
                  <th className="p-4">DIY Software</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-text-muted">
                <tr>
                  <td className="p-4 font-semibold text-text-primary">Monthly Cost</td>
                  <td className="p-4 text-primary font-bold">Affordable Micro-Services ($50/mo)</td>
                  <td className="p-4">High Retainers ($1,500–$5,000/mo)</td>
                  <td className="p-4">Multiple Subscriptions ($200–$500/mo)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-text-primary">Setup</td>
                  <td className="p-4 text-status-positive font-bold">Done-For-You (Zero code)</td>
                  <td className="p-4">Slow Process (4–8 weeks)</td>
                  <td className="p-4">Do It Yourself (Steep curve)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-text-primary">Contracts</td>
                  <td className="p-4 text-status-positive font-bold">Month-to-Month</td>
                  <td className="p-4 text-status-negative">Long Contracts (6–12 mo)</td>
                  <td className="p-4">No Support / Lock-in</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-text-primary">Learning Curve</td>
                  <td className="p-4 text-status-positive font-bold">None</td>
                  <td className="p-4">None</td>
                  <td className="p-4 text-status-negative">High</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-text-primary">Support</td>
                  <td className="p-4 text-primary font-bold">Direct Founder Access (MA Hakim)</td>
                  <td className="p-4">Account Managers</td>
                  <td className="p-4 text-status-negative">Self-Service Ticket Queue</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-text-primary">Results</td>
                  <td className="p-4 text-status-positive font-bold">Automation That Works</td>
                  <td className="p-4 text-status-negative">Often Unclear / Fluff</td>
                  <td className="p-4">Depends On You</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
