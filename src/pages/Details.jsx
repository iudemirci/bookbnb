import { Avatar, Button, Divider, Flex, Skeleton, Space, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import HeaderGeneral from '../components/header/HeaderGeneral.jsx';
import SignupModal from '../components/modals/SignupModal.jsx';
import LoginModal from '../components/modals/LoginModal.jsx';
import BookBnbHomeModal from '../components/modals/BookBnbHome/BookBnbHomeModal.jsx';
import Footer from '../components/Footer.jsx';
import DetailsImageMobile from '../components/details/DetailsImageMobile.jsx';
import Container from '../components/Container.jsx';
import DetailsMap from '../components/details/DetailsMap.jsx';
import BedroomCard from '../components/cards/BedroomCard.jsx';
import FixedBarMobile from '../components/details/FixedBarMobile.jsx';
import DotDivider from '../components/DotDivider.jsx';
import PriceCard from '../components/cards/PriceCard.jsx';
import DetailsImageDesktop from '../components/details/DetailsImageDesktop.jsx';
import FixedDetailsHeader from '../components/details/FixedDetailsHeader.jsx';
import RangeAndGuestPicker from '../components/RangeAndGuestPicker.jsx';
import ButtonWishlist from '../components/buttons/ButtonLiked.jsx';

import { useGetUser } from '../hooks/useGetUser.js';
import { useListing } from '../hooks/listings/useListing.js';
import listingData from '../data/listingData.json';
import { getElapsedHostingTime } from '../utils/getElapsedHostingTime.js';
import { categories } from '../data/categories.js';
import ConfirmationModal from '../components/modals/ConfirmationModal.jsx';
import MobileSearchModal from '../components/modals/MobileSearchModal.jsx';
import ButtonEdit from '../components/buttons/ButtonEdit.jsx';

const { Title, Text, Paragraph } = Typography;
const { specs, amenities } = listingData;

function Details() {
  const { id } = useParams();
  const { listing, isListingPending } = useListing(id);
  const { data: user } = useGetUser(listing?.user_id);
  const { t: tabs } = useTranslation('tabs');
  const { t } = useTranslation('details');
  const { photos, title, description, location, rooms, bathrooms, guests, coords, price, category } = listing || [];
  const categoryIcon = categories.find((cat) => cat.key === category)?.icon;
  const { created_at, username } = user || {};
  const isOwnedByUser = listing?.user_id === user?.user_id;

  const details = [
    {
      label: t('guests'),
      value: guests,
    },
    {
      label: t('rooms'),
      value: rooms,
    },
    {
      label: t('bathrooms'),
      value: bathrooms,
    },
  ];

  return (
    <>
      <FixedDetailsHeader />
      <HeaderGeneral />
      <div className='relative mx-auto max-w-[1280px]'>
        <SignupModal />
        <LoginModal />
        <BookBnbHomeModal />
        <ConfirmationModal />
        <MobileSearchModal />

        <Container as='main' className='pb-6'>
          <Flex align='center' justify='space-between'>
            {isListingPending ? (
              <Space direction='vertical' className='!my-4'>
                <Skeleton.Input active size='small' style={{ width: '300px' }} />
                <Skeleton.Input active size='small' style={{ width: '200px' }} />
              </Space>
            ) : (
              <div>
                <Title level={1} className='!mt-4' underline={true}>
                  {title}
                </Title>
                <Title level={3} type='secondary' className='pt-2 pb-8'>
                  {location}
                </Title>
              </div>
            )}
            <Flex align='end' justify='start'>
              {isListingPending ? (
                <Skeleton.Button size='small' style={{ width: '80px' }} />
              ) : (
                <>
                  {isOwnedByUser && <ButtonEdit listing={listing} />}
                  <ButtonWishlist className='!hidden md:!flex' />
                </>
              )}
            </Flex>
          </Flex>
          <Flex vertical={true} align='start'>
            {/* Image masonary */}
            <div className='w-full'>
              <DetailsImageMobile photos={photos} isPending={isListingPending} />
              <DetailsImageDesktop id='photos' photos={photos} isPending={isListingPending} />
            </div>
            <Flex className='!w-full'>
              <Flex vertical={true} className='w-full md:w-[66.6%]'>
                {/* details */}
                <Flex align='center' className='!pt-8'>
                  {isListingPending
                    ? details.map((_, idx) => (
                        <Skeleton.Input key={idx} active size='small' style={{ marginRight: '5px' }} />
                      ))
                    : details.map(({ label, value }, idx) => (
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
                  {isListingPending ? (
                    <Skeleton.Avatar active size='large' />
                  ) : (
                    <Avatar
                      icon={<Icon icon='mdi:account' width={30} className='text-text-secondary/50' />}
                      size='large'
                    />
                  )}
                  <Flex vertical={true}>
                    {isListingPending ? (
                      <Space direction='vertical' size={4}>
                        {[...Array(2)].map((_, idx) => (
                          <Skeleton.Input key={idx} active style={{ width: '100px', height: '15px' }} />
                        ))}
                      </Space>
                    ) : (
                      <>
                        <Title level={3}>{t('hosted_by', { username })}</Title>
                        <Text type='secondary'>{getElapsedHostingTime(created_at)}</Text>
                      </>
                    )}
                  </Flex>
                </Flex>

                <Divider />

                {/* category */}
                <div className='px-2 py-6'>
                  <Flex gap={16} align='start'>
                    {isListingPending ? <Skeleton.Avatar shape='square' /> : <Icon icon={categoryIcon} width={30} />}
                    <Flex vertical={true} gap={4}>
                      {isListingPending ? (
                        <Space direction='vertical' size={4}>
                          {[...Array(2)].map((_, idx) => (
                            <Skeleton.Input key={idx} active style={{ width: '100px', height: '15px' }} />
                          ))}
                        </Space>
                      ) : (
                        <>
                          <Title level={3}>{tabs(category)}</Title>
                          <Text type='secondary'>{tabs(`${category}_text`)}</Text>
                        </>
                      )}
                    </Flex>
                  </Flex>
                </div>

                {/* description */}
                <Divider />
                <div className='w-full pt-6 pb-2'>
                  {isListingPending ? (
                    <Skeleton title={false} paragraph={{ rows: 2 }} active block={true} />
                  ) : (
                    <Paragraph>{description}</Paragraph>
                  )}
                </div>
                <Divider />

                {/* specs */}
                <Space className='w-full !py-7'>
                  <Flex vertical={true} gap={32} className='!pl-2'>
                    {specs.map(({ icon, title, description }) => (
                      <Flex key={title} gap={16} align='start'>
                        <Icon icon={icon} width={30} />
                        <Flex vertical={true}>
                          <Title level={3}>{t(title)}</Title>
                          <Text type='secondary'>{t(description)}</Text>
                        </Flex>
                      </Flex>
                    ))}
                  </Flex>
                </Space>
                <Divider />

                {/* beds */}
                <Flex id='beds' className='!py-5' vertical={true} gap={16}>
                  <Title level={1}>{t('where_sleep')}</Title>

                  <Flex gap={12}>
                    <BedroomCard title={t('beds')} bedCount={3} bedType='single' />
                    <BedroomCard title={t('beds')} bedCount={2} bedType='double' />
                  </Flex>
                </Flex>
                <Divider />

                {/* amenities */}
                <Space id='amenities' direction='vertical' className='!py-5'>
                  <Title level={1} className='!py-2'>
                    {t('offers')}
                  </Title>
                  <Space direction='vertical' className='w-full'>
                    {amenities.map(({ label, icon, available }) => (
                      <Flex key={label} align='center' gap={16}>
                        <Icon icon={icon} width={25} />
                        <Text className={!available && 'line-through'}>{t(label)}</Text>
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
                  {isListingPending ? (
                    <Skeleton.Input active className='!h-[291px] !w-full lg:px-4' />
                  ) : (
                    <PriceCard price={price} guests={guests} />
                  )}{' '}
                  <Button type='text' className='underline' icon={<Icon icon='mdi:flag-outline' width={20} />}>
                    {t('report_listing')}
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Divider />

          {/* map */}
          <Space id='location' direction='vertical' className='w-full !py-4'>
            <Title level={1} className='!py-2'>
              {t('where_be')}
            </Title>

            <div className='h-[470px] min-w-full overflow-hidden rounded-xl'>
              {isListingPending ? <Skeleton.Input active className='!size-full' /> : <DetailsMap coords={coords} />}
            </div>
          </Space>
          <Divider className='block md:!hidden' />

          {/* mobile rangePicker */}
          <Space direction='vertical' className='!flex w-full !py-5 md:!hidden'>
            <Title level={1} className='!py-2'>
              {t('select_checkout_date')}
            </Title>
            <RangeAndGuestPicker guests={guests} />
          </Space>
        </Container>

        {/* mobile price */}
        <FixedBarMobile price={price} />
      </div>
      <Footer className='!pb-[105px] md:!pb-8' />
    </>
  );
}

export default Details;
