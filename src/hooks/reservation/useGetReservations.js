import { useQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export const useGetReservations = (listingId) => {
  return useQuery({
    queryKey: ['reservations', listingId],
    queryFn: async () => {
      if (!listingId) return [];

      const { data, error } = await supabase.from('reservations').select('date').eq('listing_id', listingId);

      if (error) throw new Error(error.message);

      return data.map((res) => res.date);
    },
    enabled: !!listingId,
  });
};
