import { message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setSelectedKeys } from '../../store/dashboardSlice';
import { useTranslation } from 'react-i18next';
import { useAdminActions } from './useAdminActions.js';

export function useDeleteRow(tableName) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { deleteRow } = useAdminActions(tableName);
  const { t } = useTranslation();

  const handleDelete = useCallback(
    (ids) => {
      deleteRow(ids, {
        onSuccess: () => {
          message.success(t('dashboard:delete_success'));
          queryClient.invalidateQueries(['admin', tableName]);
          dispatch(setSelectedKeys([]));
        },
        onError: () => {
          message.error(t('dashboard:delete_error'));
        },
      });
    },
    [deleteRow, queryClient, t, dispatch, tableName],
  );

  return handleDelete;
}
