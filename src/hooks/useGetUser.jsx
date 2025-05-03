import { useQuery } from '@tanstack/react-query';
import supabase from '../services/supabase.js';

export function useGetUser(userId) {
  return useQuery({
    queryKey: ['username', userId],
    queryFn: async () => {
      if (!userId) throw new Error('No user ID provided');

      const { data, error } = await supabase.from('users').select('*').eq('user_id', userId).single();

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!userId,
  });
}
