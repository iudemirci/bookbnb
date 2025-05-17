import { Button } from 'antd';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setIsReportOpen } from '../../store/modalSlice.js';
import { useIsReported } from '../../hooks/report/useIsReported.js';
import { useParams } from 'react-router-dom';
import { memo } from 'react';

function ButtonReportListing() {
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { alreadyReported, isIsReportedPending } = useIsReported({ user_id: user?.id, listing_id: id });

  function handleClick() {
    dispatch(setIsReportOpen());
  }

  return (
    <Button
      type='text'
      className='underline'
      icon={<Icon icon='mdi:flag-outline' width={20} />}
      onClick={handleClick}
      loading={isIsReportedPending}
      disabled={alreadyReported}
    >
      {t('details:report_listing')}
    </Button>
  );
}

export default memo(ButtonReportListing);
