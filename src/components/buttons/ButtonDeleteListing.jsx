import { Button, message, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useListingMutate } from '../../hooks/listings/useListingMutate.js';

function ButtonDeleteListing({ id }) {
  const { t } = useTranslation();
  const { deleteListing, isDeletePending } = useListingMutate();

  const handleConfirm = useCallback(() => {
    deleteListing(id, {
      onSuccess: () => {
        message.success(t('delete_success'));
      },
      onError: () => {
        message.error(t('delete_error'));
      },
    });
  }, [deleteListing, id]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Popconfirm
        title={t('delete_title')}
        cancelText={t('cancel')}
        okText={t('accept')}
        onCancel={(e) => e.preventDefault()}
        onConfirm={handleConfirm}
        okButtonProps={{ size: 'medium' }}
        cancelButtonProps={{ size: 'medium' }}
      >
        <Button
          type='primary'
          block
          className='!rounded-xl'
          onClick={(e) => e.preventDefault()}
          loading={isDeletePending}
          disabled={isDeletePending}
          danger
        >
          {t('delete_listing')}
        </Button>
      </Popconfirm>
    </div>
  );
}

export default ButtonDeleteListing;
