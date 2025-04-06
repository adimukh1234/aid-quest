
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import type { Profile } from '@/integrations/supabase/client';

export const useProfile = () => {
  const { user } = useAuth();
  
  // Fetch the current user's profile
  const fetchMyProfile = async (): Promise<Profile | null> => {
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
    
    return data;
  };

  // Fetch a profile by user ID
  const fetchProfileById = async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) {
      console.error(`Error fetching profile for user ${userId}:`, error);
      throw error;
    }
    
    return data;
  };

  // Update the current user's profile
  const updateMyProfile = async (profileData: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>): Promise<Profile> => {
    if (!user) {
      throw new Error('Cannot update profile: Not authenticated');
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) {
      toast({
        title: 'Error',
        description: `Failed to update profile: ${error.message}`,
        variant: 'destructive',
      });
      throw error;
    }
    
    toast({
      title: 'Success',
      description: 'Profile updated successfully',
    });
    
    return data;
  };

  return {
    useGetMyProfile: () => useQuery({
      queryKey: ['profile', 'me'],
      queryFn: fetchMyProfile,
      enabled: !!user,
    }),
    
    useGetProfileById: (userId: string) => useQuery({
      queryKey: ['profile', userId],
      queryFn: () => fetchProfileById(userId),
      enabled: !!userId,
    }),
    
    useUpdateMyProfile: () => {
      const queryClient = useQueryClient();
      
      return useMutation({
        mutationFn: updateMyProfile,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
          if (user) {
            queryClient.invalidateQueries({ queryKey: ['profile', user.id] });
          }
        },
      });
    },
  };
};
