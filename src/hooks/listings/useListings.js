import { useInfiniteQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export function useListings() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const {
    data: pages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['listing', 'infinite', params],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * 20;
      const to = from + 19;

      let listingQuery = supabase.from('listings').select('*').order('created_at', { ascending: false });

      // applying filters conditionally
      if (params.query) {
        listingQuery = listingQuery.ilike('location', `%${params.query}%`);
      }

      if (params.guests) {
        listingQuery = listingQuery.gte('guests', params.guests);
      }

      if (params.category && params.category !== 'trending') {
        listingQuery = listingQuery.eq('category', params.category);
      }

      const { data: allFilteredListings, error } = await listingQuery;
      if (error) throw new Error(error.message);

      if (!params.from || !params.to) {
        return allFilteredListings.slice(from, to + 1);
      }

      // filtering dates
      const requestedFromDate = dayjs(params.from);
      const requestedToDate = dayjs(params.to);

      const { data: reservations, error: reservationError } = await supabase
        .from('reservations')
        .select('listing_id, date');

      if (reservationError) throw new Error(reservationError.message);

      const unavailableListingIds = new Set();

      reservations.forEach((reservation) => {
        if (reservation.date && Array.isArray(reservation.date) && reservation.date.length === 2) {
          const reservationStart = dayjs(reservation.date[0]);
          const reservationEnd = dayjs(reservation.date[1]);

          //check overlap
          const isOverlapping =
            requestedFromDate.isSameOrBefore(reservationEnd) && requestedToDate.isSameOrAfter(reservationStart);

          if (isOverlapping) {
            unavailableListingIds.add(reservation.listing_id);
          }
        }
      });

      // filter overlapping ones
      const availableListings = allFilteredListings.filter((listing) => !unavailableListingIds.has(listing.id));

      // paginate
      return availableListings.slice(from, to + 1);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 20 ? undefined : allPages.length;
    },
    staleTime: 10 * 60 * 1000,
    // gcTime: 5 * 60 * 1000,
    gcTime: 0,
  });

  const listings = pages?.pages.flatMap((page) => page) || [];

  return {
    listings,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  };
}
