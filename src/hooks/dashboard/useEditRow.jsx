import { message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setEditingKey } from '../../store/dashboardSlice';
import { useTranslation } from 'react-i18next';
import { useAdminActions } from './useAdminActions';

export function useEditRow(tableName, form) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { editRow, isEditPending } = useAdminActions(tableName);
  const { t } = useTranslation();

  const handleEdit = useCallback(
    async (key) => {
      try {
        const row = await form.validateFields();

        editRow(
          {
            id: key,
            ...row,
          },
          {
            onSuccess: () => {
              message.success(t('dashboard:edit_success'));
              queryClient.invalidateQueries(['admin', tableName]);
              dispatch(setEditingKey(''));
            },
            onError: () => {
              message.error(t('dashboard:edit_error'));
            },
          },
        );
      } catch (error) {
        message.error(t('dashboard:form_fill_required'));
      }
    },
    [form, editRow, queryClient, t, dispatch, tableName],
  );

  return { handleEdit, isEditPending };
}
