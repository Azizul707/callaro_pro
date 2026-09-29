import React from 'react';
import { NextAppMetadata } from '@/src/types/next-seo';
import ChatWidget from '@/src/components/ChatWidget';
import './globals.css';

export const metadata: NextAppMetadata = {
  metadataBase: new URL('https://callora.pro'),
  title: 'Callora.pro | AI Missed Call Recovery & Automation for Home Services',
  description:
    'Stop losing revenue to missed calls. Callora installs 24/7 automated growth systems that recover missed calls, book appointments, and collect reviews.',
  applicationName: 'Callora.pro',
  authors: [{ name: 'MA Hakim', url: 'https://callora.pro' }],
  generator: 'Next.js',
  keywords: [
    'AI Missed Call Recovery',
    'Home Services Automation',
    'Contractor CRM',
    'Automated Dispatch',
    'Review Collection for Contractors',
    'Plumber AI Answering',
    'HVAC Missed Call Recovery',
    'Roofing Lead Triage',
  ],
  creator: 'MA Hakim',
  publisher: 'Callora.pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Callora.pro | AI Missed Call Recovery & Automation for Home Services',
    description:
      'Stop losing revenue to missed calls. Callora installs 24/7 automated growth systems that recover missed calls, book appointments, and collect reviews.',
    url: 'https://callora.pro',
    siteName: 'Callora.pro',
    images: [
      {
        url: 'https://i.ibb.co.com/fdLzRRFn/ma-hakim-image.png',
        width: 1200,
        height: 630,
        alt: 'Callora.pro - AI Missed Call Recovery & Automation for Home Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Callora.pro | AI Missed Call Recovery & Automation for Home Services',
    description:
      'Stop losing revenue to missed calls. Callora installs 24/7 automated growth systems that recover missed calls, book appointments, and collect reviews.',
    images: ['https://i.ibb.co.com/fdLzRRFn/ma-hakim-image.png'],
    creator: '@callora_pro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Anton&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Callora.pro',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'All',
              description:
                'Stop losing revenue to missed calls. Callora installs 24/7 automated growth systems that recover missed calls, book appointments, and collect reviews.',
              url: 'https://callora.pro',
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'USD',
                lowPrice: '99',
                highPrice: '599',
              },
              founder: {
                '@type': 'Person',
                name: 'MA Hakim',
                jobTitle: 'Founder & Principal Systems Architect',
                image: 'https://i.ibb.co.com/fdLzRRFn/ma-hakim-image.png',
              },
            }),
          }}
        />
      </head>
      <body className="bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-[#ff6a3d] selection:text-[#09090b] font-sans overflow-x-hidden min-h-screen">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
