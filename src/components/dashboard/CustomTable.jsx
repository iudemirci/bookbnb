import { Button, Flex, Form, Input, InputNumber, message, Popconfirm, Table, Typography } from 'antd';
import { memo, useCallback, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedKeys } from '../../store/dashboardSlice.js';
import clsx from 'clsx';
import { useAdminActions } from '../../hooks/dashboard/useAdminActions.jsx';
import { useQueryClient } from '@tanstack/react-query';

function EditableCell({ editing, dataIndex, inputType, children, ...restProps }) {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: '',
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}

function CustomTable({ dataSource, columns, isPending }) {
  const selectedKeys = useSelector((state) => state.dashboard.selectedKeys);
  const dispatch = useDispatch();
  const { t } = useTranslation('dashboard');

  const queryClient = useQueryClient();
  const { editListing, isEditPending, deleteListings, isListingsDeleting } = useAdminActions();

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  // delete function
  const handleDelete = useCallback(
    (id) => {
      deleteListings([id], {
        onSuccess: () => {
          message.success(t('delete_success'));
          queryClient.invalidateQueries(['admin', 'listings']);
          dispatch(setSelectedKeys([]));
        },
        onError: () => {
          message.error(t('delete_error'));
        },
      });
    },
    [deleteListings, queryClient, t, dispatch],
  );

  const handleEdit = useCallback(
    (record) => {
      form.setFieldsValue({
        ...record,
      });
      setEditingKey(record.key);
    },
    [form],
  );

  const cancel = useCallback(() => {
    setEditingKey('');
  }, []);

  // edit function
  const save = useCallback(
    async (key) => {
      try {
        const row = await form.validateFields();
        const newData = [...dataSource];
        const index = newData.findIndex((item) => key === item.key);

        if (index > -1) {
          const item = newData[index];
          const { key: _key, username: _username, ...cleanItem } = { ...item, ...row };

          editListing(cleanItem, {
            onSuccess: () => {
              message.success(t('edit_success'));
              queryClient.invalidateQueries(['admin', 'listings']);
              setEditingKey('');
            },
            onError: () => {
              message.error(t('edit_error'));
            },
          });
        }
      } catch (error) {
        if (error) {
          message.error(t('form_fill_required'));
        } else {
          message.error(t('edit_error'));
        }
      }
    },
    [form, dataSource, queryClient, editListing, t],
  );

  const rowSelection = useMemo(
    () => ({
      selectedKeys,
      onChange: (newSelectedRowKeys) => {
        dispatch(setSelectedKeys(newSelectedRowKeys));
      },
    }),
    [dispatch, selectedKeys],
  );

  const isEditing = useCallback((record) => record.key === editingKey, [editingKey]);
  const actionColumn = useMemo(
    () => ({
      title: t('dashboard:actions'),
      key: 'actions',
      width: 93,
      fixed: 'right',
      className: '!bg-bg-primary',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Flex align='center' justify='center' className='overflow-hidden !rounded-md'>
            <Button type='primary' size='small' className='!h-[24px] !rounded-none' danger block onClick={cancel}>
              <Icon icon='mdi:close' width={20} />
            </Button>
            <Button
              type='primary'
              size='small'
              className='!h-[24px] !rounded-none !bg-green-500'
              block
              onClick={() => save(record.key)}
              disabled={isEditPending}
            >
              <Icon icon='mdi:check' width={20} />
            </Button>
          </Flex>
        ) : (
          <Flex align='center' justify='center' className='overflow-hidden !rounded-md'>
            <Button
              type='primary'
              size='small'
              className='!h-[24px] !rounded-none !bg-green-500'
              block
              onClick={() => handleEdit(record)}
            >
              <Icon icon='mdi:edit' width={18} />
            </Button>
            <Popconfirm
              title={t('dashboard:popconfirm_delete_single')}
              onConfirm={() => handleDelete([record.key])}
              okText={t('dashboard:yes')}
              cancelText={t('dashboard:no')}
            >
              <Button type='primary' size='small' className='!h-[24px] !rounded-none' danger block>
                <Icon icon='mdi:delete' width={18} />
              </Button>
            </Popconfirm>
          </Flex>
        );
      },
    }),
    [t, isEditing, save, cancel, handleEdit, handleDelete, isEditPending],
  );

  const mergedColumns = useMemo(
    () =>
      [...columns, actionColumn].map((col) => {
        if (!col.editable) {
          return col;
        }

        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType: typeof record[col.dataIndex] === 'number' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      }),
    [isEditing, columns, actionColumn],
  );

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        rowSelection={rowSelection}
        dataSource={dataSource}
        columns={mergedColumns}
        loading={isPending}
        className='size-full'
        bordered
        rowClassName={(record, idx) => (idx % 2 === 0 ? 'bg-bg-primary' : 'bg-zinc-100/40')}
        scroll={{ x: 100 }}
        footer={() => (
          <div className='align-center flex justify-between'>
            <Popconfirm
              title={t('dashboard:popconfirm_delete_multiple')}
              onConfirm={() => handleDelete(selectedKeys)}
              okText={t('dashboard:yes')}
              cancelText={t('dashboard:no')}
              className={clsx(
                'duration-200',
                selectedKeys?.length > 0 ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
              )}
            >
              <Button icon={<Icon icon='proicons:cancel' width={13} />} danger type='primary'>
                Delete Selected Listings
              </Button>
            </Popconfirm>

            <Typography.Text className='ml-auto self-center'>
              {dataSource?.length > 1
                ? t('total_rows', { count: dataSource?.length })
                : t('total_row', { count: dataSource?.length })}
            </Typography.Text>
          </div>
        )}
      />
    </Form>
  );
}

export default memo(CustomTable);
