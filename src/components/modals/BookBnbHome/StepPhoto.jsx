import { Flex, Typography, Upload, message, Form } from 'antd';
import { Icon } from '@iconify/react';
import { usePhotoUpload } from '../../../hooks/usePhotoUpload.js';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { removeFile, setFileList } from '../../../store/bookbnbSlice.js';
import { useQueryClient } from '@tanstack/react-query';
const { Dragger } = Upload;

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_COUNT = 5;

function StepPhoto({ form }) {
  const queryClient = useQueryClient();
  const [fileList, setLocalFileList] = useState([]);
  const { t } = useTranslation('bookbnb');
  const dispatch = useDispatch();
  const storedFileList = useSelector((state) => state.bookbnb.fileList) || null;

  const { uploadPhoto, deletePhoto, isUploading, isDeleting } = usePhotoUpload();

  useEffect(() => {
    if (form && storedFileList && storedFileList.length > 0) {
      const photoPaths = storedFileList.map((file) => file.path);
      form.setFieldsValue({ photos: photoPaths });
      setLocalFileList(storedFileList);
    }
  }, [form, storedFileList]);

  const customRequest = useCallback(
    async (options) => {
      const { file, onError } = options;

      const currentPhotos = form.getFieldValue('photos') || [];

      if (currentPhotos.length >= MAX_FILE_COUNT) {
        onError(new Error(t('maximum_allowed')));
        return;
      }

      try {
        await new Promise((resolve, reject) => {
          uploadPhoto(file, {
            onSuccess: (result) => {
              setLocalFileList((prev) => [...prev, result]);
              form.setFieldsValue({ photos: [...currentPhotos, result.path] });

              dispatch(setFileList(result));

              resolve();
            },
            onError: (error) => reject(error),
          });
        });
      } catch (error) {
        console.error('Upload error:', error);
        onError(error);
      }
    },
    [uploadPhoto, form, t, dispatch],
  );

  const handleRemove = useCallback(
    async (file) => {
      try {
        if (!file.path) {
          message.error('Cannot delete file: Missing file path');
          return false;
        }

        await deletePhoto(file, {
          onSuccess: (deletedFile) => {
            queryClient.invalidateQueries({ queryKey: ['photos'] });
            message.success(`${deletedFile.name} deleted successfully`);
            return deletedFile.uid;
          },
          onError: (error, file) => {
            message.error(`Failed to delete ${file?.name || 'file'}: ${error.message}`);
          },
        });
        dispatch(removeFile(file));

        setLocalFileList((prev) => {
          const filtered = prev.filter((f) => f.uid !== file.uid);

          if (form) {
            form.setFieldsValue({ photos: filtered });
          }

          return filtered;
        });

        return true;
      } catch (error) {
        console.error('Delete error:', error);
        message.error(`Error removing file: ${error.message}`);
        return false;
      }
    },
    [deletePhoto, form, dispatch, queryClient],
  );

  const uploadProps = useMemo(
    () => ({
      name: 'file',
      multiple: true,
      listType: 'picture',
      accept: 'image/*',
      maxCount: MAX_FILE_COUNT,
      fileList: fileList,
      beforeUpload: (file) => {
        const isLtMaxSize = file.size / 1024 / 1024 < MAX_FILE_SIZE_MB;

        if (!isLtMaxSize) {
          message.error(t('file_too_large', { max: MAX_FILE_SIZE_MB }));
          return Upload.LIST_IGNORE;
        }

        if (fileList.length >= MAX_FILE_COUNT) {
          message.warning(t('maximum_allowed'));
          return Upload.LIST_IGNORE;
        }
        return true;
      },
      customRequest: customRequest,
      onRemove: handleRemove,
      progress: {
        strokeColor: {
          '0%': '#108ee9',
          '100%': '#87d068',
        },
        strokeWidth: 3,
      },
    }),
    [fileList, handleRemove, customRequest, t],
  );

  return (
    <div className='overflow-x-hidden pt-4'>
      <Dragger {...uploadProps} disabled={isUploading || isDeleting}>
        <Flex justify='center' align='center' vertical={true}>
          <Icon icon='material-symbols:file-upload' width={50} />
          <Typography.Text>{t('click_or_drag')}</Typography.Text>
          {isUploading && <Typography.Text>{t('uploading')}</Typography.Text>}
          {isDeleting && <Typography.Text type='danger'>{t('deleting')}</Typography.Text>}
        </Flex>
      </Dragger>
    </div>
  );
}

export default memo(StepPhoto);
