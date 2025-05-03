import Container from '../Container.jsx';
import { Button, Flex } from 'antd';
import Logo from '../Logo.jsx';
import CenteredSearchBar from './CenteredSearchBar.jsx';
import ButtonBookBnb from '../buttons/ButtonBookBnb.jsx';
import ButtonLanguage from '../buttons/ButtonLanguage.jsx';
import HeaderAccount from './HeaderAccount.jsx';
import { Icon } from '@iconify/react';

function HeaderGeneral() {
  return (
    <>
      <header className='bg-bg-primary z-20 w-full'>
        <Container>
          <Flex align='center' justify='space-between' className='!flex h-[64px] md:!hidden'>
            <Button type='text'>
              <Icon icon='mdi:chevron-left' width={20} />
              Homes
            </Button>
            <Button type='text'>
              <Icon icon='line-md:heart-twotone' width={20} />
            </Button>
          </Flex>

          <Flex align='center' justify='between' className='!relative !hidden !min-h-[80px] w-full px-4 md:!flex'>
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
      </header>
    </>
  );
}

export default HeaderGeneral;
