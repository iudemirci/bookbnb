import clsx from 'clsx';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setIsMobileSearchOpen } from '../../store/modalSlice.js';

function MobileSearchPlaceholder({ className }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setIsMobileSearchOpen());
  }

  return (
    <div
      className={clsx(
        'shadow-search border-border-grey my-3 flex h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-full border duration-300 md:hidden',
        className,
      )}
      onClick={handleClick}
    >
      <Icon icon='mdi:magnify' width='18' height='18' className='mt-0.5' />
      <span className='font-primary text-center font-medium text-black'>{t('search_placeholder')}</span>
    </div>
  );
}

export default MobileSearchPlaceholder;
