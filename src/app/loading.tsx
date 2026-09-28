import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-zinc-800"></div>
          <div className="absolute inset-0 rounded-full border-2 border-[#ff6a3d] border-t-transparent animate-spin"></div>
        </div>
        <p className="font-code text-xs text-zinc-500 uppercase tracking-widest">
          Loading Callora Systems...
        </p>
      </div>
    </div>
  );
}
