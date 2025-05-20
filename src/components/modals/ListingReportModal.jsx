import { Button, Checkbox, Flex, Form, Input, message, Modal, Space, Typography } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useReportListing } from '../../hooks/report/useReportListing.js';
import { setIsReportOpen } from '../../store/modalSlice.js';

const initialValues = {
  inappropriate: false,
  price: false,
  location: false,
  text: '',
};

function ListingReportModal() {
  const { id } = useParams();
  const { t } = useTranslation('details');
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isReportOpen);

  const { mutate: reportListing, isPending: isReportPending } = useReportListing();

  const checkboxes = useMemo(() => {
    return [
      {
        name: 'inappropriate',
        title: t('report_inappropriate_title'),
        subtitle: t('report_inappropriate_subtitle'),
      },
      {
        name: 'price',
        title: t('report_price_title'),
        subtitle: t('report_price_subtitle'),
      },
      {
        name: 'location',
        title: t('report_location_title'),
        subtitle: t('report_location_subtitle'),
      },
    ];
  }, [t]);

  function handleClose() {
    dispatch(setIsReportOpen(false));
  }

  function handleSubmit(values) {
    const { inappropriate, price, location, text } = values;
    const hasInput = inappropriate || price || location || text.trim();

    if (!hasInput) {
      return message.warning(t('report_warning'));
    } else {
      const finalValues = {
        ...values,
        listing_id: id,
      };

      reportListing(finalValues, {
        onSuccess: () => {
          message.success(t('report_success'));
          handleClose();
        },
        onError: () => {
          message.error(t('report_error'));
        },
      });
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      destroyOnClose
      width={650}
      getContainer={(trigger) => trigger?.parentNode || document.querySelector('header')}
    >
      <div className='p-2 md:p-6'>
        <Flex vertical gap={6}>
          <Typography.Title level={1}>{t('report_title')}</Typography.Title>
          <Typography.Text>{t('report_subtitle')}</Typography.Text>
        </Flex>

        <Form name='report' onFinish={handleSubmit} requiredMark={false} initialValues={initialValues}>
          <Space direction='vertical' size={28} className='w-full pt-7'>
            <Space direction='vertical' size={6}>
              {checkboxes.map(({ name, title, subtitle }) => (
                <Form.Item key={name} name={name} valuePropName='checked' className='!mb-0'>
                  <Checkbox>
                    <Flex vertical>
                      <Typography.Text>{title}</Typography.Text>
                      <Typography.Text className='!text-[14px] font-light'>{subtitle}</Typography.Text>
                    </Flex>
                  </Checkbox>
                </Form.Item>
              ))}
            </Space>

            <Form.Item name='text' className='!mb-0'>
              <Flex vertical gap={2}>
                <Typography.Text>{t('report_something_else')}</Typography.Text>
                <Input.TextArea
                  placeholder={t('report_let_us_know')}
                  variant='borderless'
                  className='!bg-bg-primary-hover/100 !h-30 w-full !resize-none !px-4 !py-2 !text-lg !text-black md:!w-[65%]'
                />
              </Flex>
            </Form.Item>

            <Button
              type='primary'
              size='large'
              className='!rounded-lg !px-12'
              htmlType='submit'
              disabled={isReportPending}
              loading={isReportPending}
            >
              {t('report')}
            </Button>
          </Space>
        </Form>
      </div>
    </Modal>
  );
}

export default ListingReportModal;
