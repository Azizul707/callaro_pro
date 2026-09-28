'use client';

import React, { useState } from 'react';

interface FaqSectionProps {
  onBookAuditClick: () => void;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: 'Do I need to learn new software?',
    answer:
      'No. Everything is done for you. You simply receive results directly on your phone as standard text messages and calendar appointments.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Most custom systems are built, tested, and live within a few business days.',
  },
  {
    question: 'What about SMS and AI costs?',
    answer:
      'Wholesale provider costs are typically only $5–$15 per month. We do not mark up API usage—you pay true provider costs directly.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. Everything is month-to-month. There are no long-term contracts or lock-ins.',
  },
  {
    question: 'Will this work for my business?',
    answer:
      'If you rely on phone calls, appointments, customer reviews, or lead follow-ups to make money, Callora will directly capture lost revenue for your operation.',
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({ onBookAuditClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-24 px-6 bg-surface-base" id="faq">
      <div className="max-w-[850px] mx-auto">
        <div className="text-center mb-16">
          <span className="font-code text-xs text-primary uppercase tracking-wider mb-2 block font-semibold">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-text-muted">
            Straightforward answers for trade business owners.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-20">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border bg-surface-card overflow-hidden transition-colors duration-300 ${
                  isOpen ? 'border-primary/40 shadow-[0_4px_20px_rgba(255,106,61,0.08)]' : 'border-border-subtle'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex justify-between items-center text-text-primary font-semibold text-sm md:text-base hover:text-primary transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span
                    className={`material-symbols-outlined text-text-dim transition-transform duration-300 ease-in-out shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-primary' : 'rotate-0'
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {/* Smooth Expand/Collapse Container using CSS Grid rows */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`px-5 pb-5 text-sm text-text-muted border-t border-border-subtle/50 pt-3 leading-relaxed transition-opacity duration-300 ease-in-out ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FINAL CONVERSION TERMINAL */}
        <div
          className="card-border-glow bg-surface-card rounded-3xl p-8 md:p-14 text-center relative overflow-hidden border border-border-subtle shadow-2xl"
          id="book"
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[90px] pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/15 rounded-full blur-[90px] pointer-events-none"></div>

          <span className="px-3.5 py-1 rounded-full text-xs font-code bg-surface-raised text-primary border border-border-subtle inline-block mb-6">
            Built for Plumbers, HVAC, Roofers, Electricians &amp; Home Services
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4 leading-tight">
            Stop Losing Jobs You Already <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ff885e] to-secondary">
              Paid To Generate.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto mb-8 leading-relaxed">
            Your competitors aren't working harder. They're responding faster. Install simple systems that recover missed calls, collect reviews, reduce no-shows, and help your business grow 24/7. No contracts. No complicated software. No expensive agency retainers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button
              onClick={onBookAuditClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff6a3d] to-[#fbbf24] text-zinc-950 font-bold border-none hover:scale-105 transition-transform text-sm active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,106,61,0.4)] cursor-pointer"
            >
              <span>Book My Free Revenue Audit Today</span>
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            </button>
            <a
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-surface-raised border border-border-subtle text-text-primary font-semibold text-sm hover:bg-surface-card transition-all flex items-center justify-center"
              href="#pricing"
            >
              View All Services
            </a>
          </div>

          <p className="text-xs font-code text-text-dim">
            100% Free · 15-minute phone audit · You leave with an exact map of where calls leak
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
