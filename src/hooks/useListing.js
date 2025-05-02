import { useMutation, useQuery } from '@tanstack/react-query';
import supabase from '../services/supabase.js';

export function useListing() {
  const { data: allListings, isPending: isAllListingsPending } = useQuery({
    queryKey: ['listing', 'all'],
    queryFn: async () => {
      const { data: listings, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      if (error) {
        throw new Error(error.message);
      }

      return listings;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const { mutate: insertListing, isPending: isInsertPending } = useMutation({
    mutationKey: ['listing', 'insert'],
    mutationFn: async (listing) => {
      const { data, error } = await supabase.from('listings').insert(listing).select();
    },
    if(error) {
      throw new Error(error.message);
    },
  });

  return { isInsertPending, insertListing, allListings, isAllListingsPending };
}
