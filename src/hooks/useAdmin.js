import { useQuery } from '@tanstack/react-query';
import supabase from '../services/supabase.js';

export function useAdmin() {
  const { data: listings, isPending: isListingsPending } = useQuery({
    queryKey: ['admin', 'listings'],
    queryFn: async () => {
      const { data: listings, error } = await supabase.from('listings').select('*');

      if (error) throw error;
      return listings;
    },
  });

  const { data: users, isPending: isUsersPending } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      const { data: users, error } = await supabase.from('users').select('*');

      if (error) throw error;
      return users;
    },
  });

  const { data: reservations, isPending: isReservationsPending } = useQuery({
    queryKey: ['admin', 'reservations'],
    queryFn: async () => {
      const { data: reservations, error } = await supabase.from('reservations').select('*');

      if (error) throw error;
      return reservations;
    },
  });

  return { listings, isListingsPending, users, isUsersPending, reservations, isReservationsPending };
}
