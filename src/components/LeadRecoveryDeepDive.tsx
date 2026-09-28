'use client';

import React from 'react';
import { Signal, Wifi, Battery } from 'lucide-react';

export const LeadRecoveryDeepDive: React.FC = () => {
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
            <span>Explore Plans</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center" id="demo-sim">
          {/* Feature Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary text-2xl">phone_missed</span>
                <h3 className="font-bold text-lg text-text-primary">AI Missed Call Recovery</h3>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                If you miss a call, our system instantly sends a text: <span className="text-text-primary font-semibold">&quot;Hey, sorry we missed your call. I&apos;m on a job site right now. How can we help?&quot;</span> The conversation continues automatically, even while you&apos;re busy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-secondary text-2xl">flash_on</span>
                <h3 className="font-bold text-lg text-text-primary">5-Minute Speed-to-Lead Responder</h3>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Customers contact the first company that replies. Our automation responds within minutes to any web or Facebook lead, collects information, and keeps leads engaged until you are ready. Quietly running in the background. Working 24/7. Capturing opportunities while you work.
              </p>
            </div>
          </div>

          {/* Realistic iPhone 15 Pro Mobile Mockup */}
          <div className="lg:col-span-7 flex justify-center">
            {/* Outer Physical Phone Chassis (Hardware Bezel) */}
            <div className="w-full max-w-[360px] sm:max-w-[390px] rounded-[3.25rem] border-[8px] sm:border-[10px] border-zinc-800 bg-zinc-950 p-2 sm:p-2.5 shadow-2xl shadow-orange-500/20 ring-1 ring-white/10 relative transition-transform duration-300 hover:scale-[1.01]">
              {/* Outer Edge Metallic Glare Accents */}
              <div className="absolute -inset-[1px] rounded-[3.25rem] pointer-events-none border border-zinc-700/40"></div>

              {/* Physical Volume & Power Buttons Simulation (Side Accents) */}
              <div className="absolute -left-[12px] top-28 w-[4px] h-10 bg-zinc-700 rounded-l-md hidden sm:block"></div>
              <div className="absolute -left-[12px] top-42 w-[4px] h-14 bg-zinc-700 rounded-l-md hidden sm:block"></div>
              <div className="absolute -right-[12px] top-36 w-[4px] h-16 bg-zinc-700 rounded-r-md hidden sm:block"></div>

              {/* The Inner OLED Display Screen Area */}
              <div className="relative rounded-[2.6rem] bg-[#0c0d12] overflow-hidden flex flex-col h-[640px] sm:h-[680px] border border-zinc-800/80">
                {/* Dynamic Island / Camera Notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[100px] h-[24px] bg-black rounded-full z-30 flex items-center justify-between px-3 shadow-md border border-zinc-800/40 pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-950"></div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-zinc-900/80"></div>
                </div>

                {/* Mobile Status Bar */}
                <div className="relative z-20 flex items-center justify-between px-6 pt-3 pb-2 text-[10px] text-zinc-400 font-medium select-none">
                  {/* Left: Time */}
                  <span className="font-semibold tracking-tight text-zinc-300">9:41</span>

                  {/* Right: Hardware Icons (Cellular, Wifi, Battery) */}
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Signal className="w-3.5 h-3.5" />
                    <Wifi className="w-3.5 h-3.5" />
                    <Battery className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Simulated SMS App Header */}
                <div className="px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800/80 backdrop-blur-md flex items-center justify-between z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#ff6a3d] to-[#fbbf24] flex items-center justify-center text-zinc-950 font-bold text-xs shadow-[0_0_12px_rgba(255,106,61,0.4)]">
                        AP
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-status-positive border-2 border-zinc-900"></span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Apex Plumbing AI</span>
                        <span className="material-symbols-outlined text-[13px] text-blue-400">verified</span>
                      </div>
                      <div className="text-[10px] font-code text-zinc-400">
                        Auto-Attendant &bull; Active
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-code text-[#ff6a3d] bg-[#ff6a3d]/10 px-2 py-0.5 rounded-full border border-[#ff6a3d]/30 font-semibold">
                    iMessage
                  </span>
                </div>

                {/* SMS Timestamp Divider */}
                <div className="py-2 text-center select-none">
                  <span className="text-[10px] font-code text-zinc-500 uppercase tracking-wider">
                    Today &bull; 9:41 AM (Missed Call Detected)
                  </span>
                </div>

                {/* Scrollable Chat Area */}
                <div className="flex-1 overflow-y-auto px-3.5 sm:px-4 py-2 space-y-3.5 text-xs sm:text-[13px] scrollbar-none">
                  {/* Message 1: Apex Plumbing Auto-Text */}
                  <div className="flex flex-col items-start max-w-[85%] animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="text-[10px] font-code text-zinc-500 mb-0.5 ml-1">
                      Apex Plumbing &bull; 9:41 AM
                    </span>
                    <div className="bg-gradient-to-r from-[#ff6a3d] to-[#f97316] text-zinc-950 font-semibold p-3 sm:p-3.5 rounded-2xl rounded-tl-sm shadow-md shadow-orange-500/15 leading-snug">
                      Hey, sorry we missed your call! I&apos;m on a job site right now. How can we help you today?
                    </div>
                  </div>

                  {/* Message 2: Customer Reply */}
                  <div className="flex flex-col items-end ml-auto max-w-[85%] animate-in fade-in slide-in-from-right-2 duration-300 delay-150">
                    <span className="text-[10px] font-code text-zinc-500 mb-0.5 mr-1">
                      Customer &bull; 9:41 AM
                    </span>
                    <div className="bg-zinc-800 text-zinc-100 font-medium p-3 sm:p-3.5 rounded-2xl rounded-tr-sm border border-zinc-700/60 shadow-sm leading-snug">
                      Hi! I have a burst water line under the bathroom sink. Can someone come by this afternoon?
                    </div>
                  </div>

                  {/* Message 3: Apex Plumbing Auto-Triage & Booking */}
                  <div className="flex flex-col items-start max-w-[85%] animate-in fade-in slide-in-from-left-2 duration-300 delay-300">
                    <span className="text-[10px] font-code text-zinc-500 mb-0.5 ml-1">
                      Apex Plumbing &bull; 9:42 AM
                    </span>
                    <div className="bg-gradient-to-r from-[#ff6a3d] to-[#f97316] text-zinc-950 font-semibold p-3 sm:p-3.5 rounded-2xl rounded-tl-sm shadow-md shadow-orange-500/15 leading-snug">
                      We can definitely get that fixed for you today. What is your home address, and would 2:30 PM work for our lead technician?
                    </div>
                  </div>

                  {/* Message 4: Customer Confirmation */}
                  <div className="flex flex-col items-end ml-auto max-w-[85%] animate-in fade-in slide-in-from-right-2 duration-300 delay-500">
                    <span className="text-[10px] font-code text-zinc-500 mb-0.5 mr-1">
                      Customer &bull; 9:42 AM
                    </span>
                    <div className="bg-zinc-800 text-zinc-100 font-medium p-3 sm:p-3.5 rounded-2xl rounded-tr-sm border border-zinc-700/60 shadow-sm leading-snug">
                      Yes, 2:30 PM is perfect! Address is 742 Evergreen Terrace.
                    </div>
                  </div>

                  {/* Message 5: System Dispatch Confirmation */}
                  <div className="flex flex-col items-start max-w-[88%] animate-in fade-in slide-in-from-left-2 duration-300 delay-700">
                    <span className="text-[10px] font-code text-zinc-500 mb-0.5 ml-1">
                      Apex Plumbing &bull; 9:42 AM
                    </span>
                    <div className="bg-gradient-to-r from-[#ff6a3d] to-[#f97316] text-zinc-950 font-semibold p-3 sm:p-3.5 rounded-2xl rounded-tl-sm shadow-md shadow-orange-500/20 leading-snug">
                      <span className="inline-flex items-center gap-1 text-black font-bold block mb-1">
                        <span className="material-symbols-outlined text-[15px]">check_circle</span>
                        Appointment Locked: 2:30 PM
                      </span>
                      You&apos;re all set! Dave will text you when he&apos;s 15 mins away.
                    </div>
                  </div>
                </div>

                {/* Live Pipeline Value Bar at Phone Bottom */}
                <div className="px-4 py-2 bg-zinc-900/90 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-code text-zinc-400 select-none">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-positive animate-pulse"></span>
                    Lead Captured in &lt;60s
                  </span>
                  <span className="text-status-positive font-bold">+$450 Job Saved</span>
                </div>

                {/* Bottom iOS Home Swipe Bar Indicator */}
                <div className="pb-2 pt-1 flex justify-center bg-[#0c0d12] select-none">
                  <div className="w-1/3 h-1 bg-zinc-600 rounded-full mb-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadRecoveryDeepDive;
