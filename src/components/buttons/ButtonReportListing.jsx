import { Button } from 'antd';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoginOpen, setIsReportOpen } from '../../store/modalSlice.js';
import { useIsReported } from '../../hooks/report/useIsReported.js';
import { useParams } from 'react-router-dom';
import { memo } from 'react';

function ButtonReportListing() {
  const dispatch = useDispatch();
  const { user, session } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { t } = useTranslation();

  const { alreadyReported } = useIsReported({ user_id: user?.id, listing_id: id });

  function handleClick() {
    if (!session) {
      return dispatch(setIsLoginOpen());
    } else {
      dispatch(setIsReportOpen());
    }
  }

  return (
    <Button
      type='text'
      className='underline'
      icon={<Icon icon='mdi:flag-outline' width={20} />}
      onClick={handleClick}
      disabled={alreadyReported}
    >
      {t('details:report_listing')}
    </Button>
  );
}

export default memo(ButtonReportListing);
