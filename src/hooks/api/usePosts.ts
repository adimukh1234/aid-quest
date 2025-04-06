
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { Post } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export const usePosts = () => {
  // Fetch all posts
  const fetchPosts = async (): Promise<Post[]> => {
    const { data, error } = await supabase
      .from('posts')
      .select('*');
    
    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
    
    // Transform data to match the Post type
    return (data || []).map(post => ({
      ...post,
      action_data: post.action_data as unknown as Record<string, any>
    })) as Post[];
  };

  // Fetch posts by NGO ID
  const fetchPostsByNgoId = async (ngoId: string): Promise<Post[]> => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('ngo_id', ngoId);
    
    if (error) {
      console.error(`Error fetching posts for NGO ${ngoId}:`, error);
      throw error;
    }
    
    // Transform data to match the Post type
    return (data || []).map(post => ({
      ...post,
      action_data: post.action_data as unknown as Record<string, any>
    })) as Post[];
  };

  // Create a new post
  const createPost = async (postData: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Promise<Post> => {
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()
      .single();
    
    if (error) {
      toast({
        title: 'Error',
        description: `Failed to create post: ${error.message}`,
        variant: 'destructive',
      });
      throw error;
    }
    
    toast({
      title: 'Success',
      description: 'Post created successfully',
    });
    
    // Transform data to match the Post type
    return {
      ...data,
      action_data: data.action_data as unknown as Record<string, any>
    } as Post;
  };

  // Update an existing post
  const updatePost = async ({ id, ...postData }: { id: string } & Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>): Promise<Post> => {
    const { data, error } = await supabase
      .from('posts')
      .update(postData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating post with ID ${id}:`, error);
      toast({
        title: 'Error',
        description: `Failed to update post: ${error.message}`,
        variant: 'destructive',
      });
      throw error;
    }
    
    toast({
      title: 'Success',
      description: 'Post updated successfully',
    });
    
    // Transform data to match the Post type
    return {
      ...data,
      action_data: data.action_data as unknown as Record<string, any>
    } as Post;
  };

  return {
    useGetAllPosts: () => useQuery({
      queryKey: ['posts'],
      queryFn: fetchPosts,
    }),
    
    useGetPostsByNgoId: (ngoId: string) => useQuery({
      queryKey: ['posts', 'ngo', ngoId],
      queryFn: () => fetchPostsByNgoId(ngoId),
      enabled: !!ngoId,
    }),
    
    useCreatePost: () => {
      const queryClient = useQueryClient();
      
      return useMutation({
        mutationFn: createPost,
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
          queryClient.invalidateQueries({ queryKey: ['posts', 'ngo', data.ngo_id] });
        },
      });
    },
    
    useUpdatePost: () => {
      const queryClient = useQueryClient();
      
      return useMutation({
        mutationFn: updatePost,
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
          queryClient.invalidateQueries({ queryKey: ['posts', 'ngo', data.ngo_id] });
        },
      });
    },
  };
};
