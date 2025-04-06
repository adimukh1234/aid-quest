
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export const useActions = () => {
  const { user } = useAuth();

  const fetchUserActions = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_actions')
      .select(`
        *,
        posts (
          *,
          ngos (*)
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  };

  const createAction = async ({ postId, actionType, actionDetails }: { 
    postId: string; 
    actionType: string; 
    actionDetails?: Record<string, any>; 
  }) => {
    if (!user) throw new Error('Must be logged in to perform actions');

    const { data, error } = await supabase
      .from('user_actions')
      .insert({
        user_id: user.id,
        post_id: postId,
        action_type: actionType,
        action_details: actionDetails
      })
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
      description: 'Action recorded successfully',
    });

    return data;
  };

  return {
    useGetUserActions: (userId?: string) => useQuery({
      queryKey: ['user-actions', userId],
      queryFn: () => fetchUserActions(userId || user?.id || ''),
      enabled: !!userId || !!user,
    }),

    useCreateAction: () => {
      const queryClient = useQueryClient();
      
      return useMutation({
        mutationFn: createAction,
        onSuccess: () => {
          if (user) {
            queryClient.invalidateQueries({ queryKey: ['user-actions', user.id] });
          }
        },
      });
    },
  };
};
