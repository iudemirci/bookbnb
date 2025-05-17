import { useMutation } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';

export function useAdminActions() {
  // LISTINGS
  // Delete Listings
  const { mutate: deleteListings, isPending: isListingsDeleting } = useMutation({
    mutationKey: ['adminActions', 'deleteListings'],
    mutationFn: async (ids) => {
      const { error } = await supabase.from('listings').delete().in('id', ids);

      if (error) {
        throw new Error(error.message);
      }

      return { deleteListings, isListingsDeleting };
    },
  });

  // Edit Listings
  const { mutate: editListing, isPending: isEditPending } = useMutation({
    mutationKey: ['adminActions', 'editListing'],
    mutationFn: async (listing) => {
      const { error } = await supabase.from('listings').update(listing).eq('id', listing.id);

      if (error) {
        throw new Error(error.message);
      }

      return { editListing, isEditPending };
    },
  });

  return { deleteListings, isListingsDeleting, editListing, isEditPending };
}
