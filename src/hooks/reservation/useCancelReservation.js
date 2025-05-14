import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export function useCancelReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cancelReservation'],
    mutationFn: async (reservationId) => {
      console.log('🚀 ~ mutationFn ~ reservationId: ', reservationId);
      const { error: deleteError } = await supabase.from('reservations').delete().eq('id', reservationId);

      if (deleteError) throw deleteError;
    },
    onSuccess: () => queryClient.invalidateQueries(['reservations']),
  });
}
