
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePosts } from '@/hooks/api/usePosts';
import { useNGOs } from '@/hooks/api/useNGOs';
import { Heart, Share, MessageCircle, ExternalLink, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Feed = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { user } = useAuth();
  
  const { useGetAllPosts } = usePosts();
  const { data: posts, isLoading: postsLoading } = useGetAllPosts();
  
  const { useGetAllNGOs } = useNGOs();
  const { data: ngos } = useGetAllNGOs();
  
  // Get NGO details for each post
  const postsWithNGODetails = posts?.map(post => {
    const ngo = ngos?.find(n => n.id === post.ngo_id);
    return { ...post, ngo };
  });
  
  // Apply filters
  const filteredPosts = postsWithNGODetails?.filter(post => {
    if (activeFilter === 'all') return true;
    return post.post_type === activeFilter;
  });

  const handleAction = (actionType: string, postId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to perform this action",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would call an API to record the action
    toast({
      title: "Action Recorded",
      description: `You ${actionType} this post`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-muted/20">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Action Feed</h1>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="bg-background border border-input rounded-md px-3 py-2"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option value="all">All Actions</option>
                <option value="donation">Donations</option>
                <option value="volunteer">Volunteer</option>
                <option value="petition">Petitions</option>
                <option value="update">Updates</option>
              </select>
            </div>
          </div>
          
          {postsLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-background rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-5/6 mb-3" />
                  <Skeleton className="h-4 w-4/6 mb-6" />
                  <Skeleton className="h-64 w-full mb-4 rounded-lg" />
                  <div className="flex justify-between">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts?.length === 0 ? (
            <div className="bg-background rounded-xl p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                There are no posts matching your selected filter.
              </p>
              <Button onClick={() => setActiveFilter('all')}>
                View All Posts
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts?.map(post => (
                <div key={post.id} className="bg-background rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar>
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        {post.ngo?.logo_url ? (
                          <img 
                            src={post.ngo.logo_url} 
                            alt={post.ngo?.name} 
                            className="h-full w-full object-cover rounded-full"
                          />
                        ) : (
                          <span className="text-lg font-bold">
                            {post.ngo?.name.charAt(0) || '?'}
                          </span>
                        )}
                      </div>
                    </Avatar>
                    
                    <div>
                      <p className="font-medium">{post.ngo?.name || 'Unknown NGO'}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(post.created_at || '').toLocaleDateString()}
                      </p>
                    </div>
                    
                    <Badge 
                      className="ml-auto" 
                      variant="outline"
                      style={{
                        backgroundColor: 
                          post.post_type === 'donation' ? 'rgba(var(--impact-green), 0.1)' :
                          post.post_type === 'volunteer' ? 'rgba(var(--impact-blue), 0.1)' :
                          post.post_type === 'petition' ? 'rgba(var(--impact-orange), 0.1)' :
                          'rgba(var(--impact-purple), 0.1)',
                        color:
                          post.post_type === 'donation' ? 'rgb(var(--impact-green))' :
                          post.post_type === 'volunteer' ? 'rgb(var(--impact-blue))' :
                          post.post_type === 'petition' ? 'rgb(var(--impact-orange))' :
                          'rgb(var(--impact-purple))',
                      }}
                    >
                      {post.post_type.charAt(0).toUpperCase() + post.post_type.slice(1)}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.description}</p>
                  
                  {post.image_url && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between pt-2 border-t">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleAction('liked', post.id)}
                    >
                      <Heart className="h-5 w-5 mr-1" />
                      Like
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleAction('commented on', post.id)}
                    >
                      <MessageCircle className="h-5 w-5 mr-1" />
                      Comment
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleAction('shared', post.id)}
                    >
                      <Share className="h-5 w-5 mr-1" />
                      Share
                    </Button>
                    
                    {post.post_type !== 'update' && (
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => {
                          if (post.post_type === 'donation') {
                            toast({
                              title: "Donation",
                              description: "Donation flow would open here"
                            });
                          } else if (post.post_type === 'volunteer') {
                            toast({
                              title: "Volunteer",
                              description: "Volunteer signup would open here"
                            });
                          } else if (post.post_type === 'petition') {
                            toast({
                              title: "Petition",
                              description: "Petition signing would open here"
                            });
                          }
                        }}
                      >
                        <ExternalLink className="h-5 w-5 mr-1" />
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Feed;
