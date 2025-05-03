import { useParams } from 'react-router-dom';
import MainContainer from '../components/MainContainer.jsx';
import HeaderGeneral from '../components/header/HeaderGeneral.jsx';
import SignupModal from '../components/modals/SignupModal.jsx';
import LoginModal from '../components/modals/LoginModal.jsx';
import BookBnbHomeModal from '../components/modals/BookBnbHome/BookBnbHomeModal.jsx';
import { useListing } from '../hooks/listings/useListing.js';
import Footer from '../components/Footer.jsx';
import DetailsImageMobile from '../components/details/DetailsImageMobile.jsx';
import { Avatar, Divider, Flex, Space, Typography } from 'antd';
const { Title, Text, Paragraph } = Typography;
import Container from '../components/Container.jsx';
import { Icon } from '@iconify/react';
import { useGetUser } from '../hooks/useGetUser.jsx';
import { getElapsedHostingTime } from '../utils/getElapsedHostingTime.js';

function Details() {
  const { id } = useParams();
  const { listing, isListingPending } = useListing(id);
  const { data: user, isPending: isUserNamePending } = useGetUser(listing?.user_id);
  console.log('🚀 ~ Details ~ listing: ', listing);
  const { photos, title, description, location, rooms, bathrooms, guests } = listing || [];
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
    <div className='mx-auto max-w-[1280px]'>
      <HeaderGeneral />
      <SignupModal />
      <LoginModal />
      <BookBnbHomeModal />

      <Container as='main' className='pb-6'>
        <Flex vertical={true} align='start'>
          <DetailsImageMobile photos={photos} isPending={isListingPending} className='!pb-6' />
          <Title level={1} className='mt-10 text-center' underline={true}>
            {title}
          </Title>
          <Title level={3} className='pt-4'>
            {location}
          </Title>

          <Flex align='center' gap={4} className='!pt-0.5'>
            {details.map(({ label, value }, idx) => (
              <div key={label}>
                <Text type='secondary'>
                  {value} {label}
                </Text>
                {details.length - 1 !== idx && <span className='text-black'>&middot;</span>}
              </div>
            ))}
          </Flex>

          <Flex className='!pt-5 !pb-7' gap={12}>
            <Avatar icon={<Icon icon='mdi:account' width={30} className='text-text-secondary/50' />} size='large' />
            <Flex vertical={true}>
              <Title level={3}>Hosted by {username}</Title>
              <Text type='secondary'>{getElapsedHostingTime(created_at)}</Text>
            </Flex>
          </Flex>
        </Flex>

        <Divider />
        <Space className='w-full !py-7'>
          <Flex vertical={true} gap={32}>
            <Flex gap={16} align='start'>
              <Icon icon='mdi:door' width={30} />
              <Flex vertical={true}>
                <Title level={3}>Self check-in</Title>
                <Text type='secondary'>You can check in with the building staff.</Text>
              </Flex>
            </Flex>
            <Flex gap={16} align='start'>
              <Icon icon='mdi:paw-outline' width={30} />
              <Flex vertical={true}>
                <Title level={3}>Furry friends welcome</Title>
                <Text type='secondary'>Bring your pets along for the stay.</Text>
              </Flex>
            </Flex>
          </Flex>
        </Space>

        <Divider />
        <div className='w-full py-10'>
          <Paragraph>{description}</Paragraph>
        </div>
        <Divider />

        <Flex className='!py-4' vertical={true} gap={16}>
          <Title level={1} className='!py-2'>
            Where you'll sleep
          </Title>

          <Flex gap={12}>
            <Flex className='border-border-grey flex-1 rounded-lg border !p-5' vertical={true} gap={16}>
              <Flex gap={6} align='center'>
                <Icon icon='material-symbols:bed-outline' width={25} />
                <Icon icon='material-symbols:bed-outline' width={25} />
              </Flex>
              <Flex vertical={true}>
                <Title level={4}>Bedroom 1</Title>
                <Text type='secondary'>2 single beds</Text>
              </Flex>
            </Flex>

            <Flex className='border-border-grey flex-1 rounded-lg border !p-5' vertical={true} gap={16}>
              <Flex gap={6} align='center'>
                <Icon icon='material-symbols:bed-outline' width={25} />
                <Icon icon='material-symbols:bed-outline' width={25} />
                <Icon icon='material-symbols:bed-outline' width={25} />
              </Flex>
              <Flex vertical={true}>
                <Title level={4}>Bedroom 2</Title>
                <Text type='secondary'>3 single beds</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Divider />

        <Space direction='vertical' className='!py-4'>
          <Title level={1} className='!py-2'>
            What this place offers
          </Title>
          <Space direction='vertical' className='w-full'>
            <Flex align='center' gap={16}>
              <Icon icon='mdi:wifi' width={25} />
              <Text>Free WiFi</Text>
            </Flex>
            <Flex align='center' gap={16}>
              <Icon icon='mdi:car' width={25} />
              <Text>Free parking on premises</Text>
            </Flex>
            <Flex align='center' gap={16}>
              <Icon icon='mdi:paw' width={25} />
              <Text>Pets allowed</Text>
            </Flex>
            <Flex align='center' gap={16}>
              <Icon icon='mdi:fireplace' width={25} />
              <Text>Indoor fireplace</Text>
            </Flex>
            <Flex align='center' gap={16}>
              <Icon icon='mdi:food' width={25} />
              <Text>Breakfast</Text>
            </Flex>
            <Flex align='center' gap={16}>
              <Icon icon='material-symbols-light:alarm-off' width={25} />
              <Text className='!line-through'>Carbon monoxide alarm</Text>
            </Flex>
            <Flex align='center' gap={16}>
              <Icon icon='mdi:alarm-off' width={25} />
              <Text className='!line-through'>Smoke alarm</Text>
            </Flex>
          </Space>
        </Space>
        <Divider />

        <Space direction='vertical' className='!py-4'>
          <Title level={1} className='!py-2'>
            Where you'll be
          </Title>
        </Space>
      </Container>

      <Footer />
    </div>
  );
}

export default Details;
