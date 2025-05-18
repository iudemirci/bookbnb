import { useMutation } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export function useAdminActions(tableName) {
  // delete rows
  const { mutate: deleteRow, isPending: isDeletePending } = useMutation({
    mutationKey: ['adminActions', 'delete'],
    mutationFn: async (ids) => {
      const { error } = await supabase.from(tableName).delete().in('id', ids);

      if (error) {
        throw new Error(error.message);
      }

      return { deleteRow, isDeletePending };
    },
  });

  // edit rows
  const { mutate: editRow, isPending: isEditPending } = useMutation({
    mutationKey: ['adminActions', 'edit'],
    mutationFn: async (updates) => {
      const { error } = await supabase.from(tableName).update(updates).eq('id', updates.id);

      if (error) {
        throw new Error(error.message);
      }

      return { editRow, isEditPending };
    },
  });

  return { deleteRow, editRow, isDeletePending, isEditPending };
}
