'use client';

import React from 'react';
import Logo from '@/src/components/Logo';

interface FooterProps {
  onBookAuditClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookAuditClick }) => {
  return (
    <footer className="bg-surface-base border-t border-border-subtle">
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-border-subtle">
          <div className="md:col-span-5">
            <a className="inline-block mb-3 active:scale-[0.98] transition-transform" href="#">
              <Logo />
            </a>
            <p className="text-xs text-text-muted mb-4 max-w-sm leading-relaxed">
              Automated Growth Systems for Contractors &amp; Home Services. Stop letting competitors answer your customers first.
            </p>
            <div className="font-code text-xs text-text-dim space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-surface-raised border border-border-subtle text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-status-positive"></span>
                <span>Built by MA Hakim | Founder-Direct Agency</span>
              </div>
              <div className="text-text-muted pt-1">
                Email: <a href="mailto:info@callora.pro" className="hover:text-primary transition-colors">info@callora.pro</a>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <span className="text-xs font-code text-text-primary uppercase tracking-wider font-bold block mb-3">
              Navigation
            </span>
            <ul className="space-y-2 text-xs font-code text-text-muted">
              <li>
                <a className="hover:text-primary transition-colors" href="#how-it-works">
                  How It Works
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="/calculator">
                  ROI Calculator
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="/simulator">
                  Lead Simulator
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="/#faq">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <span className="text-xs font-code text-text-primary uppercase tracking-wider font-bold block mb-3">
              Legal &amp; Trust
            </span>
            <ul className="space-y-2 text-xs font-code text-text-muted mb-4">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
            <div className="p-3 rounded-xl bg-surface-card border border-border-subtle font-code text-[11px] text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Verified Home Services Automation Stack</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-code text-text-dim">
          <p>© 2026 Callora.pro. All rights reserved. 24/7 Automated Growth Systems for Contractors.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <button
              onClick={onBookAuditClick}
              className="hover:text-text-primary transition-colors text-primary font-bold cursor-pointer bg-transparent border-0 p-0"
            >
              Audit Call
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
