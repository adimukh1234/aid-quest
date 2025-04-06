
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { UserNGOMatch, NGO } from '@/integrations/supabase/client';
import { castDatabaseObject } from '@/utils/supabase-type-helpers';

export const useNGORecommendations = () => {
  const { user } = useAuth();

  // Fetch NGO recommendations for the current user
  const fetchNGORecommendations = async (): Promise<UserNGOMatch[]> => {
    if (!user) {
      // If no user is logged in, return empty array
      return [];
    }

    const { data, error } = await supabase
      .from('user_ngo_matches')
      .select(`
        *,
        ngos:ngo_id (*)
      `)
      .eq('user_id', user.id)
      .order('match_score', { ascending: false });

    if (error) {
      console.error('Error fetching NGO recommendations:', error);
      throw error;
    }

    // Transform data to match UserNGOMatch type with proper JSON handling
    return (data || []).map(item => ({
      ...item,
      ngos: item.ngos ? castDatabaseObject<NGO>(item.ngos, ['impact_metrics']) : undefined
    })) as UserNGOMatch[];
  };

  // Fetch all NGOs if user is not logged in
  const fetchAllNGOs = async (): Promise<NGO[]> => {
    const { data, error } = await supabase
      .from('ngos')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching NGOs:', error);
      throw error;
    }

    // Transform data with proper JSON handling
    return (data || []).map(ngo => 
      castDatabaseObject<NGO>(ngo, ['impact_metrics'])
    );
  };

  // Fetch a single NGO by ID
  const fetchNGOById = async (ngoId: string): Promise<NGO | null> => {
    if (!ngoId) return null;
    
    const { data, error } = await supabase
      .from('ngos')
      .select('*')
      .eq('id', ngoId)
      .single();
      
    if (error) {
      console.error(`Error fetching NGO with ID ${ngoId}:`, error);
      throw error;
    }
    
    return data ? castDatabaseObject<NGO>(data, ['impact_metrics']) : null;
  };

  return {
    useGetRecommendedNGOs: () => useQuery({
      queryKey: ['ngo-recommendations', user?.id],
      queryFn: fetchNGORecommendations,
      enabled: !!user,
    }),

    useGetAllNGOs: () => useQuery({
      queryKey: ['ngos'],
      queryFn: fetchAllNGOs,
    }),
    
    useGetNGOById: (ngoId: string) => useQuery({
      queryKey: ['ngo', ngoId],
      queryFn: () => fetchNGOById(ngoId),
      enabled: !!ngoId,
    }),
  };
};
