import { useInfiniteQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase';

const PAGE_SIZE = 20;

export function useReservations(userId) {
  const {
    data: pages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['reservations', userId],
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,

    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      // reservations
      const { data: reservations, error: reservationError } = await supabase
        .from('reservations')
        .select('price, date, id, listing_id, currency')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (reservationError) {
        throw new Error(reservationError.message);
      }

      if (!reservations.length) return [];

      // matching listings
      const listingIds = reservations.map((r) => r.listing_id);

      const { data: listings, error: listingsError } = await supabase
        .from('listings')
        .select('id, location, photos')
        .in('id', listingIds);

      if (listingsError) {
        throw new Error(listingsError.message);
      }

      const listingMap = Object.fromEntries(listings.map((l) => [l.id, l]));

      const combined = reservations.map((r) => {
        const listing = listingMap[r.listing_id];
        const { id: _, ...restListing } = listing || {};
        return {
          ...r,
          ...restListing,
        };
      });

      return combined;
    },

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < PAGE_SIZE ? undefined : allPages.length;
    },
  });

  const reservations = pages?.pages.flat() || [];

  return {
    reservations,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  };
}
