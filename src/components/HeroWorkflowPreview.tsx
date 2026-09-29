"use client";

import React, { useState, useEffect } from "react";
import { PhoneCall, Star, ZoomIn, X, ArrowRight } from "lucide-react";

interface WorkflowData {
  id: string;
  tabLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  title: string;
  imageUrl: string;
  alt: string;
  steps: { num: string; text: string }[];
}

const workflows: Record<string, WorkflowData> = {
  missedCall: {
    id: "missedCall",
    tabLabel: "Missed Calls to Bookings",
    icon: PhoneCall,
    badge: "FOR HVAC & PLUMBING CONTRACTORS",
    title: "How an after-hours emergency call is handled autonomously",
    imageUrl: "https://i.ibb.co.com/CsvR6vHL/ai-missed-cal-recovery.png",
    alt: "AI Missed Call Recovery n8n Workflow Architecture",
    steps: [
      { num: "1", text: "Customer missed call detected via Twilio webhook in <3s." },
      { num: "2", text: "AI instantly sends conversational SMS with dynamic job triage." },
      { num: "3", text: "Collects problem details & photo; matches emergency dispatch criteria." },
      { num: "4", text: "Locks booking directly onto Google Calendar / Field CRM without lag." },
    ],
  },
  reviewGrowth: {
    id: "reviewGrowth",
    tabLabel: "Jobs to 5-Star Reviews",
    icon: Star,
    badge: "FOR REPUTATION & GOOGLE RANKING",
    title: "How completed jobs trigger verified Google reviews & social proof",
    imageUrl: "https://i.ibb.co.com/V0Dg043n/review-request.png",
    alt: "Automated 5-Star Review Request n8n Workflow Architecture",
    steps: [
      { num: "1", text: "Invoice marked paid or job completed in dispatch software." },
      { num: "2", text: "System sends automated polite SMS asking for feedback." },
      { num: "3", text: "Sentiment filter: routes 5-star ratings directly to Google Maps." },
      { num: "4", text: "Converts before/after job photos into formatted Meta/Facebook posts." },
    ],
  },
};

interface HeroWorkflowPreviewProps {
  onCallDemoClick?: () => void;
}

export default function HeroWorkflowPreview({ onCallDemoClick }: HeroWorkflowPreviewProps = {}) {
  const [activeTab, setActiveTab] = useState<"missedCall" | "reviewGrowth">("missedCall");
  const [isZoomed, setIsZoomed] = useState(false);

  const current = workflows[activeTab];

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsZoomed(false);
    };
    if (isZoomed) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isZoomed]);

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* 1. FUTURISTIC DOT-GRID BACKGROUND */}
      <div 
        className="absolute -inset-10 -z-10 pointer-events-none opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]"
        style={{
          backgroundImage: "radial-gradient(#52525b 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      {/* 2. GLITTERING AMBIENT GLOW / AURA */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-500/20 rounded-full blur-[90px] pointer-events-none animate-pulse duration-1000" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Section Kicker */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
          CHOOSE YOUR AUTOMATION PATH
        </span>
      </div>

      {/* Interactive Tabs */}
      <div className="grid grid-cols-2 gap-2 mb-4 p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl backdrop-blur-md">
        {(["missedCall", "reviewGrowth"] as const).map((key) => {
          const tab = workflows[key];
          const Icon = tab.icon;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-zinc-800 text-white border border-zinc-700/80 shadow-md"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-orange-400" : "text-zinc-500"}`} />
              <span className="truncate">{tab.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* 3. GLOWING SHIMMER WORKFLOW CONTAINER */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/30 via-zinc-800/70 to-zinc-900/40 shadow-[0_0_50px_-15px_rgba(249,115,22,0.2)]">
        <div className="bg-zinc-950/90 backdrop-blur-xl rounded-2xl p-5 border border-zinc-800/60">
          
          {/* Header Badge with Radar Pulse */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-[10px] font-bold tracking-wider text-orange-400 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              {current.badge}
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">24/7 Autonomous</span>
          </div>

          {/* Workflow Screenshot with Click to Zoom Overlay */}
          <div
            onClick={() => setIsZoomed(true)}
            className="group relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800/90 bg-zinc-900/60 cursor-pointer transition-all duration-300 group-hover:border-orange-500/40 group-hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.3)]"
          >
            <img
              src={current.imageUrl}
              alt={current.alt}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
              loading="eager"
            />

            {/* Hover Zoom Badge */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[2px]">
              <div className="px-3.5 py-1.5 rounded-full bg-zinc-900/95 border border-zinc-700 text-white text-xs font-semibold tracking-wider flex items-center gap-2 shadow-xl">
                <ZoomIn className="w-3.5 h-3.5 text-orange-400"/>
                <span>CLICK TO ZOOM</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-zinc-500 italic mt-2 text-center">
            {current.title}
          </p>

          {/* Step-by-Step Breakdown */}
          <div className="mt-4 pt-4 border-t border-zinc-900 space-y-2.5">
            {current.steps.map((step) => (
              <div key={step.num} className="flex items-start gap-2.5 text-left">
                <span className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {step.num}
                </span>
                <span className="text-xs text-zinc-300 leading-snug">{step.text}</span>
              </div>
            ))}
          </div>

          {/* Bottom Simulator Link */}
          <div className="mt-4 pt-3 border-t border-zinc-900/80 flex items-center justify-between">
            <a 
              href="#demo-sim"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
            >
              <span>Test this flow live on our simulator</span>
              <ArrowRight className="w-3.5 h-3.5"/>
            </a>
            <span className="text-[10px] text-zinc-500">Zero human lag</span>
          </div>

        </div>
      </div>

      {/* 4. LIGHTBOX ZOOM MODAL */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl max-h-[90vh] w-full rounded-2xl border border-zinc-700/70 bg-zinc-950 p-2 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Top Bar inside modal */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-semibold text-zinc-300">
                {current.alt}
              </span>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-full transition cursor-pointer"
              >
                <X className="w-4 h-4"/>
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative w-full h-[75vh] bg-zinc-950 overflow-auto flex items-center justify-center p-2">
              <img
                src={current.imageUrl}
                alt={current.alt}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
