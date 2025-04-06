
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import NGORecommendationSection from '@/components/home/NGORecommendationSection';
import ActionFeedSection from '@/components/home/ActionFeedSection';
import TransparencySection from '@/components/home/TransparencySection';
import ImpactTrackingSection from '@/components/home/ImpactTrackingSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Main sections */}
        <HeroSection />
        <FeaturesSection />
        
        {/* NGO Discovery */}
        <NGORecommendationSection />
        
        {/* User Engagement */}
        <ActionFeedSection />
        
        {/* Trust & Impact */}
        <div className="bg-background">
          <TransparencySection />
          <ImpactTrackingSection />
        </div>
        
        {/* Final Call to Action */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
