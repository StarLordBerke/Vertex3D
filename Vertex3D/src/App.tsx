/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { WhyUs } from './components/WhyUs';
import { ProjectCalculator } from './components/ProjectCalculator';
import { About } from './components/About';
import { BlogSection } from './components/BlogSection';
import { SponsorsMarquee } from './components/SponsorsMarquee';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AIAssistantBot } from './components/AIAssistantBot';

export default function App() {
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('');
  const [customEstimateText, setCustomEstimateText] = useState<string>('');

  const scrollToContact = () => {
    const el = document.getElementById('iletisim');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartProject = () => {
    scrollToContact();
  };

  const handleSelectServiceFromCard = (serviceTitle: string) => {
    setSelectedServiceForQuote(serviceTitle);
    scrollToContact();
  };

  const handleStartProjectWithTopic = (topic: string) => {
    setSelectedServiceForQuote('Endüstriyel Uygulamalar (3D Baskı & Prototip)');
    setCustomEstimateText(`[İncelenen Blog & Teknoloji]: ${topic}`);
    scrollToContact();
  };

  const handleStartWithEstimate = (details: {
    service: string;
    complexity: string;
    delivery: string;
    estimatedCost: string;
    extras: string[];
  }) => {
    setSelectedServiceForQuote(details.service);
    setCustomEstimateText(
      `${details.service} | ${details.complexity} | ${details.delivery} | Tahmini Bütçe: ${details.estimatedCost} | Ekler: ${details.extras.join(', ')}`
    );
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#C4C8D0] font-['Montserrat',sans-serif] selection:bg-[#2E7DFF] selection:text-white">
      {/* Sticky Navigation Header */}
      <Navbar onStartProject={handleStartProject} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero onStartProject={handleStartProject} />

        {/* Services Section */}
        <Services onSelectService={handleSelectServiceFromCard} />

        {/* Portfolio Showcase with Interactive Wireframe/Render Slider */}
        <Portfolio />

        {/* Why Us (Değer Önerisi - Güven, Teknoloji, Profesyonellik, İnovasyon) */}
        <WhyUs />

        {/* Interactive Scope & Cost Estimator */}
        <ProjectCalculator onStartWithEstimate={handleStartWithEstimate} />

        {/* About & Studio Workflow */}
        <About />

        {/* 3D Printing & Additive Manufacturing Industry Blog */}
        <BlogSection onStartProjectWithTopic={handleStartProjectWithTopic} />

        {/* Continuous Left-to-Right Sliding Sponsors Marquee */}
        <SponsorsMarquee />

        {/* Contact Form Section */}
        <ContactSection
          initialService={selectedServiceForQuote}
          initialEstimate={customEstimateText}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Gemini AI 3D Printing & Brand Advisory Assistant */}
      <AIAssistantBot />
    </div>
  );
}
