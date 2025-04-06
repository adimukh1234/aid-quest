
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Heart, Users, Award, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
              <p className="text-xl text-muted-foreground mb-8">
                AidQuest is revolutionizing how people connect with causes they care about through 
                technology, transparency, and community engagement.
              </p>
              <Button size="lg" onClick={() => navigate('/explore')}>
                Discover NGOs
              </Button>
            </div>
          </div>
        </section>
        
        {/* Values section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Compassion</h3>
                  <p className="text-muted-foreground">
                    We believe in the power of empathy and kindness to drive meaningful change in communities worldwide.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Transparency</h3>
                  <p className="text-muted-foreground">
                    We are committed to full transparency in all our operations, finances, and impact reporting.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We leverage the latest technology to create new solutions for age-old social challenges.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Team section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'Co-Founder & CEO',
                  bio: 'Former nonprofit executive with 15 years of experience in the social impact sector.'
                },
                {
                  name: 'Michael Chen',
                  role: 'Co-Founder & CTO',
                  bio: 'Blockchain expert and software engineer passionate about using tech for good.'
                },
                {
                  name: 'Amara Okafor',
                  role: 'Chief Impact Officer',
                  bio: 'International development specialist with experience across three continents.'
                },
                {
                  name: 'David Rodriguez',
                  role: 'Head of Partnerships',
                  bio: 'Connector and relationship builder with deep roots in the global NGO community.'
                }
              ].map((member, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="w-20 h-20 rounded-full bg-muted mb-4 mx-auto"></div>
                    <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                    <p className="text-primary text-center text-sm mb-4">{member.role}</p>
                    <p className="text-muted-foreground text-center text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-4xl font-bold mb-2">100+</h3>
                <p className="text-muted-foreground">NGOs Onboarded</p>
              </div>
              
              <div className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-4xl font-bold mb-2">25,000+</h3>
                <p className="text-muted-foreground">Active Users</p>
              </div>
              
              <div className="text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-4xl font-bold mb-2">$2M+</h3>
                <p className="text-muted-foreground">Impact Generated</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Become part of a growing community dedicated to making the world a better place through 
              transparent, impactful, and meaningful actions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/explore')}>
                Find NGOs
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/impact')}>
                Track Your Impact
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
