import React, { useState, useEffect } from 'react';

export const ReputationEngineDeepDive: React.FC = () => {
  // Loop through 3 scenes: 0 = Input (WhatsApp), 1 = Processing (AI Sparkle), 2 = Output (Facebook Post)
  const [pipelineStep, setPipelineStep] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPipelineStep((prev) => (prev + 1) % 3);
    }, 2200); // Transitions through all 3 stages every 6.6s full cycle
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 border-t border-border-subtle px-6 bg-surface-base" id="reputation-engine">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-code text-xs text-[#ff6a3d] uppercase tracking-wider mb-2 block font-semibold">
            THE COST OF INACTION
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-3">
            Stop Losing Jobs to Competitors with Worse Service.
          </h2>
          <p className="text-base text-text-muted leading-relaxed">
            You do 5-star work. But if your Google profile is empty and your Facebook page looks dead, the other guy gets the call. Let&apos;s fix your online presence on autopilot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Feature 1: Automated 5-Star Review Engine */}
          <div className="p-8 rounded-2xl bg-surface-card border border-border-subtle card-border-glow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/30">
                  <span className="material-symbols-outlined">grade</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">
                    The &ldquo;<span className="text-[#ff6a3d] underline decoration-[#ff6a3d]/40 underline-offset-4 font-black">Forgot to Review</span>&rdquo; Trap
                  </h3>
                  <span className="text-xs font-code text-secondary font-semibold">$50/month</span>
                </div>
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                You bust your back doing a great job, but the customer forgets to review you. Begging is awkward, and just one angry client can ruin your average. Our system texts them automatically before they forget, burying bad reviews under a mountain of 5-star ratings.
              </p>
              <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle space-y-2 text-xs font-code text-text-muted">
                <div className="flex items-center gap-2 text-status-positive font-bold">
                  <span className="material-symbols-outlined text-[16px]">verified</span> Sample Review SMS
                </div>
                <p className="italic text-text-primary">
                  &quot;Hi Sarah, thanks for choosing Apex Plumbing today! If you&apos;re happy with the repair, would you mind leaving us a quick 5-star review? It helps our local team immensely: [Google Link]&quot;
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-code">
              <span className="text-text-dim flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>Solves: Getting outranked on Google</span>
              </span>
              <span className="text-status-positive font-bold">+15 Reviews/mo</span>
            </div>
          </div>

          {/* Feature 2: Zero-Effort Social Media Poster with Dynamic Visual Demonstration */}
          <div className="p-8 rounded-2xl bg-surface-card border border-border-subtle card-border-glow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary border border-primary/30">
                  <span className="material-symbols-outlined">add_a_photo</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">
                    The &ldquo;<span className="text-[#ff6a3d] underline decoration-[#ff6a3d]/40 underline-offset-4 font-black">Too Tired to Post</span>&rdquo; Problem
                  </h3>
                  <span className="text-xs font-code text-primary font-semibold">$50/month</span>
                </div>
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                After a 10-hour day in the field, the last thing you want to do is write Facebook captions and research hashtags. But an abandoned social page kills customer trust. Just snap a photo, text it to our WhatsApp bot, and go home. We do the rest.
              </p>

              {/* Dynamic Animated Visual Demonstration Box */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 shadow-inner relative overflow-hidden min-h-[175px] flex flex-col justify-between">
                {/* Header with step progress indicator */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-primary text-xs font-code font-bold">
                    <span className="material-symbols-outlined text-[15px]">bolt</span>
                    <span>1-Click Autopilot Demo</span>
                  </div>
                  {/* Step badges */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[9px] font-code px-1.5 py-0.5 rounded transition-all duration-300 ${
                        pipelineStep === 0
                          ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40'
                          : 'text-zinc-600'
                      }`}
                    >
                      1. Snap
                    </span>
                    <span className="text-zinc-700 text-[9px]">&bull;</span>
                    <span
                      className={`text-[9px] font-code px-1.5 py-0.5 rounded transition-all duration-300 ${
                        pipelineStep === 1
                          ? 'bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40'
                          : 'text-zinc-600'
                      }`}
                    >
                      2. AI Magic
                    </span>
                    <span className="text-zinc-700 text-[9px]">&bull;</span>
                    <span
                      className={`text-[9px] font-code px-1.5 py-0.5 rounded transition-all duration-300 ${
                        pipelineStep === 2
                          ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/40'
                          : 'text-zinc-600'
                      }`}
                    >
                      3. Live
                    </span>
                  </div>
                </div>

                {/* Animation Stage Window */}
                <div className="relative flex-1 flex items-center justify-center py-1">
                  {/* SCENE 1: WhatsApp Photo Upload */}
                  {pipelineStep === 0 && (
                    <div className="w-full flex items-center justify-start animate-in fade-in zoom-in-95 duration-300">
                      <div className="bg-[#128c7e]/20 border border-[#25d366]/40 p-3 rounded-2xl rounded-tl-sm text-xs font-sans text-zinc-100 flex items-center gap-3 shadow-lg max-w-[92%]">
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xl shrink-0">
                          📷
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-[10px] font-code text-emerald-400 font-semibold mb-0.5">
                            <span>WhatsApp Inbound</span>
                            <span>&bull;</span>
                            <span>10:48 AM</span>
                          </div>
                          <p className="text-[12px] font-medium text-white leading-tight">
                            Image Attached <span className="opacity-75">(Water heater repair complete)</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SCENE 2: AI Processing & Caption Generation */}
                  {pipelineStep === 1 && (
                    <div className="w-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                      <div className="bg-zinc-900/90 border border-amber-500/40 px-5 py-3 rounded-2xl text-center flex flex-col items-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
                        <div className="flex items-center gap-2">
                          <span className="text-lg animate-spin">✨</span>
                          <span className="text-xs font-code font-bold text-amber-300">
                            AI Generating Caption...
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-code text-zinc-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                          <span>Tagging #Plumbing #AustinTexas #HomeRepairs</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SCENE 3: Miniature Live Facebook / Instagram Card */}
                  {pipelineStep === 2 && (
                    <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="bg-zinc-900/95 border border-blue-500/30 rounded-xl p-2.5 shadow-lg">
                        {/* Meta Post Header */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">
                              f
                            </div>
                            <div>
                              <div className="text-[11px] font-bold text-white flex items-center gap-1">
                                <span>Apex Plumbing Services</span>
                                <span className="text-blue-400 text-[10px]">✓</span>
                              </div>
                              <span className="text-[9px] font-code text-zinc-400">Published to Meta &bull; Just now</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-code text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                            Live on Feed
                          </span>
                        </div>
                        {/* Generated Caption Preview */}
                        <p className="text-[11px] text-zinc-200 line-clamp-2 leading-relaxed font-sans mb-1.5">
                          &quot;Emergency water heater swap done in 45 mins! Clean setup, zero mess. Need reliable plumbing in Austin? Call us today! 🔧💧 #AustinPlumbers #EmergencyRepairs&quot;
                        </p>
                        {/* Engagement stats preview */}
                        <div className="flex items-center justify-between text-[10px] font-code text-zinc-500 pt-1 border-t border-zinc-800">
                          <span>❤️ 14 likes</span>
                          <span>💬 3 comments</span>
                          <span>🚀 100% Autopilot</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Looping footer tracker */}
                <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] font-code text-zinc-500">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span>Self-looping sequence</span>
                  </span>
                  <span>90s end-to-end</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-code">
              <span className="text-text-dim flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>Solves: Dead social media pages</span>
              </span>
              <span className="text-primary font-bold">Always Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReputationEngineDeepDive;
