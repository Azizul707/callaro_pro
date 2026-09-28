'use client';

import React from 'react';
import { Zap, Bot, Check, ArrowRight, Shield, Clock, Sparkles } from 'lucide-react';
import { SelectedServicePlan } from './ServiceOrderModal';

interface PricingSectionProps {
  onSelectPlan: (plan: SelectedServicePlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section className="py-24 px-4 sm:px-6 relative" id="pricing">
      {/* Background subtle dots/glow grid pattern */}
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[#ff6a3d] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Pick Your System. Stop Leaking Jobs.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            Zero setup fees. Month-to-month flexibility. 100% done-for-you installation &amp; active monitoring.
          </p>
        </div>

        {/* 2-Card Layout matching the exact design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* ========================================================================= */}
          {/* CARD 1: Single Service (Standard / Ghost CTA) */}
          {/* ========================================================================= */}
          <div className="relative rounded-2xl bg-[#0f0f13] border border-zinc-800/90 p-7 sm:p-9 flex flex-col justify-between hover:border-zinc-700/80 transition-all duration-300 shadow-xl">
            <div>
              {/* Card Header: Icon + Title & Time */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-[#ff6a3d] shrink-0 shadow-inner">
                  <Zap className="w-6 h-6 fill-[#ff6a3d]/20 text-[#ff6a3d]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Single Service
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono mt-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>1–2 days</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                Pick exactly one micro-service to fix a specific revenue leak.
              </p>

              {/* Split Pricing Boxes (2-Column Grid) */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {/* Left Box: Setup */}
                <div className="rounded-xl border border-zinc-800/90 bg-zinc-950/40 p-4">
                  <span className="block text-[11px] font-mono tracking-wider text-zinc-400 uppercase font-semibold mb-1">
                    SETUP
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                    $0
                  </div>
                  <span className="block text-xs text-zinc-400 mt-1">
                    one-time setup
                  </span>
                </div>

                {/* Right Box: Monthly */}
                <div className="rounded-xl border border-zinc-800/90 bg-zinc-950/40 p-4">
                  <span className="block text-[11px] font-mono tracking-wider text-[#ff6a3d] uppercase font-semibold mb-1">
                    MONTHLY
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#ff6a3d] font-mono tracking-tight">
                    $50
                  </div>
                  <span className="block text-xs text-zinc-400 mt-1">
                    /month maintenance
                  </span>
                </div>
              </div>

              {/* What's Included in Setup */}
              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-3.5 flex items-center gap-2">
                  <span className="text-[#ff6a3d]">✔</span> WHAT&apos;S INCLUDED IN SETUP
                </h4>
                <ul className="space-y-2.5 text-sm text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#ff6a3d] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>Custom workflow design for 1 service</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#ff6a3d] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>Integration with your current workflow</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#ff6a3d] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>Dedicated local Twilio number setup</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#ff6a3d] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>Live testing &amp; deployment</span>
                  </li>
                </ul>
              </div>

              {/* Monthly Maintenance Box (Inner Dark Box) */}
              <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-4 sm:p-5 mb-8">
                <h5 className="text-xs font-mono font-bold text-[#ff6a3d] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <span>↻</span> MONTHLY MAINTENANCE INCLUDES
                </h5>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a3d] shrink-0"></span>
                    <span>24/7 system uptime &amp; monitoring</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a3d] shrink-0"></span>
                    <span>API processing &amp; active webhooks</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a3d] shrink-0"></span>
                    <span>Bug fixes and minor adjustments</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a3d] shrink-0"></span>
                    <span>Direct SMS/WhatsApp support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Actions & Guarantee */}
            <div>
              {/* CTA Button: Outline / Ghost Style */}
              <button
                type="button"
                onClick={() =>
                  onSelectPlan({
                    id: 'single-service',
                    name: 'Single Service',
                    price: '$50',
                    period: 'mo',
                    badge: 'Micro-Service',
                    description: 'Pick exactly one micro-service to fix a specific revenue leak.',
                  })
                }
                className="w-full py-3.5 px-6 rounded-xl border border-zinc-700 bg-transparent hover:bg-zinc-800/60 hover:border-zinc-500 text-white font-mono text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.99] mb-6"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Footer / Guarantee */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-center gap-2 text-xs text-zinc-400">
                <Shield className="w-3.5 h-3.5 text-[#ff6a3d]" />
                <span>No long-term contracts - Cancel monthly anytime</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 2: Local Dominance Bundle (Highlighted / Solid Orange CTA) */}
          {/* ========================================================================= */}
          <div className="relative rounded-2xl bg-[#0f0f13] border border-zinc-800/90 p-7 sm:p-9 flex flex-col justify-between hover:border-[#ff6a3d]/50 transition-all duration-300 shadow-2xl">
            {/* Top Right "MOST CHOSEN" Badge */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff6a3d] text-[#09090b] text-[11px] font-mono font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(255,106,61,0.5)]">
                ✦ MOST CHOSEN
              </span>
            </div>

            <div>
              {/* Card Header: Icon + Title & Time */}
              <div className="flex items-start gap-4 mb-4 pr-32">
                <div className="w-12 h-12 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-[#ff6a3d] shrink-0 shadow-inner">
                  <Bot className="w-6 h-6 text-[#ff6a3d]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Local Dominance Bundle
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono mt-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>3–5 days</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                All 5 micro-services integrated into one seamless automated pipeline.
              </p>

              {/* Split Pricing Boxes (2-Column Grid) */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {/* Left Box: Setup */}
                <div className="rounded-xl border border-zinc-800/90 bg-zinc-950/40 p-4">
                  <span className="block text-[11px] font-mono tracking-wider text-zinc-400 uppercase font-semibold mb-1">
                    SETUP
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                    $0
                  </div>
                  <span className="block text-xs text-zinc-400 mt-1">
                    one-time setup
                  </span>
                </div>

                {/* Right Box: Monthly */}
                <div className="rounded-xl border border-zinc-800/90 bg-zinc-950/40 p-4">
                  <span className="block text-[11px] font-mono tracking-wider text-[#ff6a3d] uppercase font-semibold mb-1">
                    MONTHLY
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#ff6a3d] font-mono tracking-tight">
                    $190
                  </div>
                  <span className="block text-xs text-zinc-400 mt-1">
                    /month maintenance
                  </span>
                </div>
              </div>

              {/* What's Included in Setup */}
              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-3.5 flex items-center gap-2">
                  <span className="text-[#ff6a3d]">✔</span> WHAT&apos;S INCLUDED IN SETUP
                </h4>
                <ul className="space-y-2.5 text-sm text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#ff6a3d] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>AI Missed Call Recovery system</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#ff6a3d] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>Automated 5-Star Review Engine</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#ff6a3d] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>Anti-No-Show Reminders workflow</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#ff6a3d] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>5-Minute Speed-to-Lead Responder</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#ff6a3d] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>&ldquo;Zero-Effort&rdquo; AI Social Media Poster</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#ff6a3d] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>Full cross-system integration</span>
                  </li>
                </ul>
              </div>

              {/* Monthly Maintenance Box (Inner Dark Box) */}
              <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-4 sm:p-5 mb-8">
                <h5 className="text-xs font-mono font-bold text-[#ff6a3d] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <span>↻</span> MONTHLY MAINTENANCE INCLUDES
                </h5>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a3d] shrink-0"></span>
                    <span>Everything in Single Service, plus:</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a3d] shrink-0"></span>
                    <span>Dedicated n8n instance hosting</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a3d] shrink-0"></span>
                    <span>Priority 1-on-1 strategy &amp; tweaks</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a3d] shrink-0"></span>
                    <span>Continuous AI prompt optimization</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Actions & Guarantee */}
            <div>
              {/* CTA Button: Solid Orange Style */}
              <button
                type="button"
                onClick={() =>
                  onSelectPlan({
                    id: 'dominance-bundle',
                    name: 'Local Dominance Bundle',
                    price: '$190',
                    period: 'mo',
                    badge: '✦ MOST CHOSEN',
                    isBundle: true,
                    description: 'All 5 micro-services integrated into one seamless automated pipeline.',
                  })
                }
                className="w-full py-3.5 px-6 rounded-xl bg-[#ff6a3d] hover:bg-[#ff7d54] text-[#09090b] font-mono text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-[0_0_25px_rgba(255,106,61,0.45)] hover:shadow-[0_0_35px_rgba(255,106,61,0.65)] active:scale-[0.99] mb-6"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Footer / Guarantee */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-center gap-2 text-xs text-zinc-400">
                <Shield className="w-3.5 h-3.5 text-[#ff6a3d]" />
                <span>No long-term contracts - Cancel monthly anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
