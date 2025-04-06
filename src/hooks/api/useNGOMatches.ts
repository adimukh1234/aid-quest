
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export const useNGOMatches = () => {
  const { user } = useAuth();

  const fetchUserMatches = async () => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_ngo_matches')
      .select(`
        *,
        ngos (*)
      `)
      .eq('user_id', user.id)
      .order('match_score', { ascending: false });

    if (error) throw error;
    return data;
  };

  const adoptNGO = async (ngoId: string) => {
    if (!user) throw new Error('Must be logged in to adopt an NGO');

    const { data, error } = await supabase
      .from('user_ngo_matches')
      .update({ is_adopted: true })
      .eq('user_id', user.id)
      .eq('ngo_id', ngoId)
      .select()
      .single();

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }

    toast({
      title: 'Success',
      description: 'NGO adopted successfully!',
    });

    return data;
  };

  return {
    useGetUserMatches: () => useQuery({
      queryKey: ['ngo-matches', user?.id],
      queryFn: fetchUserMatches,
      enabled: !!user,
    }),

    useAdoptNGO: () => {
      const queryClient = useQueryClient();
      
      return useMutation({
        mutationFn: adoptNGO,
        onSuccess: () => {
          if (user) {
            queryClient.invalidateQueries({ queryKey: ['ngo-matches', user.id] });
          }
        },
      });
    },
  };
};
