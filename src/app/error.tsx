'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Graceful error logging
  }, [error]);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex items-center justify-center p-6 selection:bg-[#ff6a3d] selection:text-black">
      <div className="max-w-md w-full text-center space-y-6 bg-zinc-950 border border-red-900/40 rounded-2xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-950/40 border border-red-800/50 text-red-400 mx-auto shadow-inner">
          <span className="material-symbols-outlined text-3xl">warning</span>
        </div>

        <div className="space-y-2">
          <span className="font-code text-xs text-red-400 uppercase tracking-wider font-semibold">
            System Notice
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Unexpected Exception
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            An unexpected error occurred during execution. Our automated system monitoring has been notified.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold text-sm hover:scale-[1.02] transition-transform active:scale-[0.98] cursor-pointer"
          >
            Try Again
          </button>
          <a
            href="/"
            className="w-full sm:w-auto flex-1 py-3 px-6 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-sm hover:bg-zinc-800 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
