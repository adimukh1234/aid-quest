
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Heart, HandCoins, CalendarCheck, FileSignature, 
  MessageCircle, Share2, Award, ThumbsUp
} from 'lucide-react';
import { generateDummyActionPosts } from '@/lib/dummy-data';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Generate dummy action posts
const actionPosts = generateDummyActionPosts(12);

const ActionCard = ({ post }) => {
  const navigate = useNavigate();

  const handleDonate = () => {
    toast.info("Donation feature", {
      description: "You're being redirected to donate to this cause",
      action: {
        label: "View",
        onClick: () => navigate(`/ngo/${post.ngoId}`)
      }
    });
    navigate(`/ngo/${post.ngoId}/donate`);
  };

  const handleVolunteer = () => {
    toast.info("Volunteer opportunity", {
      description: "You're being redirected to sign up as a volunteer",
      action: {
        label: "View",
        onClick: () => navigate(`/ngo/${post.ngoId}`)
      }
    });
    navigate(`/ngo/${post.ngoId}/volunteer`);
  };

  const handlePetition = () => {
    toast.info("Petition signing", {
      description: "Thank you for signing this petition",
    });
  };

  const handleInteraction = (type) => {
    const actions = {
      like: "liked",
      comment: "commented on",
      share: "shared",
      save: "saved"
    };
    
    toast.success(`You ${actions[type]} this post`, {
      description: "Your engagement helps spread awareness"
    });
  };

  const renderActions = () => {
    switch (post.postType) {
      case "Donation":
        return (
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Raised: {post.raised}</span>
              <span className="text-muted-foreground">Goal: {post.goal}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div className="bg-impact-green h-2 rounded-full" style={{ width: `${(parseInt(post.raised.replace(/[^0-9]/g, '')) / parseInt(post.goal.replace(/[^0-9]/g, ''))) * 100}%` }}></div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
              <span>{post.supporters} supporters</span>
              <span>{post.daysLeft} days left</span>
            </div>
            <Button className="w-full bg-impact-green hover:bg-impact-green/90" onClick={handleDonate}>
              <HandCoins size={16} className="mr-2" />
              Donate Now
            </Button>
          </div>
        );
      case "Volunteer":
        return (
          <div className="mt-6">
            <div className="flex items-center space-x-4 mb-4 text-sm">
              <div>
                <p className="font-medium">{post.volunteers.signed}/{post.volunteers.needed}</p>
                <p className="text-xs text-muted-foreground">Volunteers</p>
              </div>
              <div>
                <p className="font-medium">{post.hoursPerWeek}h/week</p>
                <p className="text-xs text-muted-foreground">Time needed</p>
              </div>
              <div>
                <p className="font-medium">{post.duration}</p>
                <p className="text-xs text-muted-foreground">Duration</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button className="flex-1 bg-impact-purple hover:bg-impact-purple/90" onClick={handleVolunteer}>
                <CalendarCheck size={16} className="mr-2" />
                Volunteer
              </Button>
              {post.actions.donate && (
                <Button variant="outline" className="flex-1 border-impact-green text-impact-green hover:bg-impact-green/5" onClick={handleDonate}>
                  <HandCoins size={16} className="mr-2" />
                  Donate
                </Button>
              )}
            </div>
          </div>
        );
      case "Petition":
        return (
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">{post.signatures.current.toLocaleString()} signatures</span>
              <span className="text-muted-foreground">Goal: {post.signatures.goal.toLocaleString()}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div className="bg-impact-orange h-2 rounded-full" style={{ width: `${(post.signatures.current / post.signatures.goal) * 100}%` }}></div>
            </div>
            <div className="text-xs text-muted-foreground mb-4">
              <span>Potential impact: {post.impact}</span>
            </div>
            <Button className="w-full bg-impact-orange hover:bg-impact-orange/90" onClick={handlePetition}>
              <FileSignature size={16} className="mr-2" />
              Sign Petition
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const getTagColor = () => {
    switch (post.postType) {
      case "Donation": return "bg-impact-green/10 text-impact-green";
      case "Volunteer": return "bg-impact-purple/10 text-impact-purple";
      case "Petition": return "bg-impact-orange/10 text-impact-orange";
      default: return "bg-impact-blue/10 text-impact-blue";
    }
  };

  return (
    <div className="glass-card overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className={`absolute top-4 right-4 py-1 px-3 rounded-full ${getTagColor()}`}>
          <span className="text-xs font-medium">{post.postType}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <img 
            src={post.ngoLogo} 
            alt={post.ngoName} 
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium text-sm">{post.ngoName}</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.description}</p>
        
        {renderActions()}
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="flex space-x-4">
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => handleInteraction('like')}
            >
              <ThumbsUp size={18} />
            </button>
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => handleInteraction('comment')}
            >
              <MessageCircle size={18} />
            </button>
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => handleInteraction('share')}
            >
              <Share2 size={18} />
            </button>
          </div>
          <button 
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => handleInteraction('save')}
          >
            <Heart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ActionFeedSection = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, actionPosts.length));
  };

  const handleViewAllActions = () => {
    navigate('/feed');
  };
  
  const displayedPosts = actionPosts.slice(0, visibleCount);
  
  return (
    <section className="py-16 px-6 md:px-10 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-sm font-medium bg-primary/10 rounded-full px-3 py-1 mb-4">
            Action-Driven
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">More Than Just Scrolling</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every post is an opportunity to create real-world change. Take direct action on causes you care about.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedPosts.map(post => (
            <ActionCard key={post.id} post={post} />
          ))}
        </div>
        
        <div className="text-center">
          {visibleCount < actionPosts.length ? (
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/5 mr-4"
              onClick={loadMore}
            >
              Load More Actions
              <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : null}
          
          <Button 
            variant="default"
            onClick={handleViewAllActions}
          >
            View All Actions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ActionFeedSection;
