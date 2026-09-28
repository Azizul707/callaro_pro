'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AuditBookingModal from '../../components/AuditBookingModal';
import { validateAndSaveSimulatorEmail } from '../actions/leadActions';
import { useToast } from '../../components/ui/Toast';

interface TriageResult {
  score: number;
  status: string;
  statusType: 'emergency' | 'warm' | 'cold';
  statusColor: string;
  badgeBg: string;
  badgeBorder: string;
  glowColor: string;
  aiAction: string;
  businessBenefit: string;
}

const EMERGENCY_KEYWORDS = [
  'emergency',
  'broken',
  'now',
  'today',
  'leak',
  'noise',
  'urgent',
  'fast',
  'help',
  'burst',
  'not working',
  'flooded',
  'smell',
  'repair',
];

const WARM_KEYWORDS = [
  'quote',
  'price',
  'cost',
  'how much',
  'estimate',
  'tomorrow',
  'next week',
  'install',
  'set up',
  'charge',
  'ac',
  'heater',
  'plumbing',
  'service',
  'new',
];

const COLD_KEYWORDS = [
  'just looking',
  'thinking',
  'maybe later',
  'not sure',
  'just curious',
];

const PRESET_PROMPTS = [
  {
    label: '🔥 Water Leak (Emergency)',
    text: 'Help! Water is gushing from my bathroom ceiling right now, do you have someone available today?',
  },
  {
    label: '⚡ AC Setup & Charge (Warm)',
    text: 'I want to set up a new ac can you tell me your service charge and install availability?',
  },
  {
    label: '❄️ Tire Kicker (Cold)',
    text: 'Just looking around and thinking maybe later, not sure if we will do anything yet.',
  },
];

