
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { NGO } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export const useNGOs = () => {
  // Fetch all NGOs
  const fetchNGOs = async (): Promise<NGO[]> => {
    // Use the supabase client directly, without type checking
    const { data, error } = await supabase
      .from('ngos')
      .select('*');
    
    if (error) {
      console.error('Error fetching NGOs:', error);
      throw error;
    }
    
    // Transform data to match the NGO type
    return (data || []).map(ngo => ({
      ...ngo,
      impact_metrics: ngo.impact_metrics as unknown as Record<string, any>
    })) as NGO[];
  };

  // Fetch a single NGO by ID
  const fetchNGOById = async (id: string): Promise<NGO | null> => {
    const { data, error } = await supabase
      .from('ngos')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      console.error(`Error fetching NGO with ID ${id}:`, error);
      throw error;
    }
    
    // Transform data to match the NGO type
    return data ? {
      ...data,
      impact_metrics: data.impact_metrics as unknown as Record<string, any>
    } as NGO : null;
  };

  // Create a new NGO
  const createNGO = async (ngoData: Omit<NGO, 'id' | 'created_at' | 'updated_at'>): Promise<NGO> => {
    const { data, error } = await supabase
      .from('ngos')
      .insert([ngoData])
      .select()
      .single();
    
    if (error) {
      toast({
        title: 'Error',
        description: `Failed to create NGO: ${error.message}`,
        variant: 'destructive',
      });
      throw error;
    }
    
    toast({
      title: 'Success',
      description: 'NGO created successfully',
    });
    
    // Transform data to match the NGO type
    return {
      ...data,
      impact_metrics: data.impact_metrics as unknown as Record<string, any>
    } as NGO;
  };

  // Update an existing NGO
  const updateNGO = async ({ id, ...ngoData }: { id: string } & Partial<Omit<NGO, 'id' | 'created_at' | 'updated_at'>>): Promise<NGO> => {
    const { data, error } = await supabase
      .from('ngos')
      .update(ngoData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating NGO with ID ${id}:`, error);
      toast({
        title: 'Error',
        description: `Failed to update NGO: ${error.message}`,
        variant: 'destructive',
      });
      throw error;
    }
    
    toast({
      title: 'Success',
      description: 'NGO updated successfully',
    });
    
    // Transform data to match the NGO type
    return {
      ...data,
      impact_metrics: data.impact_metrics as unknown as Record<string, any>
    } as NGO;
  };

  return {
    useGetAllNGOs: () => useQuery({
      queryKey: ['ngos'],
      queryFn: fetchNGOs,
    }),
    
    useGetNGOById: (id: string) => useQuery({
      queryKey: ['ngos', id],
      queryFn: () => fetchNGOById(id),
      enabled: !!id,
    }),
    
    useCreateNGO: () => {
      const queryClient = useQueryClient();
      
      return useMutation({
        mutationFn: createNGO,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['ngos'] });
        },
      });
    },
    
    useUpdateNGO: () => {
      const queryClient = useQueryClient();
      
      return useMutation({
        mutationFn: updateNGO,
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['ngos'] });
          queryClient.invalidateQueries({ queryKey: ['ngos', data.id] });
        },
      });
    },
  };
};
