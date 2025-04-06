
import React from 'react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/ui/magnetic-button';
import ParallaxSection from '@/components/ui/parallax-section';
import AnimatedText from '@/components/ui/animated-text';
import { ArrowRight, Award, Medal, TrendingUp, Zap } from 'lucide-react';

const ImpactTrackingSection = () => {
  return (
    <section className="py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-impact-purple/10 text-impact-purple rounded-full px-3 py-1 text-sm font-medium inline-flex items-center mb-4">
              <Award className="w-4 h-4 mr-1" />
              Gamified Impact
            </div>
            
            <AnimatedText
              text="Watch Your Impact Grow"
              className="text-3xl md:text-4xl font-bold mb-6"
              animationType="slide"
              duration={800}
            />
            
            <ParallaxSection speed={0.15} direction="up">
              <p className="text-muted-foreground text-lg mb-6">
                Track your social impact journey with beautiful visualizations. See how your contributions 
                grow over time, earn badges for milestones, and climb leaderboards as you create change.
              </p>
            </ParallaxSection>
            
            <div className="space-y-4 mb-8">
              <ParallaxSection speed={0.2} direction="left">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-impact-green/10 flex items-center justify-center mt-1">
                    <TrendingUp className="w-5 h-5 text-impact-green" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Personal Impact Dashboard</h3>
                    <p className="text-muted-foreground">
                      Measure your donations, volunteer hours, signatures, and overall impact with detailed analytics.
                    </p>
                  </div>
                </div>
              </ParallaxSection>
              
              <ParallaxSection speed={0.25} direction="left">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-impact-orange/10 flex items-center justify-center mt-1">
                    <Medal className="w-5 h-5 text-impact-orange" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Achievement System</h3>
                    <p className="text-muted-foreground">
                      Earn badges and unlock achievements as you reach milestones in your giving journey.
                    </p>
                  </div>
                </div>
              </ParallaxSection>
              
              <ParallaxSection speed={0.3} direction="left">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-impact-blue/10 flex items-center justify-center mt-1">
                    <Zap className="w-5 h-5 text-impact-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Community Leaderboards</h3>
                    <p className="text-muted-foreground">
                      Compete with friends and see how your impact ranks among the AidQuest community.
                    </p>
                  </div>
                </div>
              </ParallaxSection>
            </div>
            
            <MagneticButton className="bg-primary hover:bg-primary/90" strength={50}>
              View Your Impact Dashboard
              <ArrowRight size={16} className="ml-2" />
            </MagneticButton>
          </div>
          
          <ParallaxSection speed={-0.1} direction="up" className="relative">
            <div className="glass-card p-8 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">Your Impact Summary</h3>
                <p className="text-muted-foreground text-sm">November 2023</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass-card p-4 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/10 dark:hover:bg-white/5">
                  <div className="text-3xl font-bold text-impact-green mb-1">$750</div>
                  <p className="text-xs text-muted-foreground">Total Donated</p>
                </div>
                
                <div className="glass-card p-4 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/10 dark:hover:bg-white/5">
                  <div className="text-3xl font-bold text-impact-purple mb-1">12h</div>
                  <p className="text-xs text-muted-foreground">Volunteer Hours</p>
                </div>
                
                <div className="glass-card p-4 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/10 dark:hover:bg-white/5">
                  <div className="text-3xl font-bold text-impact-orange mb-1">8</div>
                  <p className="text-xs text-muted-foreground">Petitions Signed</p>
                </div>
                
                <div className="glass-card p-4 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/10 dark:hover:bg-white/5">
                  <div className="text-3xl font-bold text-impact-blue mb-1">3</div>
                  <p className="text-xs text-muted-foreground">NGOs Supported</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-sm font-medium mb-3">Recent Achievements</h4>
                <div className="flex space-x-3">
                  <div className="w-14 h-14 rounded-full bg-white dark:bg-white/5 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md">
                    <Award className="w-8 h-8 text-impact-green" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white dark:bg-white/5 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md">
                    <Medal className="w-8 h-8 text-impact-orange" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white dark:bg-white/5 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md">
                    <TrendingUp className="w-8 h-8 text-impact-blue" />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Impact Growth</h4>
                <div className="w-full h-40 bg-white dark:bg-black/40 rounded-lg flex items-end">
                  {/* This would be a chart in real implementation */}
                  <div className="w-1/6 h-[20%] bg-impact-blue mx-1 rounded-t-sm transition-all duration-700 hover:h-[30%]"></div>
                  <div className="w-1/6 h-[30%] bg-impact-blue mx-1 rounded-t-sm transition-all duration-700 hover:h-[40%]"></div>
                  <div className="w-1/6 h-[25%] bg-impact-blue mx-1 rounded-t-sm transition-all duration-700 hover:h-[35%]"></div>
                  <div className="w-1/6 h-[45%] bg-impact-blue mx-1 rounded-t-sm transition-all duration-700 hover:h-[55%]"></div>
                  <div className="w-1/6 h-[60%] bg-impact-blue mx-1 rounded-t-sm transition-all duration-700 hover:h-[70%]"></div>
                  <div className="w-1/6 h-[80%] bg-impact-blue mx-1 rounded-t-sm transition-all duration-700 hover:h-[90%]"></div>
                </div>
              </div>
            </div>
            
            {/* Floating elements with improved animation */}
            <div className="absolute -top-6 -right-6 glass-card p-4 animate-float hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-impact-purple flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs font-medium">Top 5% of donors</p>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 glass-card p-4 animate-float [animation-delay:500ms] hover:scale-105 transition-all duration-300">
              <div className="text-xs font-medium">
                <span className="text-impact-green">+28%</span> impact growth this month
              </div>
            </div>
          </ParallaxSection>
        </div>
      </div>
    </section>
  );
};

export default ImpactTrackingSection;
