
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import type { UserNGOMatch } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export const useUserNGOMatches = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch matched NGOs for the current user
  const fetchUserNGOMatches = async (): Promise<UserNGOMatch[]> => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('user_ngo_matches')
      .select(`
        *,
        ngos:ngo_id (*)
      `)
      .eq('user_id', user.id)
      .order('match_score', { ascending: false });
    
    if (error) {
      console.error('Error fetching user NGO matches:', error);
      throw error;
    }
    
    // Transform data to match the UserNGOMatch type
    return (data || []).map(match => ({
      ...match,
      ngos: match.ngos ? {
        ...match.ngos,
        impact_metrics: match.ngos.impact_metrics as unknown as Record<string, any>
      } : undefined
    })) as UserNGOMatch[];
  };

  // Adopt or un-adopt an NGO
  const toggleAdoptNGO = async ({ matchId, isAdopted }: { matchId: string, isAdopted: boolean }): Promise<UserNGOMatch> => {
    if (!user) {
      throw new Error('User must be logged in to adopt an NGO');
    }
    
    const { data, error } = await supabase
      .from('user_ngo_matches')
      .update({ is_adopted: isAdopted })
      .eq('id', matchId)
      .eq('user_id', user.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating NGO adoption status:', error);
      toast({
        title: 'Error',
        description: `Failed to ${isAdopted ? 'adopt' : 'un-adopt'} NGO: ${error.message}`,
        variant: 'destructive',
      });
      throw error;
    }
    
    toast({
      title: 'Success',
      description: `NGO ${isAdopted ? 'adopted' : 'un-adopted'} successfully`,
    });
    
    return data as UserNGOMatch;
  };

  return {
    useGetUserNGOMatches: () => useQuery({
      queryKey: ['user-ngo-matches', user?.id],
      queryFn: fetchUserNGOMatches,
      enabled: !!user,
    }),
    
    useToggleAdoptNGO: () => {
      return useMutation({
        mutationFn: toggleAdoptNGO,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['user-ngo-matches', user?.id] });
        },
      });
    },
  };
};
