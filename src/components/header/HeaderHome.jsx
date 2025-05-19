import { Flex } from 'antd';
import { memo, useRef } from 'react';
import Logo from '../Logo.jsx';

import useIsAdmin from '../../hooks/auth/useIsAdmin.js';
import ButtonBookBnb from '../buttons/ButtonBookBnb.jsx';
import ButtonDashboard from '../buttons/ButtonDashboard.jsx';
import ButtonLanguage from '../buttons/ButtonLanguage.jsx';
import ButtonResetFilters from '../buttons/ButtonResetFilters.jsx';
import Container from '../Container.jsx';
import HeaderAccount from './HeaderAccount.jsx';
import HeaderCarousel from './HeaderCarousel.jsx';
import HeaderPrices from './HeaderPrices.jsx';
import MobileSearchPlaceholder from './MobileSearchPlaceholder.jsx';
import SearchBarExpanded from './SearchExpanded.jsx';
import SearchBar from './SearchPlaceholder.jsx';

function HeaderHome() {
  const containerRef = useRef(null);
  const { isAdmin } = useIsAdmin();

  return (
    <>
      <header
        ref={containerRef}
        className='bg-bg-primary fixed z-20 w-full shadow-md shadow-gray-200/50 md:shadow-none'
      >
        <Container>
          <MobileSearchPlaceholder />

          <Flex align='center' justify='between' className='!relative !hidden !min-h-[80px] w-full px-4 md:!flex'>
            {/*  Logo */}
            <div className='min-w-0 flex-1 shrink-0 basis-auto md:flex lg:basis-[140px]'>
              <Logo />
            </div>

            {/* Search small */}
            <div className='flex min-w-0 flex-none shrink-1 basis-auto origin-center justify-center px-6'>
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

        <SearchBarExpanded containerRef={containerRef} />

        <div className='bg-bg-primary shadow-theme absolute top-0 !-z-10 w-full pt-[80px]'>
          <Container className='flex items-center justify-between'>
            <div className='min-w-0 flex-1 pr-4'>
              <HeaderCarousel />
            </div>

            <Flex className='!hidden flex-shrink-0 gap-2 md:!flex'>
              <ButtonResetFilters />
              <HeaderPrices />
            </Flex>
          </Container>
        </div>
      </header>

      {/* empty div for fixed nav */}
      <div className='pt-[157px]' />
    </>
  );
}

export default memo(HeaderHome);
