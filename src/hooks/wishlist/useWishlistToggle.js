import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export function useWishlistToggle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['wishlist', 'toggle'],
    mutationFn: async ({ userId, listingId }) => {
      const { data: existing, error: selectError } = await supabase
        .from('wishlists')
        .select('id')
        .eq('user_id', userId)
        .eq('listing_id', listingId)
        .maybeSingle();

      if (selectError) throw selectError;

      if (existing) {
        const { error: deleteError } = await supabase.from('wishlists').delete().eq('id', existing.id);

        if (deleteError) throw deleteError;
        return { status: 'removed' };
      } else {
        const { error: insertError } = await supabase
          .from('wishlists')
          .insert([{ user_id: userId, listing_id: listingId }]);
        if (insertError) throw insertError;
        return { status: 'added' };
      }
    },

    onSuccess: () => queryClient.invalidateQueries(['wishlist']),
  });
}
