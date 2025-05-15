import { useQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export function useIsReported({ user_id, listing_id }) {
  const { data, isPending: isIsReportedPending } = useQuery({
    queryKey: ['report', user_id, listing_id],
    enabled: !!user_id && !!listing_id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('id')
        .eq('user_id', user_id)
        .eq('listing_id', listing_id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      return data;
    },
  });

  return {
    alreadyReported: !!data,
    isIsReportedPending,
  };
}
