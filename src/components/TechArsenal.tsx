import React from 'react';

export const TechArsenal: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-surface-base">
      <div className="max-w-[1200px] mx-auto text-center">
        <span className="font-code text-xs text-primary uppercase tracking-wider mb-2 block font-semibold">
          Enterprise-Grade Infrastructure
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-3">
          The Invisible Engine Behind Your Business
        </h2>
        <p className="text-sm sm:text-base text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Behind the scenes, Callora.pro uses powerful automation tools like AI, SMS systems, and workflow technology to keep your business running 24/7. You don't need to learn software. You don't need new apps. You don't need extra employees. We host, manage, maintain, and optimize everything.
        </p>

        {/* Tool Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto text-left">
          <div className="p-3.5 rounded-xl bg-surface-card border border-zinc-800/60 opacity-60 hover:opacity-100 hover:scale-[1.02] hover:border-zinc-700 transition-all duration-300 ease-in-out cursor-default flex items-center justify-between">
            <div>
              <span className="font-bold text-xs sm:text-sm block text-text-primary">Twilio</span>
              <span className="text-[10px] font-code text-text-dim">SMS &amp; Voice</span>
            </div>
            <span className="material-symbols-outlined text-primary text-[18px]">sms</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-card border border-zinc-800/60 opacity-60 hover:opacity-100 hover:scale-[1.02] hover:border-zinc-700 transition-all duration-300 ease-in-out cursor-default flex items-center justify-between">
            <div>
              <span className="font-bold text-xs sm:text-sm block text-text-primary">OpenAI GPT-4o</span>
              <span className="text-[10px] font-code text-text-dim">Intelligent Routing</span>
            </div>
            <span className="material-symbols-outlined text-status-positive text-[18px]">psychology</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-card border border-zinc-800/60 opacity-60 hover:opacity-100 hover:scale-[1.02] hover:border-zinc-700 transition-all duration-300 ease-in-out cursor-default flex items-center justify-between">
            <div>
              <span className="font-bold text-xs sm:text-sm block text-text-primary">Make.com</span>
              <span className="text-[10px] font-code text-text-dim">Workflow Logic</span>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px]">account_tree</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-card border border-zinc-800/60 opacity-60 hover:opacity-100 hover:scale-[1.02] hover:border-zinc-700 transition-all duration-300 ease-in-out cursor-default flex items-center justify-between">
            <div>
              <span className="font-bold text-xs sm:text-sm block text-text-primary">n8n</span>
              <span className="text-[10px] font-code text-text-dim">Autonomous Flows</span>
            </div>
            <span className="material-symbols-outlined text-primary text-[18px]">hub</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-card border border-zinc-800/60 opacity-60 hover:opacity-100 hover:scale-[1.02] hover:border-zinc-700 transition-all duration-300 ease-in-out cursor-default flex items-center justify-between">
            <div>
              <span className="font-bold text-xs sm:text-sm block text-text-primary">Google Reviews</span>
              <span className="text-[10px] font-code text-text-dim">Reputation API</span>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px]">reviews</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-card border border-zinc-800/60 opacity-60 hover:opacity-100 hover:scale-[1.02] hover:border-zinc-700 transition-all duration-300 ease-in-out cursor-default flex items-center justify-between">
            <div>
              <span className="font-bold text-xs sm:text-sm block text-text-primary">Meta Graph</span>
              <span className="text-[10px] font-code text-text-dim">FB &amp; IG API</span>
            </div>
            <span className="material-symbols-outlined text-accent-cyan text-[18px]">share</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-card border border-zinc-800/60 opacity-60 hover:opacity-100 hover:scale-[1.02] hover:border-zinc-700 transition-all duration-300 ease-in-out cursor-default flex items-center justify-between">
            <div>
              <span className="font-bold text-xs sm:text-sm block text-text-primary">WhatsApp Cloud</span>
              <span className="text-[10px] font-code text-text-dim">Media &amp; Alerts</span>
            </div>
            <span className="material-symbols-outlined text-status-positive text-[18px]">chat</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-card border border-zinc-800/60 opacity-60 hover:opacity-100 hover:scale-[1.02] hover:border-zinc-700 transition-all duration-300 ease-in-out cursor-default flex items-center justify-between">
            <div>
              <span className="font-bold text-xs sm:text-sm block text-text-primary">Google Calendar</span>
              <span className="text-[10px] font-code text-text-dim">Booking Sync</span>
            </div>
            <span className="material-symbols-outlined text-primary text-[18px]">calendar_month</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-card border border-zinc-800/60 opacity-60 hover:opacity-100 hover:scale-[1.02] hover:border-zinc-700 transition-all duration-300 ease-in-out cursor-default flex items-center justify-between">
            <div>
              <span className="font-bold text-xs sm:text-sm block text-text-primary">Jobber / Titan</span>
              <span className="text-[10px] font-code text-text-dim">Field Webhooks</span>
            </div>
            <span className="material-symbols-outlined text-text-muted text-[18px]">engineering</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-card border border-zinc-800/60 opacity-60 hover:opacity-100 hover:scale-[1.02] hover:border-zinc-700 transition-all duration-300 ease-in-out cursor-default flex items-center justify-between">
            <div>
              <span className="font-bold text-xs sm:text-sm block text-text-primary">Stripe</span>
              <span className="text-[10px] font-code text-text-dim">Zero Markup Billing</span>
            </div>
            <span className="material-symbols-outlined text-status-positive text-[18px]">credit_card</span>
          </div>
        </div>

        <div className="mt-8 text-xs font-code text-text-muted">
          <span className="text-primary font-bold">Key takeaway:</span> &quot;The only thing you see is the result—right on your phone.&quot;
        </div>
      </div>
    </section>
  );
};

export default TechArsenal;
