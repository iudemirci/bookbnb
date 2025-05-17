import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export function useReportListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reportListing'],
    mutationFn: async (values) => {
      const { error } = await supabase.from('reports').insert(values).select();

      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(['report']),
  });
}
