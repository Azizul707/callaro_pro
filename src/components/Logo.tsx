'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'default' | 'sm' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'default' }) => {
  // Configurable size scale
  const isSm = size === 'sm';
  const boxClasses = isSm
    ? 'w-10 h-10 rounded-xl'
    : 'w-12 h-12 md:w-14 md:h-14 rounded-2xl';
  const brandTextClasses = isSm
    ? 'text-lg md:text-xl'
    : 'text-xl md:text-2xl';
  const taglineClasses = isSm
    ? 'text-[9px] tracking-[0.18em]'
    : 'text-[10px] md:text-[11px] tracking-[0.2em]';

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Icon Box Container: Dark squircle box */}
      <div
        className={`${boxClasses} bg-[#121212] border border-zinc-800/80 flex items-center justify-center shrink-0 shadow-lg shadow-black/40 group-hover:border-zinc-700/80 transition-colors`}
      >
        {/* Robotic Chat Bubble with Sound/Signal Waves */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 md:w-8 md:h-8 text-orange-500 group-hover:scale-105 transition-transform"
        >
          {/* Antenna / Bot Top */}
          <line
            x1="16"
            y1="7"
            x2="16"
            y2="10"
            stroke="#f97316"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="16" cy="6" r="1.5" fill="#f97316" />

          {/* Robot Chat Bubble Head/Body */}
          <path
            d="M8 10H24C25.6569 10 27 11.3431 27 13V23C27 24.6569 25.6569 26 24 26H14L8 31V26C6.34315 26 5 24.6569 5 23V13C5 11.3431 6.34315 10 8 10Z"
            stroke="#f97316"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Robot Eyes (Dual rectangular / rounded bot eyes) */}
          <rect x="10.5" y="15.5" width="3" height="3" rx="1" fill="#f97316" />
          <rect x="18.5" y="15.5" width="3" height="3" rx="1" fill="#f97316" />

          {/* Bot Smile / Wave Interface */}
          <path
            d="M12.5 21C13.5 22.2 16.5 22.2 17.5 21"
            stroke="#f97316"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Sound / Signal Waves Emitting to the Right */}
          {/* Inner Arc */}
          <path
            d="M30 14C31.8 15.8 31.8 20.2 30 22"
            stroke="#f97316"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Outer Arc */}
          <path
            d="M33.5 11.5C36.5 14.5 36.5 21.5 33.5 24.5"
            stroke="#f97316"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Text Section (Right Side) */}
      <div className="flex flex-col justify-center text-left leading-none">
        {/* Brand Name */}
        <div className={`${brandTextClasses} font-bold tracking-tight leading-none text-white`}>
          <span>Callora</span>
          <span className="text-orange-500">.pro</span>
        </div>

        {/* Tagline */}
        <span
          className={`${taglineClasses} font-mono text-zinc-500 uppercase font-medium mt-1 md:mt-1.5 leading-none`}
        >
          GROWTH AUTOMATION
        </span>
      </div>
    </div>
  );
};

export default Logo;
