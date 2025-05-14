import { Button, Card, DatePicker, Drawer, Flex, Form, Input, Menu, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMobileSearchOpen } from '../../store/modalSlice.js';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Counter from '../Counter.jsx';
import { useCallback } from 'react';
import { lowerCase } from 'lodash';
import { createSearchParams } from '../../../.vite/deps/react-router-dom.js';
import ButtonResetFilters from '../buttons/ButtonResetFilters.jsx';

const today = dayjs();
const threeDaysLater = dayjs().add(3, 'day');

function MobileSearchModal() {
  const isOpen = useSelector((state) => state.modal.isMobileSearchOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  function hideModal() {
    dispatch(setIsMobileSearchOpen());
  }

  const items = [
    {
      key: '/',
      label: t('explore'),
    },
    {
      key: '/my_homes',
      label: t('my_homes'),
    },
  ];

  const onFinish = useCallback(
    (values) => {
      const { query, date, guests } = values;
      let newParams = {};

      if (date) {
        const formattedDateRange = date?.map((d) => d.format('YYYY-MM-DD'));
        const [fromDate, toDate] = formattedDateRange;
        newParams.from = fromDate;
        newParams.to = toDate;
      }

      if (guests) {
        newParams.guests = guests;
      }

      if (query) {
        newParams.query = lowerCase(query);
      }

      navigate({
        pathname: '/',
        search: `?${createSearchParams(newParams)}`,
      });

      hideModal();
    },
    [navigate, hideModal],
  );

  return (
    <Drawer
      open={isOpen}
      onClose={hideModal}
      size='large'
      placement='top'
      title={
        <Menu
          items={items}
          mode='horizontal'
          selectable={false}
          onClick={(e) => navigate(e.key)}
          className='w-full justify-center font-bold capitalize'
        />
      }
      className='!h-screen'
    >
      <Form form={form} className='flex size-full flex-col items-center justify-between' onFinish={onFinish}>
        <Card className='shadow-theme w-full'>
          <Space direction='vertical' size={16} className='w-full'>
            <Typography.Title level={1} className='!font-extrabold'>
              {t('where')}
            </Typography.Title>
            <Form.Item name='query'>
              <Input
                placeholder={t('search_destinations')}
                prefix={<Icon icon='mdi:magnify' width={20} />}
                size='large'
                className='hover:!border-primary focus:!border-primary h-14 !border-black font-bold'
              />
            </Form.Item>
          </Space>
        </Card>
        <Card className='shadow-theme w-full'>
          <Space direction='vertical' size={16} className='w-full'>
            <Typography.Title level={1} className='!font-extrabold'>
              {t('when')}
            </Typography.Title>
            <Form.Item name='date'>
              <DatePicker.RangePicker
                prefix={<Icon icon='mdi:calendar-outline' width={20} className='mr-1 ml-3' />}
                placeholder={[today.format('MMM DD'), threeDaysLater.format('MMM DD')]}
                size='large'
                placement='topRight'
                format='MMM DD'
                suffixIcon={null}
                className='h-14 w-full !p-0 !pr-8 !font-bold'
              />
            </Form.Item>
          </Space>
        </Card>
        <Card className='w-full'>
          <Space direction='vertical' size={16} className='w-full'>
            <Typography.Title level={1} className='!font-extrabold'>
              {t('who')}
            </Typography.Title>
            <Form.Item name='guests'>
              <Counter form={form} />
            </Form.Item>
          </Space>
        </Card>
        <Flex className='w-full' gap={12}>
          <ButtonResetFilters block />
          <Button htmlType='submit' type='primary' size='large' className='!mb-4' block>
            <Icon icon='mdi:magnify' width={20} />
            {t('search')}
          </Button>
        </Flex>
      </Form>
    </Drawer>
  );
}

export default MobileSearchModal;
