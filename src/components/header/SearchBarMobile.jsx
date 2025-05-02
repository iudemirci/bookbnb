import clsx from 'clsx';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

function SearchBarMobile() {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        'shadow-search border-border-grey my-3 flex h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-full border duration-300 md:hidden',
      )}
    >
      <Icon icon='mdi:magnify' width='18' height='18' className='mt-0.5' />
      <span className='font-primary text-center font-medium text-black'>{t('search_placeholder')}</span>
    </div>
  );
}

export default SearchBarMobile;
