'use client';

import React, { useState } from 'react';
import { 
  PhoneMissed, 
  Sparkles, 
  MessageSquare, 
  CalendarCheck, 
  Star, 
  Share2, 
  CheckCircle2, 
  ArrowRight,
  Check,
  Bot,
  Zap,
  PhoneCall,
  Clock,
  Send
} from 'lucide-react';

interface HeroSectionProps {
  onBookAuditClick: () => void;
  onCallDemoClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookAuditClick,
  onCallDemoClick,
}) => {
  const [activeTab, setActiveTab] = useState<'missed_calls' | 'reviews'>('missed_calls');

  return (
    <section className="relative overflow-hidden w-full bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950 py-12 md:py-20 px-4 sm:px-6">
      {/* Background Dot Matrix Texture similar to reference */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.14] -z-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      {/* Subtle Warm Amber / Orange Radial Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-12 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ============================================================ */}
          {/* COLUMN 1: LEFT SIDE (Pitch, Authority & CTA) - lg:col-span-7 */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Pill Badge */}
            <div className="bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-xs px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 mb-6 shadow-sm backdrop-blur-md">
              <span className="text-orange-400 font-bold">✦</span>
              <span className="font-medium tracking-tight">Business problem first. AI second.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Find where your home service business is losing{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-rose-500 bg-clip-text text-transparent">
                time, leads &amp; revenue
              </span>{' '}
              — then install the system that fixes it.
            </h1>

            {/* Subheadline */}
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              We build practical, 24/7 AI-powered systems that recover missed calls, auto-qualify emergency jobs, and collect 5-star reviews — without adding another complicated software for your team to manage.
            </p>

            {/* Founder Authority Card */}
            <div className="w-full max-w-xl bg-zinc-900/80 border border-zinc-800/90 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shadow-md backdrop-blur-sm">
              <div className="flex items-center gap-3.5">
                <img
                  src="https://i.ibb.co.com/fdLzRRFn/ma-hakim-image.png"
                  alt="MA Hakim · Founder, Callora.pro"
                  className="w-11 h-11 rounded-full object-cover border border-zinc-700 shadow-inner shrink-0"
                />
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                    <span>MA Hakim</span>
                    <span className="text-zinc-500 font-normal">· Founder, Callora.pro</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-snug">
                    I help home service owners automate operations with enterprise-grade reliability.
                  </p>
                </div>
              </div>
              <div className="shrink-0 self-start sm:self-center">
                <span className="text-[10px] tracking-wider uppercase font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-md inline-block">
                  FOUNDER-DIRECT
                </span>
              </div>
            </div>

            {/* CTA Group & Reassurance */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onBookAuditClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold shadow-lg shadow-orange-500/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer text-sm"
              >
                <span>Book a Free Strategy Audit</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </button>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 font-semibold hover:bg-zinc-800 hover:text-white transition text-sm cursor-pointer"
              >
                <span>Explore Solutions</span>
                <span className="text-xs text-zinc-400">↓</span>
              </a>
            </div>

            {/* Micro-reassurance text below buttons */}
            <p className="text-xs text-zinc-500 mt-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>30 minutes · No sales pressure · You leave with a tailored automation map for your business.</span>
            </p>
          </div>

          {/* ============================================================ */}
          {/* COLUMN 2: RIGHT SIDE (Interactive Workflow Architecture)     */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 w-full flex flex-col">
            {/* Section Kicker */}
            <div className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase mb-3 flex items-center gap-1.5">
              <span className="text-orange-500">•</span>
              <span>CHOOSE YOUR AUTOMATION PATH</span>
            </div>

            {/* Interactive Tab Selector */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-zinc-900/80 border border-zinc-800 rounded-xl mb-4 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('missed_calls')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'missed_calls'
                    ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
                <span className="truncate">Turn calls into bookings</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate">Turn jobs into reviews</span>
              </button>
            </div>

            {/* Workflow Architecture Box */}
            <div className="bg-zinc-900/50 border border-zinc-800/90 rounded-2xl p-5 shadow-2xl backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
              
              {/* TAB 1: Missed Calls to Bookings */}
              {activeTab === 'missed_calls' && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  {/* Category Pill */}
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                      <span className="text-[11px] font-mono font-bold tracking-wider text-rose-400 uppercase">
                        FOR HVAC &amp; PLUMBING CONTRACTORS
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">Live 24/7 Engine</span>
                  </div>

                  {/* Canvas Visual: Interactive Node Graph UI */}
                  <div className="relative p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 overflow-hidden shadow-inner">
                    {/* SVG Connector Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="50%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                      <path d="M 50 45 L 120 45 L 150 45 L 220 45 L 250 45 L 340 45" stroke="url(#lineGrad1)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                    </svg>

                    <div className="grid grid-cols-4 gap-2 relative z-10 text-center">
                      {/* Node 1 */}
                      <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mb-1">
                          <PhoneMissed className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-medium text-zinc-300 leading-tight">Customer Call Missed</span>
                      </div>

                      {/* Node 2 - Glowing Centerpiece */}
                      <div className="p-2 rounded-lg bg-zinc-900 border-2 border-orange-500/60 shadow-[0_0_15px_rgba(249,115,22,0.25)] flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mb-1">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-bold text-orange-300 leading-tight">AI Lead Triage</span>
                      </div>

                      {/* Node 3 */}
                      <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mb-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-medium text-zinc-300 leading-tight">Instant Priority SMS</span>
                      </div>

                      {/* Node 4 */}
                      <div className="p-2 rounded-lg bg-zinc-900 border border-emerald-500/30 flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-1">
                          <CalendarCheck className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-medium text-emerald-300 leading-tight">Job Locked</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span>Inbound trigger: Missed Call</span>
                      <span className="text-emerald-400 font-semibold">&lt; 3s response time</span>
                    </div>
                  </div>

                  {/* Step-by-Step Breakdown List */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <span className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                      <span className="text-zinc-300">Customer calls while your technician is on the roof or under a sink.</span>
                    </div>
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <span className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                      <span className="text-zinc-300">Callora system detects the missed call in &lt;3 seconds automatically.</span>
                    </div>
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <span className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                      <span className="text-zinc-300">AI instantly texts back to triage urgency, collect address &amp; job details.</span>
                    </div>
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <span className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                      <span className="text-zinc-300">Emergency job is locked into calendar before they call your competitor.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Jobs to 5-Star Reviews */}
              {activeTab === 'reviews' && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  {/* Category Pill */}
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                      <span className="text-[11px] font-mono font-bold tracking-wider text-amber-400 uppercase">
                        FOR LOCAL REPUTATION GROWTH
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">Auto Compounder</span>
                  </div>

                  {/* Canvas Visual: Interactive Node Graph UI */}
                  <div className="relative p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 overflow-hidden shadow-inner">
                    {/* SVG Connector Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                      <path d="M 50 45 L 120 45 L 150 45 L 220 45 L 250 45 L 340 45" stroke="url(#lineGrad2)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                    </svg>

                    <div className="grid grid-cols-4 gap-2 relative z-10 text-center">
                      {/* Node 1 */}
                      <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-medium text-zinc-300 leading-tight">Job Completed</span>
                      </div>

                      {/* Node 2 - Center Filter */}
                      <div className="p-2 rounded-lg bg-zinc-900 border-2 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.25)] flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-bold text-amber-300 leading-tight">Sentiment Filter</span>
                      </div>

                      {/* Node 3 */}
                      <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center mb-1">
                          <Star className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-medium text-zinc-300 leading-tight">Google Review SMS</span>
                      </div>

                      {/* Node 4 */}
                      <div className="p-2 rounded-lg bg-zinc-900 border border-emerald-500/30 flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-1">
                          <Share2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-medium text-emerald-300 leading-tight">Meta Auto-Post</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span>Trigger: Invoice closed</span>
                      <span className="text-amber-400 font-semibold">+15 5-star reviews/mo</span>
                    </div>
                  </div>

                  {/* Step-by-Step Breakdown List */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                      <span className="text-zinc-300">Job marked complete in CRM or field dispatch software.</span>
                    </div>
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                      <span className="text-zinc-300">AI sends personalized polite SMS request with direct review link.</span>
                    </div>
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                      <span className="text-zinc-300">Filters private feedback if unhappy; routes 5-star ratings to Google.</span>
                    </div>
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                      <span className="text-zinc-300">Automatically turns before/after job photos into engaging Meta posts.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Interactive Link */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <a
                  href="#lead-engine"
                  onClick={onCallDemoClick}
                  className="text-xs text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Test this system live on our simulator →</span>
                </a>
                <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                  Interactive Preview
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
