import { Button, Divider, Flex, message, Modal, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setIsConfirmationOpen } from '../../store/modalSlice.js';
import dayjs from 'dayjs';
import { useReserve } from '../../hooks/reservation/useReserve.js';
import { useConvertCurrency } from '../../hooks/useConvertCurrency.js';
import { formatPrice } from '../../utils/bookingUtils.js';
import { setDateRange, setGuests } from '../../store/appSlice.js';
import { useTranslation } from 'react-i18next';
const { Text } = Typography;

function ConfirmationModal() {
  const { id: listing_id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const isOpen = useSelector((state) => state.modal.isConfirmationOpen);
  const currency = useSelector((state) => state.app.currency);
  const formData = useSelector((state) => state.app.finalForm);
  const dispatch = useDispatch();
  const { mutate: reserve, isPending: isReservePending } = useReserve();
  const { t } = useTranslation('details');

  const isPending = isReservePending;
  function handleClose() {
    if (isPending) return null;
    dispatch(setIsConfirmationOpen(false));
  }

  async function handleSubmit() {
    const finalFormData = {
      ...formData,
      listing_id,
      user_id: user.id,
    };
    console.log('🚀 ~ handleSubmit ~ finalFormData: ', finalFormData);
    await new Promise((resolve, reject) => {
      reserve(finalFormData, {
        onSuccess: () => {
          message.success(t('reservation_created'));
          dispatch(setDateRange(null));
          dispatch(setGuests(null));
          handleClose();
          resolve();
        },
        onError: (err) => {
          message.error(t('reservation_not_created'));
          reject(err);
        },
      });
    });
  }

  const content = [
    {
      title: t('date'),
      text: dayjs(formData?.date[0]).format('DD MMM') + ' - ' + dayjs(formData?.date[1]).format('DD MMM YYYY'),
    },
    {
      title: t('guests'),
      text: formData?.guests,
    },
    {
      title: t('price'),
      text: formatPrice(formData?.price, currency),
    },
  ];

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      width={350}
      footer={
        <Flex align='center' justify='center' gap={6} className='!w-full'>
          <Button type='default' size='large' className='w-full' onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button
            type='primary'
            size='large'
            className='w-full'
            onClick={handleSubmit}
            loading={isReservePending}
            disabled={isReservePending}
          >
            {t('confirm')}
          </Button>
        </Flex>
      }
    >
      <Space direction='vertical' size={4} className='w-full !py-4'>
        {content.map(({ title, text }, idx) => (
          <>
            <Flex key={title} vertical>
              <Text className='!text-md !font-extrabold uppercase'>{title}</Text>
              <Text>{text}</Text>
            </Flex>
            {idx !== content.length - 1 && <Divider />}
          </>
        ))}
      </Space>
    </Modal>
  );
}

export default ConfirmationModal;
