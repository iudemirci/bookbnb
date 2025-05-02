import { Icon } from '@iconify/react';
import { Dropdown, Flex, Typography } from 'antd';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setIsBookBnbOpen, setIsLoginOpen, setIsSignupOpen } from '../../store/modalSlice.js';
import useLogout from '../../hooks/auth/useLogout.js';

function HeaderAccount() {
  const session = useSelector((state) => state.auth.session);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { mutate: logout } = useLogout();

  const handleBookbnb = useCallback(() => {
    if (session) return dispatch(setIsBookBnbOpen());
    else dispatch(setIsLoginOpen());
  }, [dispatch]);

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
        key: 'logout',
        label: <Typography.Text>{t('logout')}</Typography.Text>,
        onClick: () => logout(),
      },
    ];
  }, [t, dispatch, session, logout]);

  return (
    <>
      <Dropdown
        menu={{ items: menuItems }}
        trigger={['click']}
        placement='bottomRight'
        getPopupContainer={() => document.getElementById('test')}
      >
        <Flex
          id='test'
          align='center'
          justify='center'
          gap={6}
          className='!ml-2 cursor-pointer rounded-full border border-gray-300/70 !px-3 !py-2 duration-300 hover:shadow-md'
        >
          <Icon icon='material-symbols:menu-rounded' width={20} />
          <Icon icon='mdi:account-circle' width={32} className='text-text-secondary' />
        </Flex>
      </Dropdown>
    </>
  );
}

export default HeaderAccount;
