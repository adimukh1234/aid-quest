
import React from 'react';
import { 
  Brain, TrendingUp, LayoutGrid, FileCheck, 
  LineChart, Award, Heart, Gift 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <Brain className="w-10 h-10 text-impact-blue" />,
    title: "AI-Powered Matching",
    description: "Our AI learns your values and interests to connect you with NGOs that perfectly align with your passion."
  },
  {
    icon: <FileCheck className="w-10 h-10 text-impact-green" />,
    title: "Transparent Reporting",
    description: "Every donation is fully tracked and verified, ensuring complete transparency and accountability."
  },
  {
    icon: <LayoutGrid className="w-10 h-10 text-impact-purple" />,
    title: "Action-Driven Feed",
    description: "Unlike traditional social media, every post enables direct action—donate, volunteer, or sign petitions."
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-impact-orange" />,
    title: "Impact Tracking",
    description: "Watch your contribution grow over time with beautiful visualizations and impact metrics."
  }
];

const secondaryFeatures = [
  {
    icon: <Heart className="w-8 h-8 text-impact-blue" />,
    title: "Adopt-an-NGO",
    description: "Form lasting relationships with NGOs through monthly support."
  },
  {
    icon: <LineChart className="w-8 h-8 text-impact-green" />,
    title: "AI Stories",
    description: "NGOs receive AI-generated impact stories to showcase their work."
  },
  {
    icon: <Award className="w-8 h-8 text-impact-purple" />,
    title: "Gamified Giving",
    description: "Earn badges and climb leaderboards as you make a difference."
  },
  {
    icon: <Gift className="w-8 h-8 text-impact-orange" />,
    title: "Easy Payments",
    description: "Donate seamlessly with various payment methods."
  }
];

const FeaturesSection = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <section className="py-16 px-6 md:px-10 bg-background relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Reimagining Social Impact</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            AidQuest combines cutting-edge technology with social purpose to create a new paradigm for digital activism.
          </p>
          <Button 
            variant="outline" 
            className="border-primary text-primary"
            onClick={handleLearnMore}
          >
            Learn More About Our Mission
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-md"
            >
              <div className="rounded-full bg-white dark:bg-black/40 w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-secondary/10 rounded-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2">Additional Features</h3>
            <p className="text-muted-foreground">Everything you need to make a meaningful difference</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-3 p-4 rounded-lg transition-all duration-300 hover:bg-background"
              >
                <div className="rounded-full bg-white dark:bg-black/40 w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium mb-1">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
