
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/api/useProfile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Medal, TrendingUp, Users, Award, Heart, Calendar, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Mock badge data
const badges = [
  { id: 1, name: 'First Donation', icon: Heart, color: 'text-impact-green', earned: true },
  { id: 2, name: 'Volunteer Hero', icon: Users, color: 'text-impact-blue', earned: true },
  { id: 3, name: 'Eco Champion', icon: Zap, color: 'text-impact-purple', earned: true },
  { id: 4, name: 'Community Pillar', icon: Medal, color: 'text-impact-orange', earned: false },
  { id: 5, name: 'Social Advocate', icon: Award, color: 'text-primary', earned: false },
  { id: 6, name: 'Global Citizen', icon: TrendingUp, color: 'text-impact-green', earned: false },
];

// Mock impact data
const impactData = {
  donations: [
    { month: 'Jan', amount: 50 },
    { month: 'Feb', amount: 75 },
    { month: 'Mar', amount: 60 },
    { month: 'Apr', amount: 90 },
    { month: 'May', amount: 120 },
    { month: 'Jun', amount: 150 },
  ],
  volunteer: [
    { month: 'Jan', hours: 2 },
    { month: 'Feb', hours: 5 },
    { month: 'Mar', hours: 3 },
    { month: 'Apr', hours: 8 },
    { month: 'May', hours: 6 },
    { month: 'Jun', hours: 10 },
  ],
  actions: [
    { month: 'Jan', count: 4 },
    { month: 'Feb', count: 7 },
    { month: 'Mar', count: 6 },
    { month: 'Apr', count: 9 },
    { month: 'May', count: 12 },
    { month: 'Jun', count: 15 },
  ],
};

