import { Button } from 'antd';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { setIsBookBnbOpen } from '../../store/modalSlice.js';
import { setEdit } from '../../store/bookbnbSlice.js';
import { useTranslation } from 'react-i18next';

function ButtonEdit({ listing, className }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function handleClick() {
    dispatch(setIsBookBnbOpen());
    dispatch(setEdit(listing));
  }

  return (
    <Button type='text' className={clsx('flex items-center justify-center underline', className)} onClick={handleClick}>
      <Icon icon='uil:edit' width={16} />
      {t('edit')}
    </Button>
  );
}

export default ButtonEdit;
