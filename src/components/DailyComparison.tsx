'use client';

import React from 'react';

interface DailyComparisonProps {
  onBookAuditClick: () => void;
}

export const DailyComparison: React.FC<DailyComparisonProps> = ({ onBookAuditClick }) => {
  return (
    <section className="py-24 border-t border-border-subtle px-6 bg-surface-raised/30">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-code text-xs text-primary uppercase tracking-wider mb-2 block font-semibold">
            Side-by-Side Comparison
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-3">
            A Typical Day: Without vs. With Callora
          </h2>
          <p className="text-base text-text-muted">
            Scan hour by hour. That's the difference between losing jobs and dominating your local market.
          </p>
        </div>

        <div className="rounded-2xl border border-border-subtle overflow-hidden bg-surface-card shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle bg-surface-raised text-xs font-code text-text-dim uppercase">
                  <th className="p-4 w-28 sm:w-36">Time</th>
                  <th className="p-4 text-status-negative">Without Callora</th>
                  <th className="p-4 text-status-positive">With Callora</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-xs sm:text-sm">
                <tr className="hover:bg-surface-raised/50 transition-colors">
                  <td className="p-4 font-code text-text-primary font-bold">8:00 AM</td>
                  <td className="p-4 text-text-muted">
                    <span className="text-status-negative font-code font-bold mr-1.5">[Missed]</span>
                    Missed calls start while setting up tools on site.
                  </td>
                  <td className="p-4 text-text-primary">
                    <span className="text-status-positive font-code font-bold mr-1.5">[Instant]</span>
                    Every missed call receives instant text replies in &lt;3 seconds.
                  </td>
                </tr>

                <tr className="hover:bg-surface-raised/50 transition-colors">
                  <td className="p-4 font-code text-text-primary font-bold">10:00 AM</td>
                  <td className="p-4 text-text-muted">
                    <span className="text-status-negative font-code font-bold mr-1.5">[Lost]</span>
                    Customer calls competitor because no one picked up.
                  </td>
                  <td className="p-4 text-text-primary">
                    <span className="text-status-positive font-code font-bold mr-1.5">[Engaged]</span>
                    Leads stay engaged, details collected automatically.
                  </td>
                </tr>

                <tr className="hover:bg-surface-raised/50 transition-colors">
                  <td className="p-4 font-code text-text-primary font-bold">12:00 PM</td>
                  <td className="p-4 text-text-muted">
                    <span className="text-status-negative font-code font-bold mr-1.5">[Cold]</span>
                    No time to answer website form inquiries or FB messages.
                  </td>
                  <td className="p-4 text-text-primary">
                    <span className="text-status-positive font-code font-bold mr-1.5">[Qualified]</span>
                    AI handles conversations &amp; qualifies customer needs automatically.
                  </td>
                </tr>

                <tr className="hover:bg-surface-raised/50 transition-colors">
                  <td className="p-4 font-code text-text-primary font-bold">3:00 PM</td>
                  <td className="p-4 text-text-muted">
                    <span className="text-status-negative font-code font-bold mr-1.5">[Forgotten]</span>
                    Review requests forgotten in the truck amidst packing up.
                  </td>
                  <td className="p-4 text-text-primary">
                    <span className="text-status-positive font-code font-bold mr-1.5">[Captured]</span>
                    5-star review request sent automatically upon job close.
                  </td>
                </tr>

                <tr className="hover:bg-surface-raised/50 transition-colors">
                  <td className="p-4 font-code text-text-primary font-bold">6:00 PM</td>
                  <td className="p-4 text-text-muted">
                    <span className="text-status-negative font-code font-bold mr-1.5">[Exhausted]</span>
                    Lost opportunities &amp; exhausted manual callbacks that lead to voicemail.
                  </td>
                  <td className="p-4 text-text-primary">
                    <span className="text-status-positive font-code font-bold mr-1.5">[Booked]</span>
                    More booked jobs waiting on your schedule for tomorrow morning.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-surface-raised border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-code">
            <span className="text-text-muted">Zero missed jobs. 100% automated follow-ups.</span>
            <button
              onClick={onBookAuditClick}
              className="text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0"
            >
              <span>Automate your business today →</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyComparison;
