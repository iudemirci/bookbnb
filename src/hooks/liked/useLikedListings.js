import { useInfiniteQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

const PAGE_SIZE = 20;

export function useLikedListings(listingIds = []) {
  const isEnabled = listingIds.length > 0;

  const {
    data: pages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['likedListings', listingIds],
    enabled: listingIds.length > 0,
    staleTime: 1000 * 60 * 5,
    queryFn: async ({ pageParam = 0 }) => {
      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const currentChunk = listingIds.slice(start, end);

      if (!currentChunk.length) return [];

      const { data, error } = await supabase
        .from('listings')
        .select('photos, category, price, location, id')
        .in('id', currentChunk);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.flat().length;
      return loadedCount >= listingIds.length ? undefined : allPages.length;
    },
  });

  const listings = pages?.pages.flat() || [];

  return {
    listings,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isEnabled && isPending,
  };
}
