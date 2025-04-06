
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useNGOs } from '@/hooks/api/useNGOs';
import { usePosts } from '@/hooks/api/usePosts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Heart, Users, Award, Zap, Globe, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const NGODetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { useGetNGOById } = useNGOs();
  const { data: ngo, isLoading: ngoLoading, error } = useGetNGOById(id || '');
  
  const { useGetPostsByNgoId } = usePosts();
  const { data: posts, isLoading: postsLoading } = useGetPostsByNgoId(id || '');

  const handleAdopt = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to adopt this NGO",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "NGO Adopted",
      description: `You are now supporting ${ngo?.name}`,
    });
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">NGO Not Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find the NGO you're looking for.
            </p>
            <Button onClick={() => navigate('/explore')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Explore
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {ngoLoading ? (
          <div className="max-w-7xl mx-auto p-6">
            <Skeleton className="h-64 w-full rounded-xl mb-8" />
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/3 mb-8" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-8" />
                
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <Skeleton className="h-32 w-full rounded-lg" />
                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>
              </div>
              
              <div className="md:w-1/3">
                <Skeleton className="h-64 w-full rounded-xl mb-4" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="h-64 bg-muted relative">
              {ngo?.cover_image_url ? (
                <img 
                  src={ngo.cover_image_url} 
                  alt={ngo?.name} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-r from-primary/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-4xl font-bold text-primary/60">{ngo?.name}</div>
                </div>
              )}
              
              <button 
                className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-full"
                onClick={() => navigate('/explore')}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              
              <div className="absolute -bottom-12 left-8 h-24 w-24 rounded-xl overflow-hidden border-4 border-background bg-white">
                {ngo?.logo_url ? (
                  <img 
                    src={ngo.logo_url} 
                    alt={ngo?.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                    <span className="text-3xl font-bold">{ngo?.name.charAt(0)}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{ngo?.name}</h1>
                    {ngo?.category && (
                      <Badge className="bg-primary/10 text-primary">
                        {ngo.category}
                      </Badge>
                    )}
                  </div>
                  
                  {ngo?.location && (
                    <div className="flex items-center text-muted-foreground mb-6">
                      <MapPin className="h-4 w-4 mr-1" />
                      {ngo.location}
                    </div>
                  )}
                  
                  <p className="text-lg mb-8">
                    {ngo?.description || "No description available for this organization."}
                  </p>
                  
                  <Tabs defaultValue="posts">
                    <TabsList className="mb-6">
                      <TabsTrigger value="posts">Recent Posts</TabsTrigger>
                      <TabsTrigger value="impact">Impact Metrics</TabsTrigger>
                      <TabsTrigger value="about">About</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="posts">
                      <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                      
                      {postsLoading ? (
                        <div className="space-y-4">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="bg-muted/20 p-4 rounded-lg">
                              <Skeleton className="h-6 w-3/4 mb-2" />
                              <Skeleton className="h-4 w-full mb-2" />
                              <Skeleton className="h-4 w-2/3" />
                            </div>
                          ))}
                        </div>
                      ) : posts?.length === 0 ? (
                        <div className="bg-muted/20 p-6 rounded-lg text-center">
                          <p className="text-muted-foreground">
                            This NGO hasn't posted any updates yet.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {posts?.map(post => (
                            <div key={post.id} className="bg-muted/20 p-4 rounded-lg">
                              <div className="flex justify-between mb-2">
                                <h4 className="font-medium">{post.title}</h4>
                                <Badge variant="outline">
                                  {post.post_type.charAt(0).toUpperCase() + post.post_type.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground mb-2">{post.description}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(post.created_at || '').toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="impact">
                      <h3 className="text-xl font-semibold mb-4">Impact Metrics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-muted/20 p-6 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Users className="text-impact-blue h-5 w-5 mr-2" />
                            <h4 className="font-medium">People Helped</h4>
                          </div>
                          <p className="text-3xl font-bold mb-1">
                            {ngo?.impact_metrics?.people_helped || "10,000+"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            People directly impacted by our programs
                          </p>
                        </div>
                        
                        <div className="bg-muted/20 p-6 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Globe className="text-impact-green h-5 w-5 mr-2" />
                            <h4 className="font-medium">Environmental Impact</h4>
                          </div>
                          <p className="text-3xl font-bold mb-1">
                            {ngo?.impact_metrics?.environmental_impact || "2.5M kg"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            CO₂ emissions reduced or offset
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-muted/20 p-6 rounded-lg">
                        <div className="flex items-center mb-4">
                          <Award className="text-impact-purple h-5 w-5 mr-2" />
                          <h4 className="font-medium">Key Achievements</h4>
                        </div>
                        <ul className="space-y-2 list-disc pl-5">
                          <li>Successfully completed 50+ community projects</li>
                          <li>Received Environmental Protection Award 2023</li>
                          <li>Expanded operations to 5 new regions</li>
                          <li>Reached fundraising goal of $1M in donations</li>
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="about">
                      <h3 className="text-xl font-semibold mb-4">About the Organization</h3>
                      <div className="bg-muted/20 p-6 rounded-lg mb-6">
                        <p className="mb-4">
                          {ngo?.description || "This organization is committed to making a positive impact."}
                        </p>
                        <p className="mb-4">
                          Founded in 2010, we have been working tirelessly to address 
                          critical challenges and create sustainable solutions that benefit 
                          communities and the environment.
                        </p>
                        <p>
                          Our team consists of dedicated professionals and volunteers who 
                          share a common vision of a better world for all.
                        </p>
                      </div>
                      
                      <h4 className="font-medium text-lg mb-2">Contact Information</h4>
                      <div className="bg-muted/20 p-6 rounded-lg">
                        <p className="mb-2">
                          <strong>Email:</strong> contact@{ngo?.name.toLowerCase().replace(/\s/g, '')}.org
                        </p>
                        <p className="mb-2">
                          <strong>Website:</strong> www.{ngo?.name.toLowerCase().replace(/\s/g, '')}.org
                        </p>
                        <p>
                          <strong>Location:</strong> {ngo?.location || "Global"}
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-muted/20 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Support This NGO</h3>
                    <p className="text-muted-foreground mb-6">
                      Your contribution helps {ngo?.name} continue their important work.
                    </p>
                    
                    <Button className="w-full mb-3" onClick={handleAdopt}>
                      <Heart className="mr-2 h-4 w-4" />
                      Adopt This NGO
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Zap className="mr-2 h-4 w-4" />
                      Make a One-Time Donation
                    </Button>
                  </div>
                  
                  <div className="bg-muted/20 rounded-xl p-6">
                    <h3 className="font-semibold mb-3">Match Score</h3>
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="text-lg font-bold text-primary">85%</span>
                      </div>
                      <div>
                        <p className="font-medium">Strong Match</p>
                        <p className="text-sm text-muted-foreground">Based on your interests</p>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-3">Community Support</h3>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-3">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background"></div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">1,248</span> people support this NGO
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default NGODetail;
