import { Icon } from '@iconify/react';
import { Button, Flex } from 'antd';
import clsx from 'clsx';
import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import useIsAdmin from '../../hooks/auth/useIsAdmin.js';
import Container from '../Container.jsx';
import Logo from '../Logo.jsx';
import ButtonBookBnb from '../buttons/ButtonBookBnb.jsx';
import ButtonDashboard from '../buttons/ButtonDashboard.jsx';
import ButtonDashboardDrawer from '../buttons/ButtonDashboardDrawer.jsx';
import ButtonLanguage from '../buttons/ButtonLanguage.jsx';
import ButtonWishlist from '../buttons/ButtonLiked.jsx';
import HeaderAccount from './HeaderAccount.jsx';
import MobileSearchPlaceholder from './MobileSearchPlaceholder.jsx';
import SearchBarExpanded from './SearchExpanded.jsx';
import SearchBar from './SearchPlaceholder.jsx';

function HeaderGeneral() {
  const { t } = useTranslation('details');
  const containerRef = useRef(null);
  const { pathname } = useLocation();
  const isAdmin = useIsAdmin();

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
            <MobileSearchPlaceholder className='mx-2' />
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
                {isAdmin ? <ButtonDashboard /> : <ButtonBookBnb />}
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
