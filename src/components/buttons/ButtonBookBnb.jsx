import { Button } from 'antd';
import { setIsBookBnbOpen, setIsLoginOpen } from '../../store/modalSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function ButtonBookBnb() {
  const session = useSelector((state) => state.auth.session);

  const dispatch = useDispatch();
  const { t } = useTranslation('bookbnb');

  function handleClick() {
    if (!session) {
      dispatch(setIsLoginOpen());
    } else {
      dispatch(setIsBookBnbOpen());
    }
  }

  return (
    <Button type='text' onClick={handleClick}>
      {t('your_home')}
    </Button>
  );
}

export default ButtonBookBnb;
