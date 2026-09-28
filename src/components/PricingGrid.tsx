'use client';

import React from 'react';
import {
  PhoneCall,
  Target,
  Bot,
  Star,
  Image as ImageIcon,
  Rocket,
  Check,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import { SelectedServicePlan } from './ServiceOrderModal';

interface PricingGridProps {
  onSelectPlan: (plan: SelectedServicePlan) => void;
}

interface PricingCardData {
  id: string;
  icon: LucideIcon;
  title: string;
  time: string;
  description: string;
  setupPrice: string;
  monthlyPrice: string;
  saveHighlight?: string;
  isHighlighted?: boolean;
  badge?: string;
  ctaText: string;
  setupFeatures: string[];
  monthlyFeatures: string[];
  disclaimer: string;
}

const PRICING_CARDS: PricingCardData[] = [
  {
    id: 'missed-call-triage',
    icon: PhoneCall,
    title: 'Missed Call Triage',
    time: '1–2 days',
    description: 'Instantly text back missed calls, identify emergencies, and send you instant Red Alerts.',
    setupPrice: '$0',
    monthlyPrice: '$50',
    ctaText: 'Order Now',
    setupFeatures: [
      'Custom automated text-back workflow',
      'Emergency vs. Standard problem routing',
      'Airtable/Google Sheet CRM integration',
      'Instant SMS "Red Alert" setup for owners',
    ],
    monthlyFeatures: [
      'Free n8n backend hosting included',
      '24/7 AI triage and lead qualification',
      'Priority email support',
    ],
    disclaimer: 'Client covers own wholesale API/SIM usage.',
  },
  {
    id: 'lead-nurturing',
    icon: Target,
    title: 'Lead Nurturing',
    time: '1–2 days',
    description: 'Stop calling tire-kickers. We capture, nurture, and score your web & social leads automatically.',
    setupPrice: '$0',
    monthlyPrice: '$50',
    ctaText: 'Order Now',
    setupFeatures: [
      'Multi-channel lead capture (FB, Forms)',
      'Custom automated nurturing sequences',
      'Lead Quality Scoring logic implementation',
      'Custom Airtable/Sheet Lead Dashboard',
    ],
    monthlyFeatures: [
      'Free n8n backend hosting included',
      'Real-time scoring and CRM syncing',
      'Priority email support',
    ],
    disclaimer: 'Client covers own wholesale API/SIM usage.',
  },
  {
    id: 'ai-web-receptionist',
    icon: Bot,
    title: 'AI Web Receptionist',
    time: '2–3 days',
    description: 'An intelligent chat widget trained on your business data to capture leads and book appointments 24/7.',
    setupPrice: '$0',
    monthlyPrice: '$50',
    ctaText: 'Order Now',
    setupFeatures: [
      'AI knowledge training (RAG) on your business',
      'Website chat widget installation',
      'Automated appointment booking flow',
      'Direct sync to your CRM/Sheet',
    ],
    monthlyFeatures: [
      'Free n8n backend hosting included',
      'Continuous AI knowledge updates',
      'Priority email support',
    ],
    disclaimer: 'Client covers own wholesale API/SIM usage.',
  },
  {
    id: 'review-engine',
    icon: Star,
    title: '5-Star Review Engine',
    time: '1–2 days',
    description: 'Skyrocket your local Google ranking with automated review requests after every job.',
    setupPrice: '$0',
    monthlyPrice: '$50',
    ctaText: 'Order Now',
    setupFeatures: [
      'CRM or Payment gateway trigger setup',
      'Custom review request SMS template',
      'Direct Google Review link integration',
      'Flexible setup (Shared or Dedicated)',
    ],
    monthlyFeatures: [
      'Free n8n backend hosting included',
      'Review velocity tracking',
      'Priority email support',
    ],
    disclaimer: 'Client covers own wholesale API/SIM usage.',
  },
  {
    id: 'ai-social-poster',
    icon: ImageIcon,
    title: 'AI Social Poster',
    time: '1–2 days',
    description: 'Just text a Before/After photo to our WhatsApp, and AI posts it for you.',
    setupPrice: '$0',
    monthlyPrice: '$50',
    ctaText: 'Order Now',
    setupFeatures: [
      'Dedicated WhatsApp bot trigger',
      'OpenAI custom prompt engineering',
      'Facebook/Instagram Page connection',
      'Flexible setup (Shared or Dedicated)',
    ],
    monthlyFeatures: [
      'Free n8n backend hosting included',
      'AI caption generation automation',
      'Priority email support',
    ],
    disclaimer: 'Client covers own wholesale API/SIM usage.',
  },
  {
    id: 'local-lead-dominance',
    icon: Rocket,
    title: 'Local Lead Dominance',
    time: '3–5 days',
    description: 'All 5 systems integrated into one master pipeline. Triage, score, book, and grow on autopilot.',
    setupPrice: '$0',
    monthlyPrice: '$190',
    saveHighlight: 'Save $60',
    isHighlighted: true,
    badge: '✦ MOST CHOSEN',
    ctaText: 'Order The Bundle',
    setupFeatures: [
      'All 5 micro-services built & connected',
      'Master Airtable/CRM Dashboard setup',
      'End-to-end n8n workflow architecture',
      'Dedicated private setup available',
    ],
    monthlyFeatures: [
      'Free n8n backend hosting included',
      'Priority 1-on-1 strategy & workflow tweaks',
      'Continuous AI prompt optimization',
    ],
    disclaimer: 'Client covers own wholesale API/SIM usage.',
  },
];

export const PricingGrid: React.FC<PricingGridProps> = ({ onSelectPlan }) => {
  return (
    <section className="py-24 px-4 sm:px-6 relative" id="pricing">
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[#ff6a3d] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent Split Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Simple Pricing. Guaranteed ROI.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            Pick individual micro-services to plug specific revenue leaks, or deploy the complete automated local dominance engine.
          </p>
        </div>

        {/* 6-Card Responsive Grid: 3 cols on desktop (lg), 2 cols on tablet (md), 1 col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {PRICING_CARDS.map((card) => {
            const Icon = card.icon;
            const isHighlighted = card.isHighlighted;

            return (
              <div
                key={card.id}
                className={`relative rounded-2xl bg-zinc-950 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  isHighlighted
                    ? 'border-2 border-[#ff6a3d]/70 shadow-[0_0_35px_rgba(255,106,61,0.22)] bg-gradient-to-b from-zinc-950 via-[#181210]/30 to-zinc-950'
                    : 'border border-zinc-800 hover:border-zinc-700/80 shadow-lg'
                }`}
              >
                {/* Highlighted Badge at Top Right */}
                {isHighlighted && card.badge && (
                  <div className="absolute top-5 right-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff6a3d] text-[#09090b] text-[10px] font-mono font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(255,106,61,0.55)]">
                      {card.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Card Header: Icon + Title & Time */}
                  <div className={`flex items-start gap-3.5 mb-3.5 ${isHighlighted ? 'pr-28' : ''}`}>
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                        isHighlighted
                          ? 'bg-[#ff6a3d]/15 border-[#ff6a3d]/40 text-[#ff6a3d]'
                          : 'bg-zinc-900 border-zinc-800 text-[#ff6a3d]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                        {card.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>⏱ {card.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 mb-5 leading-relaxed min-h-[40px]">
                    {card.description}
                  </p>

                  {/* Split Pricing Boxes (2-Column Grid) */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {/* Left Box: Setup */}
                    <div className="rounded-xl border border-zinc-800/80 bg-transparent p-3.5">
                      <span className="block text-[10px] font-mono tracking-wider text-zinc-400 uppercase font-semibold mb-1">
                        SETUP
                      </span>
                      <div className="text-2xl font-extrabold text-white font-mono tracking-tight">
                        {card.setupPrice}
                      </div>
                      <span className="block text-[11px] text-zinc-400 mt-0.5">
                        one-time setup
                      </span>
                    </div>

                    {/* Right Box: Monthly */}
                    <div className="rounded-xl border border-zinc-800/80 bg-transparent p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="block text-[10px] font-mono tracking-wider text-[#ff6a3d] uppercase font-semibold mb-1">
                          MONTHLY
                        </span>
                        {card.saveHighlight && (
                          <span className="text-[9px] font-mono text-[#ff6a3d] font-bold bg-[#ff6a3d]/10 px-1.5 py-0.5 rounded border border-[#ff6a3d]/20">
                            {card.saveHighlight}
                          </span>
                        )}
                      </div>
                      <div className="text-2xl font-extrabold text-[#ff6a3d] font-mono tracking-tight">
                        {card.monthlyPrice}
                      </div>
                      <span className="block text-[11px] text-zinc-400 mt-0.5">
                        /month maintenance
                      </span>
                    </div>
                  </div>

                  {/* Features: What's Included in Setup */}
                  <div className="mb-5">
                    <h4 className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <span className="text-[#ff6a3d]">✔</span> WHAT&apos;S INCLUDED IN SETUP
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-[13px] text-zinc-300">
                      {card.setupFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#ff6a3d] shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Monthly Maintenance Box (Distinct Inner Dark Box) */}
                  <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 p-3.5 sm:p-4 mb-6">
                    <h5 className="text-[11px] font-mono font-bold text-[#ff6a3d] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <span>↻</span> MONTHLY MAINTENANCE INCLUDES
                    </h5>
                    <ul className="space-y-1.5 text-xs text-zinc-300 mb-2.5">
                      {card.monthlyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a3d] shrink-0 mt-1.5"></span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Disclaimer Bullet: Styled slightly smaller, muted & italic */}
                    <div className="pt-2 border-t border-zinc-800/60 flex items-start gap-1.5 text-[11px] text-zinc-500 italic leading-snug">
                      <span className="shrink-0 text-zinc-500">*</span>
                      <span>{card.disclaimer}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: CTA Button + Guarantee Footer */}
                <div>
                  {isHighlighted ? (
                    <button
                      type="button"
                      onClick={() =>
                        onSelectPlan({
                          id: card.id,
                          name: card.title,
                          price: card.monthlyPrice,
                          period: 'mo',
                          badge: card.badge,
                          isBundle: true,
                          description: card.description,
                        })
                      }
                      className="w-full py-3 px-5 rounded-xl bg-[#ff6a3d] hover:bg-[#ff7d54] text-[#09090b] font-mono text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(255,106,61,0.45)] hover:shadow-[0_0_30px_rgba(255,106,61,0.65)] active:scale-[0.99] mb-4"
                    >
                      <span>{card.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        onSelectPlan({
                          id: card.id,
                          name: card.title,
                          price: card.monthlyPrice,
                          period: 'mo',
                          badge: 'Micro-Service',
                          description: card.description,
                        })
                      }
                      className="w-full py-3 px-5 rounded-xl border border-zinc-700 bg-transparent hover:bg-zinc-800/60 hover:border-zinc-500 text-white font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.99] mb-4"
                    >
                      <span>{card.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {/* Card Guarantee Footer */}
                  <div className="pt-3.5 border-t border-zinc-800/80 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
                    <Shield className="w-3.5 h-3.5 text-[#ff6a3d] shrink-0" />
                    <span>No long-term contracts - Cancel monthly anytime</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingGrid;