const Impact = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { useGetMyProfile } = useProfile();
  const { data: profile, isLoading } = useGetMyProfile();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-muted/10">
          <div className="text-center max-w-md px-6">
            <Award className="h-20 w-20 mx-auto mb-6 text-primary opacity-50" />
            <h1 className="text-3xl font-bold mb-4">Your Impact Dashboard</h1>
            <p className="text-muted-foreground mb-8">
              Sign in to track your social impact, earn badges, and see how your 
              contributions are making a difference.
            </p>
            <Button onClick={() => navigate('/')}>
              Sign In to Continue
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
      <main className="flex-grow bg-muted/10">
        <div className="max-w-7xl mx-auto py-12 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-6">Your Impact Dashboard</h1>
              
              {isLoading ? (
                <div className="bg-background rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <Skeleton className="h-16 w-16 rounded-full mr-4" />
                    <div>
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-6" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ) : (
                <div className="bg-background rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      {profile?.avatar_url ? (
                        <img 
                          src={profile.avatar_url} 
                          alt={profile.full_name || 'User'} 
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-2xl font-bold">
                          {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-bold">
                        {profile?.full_name || user.email?.split('@')[0] || 'User'}
                      </h2>
                      <p className="text-muted-foreground">
                        Member since {new Date(user.created_at || '').toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <p className="mb-6">
                    {profile?.bio || 'Complete your profile to share why social impact matters to you.'}
                  </p>
                  
                  <div className="bg-muted/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Impact Score</h3>
                      <span className="font-bold text-primary">{profile?.impact_score || 650}</span>
                    </div>
                    <Progress value={65} className="h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">
                      You're in the top 15% of impact makers this month
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <div className="bg-background rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Impact Summary</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center">
                      <Heart className="h-5 w-5 text-impact-green mr-3" />
                      <span>Total Donated</span>
                    </div>
                    <span className="font-bold">$545</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-impact-blue mr-3" />
                      <span>Volunteer Hours</span>
                    </div>
                    <span className="font-bold">34h</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-impact-purple mr-3" />
                      <span>Actions Taken</span>
                    </div>
                    <span className="font-bold">53</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center">
                      <Medal className="h-5 w-5 text-impact-orange mr-3" />
                      <span>Badges Earned</span>
                    </div>
                    <span className="font-bold">3/6</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="activity">
            <TabsList className="mb-8">
              <TabsTrigger value="activity">Activity Timeline</TabsTrigger>
              <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
              <TabsTrigger value="stats">Detailed Statistics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity">
              <div className="bg-background rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6">Recent Impact Activity</h2>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="h-10 w-10 rounded-full bg-impact-green/10 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-impact-green" />
                      </div>
                      <div className="h-full w-px bg-border mt-2"></div>
                    </div>
                    
                    <div className="bg-muted/20 rounded-lg p-4 flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Donated to Clean Ocean Initiative</h3>
                        <span className="text-sm text-muted-foreground">3 days ago</span>
                      </div>
                      <p className="text-muted-foreground mb-2">
                        You donated $50 to support ocean cleanup efforts.
                      </p>
                      <div className="flex items-center text-sm">
                        <Zap className="h-3 w-3 text-impact-purple mr-1" />
                        <span className="text-impact-purple">+25 impact points</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="h-10 w-10 rounded-full bg-impact-blue/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-impact-blue" />
                      </div>
                      <div className="h-full w-px bg-border mt-2"></div>
                    </div>
                    
                    <div className="bg-muted/20 rounded-lg p-4 flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Volunteered for Education for All</h3>
                        <span className="text-sm text-muted-foreground">1 week ago</span>
                      </div>
                      <p className="text-muted-foreground mb-2">
                        You participated in online tutoring for 2 hours.
                      </p>
                      <div className="flex items-center text-sm">
                        <Zap className="h-3 w-3 text-impact-purple mr-1" />
                        <span className="text-impact-purple">+40 impact points</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="h-10 w-10 rounded-full bg-impact-orange/10 flex items-center justify-center">
                        <Award className="h-5 w-5 text-impact-orange" />
                      </div>
                      <div className="h-full w-px bg-border mt-2"></div>
                    </div>
                    
                    <div className="bg-muted/20 rounded-lg p-4 flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Earned Volunteer Hero Badge</h3>
                        <span className="text-sm text-muted-foreground">2 weeks ago</span>
                      </div>
                      <p className="text-muted-foreground mb-2">
                        You've completed 10+ hours of volunteer work.
                      </p>
                      <div className="flex items-center text-sm">
                        <Zap className="h-3 w-3 text-impact-purple mr-1" />
                        <span className="text-impact-purple">+100 impact points</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="h-10 w-10 rounded-full bg-impact-green/10 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-impact-green" />
                      </div>
                    </div>
                    
                    <div className="bg-muted/20 rounded-lg p-4 flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Donated to Hunger Relief Network</h3>
                        <span className="text-sm text-muted-foreground">3 weeks ago</span>
                      </div>
                      <p className="text-muted-foreground mb-2">
                        You donated $75 to help provide meals to those in need.
                      </p>
                      <div className="flex items-center text-sm">
                        <Zap className="h-3 w-3 text-impact-purple mr-1" />
                        <span className="text-impact-purple">+35 impact points</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="badges">
              <div className="bg-background rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6">Your Achievements</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {badges.map(badge => (
                    <Card 
                      key={badge.id} 
                      className={`overflow-hidden ${!badge.earned ? 'opacity-50' : ''}`}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <badge.icon className={`h-5 w-5 mr-2 ${badge.color}`} />
                          {badge.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            {badge.earned ? 'Earned' : 'Not yet earned'}
                          </p>
                          {badge.earned && (
                            <div className="flex items-center text-xs">
                              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-muted-foreground">Jun 15, 2023</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8 bg-muted/20 rounded-lg p-6">
                  <h3 className="font-medium mb-4">Badges Progress</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Community Pillar</span>
                        <span className="text-sm">70%</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Social Advocate</span>
                        <span className="text-sm">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Global Citizen</span>
                        <span className="text-sm">30%</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="bg-background rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6">Detailed Impact Statistics</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Heart className="text-impact-green h-5 w-5 mr-2" />
                        Donation History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-end justify-between">
                        {impactData.donations.map((item, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div 
                              className="w-10 bg-impact-green/60 rounded-t-sm" 
                              style={{ height: `${(item.amount / 150) * 180}px` }}
                            ></div>
                            <span className="text-xs mt-2">{item.month}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-muted-foreground text-sm">Total for Period</p>
                        <p className="text-2xl font-bold">$545</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="text-impact-blue h-5 w-5 mr-2" />
                        Volunteer Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-end justify-between">
                        {impactData.volunteer.map((item, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div 
                              className="w-10 bg-impact-blue/60 rounded-t-sm" 
                              style={{ height: `${(item.hours / 10) * 180}px` }}
                            ></div>
                            <span className="text-xs mt-2">{item.month}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-muted-foreground text-sm">Total for Period</p>
                        <p className="text-2xl font-bold">34 hours</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="text-impact-purple h-5 w-5 mr-2" />
                        Actions Taken
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-end justify-between">
                        {impactData.actions.map((item, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div 
                              className="w-10 bg-impact-purple/60 rounded-t-sm" 
                              style={{ height: `${(item.count / 15) * 180}px` }}
                            ></div>
                            <span className="text-xs mt-2">{item.month}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-muted-foreground text-sm">Total for Period</p>
                        <p className="text-2xl font-bold">53 actions</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-muted/20 rounded-lg p-6">
                    <h3 className="font-medium mb-4">Impact by Category</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Environmental</span>
                          <span className="text-sm">40%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-impact-green rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Education</span>
                          <span className="text-sm">30%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-impact-blue rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Food Security</span>
                          <span className="text-sm">20%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-impact-orange rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Health</span>
                          <span className="text-sm">10%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-impact-purple rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 rounded-lg p-6">
                    <h3 className="font-medium mb-4">Your Top NGOs</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-impact-green/10 rounded-full flex items-center justify-center mr-3">
                          <span className="font-bold">C</span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium mb-1">Clean Ocean Initiative</p>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-impact-green rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        <span className="ml-3 text-sm font-medium">65%</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-impact-blue/10 rounded-full flex items-center justify-center mr-3">
                          <span className="font-bold">E</span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium mb-1">Education for All</p>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-impact-blue rounded-full" style={{ width: '45%' }}></div>
                          </div>
                        </div>
                        <span className="ml-3 text-sm font-medium">45%</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-impact-orange/10 rounded-full flex items-center justify-center mr-3">
                          <span className="font-bold">H</span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium mb-1">Hunger Relief Network</p>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-impact-orange rounded-full" style={{ width: '30%' }}></div>
                          </div>
                        </div>
                        <span className="ml-3 text-sm font-medium">30%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impact;
