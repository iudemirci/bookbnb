import { useQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export function useIsLiked(userId, listingId) {
  return useQuery({
    queryKey: ['isWishlisted', listingId, userId],
    queryFn: async () => {
      if (!userId) return false;

      let query = supabase.from('wishlists').select('id, listing_id').eq('user_id', userId);

      if (listingId) {
        query = query.eq('listing_id', listingId);
        const { data, error } = await query.maybeSingle();

        if (error && error.code !== 'PGRST116') {
          throw new Error(error.message);
        }

        return Boolean(data);
      } else {
        const { data, error } = await query;

        if (error) {
          throw new Error(error.message);
        }
        return data;
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
