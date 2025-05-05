import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export function useReserve() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reserve'],
    mutationFn: async (formData) => {
      const { error: insertError } = await supabase.from('reservations').insert([formData]);

      if (insertError) throw insertError;
    },
    onSuccess: () => queryClient.invalidateQueries(['reservations']),
  });
}
