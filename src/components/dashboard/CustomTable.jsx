import { Icon } from '@iconify/react';
import { Button, Flex, Form, Input, InputNumber, Popconfirm, Select, Table, Typography } from 'antd';
import clsx from 'clsx';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setEditingKey, setSelectedKeys } from '../../store/dashboardSlice.js';

function EditableCell({ editing, dataIndex, inputType, children, ...restProps }) {
  let inputNode;

  switch (inputType) {
    case 'number':
      inputNode = <InputNumber />;
      break;
    case 'select':
      inputNode = (
        <Select>
          <Select.Option value='user'>user</Select.Option>
          <Select.Option value='admin'>admin</Select.Option>
        </Select>
      );
      break;
    default:
      inputNode = <Input />;
  }

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

function CustomTable({
  form,
  dataSource,
  columns,
  isPending,
  handleDelete,
  handleEdit,
  isEditPending,
  editAllowed = false,
  expandable = false,
  currentUserId,
  isUsersTable = false,
  ...restProps
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation('dashboard');

  const selectedKeys = useSelector((state) => state.dashboard.selectedKeys);
  const editingKey = useSelector((state) => state.dashboard.editingKey);

  const edit = useCallback(
    (record) => {
      form.setFieldsValue({
        ...record,
      });
      dispatch(setEditingKey(record.key));
    },
    [form, dispatch],
  );

  const cancel = useCallback(() => {
    dispatch(setEditingKey(''));
  }, [dispatch]);

  const shouldDisableActions = useCallback(
    (record) => {
      const isSuperAdmin = String(record?.role) === 'superadmin';
      const isSelf = String(record?.user_id) === String(currentUserId);

      let disableActions = false;

      if (isUsersTable) {
        disableActions = isSelf || isSuperAdmin;
      } else {
        disableActions = false;
      }

      return disableActions;
    },
    [isUsersTable, currentUserId],
  );

  const rowSelection = useMemo(
    () => ({
      selectedKeys,
      onChange: (newSelectedRowKeys) => {
        dispatch(setSelectedKeys(newSelectedRowKeys));
      },
      getCheckboxProps: (record) => {
        const shouldDisable = shouldDisableActions(record);

        return {
          disabled: shouldDisable,
        };
      },
    }),
    [dispatch, selectedKeys, shouldDisableActions],
  );

  const isEditing = useCallback((record) => record.key === editingKey, [editingKey]);
  const actionColumn = useMemo(() => {
    const commonBtnProps = {
      type: 'primary',
      size: 'small',
      className: '!h-[24px] !rounded-none',
      block: true,
    };
    const wrapperClass = 'overflow-hidden !rounded-md';

    return {
      title: t('dashboard:actions'),
      key: 'actions',
      width: 93,
      fixed: 'right',
      className: '!bg-bg-primary',
      render: (_, record) => {
        const editable = isEditing(record);
        const disableActions = shouldDisableActions(record);

        return editable ? (
          <Flex align='center' justify='center' className={wrapperClass}>
            <Button {...commonBtnProps} danger onClick={cancel}>
              <Icon icon='mdi:close' width={20} />
            </Button>
            <Button
              {...commonBtnProps}
              onClick={() => handleEdit(record.key)}
              disabled={isEditPending}
              color='green'
              variant='solid'
            >
              <Icon icon='mdi:check' width={20} />
            </Button>
          </Flex>
        ) : (
          <Flex align='center' justify='center' className={wrapperClass}>
            <Button
              {...commonBtnProps}
              disabled={!editAllowed || disableActions}
              onClick={() => edit(record)}
              color='green'
              variant='solid'
            >
              <Icon icon='mdi:edit' width={18} />
            </Button>
            <Popconfirm
              title={t('dashboard:popconfirm_delete_single')}
              onConfirm={() => handleDelete([record.key])}
              okText={t('dashboard:yes')}
              cancelText={t('dashboard:no')}
            >
              <Button disabled={disableActions} {...commonBtnProps} danger>
                <Icon icon='mdi:delete' width={18} />
              </Button>
            </Popconfirm>
          </Flex>
        );
      },
    };
  }, [t, isEditing, cancel, edit, handleDelete, handleEdit, isEditPending, editAllowed, shouldDisableActions]);

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
            inputType:
              typeof col.inputType === 'function'
                ? col.inputType(record)
                : (col.inputType ?? (typeof record[col.dataIndex] === 'number' ? 'number' : 'text')),
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
        {...restProps}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        size='middle'
        rowSelection={rowSelection}
        dataSource={dataSource}
        columns={mergedColumns}
        loading={isPending}
        className='size-full pr-4'
        bordered
        expandable={expandable}
        rowClassName={(record, idx) => (idx % 2 === 0 ? 'bg-bg-primary' : 'bg-zinc-100/40')}
        scroll={{ x: 'max-content' }}
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
                {t('delete_selected')}
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
