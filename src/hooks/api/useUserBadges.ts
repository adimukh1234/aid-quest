import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import type { UserBadge, Badge } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export interface UserBadgeWithDetails extends UserBadge {
  badges?: Badge;
}

export const useUserBadges = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch all badges for the current user
  const fetchUserBadges = async (): Promise<UserBadgeWithDetails[]> => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('user_badges')
      .select(`
        *,
        badges(*)
      `)
      .eq('user_id', user.id);
    
    if (error) {
      console.error('Error fetching user badges:', error);
      throw error;
    }
    
    // Transform data to match the UserBadgeWithDetails type
    return (data || []).map(badge => ({
      ...badge,
      badges: badge.badges ? {
        ...badge.badges,
        requirements: badge.badges.requirements as unknown as Record<string, any>
      } : undefined
    })) as UserBadgeWithDetails[];
  };

  // Fetch a specific user badge by ID
  const fetchUserBadgeById = async (badgeId: string): Promise<UserBadgeWithDetails | null> => {
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('user_badges')
      .select(`
        *,
        badges(*)
      `)
      .eq('user_id', user.id)
      .eq('badge_id', badgeId)
      .maybeSingle();
    
    if (error) {
      console.error(`Error fetching user badge with ID ${badgeId}:`, error);
      throw error;
    }
    
    // Transform data to match the UserBadgeWithDetails type
    return data ? {
      ...data,
      badges: data.badges ? {
        ...data.badges,
        requirements: data.badges.requirements as unknown as Record<string, any>
      } : undefined
    } as UserBadgeWithDetails : null;
  };

  // Fetch all available badges
  const fetchAllBadges = async (): Promise<Badge[]> => {
    const { data, error } = await supabase
      .from('badges')
      .select('*');
    
    if (error) {
      console.error('Error fetching badges:', error);
      throw error;
    }
    
    // Transform data to match the Badge type
    return (data || []).map(badge => ({
      ...badge,
      requirements: badge.requirements as unknown as Record<string, any>
    })) as Badge[];
  };

  // Check badge requirements and award badges if earned
  const checkAndAwardBadges = async (): Promise<UserBadge[]> => {
    if (!user) {
      throw new Error('User must be authenticated to check badges');
    }
    
    try {
      // In a real app, this would be a more complex function in an edge function
      // For now, let's do a simple check for donation actions
      
      // Check for first donation badge
      const { data: donationActions, error: donationError } = await supabase
        .from('user_actions')
        .select('*')
        .eq('user_id', user.id)
        .eq('action_type', 'donation');
      
      if (donationError) throw donationError;
      
      // Get the first donation badge
      const { data: firstDonationBadge, error: badgeError } = await supabase
        .from('badges')
        .select('*')
        .ilike('name', '%First Donation%')
        .maybeSingle();
      
      if (badgeError) throw badgeError;
      
      if (donationActions.length > 0 && firstDonationBadge) {
        // Check if user already has this badge
        const { data: existingBadge, error: checkError } = await supabase
          .from('user_badges')
          .select('*')
          .eq('user_id', user.id)
          .eq('badge_id', firstDonationBadge.id)
          .maybeSingle();
        
        if (checkError) throw checkError;
        
        // Award badge if they don't have it
        if (!existingBadge) {
          const { data: awardedBadge, error: awardError } = await supabase
            .from('user_badges')
            .insert([{
              user_id: user.id,
              badge_id: firstDonationBadge.id,
            }])
            .select()
            .single();
          
          if (awardError) throw awardError;
          
          toast({
            title: 'Badge Earned!',
            description: `You've earned the ${firstDonationBadge.name} badge!`,
          });
          
          return [awardedBadge];
        }
      }
      
      return [];
    } catch (error) {
      console.error('Error checking badges:', error);
      throw error;
    }
  };

  return {
    useGetUserBadges: () => useQuery({
      queryKey: ['user-badges', user?.id],
      queryFn: fetchUserBadges,
      enabled: !!user,
    }),
    
    useGetUserBadgeById: (badgeId: string) => useQuery({
      queryKey: ['user-badges', user?.id, badgeId],
      queryFn: () => fetchUserBadgeById(badgeId),
      enabled: !!user && !!badgeId,
    }),
    
    useGetAllBadges: () => useQuery({
      queryKey: ['badges'],
      queryFn: fetchAllBadges,
    }),
    
    useCheckAndAwardBadges: () => useMutation({
      mutationFn: checkAndAwardBadges,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user-badges', user?.id] });
      },
    }),
  };
};
