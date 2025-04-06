
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '@/components/auth/AuthModal';

const CTASection = () => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState<'sign-in' | 'sign-up'>('sign-up');

  const handleGetStarted = () => {
    setAuthModalDefaultTab('sign-up');
    setIsAuthModalOpen(true);
  };

  const handleExploreNGOs = () => {
    navigate('/explore');
  };

  return (
    <section className="py-16 px-6 md:px-10 bg-primary text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-40 -left-20 w-40 h-40 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-20 right-40 w-60 h-60 bg-white opacity-5 rounded-full"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Join thousands of changemakers on AidQuest and start your journey to creating measurable, 
            transparent impact for causes you care about.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Button 
              className="bg-white text-primary hover:bg-white/90 min-w-40"
              onClick={handleGetStarted}
            >
              Get Started
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 min-w-40"
              onClick={handleExploreNGOs}
            >
              Explore NGOs
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-white/10 to-transparent p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">50K+</div>
              <p className="text-primary-foreground/80 text-sm">Active Users</p>
            </div>
            
            <div className="bg-gradient-to-br from-white/10 to-transparent p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">250+</div>
              <p className="text-primary-foreground/80 text-sm">Verified NGOs</p>
            </div>
            
            <div className="bg-gradient-to-br from-white/10 to-transparent p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">$2.5M+</div>
              <p className="text-primary-foreground/80 text-sm">Funds Raised</p>
            </div>
            
            <div className="bg-gradient-to-br from-white/10 to-transparent p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">100%</div>
              <p className="text-primary-foreground/80 text-sm">Transparent</p>
            </div>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalDefaultTab}
      />
    </section>
  );
};

export default CTASection;