export default function LeadTriageSimulator() {
  const toast = useToast();
  const [inputValue, setInputValue] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(
    'Help! Water is gushing from my bathroom ceiling right now, do you have someone available today?'
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('10:42 AM');

  // Lead Magnet Email Gating State
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [gateEmail, setGateEmail] = useState('');
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [gateError, setGateError] = useState<string | null>(null);

  // Check persistent unlock state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('callora_simulator_unlocked');
      const email = localStorage.getItem('callora_user_email');
      if (stored === 'true') {
        setIsUnlocked(true);
      } else if (email) {
        setGateEmail(email);
      }
    } catch {
      // LocalStorage handling
    }
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to test regex word boundaries
  const containsKeyword = (text: string, keyword: string): boolean => {
    // Escape special regex characters in the keyword
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match whole words/phrases using boundary (\b)
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    return regex.test(text);
  };

  // Run initial simulation on mount
  useEffect(() => {
    runAnalysis(submittedMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runAnalysis = (textToAnalyze: string) => {
    if (!textToAnalyze.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const lower = textToAnalyze.toLowerCase();

      // 1. Check Emergency First using strict regex word boundaries
      const isEmergency = EMERGENCY_KEYWORDS.some((kw) =>
        containsKeyword(lower, kw)
      );

      // 2. Check Warm if not emergency
      const isWarm =
        !isEmergency &&
        WARM_KEYWORDS.some((kw) => containsKeyword(lower, kw));

      let generatedResult: TriageResult;

      if (isEmergency) {
        const score = Math.floor(Math.random() * 10) + 90; // 90-99
        generatedResult = {
          score,
          status: '🔥 URGENT / HIGH-TICKET',
          statusType: 'emergency',
          statusColor: 'text-rose-400',
          badgeBg: 'bg-rose-500/10',
          badgeBorder: 'border-rose-500/30',
          glowColor: 'shadow-[0_0_30px_rgba(244,63,94,0.25)] border-rose-500/40',
          aiAction: 'Sent immediate SMS offering a priority dispatch slot for today.',
          businessBenefit:
            'Locked in a high-paying emergency job before they could call a competitor. Zero manual effort.',
        };
      } else if (isWarm) {
        const score = Math.floor(Math.random() * 31) + 55; // 55-85
        generatedResult = {
          score,
          status: '⚡ WARM LEAD',
          statusType: 'warm',
          statusColor: 'text-amber-400',
          badgeBg: 'bg-amber-500/10',
          badgeBorder: 'border-amber-500/30',
          glowColor: 'shadow-[0_0_30px_rgba(251,191,36,0.25)] border-amber-500/40',
          aiAction:
            'Sent automated SMS asking for photos of the issue to provide an accurate estimate.',
          businessBenefit:
            'Saved 15 minutes of manual back-and-forth texting. Only warm, qualified leads reach your calendar.',
        };
      } else {
        const score = Math.floor(Math.random() * 26) + 20; // 20-45
        generatedResult = {
          score,
          status: '❄️ LOW INTENT',
          statusType: 'cold',
          statusColor: 'text-zinc-400',
          badgeBg: 'bg-zinc-800/40',
          badgeBorder: 'border-zinc-700/40',
          glowColor: 'shadow-[0_0_30px_rgba(113,113,122,0.15)] border-zinc-700/50',
          aiAction: 'Sent automated SMS with a link to your pricing guide and FAQ.',
          businessBenefit:
            'Filtered out a time-waster without tying up your phone lines, keeping your pipeline clean.',
        };
      }

      setResult(generatedResult);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handlePresetClick = (presetText: string) => {
    if (!isUnlocked) return;
    setInputValue('');
    setSubmittedMessage(presetText);
    runAnalysis(presetText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = inputValue.trim();
    if (!textToSend) return;

    // Set message in chat bubble
    setSubmittedMessage(textToSend);
    // Instantly clear input field
    setInputValue('');
    // Trigger analysis
    runAnalysis(textToSend);
  };

  const handleUnlockGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateError(null);

    const email = gateEmail.trim();
    if (!email) {
      setGateError('Please enter your business email.');
      return;
    }

    setIsSubmittingEmail(true);

    try {
      const res = await validateAndSaveSimulatorEmail(email);
      if (!res.success) {
        const err = res.error || 'Please enter a valid personal or business email.';
        setGateError(err);
        toast.error('Email Verification', err);
        setIsSubmittingEmail(false);
        return;
      }

      setIsUnlocked(true);
      toast.success('Analysis Unlocked!', 'Lead score and AI actions revealed.');

      try {
        localStorage.setItem('callora_simulator_unlocked', 'true');
        localStorage.setItem('callora_user_email', email);
      } catch {
        // storage fallback
      }
    } catch {
      setGateError('Verification service error. Please try again.');
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-text-primary flex flex-col font-sans selection:bg-[#ff6a3d] selection:text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full">
        <Navbar onBookAuditClick={() => setIsAuditModalOpen(true)} />
      </header>

      {/* Simulator Hero Header */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-card border border-border-subtle mb-4">
            <span className="w-2 h-2 rounded-full bg-status-positive animate-pulse"></span>
            <span className="text-[11px] font-code text-text-muted uppercase tracking-wider font-semibold">
              Interactive AI Logic Sandbox
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Test Our AI Lead Triage Engine Live.
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            Type a typical message your customers send, and watch how our system
            scores, routes, and replies in real-time.
          </p>
        </div>

        {/* Quick Preset Buttons (Hidden until isUnlocked is true) */}
        {isUnlocked ? (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 animate-in fade-in duration-300">
            <span className="text-xs font-code text-zinc-400 mr-1">Try Presets:</span>
            {PRESET_PROMPTS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetClick(preset.text)}
                className="text-xs font-code px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#ff6a3d]/50 hover:bg-zinc-800/80 transition-all cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-code text-zinc-400">
              <span className="material-symbols-outlined text-[15px] text-[#ff6a3d]">lock</span>
              <span>Test with your own custom inquiry below to unlock triage presets</span>
            </div>
          </div>
        )}

        {/* Two-Column Grid: Left (Smartphone Mock) | Right (AI Brain) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* LEFT COLUMN: Smartphone Mock UI (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[380px] rounded-[42px] p-3 bg-zinc-900/90 border-4 border-zinc-800 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative">
              {/* Phone Speaker & Camera Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-zinc-950 rounded-full z-20 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                <div className="w-8 h-1 bg-zinc-800 rounded-full"></div>
              </div>

              {/* Phone Inner Screen */}
              <div className="rounded-[34px] bg-[#0c0d12] border border-zinc-800/80 overflow-hidden flex flex-col h-[580px]">
                {/* Phone Status Bar */}
                <div className="pt-3 pb-2 px-6 flex items-center justify-between text-[11px] font-code text-zinc-400">
                  <span>{currentTime}</span>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span className="material-symbols-outlined text-[13px]">signal_cellular_alt</span>
                    <span className="material-symbols-outlined text-[13px]">wifi</span>
                    <span className="material-symbols-outlined text-[14px]">battery_full</span>
                  </div>
                </div>

                {/* SMS Conversation Header */}
                <div className="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800/80 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#ff6a3d]/20 border border-[#ff6a3d]/30 flex items-center justify-center text-[#ff6a3d] font-bold text-xs">
                    CS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Callora AI Concierge</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    </div>
                    <div className="text-[10px] text-zinc-400 font-code">
                      Verified Automated Dispatch
                    </div>
                  </div>
                </div>

                {/* Chat Feed */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
                  {/* System greeting */}
                  <div className="flex justify-start">
                    <div className="max-w-[85%] bg-zinc-800 text-zinc-200 px-3.5 py-2.5 rounded-2xl rounded-tl-sm border border-zinc-700/40">
                      Thanks for reaching out! We are currently on a job. Please send your inquiry or emergency details below.
                    </div>
                  </div>

                  {/* Customer Message (Dynamic: only renders submitted message, never live typing) */}
                  {submittedMessage && (
                    <div className="flex justify-end">
                      <div className="max-w-[85%] bg-gradient-to-r from-[#ff6a3d] to-[#e0562b] text-white px-3.5 py-2.5 rounded-2xl rounded-tr-sm shadow-md">
                        {submittedMessage}
                      </div>
                    </div>
                  )}

                  {/* AI Instant Response Simulation */}
                  {result && !isAnalyzing && (
                    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="max-w-[88%] bg-zinc-900 border border-zinc-700/60 text-zinc-200 px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-md space-y-1">
                        <div className="flex items-center gap-1 text-[10px] font-code text-[#ff6a3d] font-semibold">
                          <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                          <span>Instant Auto-Reply:</span>
                        </div>
                        <p className="text-xs text-zinc-200 leading-relaxed">
                          {result.aiAction}
                        </p>
                      </div>
                    </div>
                  )}

                  {isAnalyzing && (
                    <div className="flex justify-start">
                      <div className="bg-zinc-800/80 text-zinc-400 px-3.5 py-2 rounded-2xl rounded-tl-sm flex items-center gap-2 text-xs font-code">
                        <span className="w-2 h-2 rounded-full bg-[#ff6a3d] animate-ping"></span>
                        <span>AI Concierge is typing...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Field / Phone Keyboard Simulation */}
                <form
                  onSubmit={handleSubmit}
                  className="p-3 bg-zinc-900/90 border-t border-zinc-800 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type customer message..."
                    className="flex-1 bg-zinc-950 border border-zinc-800 text-white text-xs px-3.5 py-2.5 rounded-full focus:outline-none focus:border-[#ff6a3d] transition-colors placeholder:text-zinc-600"
                  />
                  <button
                    type="submit"
                    disabled={isAnalyzing || !inputValue.trim()}
                    className="w-9 h-9 rounded-full bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold border-none hover:scale-105 transition-transform flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The "AI Brain" Display (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {isAnalyzing ? (
              <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-8 min-h-[460px] flex flex-col items-center justify-center text-center">
                <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-zinc-800"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#ff6a3d] border-t-transparent animate-spin"></div>
                  <span className="material-symbols-outlined text-[#ff6a3d] text-2xl">
                    neurology
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-code">
                  AI Brain: Analyzing Lead Intent...
                </h3>
                <p className="text-xs font-code text-zinc-400 max-w-sm mb-4">
                  Evaluating message semantics, matching urgency indicators, and calculating ticket-value score.
                </p>
                <div className="flex items-center gap-2 text-xs font-code text-[#ff6a3d]">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#ff6a3d] animate-ping"></span>
                  <span>Executing triage logic in &lt;1.5 seconds</span>
                </div>
              </div>
            ) : result ? (
              <div className="relative rounded-2xl overflow-hidden">
                {/* Results Card (Heavily Blurred when !isUnlocked) */}
                <div
                  className={`rounded-2xl bg-[#0c0d12]/90 border p-6 md:p-8 backdrop-blur-xl transition-all duration-500 ease-out ${
                    result.glowColor
                  } ${
                    !isUnlocked
                      ? 'blur-md pointer-events-none select-none opacity-40'
                      : 'opacity-100'
                  }`}
                >
                  {/* Header / Score Gauge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-zinc-800/80">
                    <div>
                      <span className="text-[11px] font-code text-zinc-400 uppercase tracking-wider block mb-1">
                        Lead Classification
                      </span>
                      <div
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold font-code ${result.badgeBg} ${result.badgeBorder} ${result.statusColor}`}
                      >
                        {result.status}
                      </div>
                    </div>

                    {/* Circular Score Gauge Display */}
                    <div className="flex items-center gap-4 bg-zinc-900/80 px-4 py-2.5 rounded-xl border border-zinc-800">
                      <div className="text-right">
                        <span className="text-[10px] font-code text-zinc-400 uppercase block">
                          Lead Quality Score
                        </span>
                        <span className="text-2xl font-black text-white font-code">
                          {result.score}
                          <span className="text-xs text-zinc-500 font-normal">/100</span>
                        </span>
                      </div>

                      {/* Circular visual meter */}
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-zinc-800"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className={
                              result.statusType === 'emergency'
                                ? 'text-rose-500'
                                : result.statusType === 'warm'
                                ? 'text-amber-400'
                                : 'text-zinc-500'
                            }
                            strokeDasharray={`${result.score}, 100`}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute text-[11px] font-bold text-white font-code">
                          {result.score}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 1: System Output Card (AI Action) */}
                  <div className="mt-6 mb-4 p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                    <div className="flex items-center gap-2 text-xs font-code text-text-primary uppercase tracking-wider font-semibold mb-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#ff6a3d]">
                        send_and_archive
                      </span>
                      <span>Automated AI Action Taken</span>
                    </div>
                    <p className="text-sm text-zinc-200 leading-relaxed pl-6">
                      {result.aiAction}
                    </p>
                  </div>

                  {/* Card 2: The Business Impact Card (The "Aha!" Benefit) */}
                  <div
                    className={`p-4 rounded-xl bg-zinc-900/90 border transition-all ${
                      result.statusType === 'emergency'
                        ? 'border-rose-500/50 bg-rose-950/10'
                        : result.statusType === 'warm'
                        ? 'border-amber-500/50 bg-amber-950/10'
                        : 'border-zinc-700/60 bg-zinc-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-code font-bold uppercase tracking-wider mb-1.5 text-white">
                      <span className="material-symbols-outlined text-[16px] text-status-positive">
                        trending_up
                      </span>
                      <span>The Real Business Impact</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed font-medium pl-6">
                      {result.businessBenefit}
                    </p>
                  </div>

                  {/* Live Re-test Helper */}
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-code text-zinc-400 pt-4 border-t border-zinc-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-positive"></span>
                      <span>Deterministic rule evaluation + Natural language match</span>
                    </div>
                    <button
                      onClick={() => runAnalysis(submittedMessage)}
                      className="hover:text-white transition-colors underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Re-evaluate prompt</span>
                      <span className="material-symbols-outlined text-[14px]">refresh</span>
                    </button>
                  </div>
                </div>

                {/* Absolute Positioned Email Capture Overlay (Only when !isUnlocked) */}
                {!isUnlocked && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-zinc-900/95 border border-[#ff6a3d]/40 rounded-2xl p-6 md:p-8 text-center shadow-[0_0_50px_rgba(255,106,61,0.25)] relative">
                      <div className="w-12 h-12 rounded-2xl bg-[#ff6a3d]/15 border border-[#ff6a3d]/30 text-[#ff6a3d] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(255,106,61,0.35)]">
                        <span className="material-symbols-outlined text-2xl">lock</span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ff6a3d]/10 border border-[#ff6a3d]/30 text-[#ff6a3d] font-code text-[11px] mb-2 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a3d] animate-pulse"></span>
                        <span>Analysis Complete!</span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
                        Unlock Lead Score &amp; AI Action
                      </h3>
                      <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                        Enter your email to unlock your Lead Score and see the AI response.
                      </p>

                      <form onSubmit={handleUnlockGateSubmit} className="space-y-3">
                        <div className="relative">
                          <input
                            type="email"
                            required
                            aria-label="Email Address"
                            value={gateEmail}
                            onChange={(e) => {
                              setGateEmail(e.target.value);
                              if (gateError) setGateError(null);
                            }}
                            placeholder="e.g. dave@apexplumbing.com"
                            disabled={isSubmittingEmail}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700/80 focus:border-[#ff6a3d] focus:ring-1 focus:ring-[#ff6a3d] text-white text-xs font-sans outline-none transition-all placeholder:text-zinc-600"
                          />
                          <span className="material-symbols-outlined absolute right-3.5 top-3 text-zinc-500 text-[18px] pointer-events-none">
                            mail
                          </span>
                        </div>

                        {gateError && (
                          <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-code text-left flex items-start gap-1.5">
                            <span className="material-symbols-outlined text-[15px] shrink-0 mt-0.5">error</span>
                            <span>{gateError}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmittingEmail}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold border-none hover:scale-[1.02] transition-transform text-xs font-code flex items-center justify-center gap-2 active:scale-[0.98] shadow-[0_0_20px_rgba(255,106,61,0.4)] cursor-pointer disabled:opacity-60"
                        >
                          {isSubmittingEmail ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></span>
                              <span>Unlocking Score...</span>
                            </>
                          ) : (
                            <>
                              <span>Unlock Results</span>
                              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </>
                          )}
                        </button>
                      </form>

                      <p className="text-[10px] font-code text-zinc-500 mt-3">
                        Instant unlock · Real contractor analytics · Zero spam
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>

        {/* 4. Sticky / Prominent Bottom CTA */}
        <div className="mt-8 rounded-3xl bg-gradient-to-b from-[#14151b] to-[#0d0e12] border border-border-subtle p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff6a3d]/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="font-code text-xs text-[#ff6a3d] uppercase tracking-wider mb-3 block font-bold">
              Autonomous Growth Engine
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Stop guessing which leads are worth your time.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mb-8 leading-relaxed">
              We deploy this exact autonomous triage stack inside your business in 1–2 days.
              Zero software to learn, zero extra staff to hire.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsAuditModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold border-none hover:scale-105 transition-transform text-sm shadow-[0_0_25px_rgba(255,106,61,0.45)] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Get This System For Your Business</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <a
                href="/#pricing"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-zinc-900/80 border border-zinc-700/80 text-white font-code text-xs hover:border-[#ff6a3d] hover:bg-zinc-800 transition-all text-center"
              >
                View Transparent $50/mo Plans
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      <AuditBookingModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        defaultSource="Lead Triage Simulator"
      />

      {/* Footer */}
      <Footer onBookAuditClick={() => setIsAuditModalOpen(true)} />
    </div>
  );
}
