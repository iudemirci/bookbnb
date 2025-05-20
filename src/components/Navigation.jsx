import { Icon } from '@iconify/react';
import { memo, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { useScrollDirection } from '../hooks/useScrollPosition.js';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Typography } from 'antd';
import { setIsBookBnbOpen, setIsLoginOpen, setIsSignupOpen } from '../store/modalSlice.js';
import useLogout from '../hooks/auth/useLogout.js';
import useIsAdmin from '../hooks/auth/useIsAdmin.js';

function Navigation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const session = useSelector((state) => state.auth.session);
  const isAdmin = useIsAdmin();

  const dispatch = useDispatch();
  const { mutate: logout } = useLogout();

  const handleBookbnb = useCallback(() => {
    if (session) return dispatch(setIsBookBnbOpen());
    else dispatch(setIsLoginOpen());
  }, [dispatch, session]);

  const tabs = useMemo(() => {
    return [
      {
        label: t('explore'),
        icon: 'mdi:magnify',
        onClick: () => navigate('/'),
      },
      isAdmin
        ? {
            label: 'Dashboard',
            icon: 'material-symbols:dashboard-outline',
            onClick: () => navigate('/dashboard'),
          }
        : {
            label: t('wishlists'),
            icon: 'mdi:heart-outline',
            onClick: () => navigate('/liked'),
          },
    ];
  }, [t, navigate, isAdmin]);

  const menuItems = useMemo(() => {
    return [
      !session && {
        key: 'signup',
        label: <Typography.Text className='!font-semibold'>{t('sign_up')}</Typography.Text>,
        onClick: () => {
          dispatch(setIsSignupOpen());
        },
      },
      !session && {
        key: 'login',
        label: <Typography.Text>{t('login')}</Typography.Text>,
        onClick: () => {
          dispatch(setIsLoginOpen());
        },
      },
      !session && {
        type: 'divider',
      },
      {
        key: 'host',
        label: <Typography.Text>{t('bookbnb_your_home')}</Typography.Text>,
        onClick: handleBookbnb,
      },
      session && {
        type: 'divider',
      },
      session && {
        key: 'my_homes',
        label: <Link to='/my_homes'>{t('my_homes')}</Link>,
      },
      session && {
        key: 'liked',
        label: <Link to='/liked'>{t('liked')}</Link>,
      },
      session && {
        key: 'trips',
        label: <Link to='/trips'>{t('trips')}</Link>,
      },
      session && {
        type: 'divider',
      },
      session && {
        key: 'logout',
        label: <Typography.Text>{t('logout')}</Typography.Text>,
        onClick: () => logout(),
      },
    ].filter(Boolean);
  }, [t, dispatch, session, logout, handleBookbnb]);

  const scrollDirection = useScrollDirection({ threshold: 60 });

  return (
    <>
      <nav
        className={clsx(
          'border-border-grey fixed bottom-0 z-10 w-full border-t-1 bg-white duration-300 md:hidden',
          scrollDirection === 'up' ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <ul className='!mb-0 flex size-full items-center justify-center gap-3 py-3'>
          {tabs.map(({ label, icon, onClick }, idx) => (
            <li
              key={label}
              className={clsx(
                'flex cursor-pointer flex-col items-center justify-center px-6 duration-300',
                idx === 0 ? 'text-primary' : 'text-gray-500',
              )}
              onClick={onClick}
            >
              <Icon icon={icon} width={30} />
              <span className='text-xs'>{label}</span>
            </li>
          ))}
          <Dropdown menu={{ items: menuItems }}>
            <li className='flex cursor-pointer flex-col items-center justify-center px-6 text-gray-500 duration-300'>
              <Icon icon={'mdi:user-outline'} width={30} />
              <span className='text-xs'>{session ? t('account') : t('login')}</span>
            </li>
          </Dropdown>
        </ul>
      </nav>
    </>
  );
}

export default memo(Navigation);
