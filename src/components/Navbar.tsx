'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from '@/src/components/ui/NextImage';

interface NavbarProps {
  onBookAuditClick: () => void;
}

const CALLORA_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1U7jZn5H_sMtfVJbmgCCCSYwS-Hm2PU2H_QqNT6qnkn-HqUcCPZ8flaUJr5GQPplS4MvnS8yb5_wA2i89oAvJQS4E3GsL7uga5qu3nS9N0mZCLbkZxzCGQg58a8LX-3kt5JttbIilqhOm-TSoZ6-ZkvsfuH53iGkaYBETHOhzx1kBtO2FyYA3BcE4dcT7q2qbmhumVGDnMOID4KEvCzlnH05sly4A62oTBymlorpAyphB-LqRqWnt_lqw0';

export const Navbar: React.FC<NavbarProps> = ({ onBookAuditClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-[#09090b]/90 backdrop-blur-md border-b border-border-subtle shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a className="flex items-center gap-3 active:scale-[0.98] transition-transform" href="/">
          <Image
            src={CALLORA_LOGO_URL}
            alt="Callora.pro"
            width={140}
            height={36}
            priority
            className="h-9 w-auto object-contain"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-code text-xs tracking-wider uppercase font-semibold">
          <a className="text-text-muted hover:text-text-primary transition-colors duration-200" href="/#how-it-works">
            How It Works
          </a>
          <a className="text-text-muted hover:text-text-primary transition-colors duration-200" href="/#services">
            Services
          </a>
          <a className="text-text-muted hover:text-text-primary transition-colors duration-200" href="/#pricing">
            Pricing
          </a>

          {/* Tools Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              onMouseEnter={() => setToolsDropdownOpen(true)}
              className={`flex items-center gap-1.5 transition-colors duration-200 cursor-pointer uppercase ${
                toolsDropdownOpen
                  ? 'text-white'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <span>TOOLS</span>
              <span
                className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                  toolsDropdownOpen ? 'rotate-180 text-[#ff6a3d]' : ''
                }`}
              >
                expand_more
              </span>
            </button>

            {/* Dropdown Menu Panel */}
            {toolsDropdownOpen && (
              <div
                onMouseLeave={() => setToolsDropdownOpen(false)}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-zinc-950 border border-zinc-800 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <a
                  href="/calculator"
                  onClick={() => setToolsDropdownOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-code normal-case text-zinc-300 hover:text-white hover:bg-zinc-900/90 transition-colors group"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">
                    calculate
                  </span>
                  <div>
                    <div className="font-semibold">ROI Calculator</div>
                    <div className="text-[10px] text-zinc-500 font-sans">Estimate lost missed-call revenue</div>
                  </div>
                </a>

                <a
                  href="/simulator"
                  onClick={() => setToolsDropdownOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-code normal-case text-zinc-300 hover:text-white hover:bg-zinc-900/90 transition-colors group"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#ff6a3d] group-hover:scale-110 transition-transform">
                    neurology
                  </span>
                  <div>
                    <div className="font-semibold flex items-center gap-1.5">
                      <span>Lead Triage Simulator</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-sans">Live interactive AI qualification sandbox</div>
                  </div>
                </a>

                <a
                  href="/speed-audit"
                  onClick={() => setToolsDropdownOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-code normal-case text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 transition-colors group"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary group-hover:scale-110 transition-transform">
                    speed
                  </span>
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      <span>Speed-to-Lead Audit</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 uppercase font-code">Soon</span>
                    </div>
                    <div className="text-[10px] text-zinc-600 font-sans">Instant response velocity test</div>
                  </div>
                </a>
              </div>
            )}
          </div>

          <a className="text-text-muted hover:text-text-primary transition-colors duration-200" href="/#faq">
            FAQ
          </a>
        </nav>

        {/* Primary CTA & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBookAuditClick}
            className="bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold border-none hover:scale-105 transition-transform text-xs font-code px-5 py-2.5 rounded-lg active:scale-[0.98] flex items-center gap-2 shadow-[0_0_20px_rgba(255,106,61,0.35)] cursor-pointer"
          >
            <span>Book My Free Revenue Audit</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-muted hover:text-text-primary p-2 rounded-lg bg-surface-raised border border-border-subtle"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-5 space-y-4 shadow-xl">
          <nav className="flex flex-col gap-3 font-code text-xs tracking-wider uppercase font-semibold">
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-muted hover:text-text-primary transition-colors py-1"
              href="/#how-it-works"
            >
              How It Works
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-muted hover:text-text-primary transition-colors py-1"
              href="/#services"
            >
              Services
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-muted hover:text-text-primary transition-colors py-1"
              href="/#pricing"
            >
              Pricing
            </a>

            {/* Mobile Accordion for Tools */}
            <div className="border-y border-zinc-800/80 py-2">
              <button
                type="button"
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="w-full flex items-center justify-between text-text-primary py-1 uppercase tracking-wider text-xs font-semibold cursor-pointer"
              >
                <span className="flex items-center gap-1.5 text-[#ff6a3d]">
                  <span className="material-symbols-outlined text-[15px]">construction</span>
                  <span>TOOLS</span>
                </span>
                <span
                  className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                    mobileToolsOpen ? 'rotate-180 text-[#ff6a3d]' : 'text-zinc-500'
                  }`}
                >
                  expand_more
                </span>
              </button>

              {mobileToolsOpen && (
                <div className="pl-3 pt-2 pb-1 space-y-2.5 flex flex-col normal-case">
                  <a
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white py-1"
                    href="/calculator"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">calculate</span>
                    <span>ROI Calculator</span>
                  </a>
                  <a
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white py-1"
                    href="/simulator"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#ff6a3d]">neurology</span>
                    <span>Lead Triage Simulator</span>
                  </a>
                  <a
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 py-1"
                    href="/speed-audit"
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary">speed</span>
                    <span>Speed-to-Lead Audit (Coming Soon)</span>
                  </a>
                </div>
              )}
            </div>

            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-muted hover:text-text-primary transition-colors py-1"
              href="/#faq"
            >
              FAQ
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
