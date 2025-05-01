import { Button, Divider, Flex, Form, Input, Modal, Steps, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setIsBookBnbOpen } from '../../../store/modalSlice.js';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';
import StepCategories from './StepCategories.jsx';
import StepLocation from './StepLocation.jsx';
import StepBasics from './StepBasics.jsx';
import StepPhoto from './StepPhoto.jsx';

const initialValues = {
  category: '',
  location: null,
  guests: 1,
  rooms: 1,
  bathrooms: 1,
  imageSrc: '',
  price: 1,
  title: '',
  description: '',
};

function BookBnbHomeModal() {
  const isModalOpen = useSelector((state) => state.modal.isBookBnbOpen);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [form] = Form.useForm();

  const onFinish = useCallback(() => {
    const values = form.getFieldValue();
    console.log('🚀 ~ BookBnbHomeModal ~ values: ', values);
  }, []);

  const hideModal = useCallback(() => {
    dispatch(setIsBookBnbOpen());
    form.resetFields();
    setStep(0);
  }, [dispatch, form]);

  const next = useCallback(() => {
    form
      .validateFields()
      .then(() => setStep((prev) => prev + 1))
      .catch(() => {});
  }, [form]);

  const prev = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const steps = useMemo(() => {
    return [
      {
        title: 'Category',
        content: (
          <Form.Item name='category' rules={[{ required: true, message: 'Please select a category' }]}>
            <StepCategories form={form} />
          </Form.Item>
        ),
      },
      {
        title: 'Location',
        content: (
          <Form.Item name='location' rules={[{ required: true, message: 'Please select a location' }]}>
            <StepLocation form={form} />
          </Form.Item>
        ),
      },

      {
        title: 'Basics',
        content: <StepBasics form={form} />,
      },
      {
        title: 'Photo',
        content: (
          <Form.Item name='photos' rules={[{ required: true, message: 'Please upload a photo' }]}>
            <StepPhoto form={form} />
          </Form.Item>
        ),
      },
      {
        title: 'Test',
      },
    ];
  }, []);

  return (
    <Modal
      open={isModalOpen}
      onCancel={hideModal}
      onOk={onFinish}
      width={500}
      onFinish={onFinish}
      destroyOnClose={true}
      styles={{
        body: {
          maxHeight: '55vh',
          overflowY: 'auto',
          overflowX: 'hidden',
        },
      }}
      title={
        <Typography.Title level={4} className='text-center'>
          {t('bookbnb_your_home')}
        </Typography.Title>
      }
      footer={
        <Flex gap={8}>
          {step > 0 && (
            <Button size='large' type='default' className='w-full !border-black' onClick={prev}>
              {t('previous')}
            </Button>
          )}
          {step < steps.length - 1 && (
            <Button size='large' type='primary' className='w-full' onClick={next}>
              {t('next')}
            </Button>
          )}
          {step === steps.length - 1 && (
            <Button size='large' type='primary' className='w-full' onClick={() => form.submit()}>
              Submit
            </Button>
          )}
        </Flex>
      }
    >
      <Divider className='!mt-4' />

      <Steps
        current={step}
        size='small'
        className='!my-6'
        // progressDot={true}
        responsive={false}
      >
        {steps.map((item) => (
          <div key={item.title} title={item.title} />
        ))}
      </Steps>

      <Form requiredMark={false} form={form} initialValues={initialValues} onFinish={onFinish}>
        {steps[step].content}
      </Form>
    </Modal>
  );
}

export default BookBnbHomeModal;
