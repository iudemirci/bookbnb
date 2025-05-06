import { Icon } from '@iconify/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useScrollDirection } from '../../hooks/useScrollPosition.js';
import { useTranslation } from 'react-i18next';

function Navigation() {
  const { t } = useTranslation();
  const tabs = useMemo(() => {
    return [
      {
        label: t('explore'),
        icon: 'mdi:magnify',
      },
      {
        label: t('wishlists'),
        icon: 'mdi:heart-outline',
      },
      {
        label: t('login'),
        icon: 'mdi:user-outline',
      },
    ];
  }, [t]);

  const [selectedTab, setSelectedTab] = useState(tabs[0].label);

  const scrollDirection = useScrollDirection({ threshold: 60 });

  return (
    <nav
      className={clsx(
        'border-border-grey fixed bottom-0 z-10 w-full border-t-1 bg-white duration-300 md:hidden',
        scrollDirection === 'up' ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <ul className='!mb-0 flex size-full items-center justify-center gap-3 py-3'>
        {tabs.map(({ label, icon }) => (
          <li
            key={label}
            className={clsx(
              'flex cursor-pointer flex-col items-center justify-center px-6 duration-300',
              selectedTab === label ? 'text-primary' : 'text-gray-500',
            )}
            onClick={() => setSelectedTab(label)}
          >
            <Icon icon={icon} width={30} />
            <span className='text-xs'>{label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
