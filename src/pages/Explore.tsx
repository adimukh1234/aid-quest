
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { useNGOs } from '@/hooks/api/useNGOs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const navigate = useNavigate();
  
  const { useGetAllNGOs } = useNGOs();
  const { data: ngos, isLoading, error } = useGetAllNGOs();
  
  const categories = ngos ? ['All', ...new Set(ngos.map(ngo => ngo.category || 'Other'))] : ['All'];
  
  const filteredNGOs = ngos?.filter(ngo => {
    // Apply search filter
    const matchesSearch = searchTerm === '' || 
      ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ngo.description && ngo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Apply category filter
    const matchesCategory = categoryFilter === 'All' || ngo.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-muted/50 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Explore NGOs</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover organizations making a difference in causes you care about
            </p>
            
            <div className="bg-background rounded-lg p-4 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, cause, or location"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    className="bg-background border border-input rounded-md px-3 py-2"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-10 w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive mb-4">Error loading NGOs</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            ) : filteredNGOs?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl mb-4">No NGOs found matching your criteria</p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('All');
                }}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNGOs?.map(ngo => (
                  <Card key={ngo.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 bg-muted relative">
                      {ngo.cover_image_url ? (
                        <img 
                          src={ngo.cover_image_url} 
                          alt={ngo.name} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-primary/10">
                          {ngo.logo_url ? (
                            <img 
                              src={ngo.logo_url} 
                              alt={ngo.name} 
                              className="h-16 w-16 object-contain"
                            />
                          ) : (
                            <p className="text-xl font-bold">{ngo.name.charAt(0)}</p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{ngo.name}</CardTitle>
                        {ngo.category && (
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            {ngo.category}
                          </Badge>
                        )}
                      </div>
                      {ngo.location && (
                        <p className="text-sm text-muted-foreground">{ngo.location}</p>
                      )}
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {ngo.description || "No description available"}
                      </p>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => navigate(`/ngos/${ngo.id}`)}
                      >
                        View NGO
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
