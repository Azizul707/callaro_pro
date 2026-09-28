import React from 'react';

export const FinancialImpact: React.FC = () => {
  return (
    <section className="py-24 border-y border-border-subtle px-6 bg-surface-base" id="before-after">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-code text-xs text-primary uppercase tracking-wider mb-2 block font-semibold">
            Financial Impact Analysis
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-3">
            How Much Are Missed Calls Really Costing You?
          </h2>
          <p className="text-base text-text-muted">
            Most home service businesses don't lose money because of bad work. They lose money because busy teams can't answer every call.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-surface-card rounded-2xl border border-border-subtle p-6 md:p-8 card-border-glow">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-subtle">
            <span className="font-code text-xs text-status-negative uppercase font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-negative"></span> Without Callora
            </span>
            <span className="text-text-dim text-xs font-code hidden sm:inline">Monthly Revenue Delta</span>
            <span className="font-code text-xs text-status-positive uppercase font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-positive"></span> With Callora
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Without Callora */}
            <div className="bg-surface-raised/70 p-6 rounded-xl border border-status-negative/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-text-muted font-bold text-sm">Without Callora</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-code bg-status-negative/10 text-status-negative border border-status-negative/30">
                  -$3,200+/mo Leaking
                </span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-text-muted">
                <li className="flex justify-between items-center py-2 border-b border-border-subtle">
                  <span>5 missed calls per week</span>
                  <span className="font-code text-status-negative font-semibold">-$2,000/mo</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-border-subtle">
                  <span>Average job value: $400</span>
                  <span className="font-code text-text-dim">Baseline</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-border-subtle">
                  <span>Even 2 lost jobs weekly = $800 lost</span>
                  <span className="font-code text-status-negative font-semibold">-$3,200/mo</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span>Competitor answers first</span>
                  <span className="font-code text-status-negative font-semibold">-$1,200/mo</span>
                </li>
              </ul>
            </div>

            {/* With Callora */}
            <div className="bg-surface-raised/70 p-6 rounded-xl border border-status-positive/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-text-primary font-bold text-sm">With Callora</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-code bg-status-positive/10 text-status-positive border border-status-positive/30">
                  +$3,200+/mo Recovered
                </span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-text-muted">
                <li className="flex justify-between items-center py-2 border-b border-border-subtle">
                  <span>Instant text-back within seconds</span>
                  <span className="font-code text-status-positive font-semibold">+$1,600/mo</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-border-subtle">
                  <span>Fast lead response</span>
                  <span className="font-code text-status-positive font-semibold">+$800/mo</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-border-subtle">
                  <span>Automated follow-up</span>
                  <span className="font-code text-status-positive font-semibold">+$800/mo</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span>More appointments booked &amp; reviews</span>
                  <span className="font-code text-status-positive font-semibold">Compounding</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Investment summary highlight box */}
          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/30 text-center">
            <p className="text-sm md:text-base font-semibold text-text-primary">
              <span className="text-primary font-bold font-code">ROI Summary:</span> A $50/month automation could recover thousands in lost revenue.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialImpact;
