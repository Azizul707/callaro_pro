'use client';

import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex items-center justify-center p-6 selection:bg-[#ff6a3d] selection:text-black">
      <div className="max-w-md w-full text-center space-y-6 bg-zinc-950 border border-zinc-800/80 rounded-2xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6a3d]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-[#ff6a3d] mx-auto shadow-inner">
          <span className="material-symbols-outlined text-3xl">error_outline</span>
        </div>

        <div className="space-y-2">
          <span className="font-code text-xs text-[#ff6a3d] uppercase tracking-wider font-semibold">
            404 — Page Not Found
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Lost in the Pipeline?
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            The page you are looking for has been moved, archived, or does not exist in our system.
          </p>
        </div>

        <div className="pt-2">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold text-sm hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-[0_0_20px_rgba(255,106,61,0.35)]"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            <span>Return to Callora.pro</span>
          </a>
        </div>
      </div>
    </div>
  );
}
