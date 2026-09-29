'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import HeroWorkflowPreview from './HeroWorkflowPreview';

interface HeroSectionProps {
  onBookAuditClick: () => void;
  onCallDemoClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookAuditClick,
  onCallDemoClick,
}) => {
  return (
    <section className="relative overflow-hidden w-full bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950 py-12 md:py-20 px-4 sm:px-6">
      {/* Futuristic Dot-Grid Pattern Background with Radial Mask */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:24px_24px] opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle Warm Amber / Orange Radial Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/15 blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse duration-1000"></div>
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
            <HeroWorkflowPreview onCallDemoClick={onCallDemoClick} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
