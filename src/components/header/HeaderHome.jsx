import HeaderCarousel from './HeaderCarousel.jsx';
import Container from '../Container.jsx';
import ButtonLanguage from '../buttons/ButtonLanguage.jsx';
import { Flex } from 'antd';
import Logo from '../Logo.jsx';
import HeaderAccount from './HeaderAccount.jsx';
import SearchBarMobile from './SearchBarMobile.jsx';
import ButtonFilters from '../buttons/ButtonFilters.jsx';
import HeaderPrices from './HeaderPrices.jsx';
import { memo } from 'react';
import CenteredSearchBar from './CenteredSearchBar.jsx';
import ButtonBookBnb from '../buttons/ButtonBookBnb.jsx';
import { useDispatch } from 'react-redux';
import SearchLocation from './SearchLocation.jsx';

function HeaderHome() {
  const dispatch = useDispatch();

  return (
    <>
      <header className='bg-bg-primary fixed z-20 w-full shadow-md shadow-gray-200/50 md:shadow-none'>
        <Container>
          <SearchBarMobile />

          <Flex align='center' justify='between' className='!relative !hidden !min-h-[80px] w-full px-4 md:!flex'>
            {/* Tabs */}
            {/*<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>*/}
            {/*  <HeaderTabs />*/}
            {/*</div>*/}

            {/*  Logo */}
            <div className='min-w-0 flex-1 shrink-0 basis-auto md:flex lg:basis-[140px]'>
              <Logo />
            </div>

            {/* Search small */}
            <div className='flex min-w-0 flex-none shrink-1 basis-auto origin-center justify-center px-6'>
              <CenteredSearchBar />
            </div>

            {/* buttons */}
            <nav className='min-w-0 flex-1 shrink-0 basis-auto xl:basis-[140px]'>
              <Flex align='center' justify='end'>
                <ButtonBookBnb />
                <ButtonLanguage text={false} />
                <HeaderAccount />
              </Flex>
            </nav>
          </Flex>
        </Container>
        {/*<SearchLocation />*/}

        {/*<HeaderSearchbarPlaceholder />*/}
        <div className='bg-bg-primary shadow-theme absolute top-0 !-z-10 w-full pt-[80px] shadow-md'>
          <Container className='flex items-center justify-between'>
            <div className='min-w-0 flex-1'>
              <HeaderCarousel />
            </div>

            <Flex className='!hidden flex-shrink-0 gap-2 md:!flex'>
              <ButtonFilters />
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
