import { useQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export function useListing(id) {
  const { data: listing, isPending: isListingPending } = useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      const { data: listingData, error: listingError } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single();
      console.log('🚀 ~ queryFn ~ listingData: ', listingData);

      if (listingError) {
        throw new Error(listingError.message);
      }

      return listingData;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });

  return {
    listing,
    isListingPending,
  };
}
