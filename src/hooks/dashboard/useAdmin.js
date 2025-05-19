import { useQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';
import dayjs from 'dayjs';

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
      const { data: users, error } = await supabase
        .from('users')
        .select('*, listings (id), reservations (id), reports(id)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return users?.map((user) => ({
        ...user,
        listings: user?.listings?.length || 0,
        reservations: user?.reservations?.length || 0,
        reports: user?.reports?.length || 0,
      }));
    },
    ...defaultQueryOptions,
  });

  const { data: reservations, isPending: isReservationsPending } = useQuery({
    queryKey: ['admin', 'reservations'],
    queryFn: async () => {
      const { data: reservations, error } = await supabase
        .from('reservations')
        .select(
          `
        *,
          users(username)
      `,
        )
        .order('created_at', { ascending: false });

      if (error) throw error;

      return reservations?.filter((reservation) => dayjs(reservation?.date?.[1]).isAfter(dayjs()));
    },
    ...defaultQueryOptions,
  });

  const { data: reports, isPending: isReportsPending } = useQuery({
    queryKey: ['admin', 'reports'],
    queryFn: async () => {
      const { data: reports, error } = await supabase
        .from('reports')
        .select(
          `
        *,
          users(username)
      `,
        )
        .order('created_at', { ascending: false });

      if (error) throw error;
      return reports;
    },
    ...defaultQueryOptions,
  });

  return {
    listings,
    isListingsPending,
    users,
    isUsersPending,
    reservations,
    isReservationsPending,
    reports,
    isReportsPending,
  };
}
