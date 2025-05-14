import { useAdmin } from '../../hooks/useAdmin.js';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { Col, Flex, Row, Spin } from 'antd';
import ListingsLastWeekChart from './ListingsLastWeekChart.jsx';
import TotalListingsChart from './TotalListingsChart.jsx';
import TotalUsersChart from './TotalUsersChart.jsx';
import ActiveReservationsChart from './ActiveReservationsChart.jsx';
import CategoriesPieChart from './CategoriesPieChart.jsx';
import AveragePriceChart from './AveragePriceChart.jsx';
import ReservationsLastWeekChart from './ReservationsLastweekChart.jsx';
import ReservationAverageDurationChart from './ReservationAverageDurationChart.jsx';
import CountriesChart from './ CountriesChart.jsx';
import RevenueThisMonthChart from './RevenueThisMonthChart.jsx';
import SignupLastMonthChart from './SignupLastMonthChart.jsx';

dayjs.extend(isSameOrAfter);

function DashboardOverview() {
  const { listings, users, reservations, isUsersPending, isListingsPending, isReservationsPending } = useAdmin();

  if (isUsersPending || isListingsPending || isReservationsPending)
    return (
      <Flex align='center' justify='center' className='size-full'>
        <Spin className='' size='large' />
      </Flex>
    );

  return (
    <div className='p-5 py-8'>
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
    </div>
  );
}

export default DashboardOverview;
