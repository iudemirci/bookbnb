import clsx from 'clsx';
import Container from '../Container.jsx';
import { Menu } from 'antd';

import useHasScrolled from '../../hooks/useHasScrolled.js';

function FixedDetailsHeader() {
  const hasScrolled = useHasScrolled(500);

  const tabs = [
    {
      label: 'Photos',
      key: 'photos',
    },
    {
      label: 'Beds',
      key: 'beds',
    },
    {
      label: 'Amenities',
      key: 'amenities',
    },

    {
      label: 'Location',
      key: 'location',
    },
  ];

  return (
    <div
      className={clsx(
        'bg-bg-primary border-border-grey fixed top-0 z-20 hidden h-[80px] w-full justify-center border-b md:flex',
        hasScrolled ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <Container className='flex h-full w-[1280px] items-center'>
        <Menu
          items={tabs}
          mode={'horizontal'}
          selectable={false}
          className='!-ml-4'
          onClick={(info) => {
            const el = document.getElementById(info.key);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      </Container>
    </div>
  );
}

export default FixedDetailsHeader;
