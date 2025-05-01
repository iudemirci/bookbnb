import { Flex, Spin, Typography, Upload } from 'antd';
import { Icon } from '@iconify/react';
import { usePhotoUpload } from '../../../hooks/usePhotoUpload.js';
import { useState } from 'react';
const { Dragger } = Upload;

function StepPhoto({ form }) {
  const [fileList, setFileList] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  console.log('🚀 ~ StepPhoto ~ fileList: ', fileList);
  const {
    photos,
    isLoadingPhotos,
    isErrorPhotos,
    uploadPhoto,
    deletePhoto,
    isUploading,
    isDeleting,
    handleFileUpload,
  } = usePhotoUpload();

  const uploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    accept: 'image/*',
    maxCount: 5,
    fileList: fileList,
    customRequest: handleFileUpload,
    onChange(info) {
      // Enforce the maxCount limit by keeping only the first 5 files
      const newFileList = [...info.fileList];
      const limitedFileList = newFileList.slice(-5); // Keep only the last 5 files

      // Update fileList state with the limited list
      setFileList(limitedFileList);

      // Show warning if user tried to upload more than 5 files
      if (newFileList.length > 5) {
        message.warning('Only 5 images can be uploaded at once.');
      }
    },
    onRemove: async (file) => {
      try {
        // First check if this file has been uploaded to Supabase
        // It could either have path and url directly, or we need to find it in uploadedFiles
        let fileToDelete = file;

        // If the file doesn't have a path property (needed for deletion), try to find it in our tracking array
        if (!file.path) {
          const trackedFile = uploadedFiles.find((f) => f.uid === file.uid);
          if (trackedFile) {
            fileToDelete = trackedFile;
          } else {
            // If we can't find a path, it means the file wasn't actually uploaded to Supabase
            // Just remove it from local state
            setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
            return true;
          }
        }

        // Now we have the file with the path, delete it from Supabase
        await deletePhoto(fileToDelete);

        // Update our tracking array
        setUploadedFiles((prev) => prev.filter((f) => f.uid !== file.uid));

        return true; // Allow removal from UI
      } catch (error) {
        message.error(`Error removing file: ${error.message}`);
        return false; // Prevent removal from UI on error
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
    },
  };

  return (
    <div>
      <Dragger {...uploadProps} disabled={isUploading || isDeleting}>
        <Flex justify='center' align='center' vertical={true}>
          <Icon icon='material-symbols:file-upload' width={50} />
          <Typography.Text>Click or drag to upload photos up to 5</Typography.Text>
        </Flex>
      </Dragger>
    </div>
  );
}

export default StepPhoto;
