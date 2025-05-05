import { useQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export function useIsWishlisted(userId, listingId) {
  return useQuery({
    queryKey: ['isWishlisted', listingId],
    queryFn: async () => {
      if (!userId || !listingId) return false;

      const { data, error } = await supabase
        .from('wishlists')
        .select('id')
        .eq('user_id', userId)
        .eq('listing_id', listingId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw new Error(error.message);
      }

      return Boolean(data);
    },
    enabled: !!userId && !!listingId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
