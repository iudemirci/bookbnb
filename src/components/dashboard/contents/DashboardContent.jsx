import { Col, Flex, Row, Spin } from 'antd';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useAdmin } from '../../../hooks/dashboard/useAdmin.js';
import CountriesChart from '../charts/ CountriesChart.jsx';
import ActiveReservationsChart from '../charts/ActiveReservationsChart.jsx';
import AveragePriceChart from '../charts/AveragePriceChart.jsx';
import CategoriesPieChart from '../charts/CategoriesPieChart.jsx';
import ListingsLastWeekChart from '../charts/ListingsLastWeekChart.jsx';
import ReservationAverageDurationChart from '../charts/ReservationAverageDurationChart.jsx';
import ReservationsLastWeekChart from '../charts/ReservationsLastweekChart.jsx';
import RevenueThisMonthChart from '../charts/RevenueThisMonthChart.jsx';
import SignupLastMonthChart from '../charts/SignupLastMonthChart.jsx';
import TotalListingsChart from '../charts/TotalListingsChart.jsx';
import TotalUsersChart from '../charts/TotalUsersChart.jsx';

dayjs.extend(isSameOrAfter);

function DashboardContent() {
  const { listings, users, reservations, isUsersPending, isListingsPending, isReservationsPending } = useAdmin();

  if (isUsersPending || isListingsPending || isReservationsPending)
    return (
      <Flex align='center' justify='center' className='size-full'>
        <Spin className='' size='large' />
      </Flex>
    );

  return (
    <>
      <Row gutter={[20, 20]} className='w-full'>
        <Col xs={24} md={12} lg={6} xxl={4} className='!min-h-80'>
          <TotalListingsChart listings={listings} />
        </Col>
        <Col xs={24} md={12} lg={6} xxl={4} className='!min-h-80'>
          <ActiveReservationsChart reservations={reservations} />
        </Col>
        <Col xs={24} lg={12} xxl={8}>
          <ListingsLastWeekChart listings={listings} />
        </Col>
        <Col xs={24} lg={16} xxl={8}>
          <CategoriesPieChart listings={listings} />
        </Col>
        <Col xs={24} md={24} lg={8} xxl={6} className='!min-h-80'>
          <RevenueThisMonthChart reservations={reservations} />
        </Col>
        <Col xs={24} lg={12} xxl={10}>
          <ReservationsLastWeekChart reservations={reservations} />
        </Col>
        <Col xs={24} lg={12} xxl={8}>
          <CountriesChart listings={listings} />
        </Col>
        <Col xs={24} lg={14} xxl={10}>
          <SignupLastMonthChart users={users} />
        </Col>
        <Col xs={24} lg={10} xxl={6} className='!min-h-80'>
          <AveragePriceChart listings={listings} />
        </Col>
        <Col xs={24} md={12} lg={12} xxl={4} className='!min-h-80'>
          <TotalUsersChart users={users} />
        </Col>
        <Col xs={24} md={12} lg={12} xxl={4} className='!min-h-80'>
          <ReservationAverageDurationChart reservations={reservations} />
        </Col>
      </Row>
    </>
  );
}

export default DashboardContent;
