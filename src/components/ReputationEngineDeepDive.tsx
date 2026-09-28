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
    <section className="py-24 border-t border-border-subtle px-6 bg-surface-base overflow-hidden" id="reputation-engine">
      <div className="max-w-[1240px] mx-auto">
        {/* Main 2-Column Grid on Large Screens: Left Content | Right Visual Target Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column 1: Copywriting Header + Feature Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-10 text-left">
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

            <div className="grid grid-cols-1 gap-6 items-stretch">
              {/* Feature 1: Automated 5-Star Review Engine */}
              <div className="p-6 sm:p-7 rounded-2xl bg-surface-card border border-border-subtle card-border-glow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/30">
                      <span className="material-symbols-outlined">grade</span>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                        The &ldquo;<span className="text-[#ff6a3d] underline decoration-[#ff6a3d]/40 underline-offset-4 font-black">Forgot to Review</span>&rdquo; Trap
                      </h3>
                      <span className="text-xs font-code text-secondary font-semibold">$50/month</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
                    You bust your back doing a great job, but the customer forgets to review you. Begging is awkward, and just one angry client can ruin your average. Our system texts them automatically before they forget, burying bad reviews under a mountain of 5-star ratings.
                  </p>
                  <div className="p-3.5 rounded-xl bg-surface-raised border border-border-subtle space-y-1.5 text-xs font-code text-text-muted">
                    <div className="flex items-center gap-2 text-status-positive font-bold">
                      <span className="material-symbols-outlined text-[15px]">verified</span> Sample Review SMS
                    </div>
                    <p className="italic text-text-primary text-[11px] sm:text-xs">
                      &quot;Hi Sarah, thanks for choosing Apex Plumbing today! If you&apos;re happy with the repair, would you mind leaving us a quick 5-star review? It helps our local team immensely: [Google Link]&quot;
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-code">
                  <span className="text-text-dim flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    <span>Solves: Getting outranked on Google</span>
                  </span>
                  <span className="text-status-positive font-bold">+15 Reviews/mo</span>
                </div>
              </div>

              {/* Feature 2: Zero-Effort Social Media Poster with Dynamic Visual Demonstration */}
              <div className="p-6 sm:p-7 rounded-2xl bg-surface-card border border-border-subtle card-border-glow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary border border-primary/30">
                      <span className="material-symbols-outlined">add_a_photo</span>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                        The &ldquo;<span className="text-[#ff6a3d] underline decoration-[#ff6a3d]/40 underline-offset-4 font-black">Too Tired to Post</span>&rdquo; Problem
                      </h3>
                      <span className="text-xs font-code text-primary font-semibold">$50/month</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
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
                <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-code">
                  <span className="text-text-dim flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    <span>Solves: Dead social media pages</span>
                  </span>
                  <span className="text-primary font-bold">Always Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Target Audience Image with Fade Effect & Ambient Glow */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-6 lg:mt-0">
            {/* Ambient Warm Glow behind the image */}
            <div className="absolute inset-0 bg-[#ff6a3d]/15 blur-3xl rounded-full pointer-events-none -z-10 scale-90"></div>

            {/* Image Wrapper Container with Seamless Gradient Masks and Subtle Border */}
            <div className="relative w-full max-w-[460px] lg:max-w-none rounded-3xl overflow-hidden shadow-[0_0_50px_-15px_rgba(249,115,22,0.25)] border border-zinc-800/60 bg-zinc-950">
              {/* Gradient Mask Overlay: Fades smoothly into dark background */}
              <div className="relative w-full h-[480px] sm:h-[580px] lg:h-[660px] [mask-image:linear-gradient(to_bottom,white_65%,transparent_100%)] lg:[mask-image:linear-gradient(to_left,white_70%,transparent_100%),linear-gradient(to_bottom,white_75%,transparent_100%)] [mask-composite:intersect]">
                <img
                  src="https://i.ibb.co.com/DxTf8yF/Contractor-looking-at-smartphone-2-K-20260928191037-1.jpg"
                  alt="Home service contractor looking at his smartphone"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle dark vignette overlay around edges for seamless blending with zinc-950 */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/40 via-transparent to-transparent pointer-events-none hidden lg:block"></div>
              </div>

              {/* Floating Contractor Real-World Feedback Pill */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-zinc-900/90 backdrop-blur-md border border-zinc-700/60 shadow-2xl flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#ff6a3d]/20 border border-[#ff6a3d]/40 flex items-center justify-center text-[#ff6a3d] shrink-0 font-bold">
                  <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Dave Miller</span>
                    <span className="text-[10px] font-code text-zinc-400">&bull; Miller Plumbing LLC</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 line-clamp-2 mt-0.5">
                    &ldquo;I haven&apos;t written a social post in 6 months. Now my phone does it right after I pack up my tools.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReputationEngineDeepDive;
