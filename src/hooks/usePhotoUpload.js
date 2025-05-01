import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from '../services/supabase.js';
import { message } from 'antd';

const BUCKET_NAME = 'photos';

export const usePhotoUpload = () => {
  const queryClient = useQueryClient();

  // Fetch existing photos from Supabase
  const {
    data: photos = [],
    isLoading: isLoadingPhotos,
    isError: isErrorPhotos,
    error: photosError,
  } = useQuery({
    queryKey: ['photos'],
    queryFn: async () => {
      const { data, error } = await supabase.storage.from(BUCKET_NAME).list();

      if (error) {
        throw new Error(error.message);
      }

      // Filter only image files and get public URLs
      const imageFiles = data.filter((file) => file.name.match(/\.(jpeg|jpg|png|gif|webp)$/i));

      // Get public URLs for each file
      return Promise.all(
        imageFiles.map(async (file) => {
          const {
            data: { publicUrl },
          } = supabase.storage.from(BUCKET_NAME).getPublicUrl(file.name);

          return {
            ...file,
            url: publicUrl,
          };
        }),
      );
    },
  });

  // Upload photo mutation
  const { mutate: uploadPhoto, isPending: isUploading } = useMutation({
    mutationFn: async (file) => {
      // Generate a unique filename to prevent conflicts
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Get public URL for the uploaded file
      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

      return {
        name: file.name,
        path: filePath,
        url: publicUrl,
        uid: file.uid || Date.now().toString(),
      };
    },
    onSuccess: (newPhoto) => {
      // Invalidate and refetch photos query to update the list
      queryClient.invalidateQueries({ queryKey: ['photos'] });
      message.success(`${newPhoto.name} uploaded successfully`);
    },
    onError: (error, file) => {
      message.error(`Failed to upload ${file.name}: ${error.message}`);
    },
  });

  // Delete photo mutation
  const { mutate: deletePhoto, isPending: isDeleting } = useMutation({
    mutationFn: async (file) => {
      const { error } = await supabase.storage.from(BUCKET_NAME).remove([file.path]);

      if (error) {
        throw new Error(error.message);
      }

      return file;
    },
    onSuccess: (deletedFile) => {
      // Invalidate and refetch photos query to update the list
      queryClient.invalidateQueries({ queryKey: ['photos'] });
      message.success(`${deletedFile.name} deleted successfully`);
    },
    onError: (error, file) => {
      message.error(`Failed to delete ${file.name}: ${error.message}`);
    },
  });

  // Function to handle file upload through Ant Design's Upload component
  const handleFileUpload = async (options) => {
    const { file, onSuccess, onError } = options;

    try {
      // Check if we've reached the maximum number of files
      if (photos.length >= 5) {
        message.error('Maximum of 5 files allowed. Please delete some files before uploading more.');
        onError(new Error('Maximum file count reached'));
        return;
      }

      // Call the upload mutation
      uploadPhoto(file);
      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return {
    photos,
    isLoadingPhotos,
    isErrorPhotos,
    photosError,
    uploadPhoto,
    deletePhoto,
    isUploading,
    isDeleting,
    handleFileUpload,
  };
};
