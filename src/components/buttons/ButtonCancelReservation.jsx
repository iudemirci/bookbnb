import { Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCancelReservation } from '../../hooks/reservation/useCancelReservation.js';

function ButtonCancelReservation({ reservationId }) {
  const { t } = useTranslation();
  const { mutate: cancelReservation, isPending: isCancelPending } = useCancelReservation();

  function handleClick(e) {
    e.preventDefault();

    if (!reservationId) return null;
    cancelReservation(reservationId, {
      onSuccess: () => {
        message.success(t('cancel_success'));
      },
      onError: () => {
        message.error(t('cancel_error'));
      },
    });
  }

  return (
    <Button
      type='primary'
      block
      className='!rounded-xl'
      onClick={handleClick}
      loading={isCancelPending}
      disabled={isCancelPending}
      danger
    >
      {t('cancel_reservation')}
    </Button>
  );
}

export default ButtonCancelReservation;
