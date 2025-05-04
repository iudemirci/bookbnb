import ButtonLanguage from './buttons/ButtonLanguage.jsx';
import Container from './Container.jsx';
import { Flex, Button, Typography } from 'antd';
import ButtonCurrency from './buttons/ButtonCurrency.jsx';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import DotDivider from './DotDivider.jsx';
import clsx from 'clsx';
const { Text, Title } = Typography;

function Footer({ className, ...props }) {
  const { t } = useTranslation('footer');

  return (
    <footer className={clsx('bg-bg-secondary mt-auto w-full py-8 md:pt-12', className)} {...props}>
      <Container as='div' className='divide-border-grey flex flex-col divide-y'>
        <Title className='pb-2'>{t('footer_title')}</Title>

        <Flex className='flex-col items-start !pt-4 md:flex-row md:items-center md:justify-between'>
          <div className='-ml-[11px] flex items-center gap-2 md:order-2 md:mr-6 md:ml-auto'>
            <ButtonLanguage />
            <ButtonCurrency />
          </div>

          <div className='-ml-[10.5px] flex items-center md:order-3'>
            <Button type='text' href='https://github.com/iudemirci/'>
              <Icon icon='mdi:github' width={20} />
            </Button>
            <Button type='text' href='https://ihsanufukdemirci.netlify.app/'>
              <Icon icon='mdi:instagram' width={20} />
            </Button>
          </div>
          <div className='mt-1.5 flex flex-col md:order-1'>
            <Text className='!font-medium'>
              {t('footer_text_one')} <DotDivider /> {t('footer_text_two')}
            </Text>
          </div>
        </Flex>
      </Container>
    </footer>
  );
}

export default Footer;
