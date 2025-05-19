import { Icon } from '@iconify/react';
import { Avatar, Badge, Dropdown, Flex, Typography } from 'antd';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useIsAdmin from '../../hooks/auth/useIsAdmin.js';
import useLogout from '../../hooks/auth/useLogout.js';
import { useAdmin } from '../../hooks/dashboard/useAdmin.js';
import { setIsBookBnbOpen, setIsLoginOpen, setIsSignupOpen } from '../../store/modalSlice.js';

function HeaderAccount() {
  const session = useSelector((state) => state.auth.session);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { mutate: logout } = useLogout();

  const { reports } = useAdmin();
  const { isAdmin } = useIsAdmin();

  const handleBookbnb = useCallback(() => {
    if (session) return dispatch(setIsBookBnbOpen());
    else dispatch(setIsLoginOpen());
  }, [dispatch, session]);

  const menuItems = useMemo(() => {
    return [
      isAdmin && {
        key: 'dashboard',
        label: (
          <Badge dot={isAdmin && reports?.length > 0} offset={[5, 0]}>
            <Link to='/dashboard'>
              Dashboard{' '}
              {reports?.length > 0 && <span>({t('dashboard:reportsWithCount', { count: reports?.length })})</span>}
            </Link>
          </Badge>
        ),
      },
      isAdmin && {
        type: 'divider',
      },
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
    ];
  }, [t, dispatch, session, logout, handleBookbnb, isAdmin, reports]);

  return (
    <>
      <Dropdown
        menu={{ items: menuItems }}
        trigger={['click']}
        placement='bottomRight'
        getPopupContainer={() => document.querySelector('header')}
      >
        <Flex
          id='test'
          align='center'
          justify='center'
          gap={6}
          className='!ml-2 cursor-pointer rounded-full border border-gray-300/70 !px-3 !py-2 duration-300 hover:shadow-md'
        >
          <Icon icon='material-symbols:menu-rounded' width={20} />
          <Badge dot={isAdmin && reports?.length > 0} offset={[-3, 3]}>
            <Avatar
              shape='circle'
              className='!size-8'
              icon={<Icon icon='mdi:account' width={20} className='text-gray-50' />}
            />
          </Badge>
        </Flex>
      </Dropdown>
    </>
  );
}

export default HeaderAccount;
