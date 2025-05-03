import { useMutation } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export function useInsertListing() {
  const { mutate: insertListing, isPending: isInsertPending } = useMutation({
    mutationKey: ['listing', 'insert'],
    mutationFn: async (listing) => {
      const { error } = await supabase.from('listings').insert(listing).select();
    },
    if(error) {
      throw new Error(error.message);
    },
  });

  return {
    isInsertPending,
    insertListing,
  };
}
