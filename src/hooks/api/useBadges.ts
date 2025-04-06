
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export const useBadges = () => {
  const { user } = useAuth();

  const fetchUserBadges = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_badges')
      .select(`
        *,
        badges (*)
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  };

  const fetchAllBadges = async () => {
    const { data, error } = await supabase
      .from('badges')
      .select('*');

    if (error) throw error;
    return data;
  };

  return {
    useGetUserBadges: (userId?: string) => useQuery({
      queryKey: ['user-badges', userId],
      queryFn: () => fetchUserBadges(userId || user?.id || ''),
      enabled: !!userId || !!user,
    }),

    useGetAllBadges: () => useQuery({
      queryKey: ['badges'],
      queryFn: fetchAllBadges,
    }),
  };
};
