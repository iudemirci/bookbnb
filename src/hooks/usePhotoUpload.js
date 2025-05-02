import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../services/supabase.js';
import { message } from 'antd';

const BUCKET_NAME = 'photos';

export const usePhotoUpload = () => {
  const queryClient = useQueryClient();

  // Upload mutation
  const { mutate: uploadPhoto, isPending: isUploading } = useMutation({
    mutationFn: async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (error) {
        throw new Error(error.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

      const completeFile = {
        name: file.name,
        path: fileName,
        url: publicUrl,
        uid: file.uid || Date.now().toString(),
        status: 'done',
        thumbUrl: publicUrl,
      };

      return completeFile;
    },
    onSuccess: (uploadedFile) => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
      message.success(`${uploadedFile.name} uploaded successfully`);
      return uploadedFile;
    },
    onError: (error, file) => {
      message.error(`Failed to upload ${file.name}: ${error.message}`);
    },
  });

  // Delete mutation
  const { mutate: deletePhoto, isPending: isDeleting } = useMutation({
    mutationFn: async (file) => {
      if (!file.path) {
        throw new Error('File path is missing, cannot delete from storage');
      }

      const { error } = await supabase.storage.from(BUCKET_NAME).remove([file.path]);

      if (error) {
        throw new Error(error.message);
      }

      return file;
    },
  });

  return {
    uploadPhoto,
    deletePhoto,
    isUploading,
    isDeleting,
  };
};
