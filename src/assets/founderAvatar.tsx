'use client';

import React, { useState } from 'react';

interface FounderAvatarProps {
  className?: string;
  imageSrc?: string;
}

export const FounderAvatar: React.FC<FounderAvatarProps> = ({
  className = 'w-44 h-44',
  imageSrc,
}) => {
  // If an external image link is specified
  const [imgError, setImgError] = useState(false);

  if (imageSrc && !imgError) {
    return (
      <div className={`relative rounded-full overflow-hidden border-2 border-primary/50 shadow-[0_0_35px_rgba(255,106,61,0.35)] ${className}`}>
        <img
          src={imageSrc}
          alt="MA Hakim - Founder & Principal Systems Architect at Callora.pro"
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Exact reproduction of the uploaded ma_hakim_image.png:
  // - High-contrast monochromatic black background with elegant sweeping geometric contour lines
  // - Centered circular dark portrait backdrop (#1c202a to #12141a) with subtle depth glow
  // - Sharp tailored black suit jacket (#0b0c10), open-collar crisp white dress shirt (#fbfcfd)
  // - Neatly trimmed beard, mustache, and styled short dark hair
  // - Genuine friendly direct gaze reflecting the founder persona
  return (
    <div
      className={`relative rounded-full overflow-hidden border-2 border-primary/40 shadow-[0_0_35px_rgba(255,106,61,0.25)] bg-[#050608] ${className}`}
      title="MA Hakim - Founder & Principal Systems Architect"
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial depth glow for circular frame */}
          <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#222836" />
            <stop offset="65%" stopColor="#141720" />
            <stop offset="100%" stopColor="#07080b" />
          </radialGradient>

          {/* Skin and facial tones matching photo */}
          <linearGradient id="faceGrad" x1="40%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor="#c5947a" />
            <stop offset="50%" stopColor="#b47f63" />
            <stop offset="100%" stopColor="#8d5c41" />
          </linearGradient>

          <linearGradient id="foreheadLight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b68266" />
            <stop offset="50%" stopColor="#caa088" />
            <stop offset="100%" stopColor="#b68266" />
          </linearGradient>

          {/* Suit material gradient */}
          <linearGradient id="suitGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#181a22" />
            <stop offset="40%" stopColor="#0c0d12" />
            <stop offset="100%" stopColor="#050608" />
          </linearGradient>

          {/* Lapel rim light */}
          <linearGradient id="lapelLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#303444" />
            <stop offset="100%" stopColor="#12131a" />
          </linearGradient>

          {/* Shirt fold gradient */}
          <linearGradient id="shirtLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#e8eaee" />
            <stop offset="100%" stopColor="#cfd4dc" />
          </linearGradient>

          {/* Founder badge highlight */}
          <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6a3d" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* 1. Deep Monochromatic Canvas */}
        <rect width="500" height="500" fill="#060709" />

        {/* 2. Concentric Sweeping Contour Wave Lines (Matching uploaded ma_hakim_image.png) */}
        <g opacity="0.32">
          {/* Top-right concentric flow */}
          <path d="M 280 -20 C 370 20 460 70 520 160" stroke="#778199" strokeWidth="1" fill="none" />
          <path d="M 300 -30 C 390 10 475 60 535 150" stroke="#778199" strokeWidth="1" fill="none" />
          <path d="M 320 -40 C 410 0 490 50 550 140" stroke="#778199" strokeWidth="1" fill="none" />
          <path d="M 340 -50 C 430 -10 505 40 565 130" stroke="#778199" strokeWidth="1" fill="none" />
          <path d="M 360 -60 C 450 -20 520 30 580 120" stroke="#778199" strokeWidth="1" fill="none" />

          {/* Bottom-left concentric flow */}
          <path d="M -30 350 C 60 410 160 460 270 510" stroke="#778199" strokeWidth="1" fill="none" />
          <path d="M -40 370 C 50 430 150 480 260 530" stroke="#778199" strokeWidth="1" fill="none" />
          <path d="M -50 390 C 40 450 140 500 250 550" stroke="#778199" strokeWidth="1" fill="none" />
          <path d="M -60 410 C 30 470 130 520 240 570" stroke="#778199" strokeWidth="1" fill="none" />
          <path d="M -70 430 C 20 490 120 540 230 590" stroke="#778199" strokeWidth="1" fill="none" />
        </g>

        {/* 3. Center Inner Portrait Circle Background */}
        <circle cx="250" cy="250" r="195" fill="url(#portalGlow)" stroke="#2a3040" strokeWidth="1.5" />

        {/* 4. Tailored Black Suit Body */}
        {/* Main Torso */}
        <path
          d="M 90 500 C 100 420 135 345 190 315 L 250 380 L 310 315 C 365 345 400 420 410 500 Z"
          fill="url(#suitGrad)"
        />

        {/* White Shirt Opening & Collar */}
        <path
          d="M 215 285 L 250 390 L 285 285 L 270 255 L 230 255 Z"
          fill="url(#shirtLight)"
        />
        {/* Collar wings */}
        <path
          d="M 210 280 L 245 350 L 238 290 Z"
          fill="#f4f5f8"
          stroke="#cbd0d8"
          strokeWidth="0.8"
        />
        <path
          d="M 290 280 L 255 350 L 262 290 Z"
          fill="#e2e5eb"
          stroke="#cbd0d8"
          strokeWidth="0.8"
        />
        {/* Neck shadowy cleft */}
        <path d="M 245 285 L 250 315 L 255 285 Z" fill="#99684f" />

        {/* Left Lapel (Viewer's Left) */}
        <path
          d="M 175 325 L 245 440 L 235 445 L 155 340 Z"
          fill="url(#lapelLight)"
        />
        <path
          d="M 175 325 L 215 385 L 180 395 Z"
          fill="#1c1e28"
        />

        {/* Right Lapel (Viewer's Right) */}
        <path
          d="M 325 325 L 255 440 L 265 445 L 345 340 Z"
          fill="url(#lapelLight)"
        />
        <path
          d="M 325 325 L 285 385 L 320 395 Z"
          fill="#151720"
        />

        {/* 5. Neck Structure */}
        <path
          d="M 222 220 L 222 290 C 222 298 235 304 250 304 C 265 304 278 298 278 290 L 278 220 Z"
          fill="url(#faceGrad)"
        />
        {/* Neck shadow under jawline */}
        <ellipse cx="250" cy="235" rx="38" ry="12" fill="#5c3824" opacity="0.6" />

        {/* 6. Head & Facial Structure */}
        {/* Head Silhouette */}
        <ellipse cx="250" cy="200" rx="66" ry="78" fill="url(#faceGrad)" />

        {/* Forehead light bounce */}
        <path
          d="M 205 160 C 205 140 230 135 250 135 C 270 135 295 140 295 160 C 295 175 270 180 250 180 C 230 180 205 175 205 160 Z"
          fill="url(#foreheadLight)"
          opacity="0.85"
        />

        {/* Ears */}
        <path d="M 184 190 C 178 190 174 205 178 222 C 182 230 187 228 188 220 Z" fill="#996043" />
        <path d="M 316 190 C 322 190 326 205 322 222 C 318 230 313 228 312 220 Z" fill="#885136" />

        {/* 7. Hairstyle (Short, modern, slicked slight pomp matching photograph) */}
        <path
          d="M 183 175 C 180 135 198 102 245 98 C 285 95 315 125 317 172 C 310 148 290 128 250 125 C 215 125 195 140 183 175 Z"
          fill="#101116"
        />
        <path
          d="M 195 148 C 210 115 240 106 268 108 C 295 110 310 130 312 152 C 298 132 278 120 252 120 C 224 120 205 130 195 148 Z"
          fill="#1e2029"
        />

        {/* 8. Well-groomed Beard & Mustache */}
        {/* Full Jaw Beard Contour */}
        <path
          d="M 188 200 C 190 260 215 285 250 286 C 285 285 310 260 312 200 C 304 220 295 270 250 270 C 205 270 196 220 188 200 Z"
          fill="#13141a"
        />
        {/* Mustache */}
        <path
          d="M 226 226 C 235 220 246 223 250 226 C 254 223 265 220 274 226 C 270 236 256 238 250 238 C 244 238 230 236 226 226 Z"
          fill="#13141a"
        />
        {/* Soul patch under lower lip */}
        <path d="M 245 242 L 255 242 L 253 253 L 247 253 Z" fill="#13141a" />

        {/* 9. Facial Features: Eyes, Eyebrows & Smile */}
        {/* Thick, neat male eyebrows */}
        <path
          d="M 206 172 Q 222 165 238 171"
          stroke="#101116"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 262 171 Q 278 165 294 172"
          stroke="#101116"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eyes (warm, direct, professional smile-crinkle) */}
        {/* Left eye */}
        <ellipse cx="223" cy="184" rx="9" ry="5.5" fill="#fcfcfd" />
        <circle cx="224" cy="184" r="4.2" fill="#1e1511" />
        <circle cx="225" cy="183" r="1.3" fill="#ffffff" />
        <path d="M 213 182 Q 223 178 233 182" stroke="#13141a" strokeWidth="1.8" fill="none" />

        {/* Right eye */}
        <ellipse cx="277" cy="184" rx="9" ry="5.5" fill="#fcfcfd" />
        <circle cx="276" cy="184" r="4.2" fill="#1e1511" />
        <circle cx="277" cy="183" r="1.3" fill="#ffffff" />
        <path d="M 267 182 Q 277 178 287 182" stroke="#13141a" strokeWidth="1.8" fill="none" />

        {/* Straight nose structure */}
        <path
          d="M 250 173 L 247 207 L 253 211 L 257 207"
          stroke="#7a472c"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <ellipse cx="243" cy="208" rx="2" ry="1.2" fill="#4d2917" />
        <ellipse cx="257" cy="208" rx="2" ry="1.2" fill="#4d2917" />

        {/* Confident, friendly closed-lip smile */}
        <path
          d="M 233 230 Q 250 238 267 230"
          stroke="#55241b"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 238 231 Q 250 235 262 231"
          stroke="#8d4a3c"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* 10. Direct Founder Emblem Tag */}
        <g transform="translate(170, 442)">
          <rect
            width="160"
            height="28"
            rx="14"
            fill="url(#badgeGrad)"
            stroke="#ffffff"
            strokeWidth="1.2"
            opacity="0.95"
          />
          <text
            x="80"
            y="18"
            fill="#09090b"
            fontSize="11"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
            letterSpacing="0.8"
          >
            MA HAKIM · FOUNDER
          </text>
        </g>
      </svg>
    </div>
  );
};

export default FounderAvatar;
