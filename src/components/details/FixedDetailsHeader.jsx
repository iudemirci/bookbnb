import Container from '../Container.jsx';
import { Menu } from 'antd';

import useHasScrolled from '../../hooks/useHasScrolled.js';
import { useTranslation } from 'react-i18next';

function FixedDetailsHeader() {
  const hasScrolled = useHasScrolled(500);
  const { t } = useTranslation('details');

  const tabs = [
    {
      label: t('photos'),
      key: 'photos',
    },
    {
      label: t('beds'),
      key: 'beds',
    },
    {
      label: t('amenities_title'),
      key: 'amenities',
    },
    {
      label: t('location'),
      key: 'location',
    },
  ];

  return (
    hasScrolled && (
      <div className='bg-bg-primary border-border-grey pointer-events-none invisible fixed top-0 z-20 flex h-[80px] w-full justify-center border-b md:pointer-events-auto md:visible'>
        <Container className='flex h-full w-[1280px] items-center'>
          <Menu
            items={tabs}
            mode='horizontal'
            selectable={false}
            onClick={(info) => {
              const el = document.getElementById(info.key);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className='w-full !border-none'
          />
        </Container>
      </div>
    )
  );
}

export default FixedDetailsHeader;
