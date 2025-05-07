import { useInfiniteQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase';

export function useUserListings(userId) {
  const {
    data: pages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['userListings', userId],
    enabled: !!userId,
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * 20;
      const to = from + 19;

      const { data, error } = await supabase
        .from('listings')
        .select('id, location, photos, price, category')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 20 ? undefined : allPages.length;
    },
    staleTime: 5 * 60 * 1000,
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
