import { useMemo } from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

export function useDashboardMenuItems(isLogoutPending = false) {
  const { t } = useTranslation();
  return useMemo(() => {
    const baseItems = [
      { label: 'Dashboard', key: 'dashboard', icon: <Icon icon='material-symbols:dashboard-outline' width={20} /> },
      { label: t('dashboard:listings'), key: 'listings', icon: <Icon icon='uil:home' width={20} /> },
      { label: t('dashboard:reservations'), key: 'reservations', icon: <Icon icon='uil:calendar' width={20} /> },
      { label: t('dashboard:users'), key: 'users', icon: <Icon icon='uil:user' width={20} /> },
      { label: t('dashboard:reports'), key: 'reports', icon: <Icon icon='uil:ticket' width={20} /> },
    ];

    const drawerExtras = [
      { type: 'divider' },
      { label: t('explore'), key: 'explore', icon: <Icon icon='uil:search-alt' width={20} /> },
      { label: t('dashboard:language'), key: 'languageAndCurrency', icon: <Icon icon='uil:globe' width={20} /> },
      { label: t('logout'), key: 'logout', icon: <Icon icon='uil:signout' width={20} />, disabled: isLogoutPending },
    ];

    return {
      menuItems: baseItems,
      menuItemsDrawer: [...baseItems, ...drawerExtras],
    };
  }, [t, isLogoutPending]);
}
