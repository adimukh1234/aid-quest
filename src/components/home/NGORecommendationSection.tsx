
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/ui/magnetic-button';
import ParallaxSection from '@/components/ui/parallax-section';
import AnimatedText from '@/components/ui/animated-text';
import { ArrowRight, Globe, MapPin, Award, Users } from 'lucide-react';
import { useNGORecommendations } from '@/hooks/api/useNGORecommendations';
import { useAuth } from '@/contexts/AuthContext';
import { generateDummyNGOs } from '@/lib/dummy-data';
import { NGO } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Fallback to dummy data when real data is not available
const dummyNGOs = generateDummyNGOs(24);

const NGORecommendationSection = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  // Fix: Change hoveredCard type to accept both string and number to match NGO IDs
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  
  const { user } = useAuth();
  const { useGetRecommendedNGOs, useGetAllNGOs } = useNGORecommendations();
  const { data: userNGOMatches, isLoading: isRecommendationsLoading } = useGetRecommendedNGOs();
  const { data: allNGOs, isLoading: isAllNGOsLoading } = useGetAllNGOs();

  // Prepare data from real API or fallback to dummy data
  const ngoData = React.useMemo(() => {
    if (user && userNGOMatches && userNGOMatches.length > 0) {
      // Map user NGO matches to the format needed for the UI
      return userNGOMatches.map(match => {
        const ngo = match.ngos;
        
        if (!ngo) return null;
        
        return {
          id: ngo.id,
          name: ngo.name,
          description: ngo.description || 'No description available',
          image: ngo.cover_image_url || 'https://source.unsplash.com/random/800x600/?nature',
          category: ngo.category || 'General',
          location: ngo.location || 'Global',
          impact: JSON.stringify(ngo.impact_metrics).substring(0, 50) || 'Making a difference',
          matchScore: Math.round(match.match_score),
        };
      }).filter(Boolean);
    } else if (allNGOs && allNGOs.length > 0) {
      // Map all NGOs to the format needed for the UI
      return allNGOs.map(ngo => ({
        id: ngo.id,
        name: ngo.name,
        description: ngo.description || 'No description available',
        image: ngo.cover_image_url || 'https://source.unsplash.com/random/800x600/?nature',
        category: ngo.category || 'General',
        location: ngo.location || 'Global',
        impact: JSON.stringify(ngo.impact_metrics).substring(0, 50) || 'Making a difference',
        matchScore: 85, // Default match score for non-personalized recommendations
      }));
    }
    
    // Fallback to dummy data
    return dummyNGOs;
  }, [user, userNGOMatches, allNGOs]);
  
  // Get unique categories for the filter
  const categories = React.useMemo(() => {
    const uniqueCategories = new Set<string>();
    uniqueCategories.add("All");
    
    ngoData.forEach(ngo => {
      if (ngo.category) uniqueCategories.add(ngo.category);
    });
    
    return Array.from(uniqueCategories);
  }, [ngoData]);
  
  const filteredNGOs = activeCategory === "All" 
    ? ngoData 
    : ngoData.filter(ngo => ngo.category === activeCategory);
  
  const displayedNGOs = filteredNGOs.slice(0, visibleCount);
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredNGOs.length));
  };

  // Fix: Convert id to string to ensure type safety
  const handleViewNGO = (ngoId: string | number) => {
    navigate(`/ngo/${String(ngoId)}`);
  };

  // Fix: Convert id to string to ensure type safety
  const handleSupportNGO = (ngoId: string | number, ngoName: string) => {
    if (user) {
      navigate(`/ngo/${String(ngoId)}/donate`);
    } else {
      toast.info("Please sign in to support this NGO", {
        description: "Create an account to donate to " + ngoName,
        action: {
          label: "Sign In",
          onClick: () => navigate("/signin")
        }
      });
    }
  };
  
  return (
    <section className="py-16 px-6 md:px-10 relative bg-secondary/5">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-impact-green/5 rounded-full filter blur-3xl opacity-50 mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-impact-orange/5 rounded-full filter blur-3xl opacity-50 mix-blend-multiply"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10">
          <div>
            <AnimatedText 
              text={user ? "NGOs Matched For You" : "NGOs You'll Love"}
              className="text-3xl md:text-4xl font-bold mb-4"
              animationType="slide"
              duration={800}
            />
            <ParallaxSection speed={0.1} direction="up" className="max-w-xl">
              <AnimatedText 
                text="Matched to your interests using our advanced AI algorithm. Discover causes that resonate with your values."
                className="text-muted-foreground text-lg"
                animationType="fade"
                delay={300}
                duration={1000}
              />
            </ParallaxSection>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {categories.map(category => (
              <Button 
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCount(6); // Reset visible count when changing category
                }}
                className={`transition-all duration-300 ${
                  activeCategory === category 
                    ? "bg-primary scale-105" 
                    : "hover:scale-105"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedNGOs.map((ngo) => (
            <div 
              key={ngo.id} 
              className={`glass-card overflow-hidden transition-all duration-500 hover:shadow-lg ${
                hoveredCard === ngo.id ? 'scale-[1.02] shadow-xl' : ''
              }`}
              onMouseEnter={() => setHoveredCard(ngo.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={ngo.image} 
                  alt={ngo.name} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredCard === ngo.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-impact-green/80 to-impact-green/60 text-white py-1 px-3 rounded-full flex items-center space-x-1 backdrop-blur-sm">
                  <span className="font-semibold text-sm">{ngo.matchScore}%</span>
                  <span className="text-xs">match</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-impact-green/10 text-impact-green rounded-full">
                    {ngo.category}
                  </span>
                  <span className="text-xs font-medium flex items-center text-muted-foreground">
                    <MapPin size={12} className="mr-1" />
                    {ngo.location}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{ngo.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{ngo.description}</p>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Award size={16} className="text-impact-orange" />
                  <span className="text-sm">{ngo.impact}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-primary border-primary hover:bg-primary/5 transition-all duration-300 hover:pl-5"
                    onClick={() => handleViewNGO(ngo.id)}
                  >
                    Learn More
                  </Button>
                  <MagneticButton 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90"
                    strength={30}
                    onClick={() => handleSupportNGO(ngo.id, ngo.name)}
                  >
                    Support
                  </MagneticButton>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {visibleCount < filteredNGOs.length && (
          <div className="text-center mt-12">
            <MagneticButton 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/5"
              strength={50}
              onClick={loadMore}
            >
              Load More NGOs
              <ArrowRight size={16} className="ml-2" />
            </MagneticButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default NGORecommendationSection;
