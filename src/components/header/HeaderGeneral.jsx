import Container from '../Container.jsx';
import { Button, Flex } from 'antd';
import Logo from '../Logo.jsx';
import ButtonBookBnb from '../buttons/ButtonBookBnb.jsx';
import ButtonLanguage from '../buttons/ButtonLanguage.jsx';
import HeaderAccount from './HeaderAccount.jsx';
import { Icon } from '@iconify/react';
import ButtonWishlist from '../buttons/ButtonLiked.jsx';
import { useTranslation } from 'react-i18next';
import SearchBar from './SearchBarPlaceholder.jsx';
import SearchBarExpanded from './SearchBarExpanded.jsx';
import { memo, useRef } from 'react';
import SearchBarMobile from './SearchBarMobile.jsx';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import ButtonDashboard from '../buttons/ButtonDashboard.jsx';
import ButtonDashboardDrawer from '../buttons/ButtonDashboardDrawer.jsx';

function HeaderGeneral() {
  const { t } = useTranslation('details');
  const containerRef = useRef(null);
  const { pathname } = useLocation();
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <header ref={containerRef} className='bg-bg-primary z-10 w-full'>
        <Container
          className={clsx(
            'mx-auto',
            pathname.startsWith('/listing') && '!max-w-[1280px]',
            pathname.startsWith('/dashboard') && '!px-2 md:!px-6',
          )}
        >
          <Flex align='center' justify='space-between' className='!flex h-[64px] md:!hidden'>
            {pathname.startsWith('/dashboard') ? (
              <ButtonDashboardDrawer />
            ) : (
              <Button type='text' href='/'>
                <Icon icon='mdi:chevron-left' width={20} />
                {t('homes')}
              </Button>
            )}
            <SearchBarMobile className='mx-2' />
            {pathname.startsWith('/listing') && <ButtonWishlist text={false} iconSize={20} />}
          </Flex>

          <Flex align='center' justify='between' className='!relative !hidden !min-h-[80px] w-full px-4 md:!flex'>
            {/*  Logo */}
            <div className='min-w-0 flex-1 shrink-0 basis-auto md:flex lg:basis-[140px]'>
              <Logo />
            </div>

            {/* Search small */}
            <div className='flex min-w-0 origin-center justify-center px-6'>
              <SearchBar />
            </div>

            {/* buttons */}
            <nav className='min-w-0 flex-1 shrink-0 basis-auto xl:basis-[140px]'>
              <Flex align='center' justify='end'>
                {user?.user_metadata?.role === 'admin' ? <ButtonDashboard /> : <ButtonBookBnb />}
                <ButtonLanguage text={false} />
                <HeaderAccount />
              </Flex>
            </nav>
          </Flex>
        </Container>
        <div className='hidden md:block'>
          <SearchBarExpanded containerRef={containerRef} />
        </div>
      </header>
    </>
  );
}

export default memo(HeaderGeneral);
