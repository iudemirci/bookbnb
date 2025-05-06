import { Button } from 'antd';
import { setIsBookBnbOpen, setIsLoginOpen } from '../../store/modalSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';

function ButtonBookBnb() {
  const session = useSelector((state) => state.auth.session);

  const dispatch = useDispatch();
  const { t } = useTranslation('bookbnb');

  const handleClick = useCallback(() => {
    if (!session) {
      dispatch(setIsLoginOpen());
    } else {
      dispatch(setIsBookBnbOpen());
    }
  }, [dispatch, session]);

  return (
    <Button type='text' onClick={handleClick}>
      {t('your_home')}
    </Button>
  );
}

export default memo(ButtonBookBnb);
