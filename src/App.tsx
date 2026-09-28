/**
 * Callora.pro - 24/7 Automated Growth Systems for Contractors & Home Services
 * Built by MA Hakim
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemMatrix from './components/ProblemMatrix';
import FinancialImpact from './components/FinancialImpact';
import FrameworkSteps from './components/FrameworkSteps';
import FounderStory from './components/FounderStory';
import TechArsenal from './components/TechArsenal';
import LeadRecoveryDeepDive from './components/LeadRecoveryDeepDive';
import ReputationEngineDeepDive from './components/ReputationEngineDeepDive';
import DailyComparison from './components/DailyComparison';
import GatedRoiCalculator from './components/GatedRoiCalculator';
import PricingGrid from './components/PricingGrid';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import AuditBookingModal from './components/AuditBookingModal';
import DatabaseStatusBanner from './components/DatabaseStatusBanner';
import ServiceOrderModal, { SelectedServicePlan } from './components/ServiceOrderModal';
import AdminDashboard from './components/admin/AdminDashboard';
import LeadTriageSimulator from './app/simulator/page';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isSimulatorRoute, setIsSimulatorRoute] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        const hash = window.location.hash;
        setIsAdminRoute(path.startsWith('/admin') || hash === '#admin');
        setIsSimulatorRoute(path.startsWith('/simulator') || hash === '#simulator');

        if (path === '/calculator') {
          setTimeout(() => {
            const el = document.getElementById('calculator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }

        if (path === '/speed-audit') {
          setTimeout(() => {
            setAuditModalSource('Speed-to-Lead Audit Preview');
            setIsAuditModalOpen(true);
          }, 100);
        }
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditModalSource, setAuditModalSource] = useState('Audit Booking');

  // Service Order State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedServicePlan | null>(null);

  const handleOpenAuditModal = (source = 'Audit Booking') => {
    setAuditModalSource(source);
    setIsAuditModalOpen(true);
  };

  const handleCloseAuditModal = () => {
    setIsAuditModalOpen(false);
  };

  const handleSelectPlan = (plan: SelectedServicePlan) => {
    setSelectedPlan(plan);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const handleCallDemo = () => {
    const el = document.getElementById('demo-sim');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  if (isSimulatorRoute) {
    return <LeadTriageSimulator />;
  }

  return (
    <div className="bg-surface-base text-text-primary antialiased selection:bg-primary-container selection:text-surface-base font-sans min-h-screen relative">
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-primary/8 rounded-full blur-[150px]"></div>
        <div className="absolute top-[45%] -left-[12%] w-[650px] h-[650px] bg-secondary/5 rounded-full blur-[170px]"></div>
        <div className="absolute top-[75%] -right-[10%] w-[700px] h-[700px] bg-primary/6 rounded-full blur-[180px]"></div>
      </div>

      {/* Supabase Connection Diagnostics Banner */}
      <DatabaseStatusBanner />

      {/* SECTION 01: BRANDING & NAVIGATION CONTAINER - STICKY TOP */}
      <header className="sticky top-0 z-50 w-full">
        <Navbar onBookAuditClick={() => handleOpenAuditModal('Header Nav')} />
      </header>

      <main className="relative z-10 overflow-x-clip">
        {/* SECTION 02: HERO SECTION */}
        <HeroSection
          onBookAuditClick={() => handleOpenAuditModal('Hero CTA')}
          onCallDemoClick={handleCallDemo}
        />

        {/* SECTION 03: CORE PROBLEM MATRIX */}
        <ProblemMatrix onBookAuditClick={() => handleOpenAuditModal('Problem Matrix')} />

        {/* SECTION 04: BEFORE & AFTER SCENARIO */}
        <FinancialImpact />

        {/* SECTION 05: 4-STEP DELIVERY FRAMEWORK */}
        <FrameworkSteps onBookAuditClick={() => handleOpenAuditModal('Framework Steps')} />

        {/* SECTION 06: FOUNDER STORY & AGENCY COMPARISON */}
        <FounderStory />

        {/* SECTION 07: THE TECH ARSENAL */}
        <TechArsenal />

        {/* SECTION 08: DEEP DIVE: LEAD RECOVERY & RESPONSE */}
        <LeadRecoveryDeepDive />

        {/* SECTION 09: DEEP DIVE: REPUTATION & SOCIAL PROOF */}
        <ReputationEngineDeepDive />

        {/* SECTION 10: ONE DAY IN YOUR BUSINESS */}
        <DailyComparison onBookAuditClick={() => handleOpenAuditModal('Daily Comparison')} />

        {/* SECTION 11: INTERACTIVE ROI ESTIMATOR (Email-Gated Calculator) */}
        <GatedRoiCalculator onBookAuditClick={() => handleOpenAuditModal('Calculator CTA')} />

        {/* SECTION 12: TRANSPARENT PRICING GRID (6 CARDS SPLIT-PRICING) */}
        <PricingGrid onSelectPlan={handleSelectPlan} />

        {/* SECTION 13: FAQ + CONVERSION TERMINAL */}
        <FaqSection onBookAuditClick={() => handleOpenAuditModal('Final CTA Terminal')} />
      </main>

      {/* FOOTER */}
      <Footer onBookAuditClick={() => handleOpenAuditModal('Footer')} />

      {/* Free Revenue Audit Booking Client Component */}
      <AuditBookingModal
        isOpen={isAuditModalOpen}
        onClose={handleCloseAuditModal}
        defaultSource={auditModalSource}
      />

      {/* Dedicated Service Order / Checkout Modal */}
      <ServiceOrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}
