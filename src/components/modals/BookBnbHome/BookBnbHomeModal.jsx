import { Button, Divider, Flex, Form, message, Modal, Steps, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setIsBookBnbOpen } from '../../../store/modalSlice.js';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useRef, useState } from 'react';
import StepCategories from './StepCategories.jsx';
import StepLocation from './StepLocation.jsx';
import StepBasics from './StepBasics.jsx';
import StepPhoto from './StepPhoto.jsx';
import StepDescription from './StepDescription.jsx';
import StepPrice from './StepPrice.jsx';
import { useInsertListing } from '../../../hooks/listings/useInsertListing.js';
import { useConvertCurrency } from '../../../hooks/useConvertCurrency.js';
import { clearFiles, clearLatlng } from '../../../store/bookbnbSlice.js';
import { usePhotoUpload } from '../../../hooks/usePhotoUpload.js';
import { useReverseGeocode } from '../../../hooks/useReverseGeocode.js';

const initialValues = {
  category: '',
  location: null,
  guests: 1,
  rooms: 1,
  bathrooms: 1,
  photos: [],
  title: '',
  description: '',
  price: 1,
};

function BookBnbHomeModal() {
  const [step, setStep] = useState(0);
  const isModalOpen = useSelector((state) => state.modal.isBookBnbOpen);
  const photos = useSelector((state) => state.bookbnb.fileList);
  const dispatch = useDispatch();
  const { t } = useTranslation('bookbnb');
  const [form] = Form.useForm();
  const { insertListing, isInsertPending } = useInsertListing();
  const currentCurrency = useSelector((state) => state.app.currency);
  const { mutate: convertCurrency, isPending: isConvertingPending } = useConvertCurrency();
  const { deletePhoto, isDeleting } = usePhotoUpload();
  const submitRef = useRef(null);
  const { mutate: reverseGeocode, isPending: isReversePending } = useReverseGeocode();

  const hideModal = useCallback(() => {
    dispatch(setIsBookBnbOpen());
    dispatch(clearFiles());
    dispatch(clearLatlng());

    if (!submitRef.current) {
      photos.forEach((photo) => {
        deletePhoto(photo);
      });
    }

    form.resetFields();
    setStep(0);
    submitRef.current = null;
  }, [dispatch, form, photos, deletePhoto]);

  const onFinish = useCallback(async () => {
    const values = form.getFieldValue();
    const { price, location } = values;
    const { lat, lng } = location;

    const locationData = await new Promise((resolve, reject) => {
      reverseGeocode(
        { lat, lng },
        {
          onSuccess: (data) => resolve(data),
          onError: (error) => reject(error),
        },
      );
    });
    const { town, province, state, suburb, country } = locationData.address;
    const primary = town || province || state || suburb;
    const finalLocation = primary ? `${primary}, ${country}` : `${country}`;

    const convertedPrice = await new Promise((resolve, reject) => {
      convertCurrency(
        { amount: price, fromCurrency: currentCurrency, toCurrency: 'USD' },
        {
          onSuccess: (data) => resolve(data),
          onError: (error) => reject(error),
        },
      );
    });

    await new Promise((resolve, reject) => {
      insertListing(
        {
          ...values,
          price: convertedPrice,
          location: finalLocation,
          coords: location,
        },
        {
          onSuccess: () => {
            message.success(t('home_success'));
            submitRef.current = true;
            hideModal();
            resolve();
          },
          onError: (err) => {
            message.error(err.message);
            reject(err);
          },
        },
      );
    });
  }, [form, t, convertCurrency, currentCurrency, insertListing, hideModal, reverseGeocode]);

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
        title: t('category'),
        content: <StepCategories form={form} />,
      },
      {
        title: t('location'),
        content: <StepLocation form={form} />,
      },
      {
        title: t('basics'),
        content: <StepBasics form={form} />,
      },
      {
        title: t('photo'),

        content: (
          <Form.Item name='photos' rules={[{ required: true, message: t('enter_photo') }]}>
            <StepPhoto form={form} />
          </Form.Item>
        ),
      },
      {
        title: t('description'),
        content: <StepDescription />,
      },
      {
        title: t('price'),
        content: <StepPrice currency={currentCurrency} />,
      },
    ];
  }, [t, form, currentCurrency]);

  return (
    <Modal
      open={isModalOpen}
      onCancel={hideModal}
      onOk={onFinish}
      width={500}
      onFinish={onFinish}
      // destroyOnClose={true}
      styles={{
        body: {
          maxHeight: '50vh',
          overflowY: 'auto',
          overflowX: 'hidden',
        },
      }}
      title={
        <>
          <Typography.Title level={4} className='text-center'>
            {t('your_home')}
          </Typography.Title>
          <Steps
            current={step}
            size='small'
            type='inline'
            className='!mt-2 !w-full items-center justify-center'
            responsive={false}
          >
            {steps.map((item) => (
              <div key={item.title} title={item.title} />
            ))}
          </Steps>
        </>
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
            <Button
              size='large'
              type='primary'
              className='w-full'
              onClick={() => form.submit()}
              loading={isInsertPending || isConvertingPending || isDeleting || isReversePending}
              disabled={isInsertPending || isConvertingPending || isDeleting || isReversePending}
            >
              Submit
            </Button>
          )}
        </Flex>
      }
    >
      <Divider className='!mt-0' />
      <Form requiredMark={false} form={form} initialValues={initialValues} onFinish={onFinish}>
        {steps[step].content}
      </Form>
    </Modal>
  );
}

export default BookBnbHomeModal;
