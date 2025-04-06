
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/api/useProfile';
import { Loader2, Camera, Award, Heart, Trash2, Plus } from 'lucide-react';
import { MultiSelect } from '@/components/profile/MultiSelect';

const profileFormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }).optional(),
  full_name: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }).optional(),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }).optional(),
  avatar_url: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const interestOptions = [
  { label: 'Education', value: 'education' },
  { label: 'Environment', value: 'environment' },
  { label: 'Health', value: 'health' },
  { label: 'Hunger', value: 'hunger' },
  { label: 'Children', value: 'children' },
  { label: 'Animals', value: 'animals' },
  { label: 'Human Rights', value: 'human-rights' },
  { label: 'Poverty', value: 'poverty' },
  { label: 'Disaster Relief', value: 'disaster-relief' },
  { label: 'Veterans', value: 'veterans' },
  { label: 'Arts', value: 'arts' },
  { label: 'Community Development', value: 'community' },
];

const UserProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  
  const { useGetMyProfile, useUpdateMyProfile } = useProfile();
  const { data: profile, isLoading: isProfileLoading } = useGetMyProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateMyProfile();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: profile?.username || '',
      full_name: profile?.full_name || '',
      bio: profile?.bio || '',
      avatar_url: profile?.avatar_url || '',
      interests: profile?.interests || [],
    },
  });
  
  // Update form when profile data loads
  React.useEffect(() => {
    if (profile) {
      form.reset({
        username: profile.username || '',
        full_name: profile.full_name || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
        interests: profile.interests || [],
      });
    }
  }, [profile, form]);
  
  function onSubmit(data: ProfileFormValues) {
    updateProfile(data, {
      onSuccess: () => {
        setIsEditMode(false);
        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated successfully.',
        });
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
        console.error(error);
      },
    });
  }
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Sign in Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Please sign in to view your profile.
              </p>
              <div className="flex justify-center">
                <Button onClick={() => navigate('/')}>Go to Home</Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (isProfileLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left sidebar with profile info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditMode ? (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex justify-center mb-4">
                          <div className="relative">
                            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                              {form.watch('avatar_url') ? (
                                <img 
                                  src={form.watch('avatar_url')} 
                                  alt="Profile" 
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <span className="text-3xl font-bold">
                                  {profile?.full_name?.charAt(0) || 
                                   profile?.username?.charAt(0) || 
                                   user.email?.charAt(0) || 'U'}
                                </span>
                              )}
                            </div>
                            <Button
                              type="button"
                              size="icon"
                              variant="secondary"
                              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                              onClick={() => {
                                // In a real app, this would open an image upload dialog
                                const imageUrl = window.prompt('Enter image URL:');
                                if (imageUrl) {
                                  form.setValue('avatar_url', imageUrl);
                                }
                              }}
                            >
                              <Camera className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="full_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about yourself"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="interests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Interests</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={interestOptions}
                                  selected={field.value || []}
                                  onChange={field.onChange}
                                  placeholder="Select interests"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end space-x-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsEditMode(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            type="submit" 
                            disabled={isUpdating}
                          >
                            {isUpdating && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <>
                      <div className="flex flex-col items-center mb-6">
                        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4 overflow-hidden">
                          {profile?.avatar_url ? (
                            <img 
                              src={profile.avatar_url} 
                              alt={profile.full_name || 'User'} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-3xl font-bold">
                              {profile?.full_name?.charAt(0) || 
                               profile?.username?.charAt(0) || 
                               user.email?.charAt(0) || 'U'}
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl font-bold">
                          {profile?.full_name || 'Update your profile'}
                        </h2>
                        <p className="text-muted-foreground">
                          @{profile?.username || user.email?.split('@')[0] || 'username'}
                        </p>
                      </div>
                      
                      {profile?.bio && (
                        <div className="mb-6">
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">About</h3>
                          <p>{profile.bio}</p>
                        </div>
                      )}
                      
                      {profile?.interests && profile.interests.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Interests</h3>
                          <div className="flex flex-wrap gap-2">
                            {profile.interests.map((interest) => (
                              <Badge key={interest} variant="secondary">{interest}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => setIsEditMode(true)} 
                        className="w-full"
                      >
                        Edit Profile
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Impact Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-4">
                      <span className="text-2xl font-bold text-primary">{profile?.impact_score || 0}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {profile?.impact_score ? "Great progress!" : "Start your impact journey"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Badges Earned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {/* This would be populated from the user's actual badges */}
                    <div className="flex flex-col items-center p-4 rounded-lg border">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-sm font-medium">First Donation</span>
                    </div>
                    
                    <div className="flex flex-col items-center p-4 rounded-lg border border-dashed">
                      <div className="h-12 w-12 rounded-full border-2 border-dashed flex items-center justify-center mb-2">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground">Unlock more badges</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* This would be populated from the user's actual activity */}
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-medium">Donated to Clean Ocean Initiative</h3>
                          <span className="text-sm text-muted-foreground">3 days ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          You donated $50 to support ocean cleanup efforts.
                        </p>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-center p-6 text-center">
                      <div>
                        <p className="text-muted-foreground mb-4">No more activities to show</p>
                        <Button variant="outline" onClick={() => navigate('/explore')}>
                          Explore NGOs
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Matched NGOs</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* This would be populated with the user's NGO matches */}
                  <div className="flex items-center justify-center p-6 text-center">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        We'll match you with NGOs based on your interests
                      </p>
                      <Button onClick={() => navigate('/explore')}>
                        Find NGOs
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
