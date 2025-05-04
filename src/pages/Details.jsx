import { Avatar, Button, Divider, Flex, Space, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';

import HeaderGeneral from '../components/header/HeaderGeneral.jsx';
import SignupModal from '../components/modals/SignupModal.jsx';
import LoginModal from '../components/modals/LoginModal.jsx';
import BookBnbHomeModal from '../components/modals/BookBnbHome/BookBnbHomeModal.jsx';
import Footer from '../components/Footer.jsx';
import DetailsImageMobile from '../components/details/DetailsImageMobile.jsx';
import Container from '../components/Container.jsx';
import DetailsMap from '../components/details/DetailsMap.jsx';
import BedroomCard from '../components/details/BedroomCard.jsx';
import FixedBarMobile from '../components/details/FixedBarMobile.jsx';

import { useGetUser } from '../hooks/useGetUser.jsx';
import { useListing } from '../hooks/listings/useListing.js';
import listingData from '../data/listingData.json';
import { getElapsedHostingTime } from '../utils/getElapsedHostingTime.js';
import { categories } from '../data/categories.js';
import { useTranslation } from 'react-i18next';
import BookbnbCalendar from '../components/details/BookbnbCalendar.jsx';
import DotDivider from '../components/DotDivider.jsx';
import PriceCard from '../components/details/PriceCard.jsx';
import DetailsImageDesktop from '../components/details/DetailsImageDesktop.jsx';
import FixedDetailsHeader from '../components/details/FixedDetailsHeader.jsx';

const { Title, Text, Paragraph } = Typography;
const { specs, amenities } = listingData;

function Details() {
  const { id } = useParams();
  const { listing, isListingPending } = useListing(id);
  const { data: user, isPending: isUserNamePending } = useGetUser(listing?.user_id);
  const { t: tabs } = useTranslation('tabs');
  const { photos, title, description, location, rooms, bathrooms, guests, coords, price, category } = listing || [];
  const categoryIcon = categories.find((cat) => cat.key === category)?.icon;
  const { created_at, username } = user || {};

  const details = [
    {
      label: 'Guests',
      value: guests,
    },
    {
      label: 'Rooms',
      value: rooms,
    },
    {
      label: 'Bathrooms',
      value: bathrooms,
    },
  ];

  return (
    <>
      <FixedDetailsHeader />
      <div className='relative mx-auto max-w-[1280px]'>
        <HeaderGeneral />
        <SignupModal />
        <LoginModal />
        <BookBnbHomeModal />

        <Container as='main' className='pb-6'>
          <Flex align='center' justify='space-between'>
            <div>
              <Title level={1} className='!mt-4' underline={true}>
                {title}
              </Title>
              <Title level={3} type='secondary' className='pt-2 pb-8'>
                {location}
              </Title>
            </div>
            <Button type='text' className='flex items-center underline'>
              <Icon icon='mdi:heart-outline' width={17} />
              Save
            </Button>
          </Flex>
          <Flex vertical={true} align='start'>
            {/* Image masonary */}
            <DetailsImageMobile photos={photos} isPending={isListingPending} />
            <DetailsImageDesktop id='photos' photos={photos} isPending={isListingPending} />

            <Flex className='!w-full'>
              <Flex vertical={true} className='w-full md:w-[66.6%]'>
                {/* details */}
                <Flex align='center' className='!pt-8'>
                  {details.map(({ label, value }, idx) => (
                    <div key={label}>
                      <Text type='secondary'>
                        {value} {label}
                      </Text>
                      {details.length - 1 !== idx && <DotDivider />}
                    </div>
                  ))}
                </Flex>

                {/* host */}
                <Flex className='!pt-5 !pb-7' gap={12}>
                  <Avatar
                    icon={<Icon icon='mdi:account' width={30} className='text-text-secondary/50' />}
                    size='large'
                  />
                  <Flex vertical={true}>
                    <Title level={3}>Hosted by {username}</Title>
                    <Text type='secondary'>{getElapsedHostingTime(created_at)}</Text>
                  </Flex>
                </Flex>

                <Divider />

                {/* category */}
                <div className='px-2 py-6'>
                  <Flex gap={16} align='start'>
                    <Icon icon={categoryIcon} width={30} />
                    <Flex vertical={true} gap={4}>
                      <Title level={3}>{tabs(category)}</Title>
                      <Text type='secondary'>{tabs(`${category}_text`)}</Text>
                    </Flex>
                  </Flex>
                </div>

                {/* description */}
                <Divider />
                <div className='w-full pt-6 pb-2'>
                  <Paragraph>{description}</Paragraph>
                </div>
                <Divider />

                {/* specs */}
                <Space className='w-full !py-7'>
                  <Flex vertical={true} gap={32} className='!pl-2'>
                    {specs.map(({ icon, title, description }) => (
                      <Flex key={title} gap={16} align='start'>
                        <Icon icon={icon} width={30} />
                        <Flex vertical={true}>
                          <Title level={3}>{title}</Title>
                          <Text type='secondary'>{description}</Text>
                        </Flex>
                      </Flex>
                    ))}
                  </Flex>
                </Space>
                <Divider />

                {/* beds */}
                <Flex id='beds' className='!py-5' vertical={true} gap={16}>
                  <Title level={1}>Where you'll sleep</Title>

                  <Flex gap={12}>
                    <BedroomCard title='Bedroom 1' bedCount={3} bedType='single' />
                    <BedroomCard title='Bedroom 2' bedCount={2} bedType='double' />
                  </Flex>
                </Flex>
                <Divider />

                {/* amenities */}
                <Space id='amenities' direction='vertical' className='!py-5'>
                  <Title level={1} className='!py-2'>
                    What this place offers
                  </Title>
                  <Space direction='vertical' className='w-full'>
                    {amenities.map(({ label, icon, available }) => (
                      <Flex key={label} align='center' gap={16}>
                        <Icon icon={icon} width={25} />
                        <Text className={!available && 'line-through'}>{label}</Text>
                      </Flex>
                    ))}
                  </Space>
                </Space>
              </Flex>

              {/* desktop calendar and price */}
              <Flex
                vertical={true}
                align='center'
                className='!ml-12 !hidden min-h-full w-[33.3%] !pt-8 md:!flex lg:!ml-28'
              >
                <Flex align='center' gap={8} vertical className='sticky top-28 mb-4 w-full'>
                  <PriceCard price={price} guests={guests} />
                  <Button type='text' className='underline' icon={<Icon icon='mdi:flag-outline' width={20} />}>
                    Report this listing
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Divider />

          {/* map */}
          <Space id='location' direction='vertical' className='w-full !py-4'>
            <Title level={1} className='!py-2'>
              Where you'll be
            </Title>

            <div className='-z-10 h-[470px] min-w-full overflow-hidden rounded-xl'>
              {!isListingPending && <DetailsMap coords={coords} />}
            </div>
          </Space>
          <Divider />

          {/* mobile calendar */}
          <Space direction='vertical' className='!flex w-full !py-5 md:!hidden'>
            <Title level={1} className='!py-2'>
              Select checkout date
            </Title>
            <Flex align='center'>
              <BookbnbCalendar />
            </Flex>
          </Space>
        </Container>

        {/* mobile price */}
        <FixedBarMobile price={price} />
      </div>
      <Footer className='!pb-[95px] md:!pb-0' />
    </>
  );
}

export default Details;
