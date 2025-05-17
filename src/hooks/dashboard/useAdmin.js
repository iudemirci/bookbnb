import { useQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

const defaultQueryOptions = {
  staleTime: 0,
  gcTime: 1000 * 60 * 30,
};

export function useAdmin() {
  const { data: listings, isPending: isListingsPending } = useQuery({
    queryKey: ['admin', 'listings'],
    queryFn: async () => {
      const { data: listings, error } = await supabase
        .from('listings')
        .select(
          `
        *,
          users(username)
      `,
        )
        .order('created_at', { ascending: false });

      if (error) throw error;
      return listings;
    },
    ...defaultQueryOptions,
  });

  const { data: users, isPending: isUsersPending } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      const { data: users, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });

      if (error) throw error;
      return users;
    },
    ...defaultQueryOptions,
  });

  const { data: reservations, isPending: isReservationsPending } = useQuery({
    queryKey: ['admin', 'reservations'],
    queryFn: async () => {
      const { data: reservations, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return reservations;
    },
    ...defaultQueryOptions,
  });

  return { listings, isListingsPending, users, isUsersPending, reservations, isReservationsPending };
}
