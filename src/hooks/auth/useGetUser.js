import { useQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export function useGetUser(userId) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) throw new Error('No user ID provided');

      const { data, error } = await supabase.from('users').select('*').eq('user_id', userId).single();

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}
