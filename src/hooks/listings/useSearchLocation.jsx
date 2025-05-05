import supabase from '../../services/supabase.js';
import { useQuery } from '@tanstack/react-query';

export function useSearchLocation(query, options) {
  return useQuery({
    queryKey: ['listings', `search_${query}`],
    queryFn: async () => {
      const { data, error } = await supabase.from('listings').select('*').ilike('location', `%${query}%`);

      if (error) throw error;
      return data;
    },
    enabled: options.enabled ?? !!query,
    ...options,
  });
}
