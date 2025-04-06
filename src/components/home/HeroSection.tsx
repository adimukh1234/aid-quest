
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, HeartHandshake, Shield } from 'lucide-react';
import Globe3D from '@/components/three/Globe3D';
import AnimatedText from '@/components/ui/animated-text';
import MagnetButton from '@/components/ui/magnet-button';
import Parallax from '@/components/ui/parallax';
import { useNavigate } from 'react-router-dom';
import AuthModal from '@/components/auth/AuthModal';

const HeroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState<'sign-in' | 'sign-up'>('sign-up');
  
  // Mouse parallax effect for background elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const moveX = (e.clientX - window.innerWidth / 2) * -0.005;
      const moveY = (e.clientY - window.innerHeight / 2) * -0.005;
      
      const elements = sectionRef.current.querySelectorAll('.parallax-bg');
      elements.forEach((el) => {
        const depth = parseFloat(el.getAttribute('data-depth') || '0.2');
        (el as HTMLElement).style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGetStarted = () => {
    setAuthModalDefaultTab('sign-up');
    setIsAuthModalOpen(true);
  };

  const handleExploreNGOs = () => {
    navigate('/explore');
  };
  
  return (
    <section ref={sectionRef} className="pt-24 pb-16 px-6 md:px-10 relative overflow-hidden">
      {/* Background gradient effects with parallax */}
      <div 
        className="absolute top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl opacity-50 animate-pulse parallax-bg"
        data-depth="0.8"
      ></div>
      <div 
        className="absolute bottom-20 -right-20 w-80 h-80 bg-impact-green/10 rounded-full filter blur-3xl opacity-50 animate-pulse delay-1000 parallax-bg"
        data-depth="0.4"
      ></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-4 animate-fade-in">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
              <AnimatedText text="Powered by AI Technology" animationType="typewriter" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <AnimatedText 
                text="Your Actions,"
                tag="span"
                className="block"
                animationType="slide"
                delay={300}
              />
              <AnimatedText 
                text="Real-World Impact"
                tag="span" 
                className="text-primary block"
                animationType="slide"
                delay={600}
              />
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              <AnimatedText 
                text="AidQuest connects you with perfect-fit NGOs and tracks your impact transparently. Donate, volunteer, and witness your contribution change lives."
                animationType="fade"
                delay={900}
              />
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in [animation-delay:600ms]">
              <MagnetButton 
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2"
                magnetStrength={0.3}
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight size={16} className="ml-2" />
              </MagnetButton>
              
              <MagnetButton 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/5 px-6 py-2"
                magnetStrength={0.2}
                onClick={handleExploreNGOs}
              >
                Explore NGOs
              </MagnetButton>
            </div>
            
            <Parallax speed={0.1} direction="up">
              <div className="mt-10 grid grid-cols-3 gap-4 animate-fade-in [animation-delay:800ms]">
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-impact-blue/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-impact-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Global Reach</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-impact-green/10 flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5 text-impact-green" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI Matching</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-impact-purple/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-impact-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Secure</p>
                  </div>
                </div>
              </div>
            </Parallax>
          </div>
          
          <div className="lg:w-1/2 relative animate-fade-in [animation-delay:1000ms]">
            <Parallax speed={0.2} direction="down">
              <div className="relative w-full h-[450px] rounded-2xl overflow-hidden glass-card hover:shadow-xl transition-shadow duration-300">
                <Globe3D className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-impact-purple/20 mix-blend-overlay"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white text-xl font-bold mb-2">Make a difference today</h3>
                  <p className="text-white/80 text-sm">Join 50,000+ change-makers on AidQuest</p>
                </div>
              </div>
            </Parallax>
            
            {/* Floating card elements */}
            <div className="absolute -top-6 -right-6 glass-card p-4 w-40 animate-float shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-impact-orange flex items-center justify-center">
                  <span className="text-white text-xs font-bold">+28%</span>
                </div>
                <div>
                  <p className="text-xs font-medium">Impact Growth</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 glass-card p-4 animate-float shadow-lg [animation-delay:1000ms]">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border border-white"></div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-medium">2,815 people</p>
                  <p className="text-xs text-muted-foreground">took action today</p>
                </div>
              </div>
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

export default HeroSection;
