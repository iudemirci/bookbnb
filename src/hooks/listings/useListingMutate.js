import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export function useListingMutate() {
  const queryClient = useQueryClient();

  const { mutate: insertListing, isPending: isInsertPending } = useMutation({
    mutationKey: ['listing', 'insert'],
    mutationFn: async (listing) => {
      const { error } = await supabase.from('listings').insert(listing).select();
    },
    if(error) {
      throw new Error(error.message);
    },
  });

  const { mutate: deleteListing, isPending: isDeletePending } = useMutation({
    mutationKey: ['listing', 'delete'],
    mutationFn: async (listing_id) => {
      const { error } = await supabase.from('listings').delete().eq('id', listing_id).select();
    },
    if(error) {
      throw new Error(error.message);
    },

    onSuccess: () => queryClient.invalidateQueries(['userListings']),
  });

  return {
    isInsertPending,
    insertListing,
    isDeletePending,
    deleteListing,
  };
}
