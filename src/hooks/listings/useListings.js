import { useSelector } from 'react-redux';
import { useInfiniteQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export function useListings() {
  const selectedCategory = useSelector((state) => state.app.category);

  const {
    data: pages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['listing', 'infinite', selectedCategory],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * 20;
      const to = from + 19;
      let query = supabase.from('listings').select('*').order('created_at', { ascending: false });

      if (selectedCategory && selectedCategory !== 'trending') {
        query = query.eq('category', selectedCategory);
      }

      const { data: listings, error } = await query.range(from, to);

      if (error) {
        throw new Error(error.message);
      }

      return listings;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 20 ? undefined : allPages.length;
    },
    // staleTime: 10 * 60 * 1000,
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
