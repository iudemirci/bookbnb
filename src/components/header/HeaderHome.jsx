import { memo, useRef } from 'react';
import Logo from '../Logo.jsx';
import { Flex } from 'antd';

import Container from '../Container.jsx';
import HeaderAccount from './HeaderAccount.jsx';
import SearchBarMobile from './SearchBarMobile.jsx';
import HeaderPrices from './HeaderPrices.jsx';
import ButtonBookBnb from '../buttons/ButtonBookBnb.jsx';
import ButtonLanguage from '../buttons/ButtonLanguage.jsx';
import ButtonResetFilters from '../buttons/ButtonResetFilters.jsx';
import SearchBarExpanded from './SearchBarExpanded.jsx';
import HeaderCarousel from './HeaderCarousel.jsx';
import SearchBar from './SearchBarPlaceholder.jsx';
import ButtonDashboard from '../buttons/ButtonDashboard.jsx';
import { useSelector } from 'react-redux';

function HeaderHome() {
  const containerRef = useRef(null);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <header
        ref={containerRef}
        className='bg-bg-primary fixed z-20 w-full shadow-md shadow-gray-200/50 md:shadow-none'
      >
        <Container>
          <SearchBarMobile />

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
                {user?.user_metadata?.role === 'admin' ? <ButtonDashboard /> : <ButtonBookBnb />}
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
