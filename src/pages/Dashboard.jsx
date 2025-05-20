import { Icon } from '@iconify/react';
import { Button, Drawer, Layout, Menu } from 'antd';
import { lazy, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeaderGeneral from '../components/header/HeaderGeneral.jsx';
import MainContainer from '../components/MainContainer.jsx';
import BookBnbHomeModal from '../components/modals/BookBnbHome/BookBnbHomeModal.jsx';
import MobileNavigationDrawer from '../components/modals/MobileSearchDrawer.jsx';
import DashboardContent from '../components/dashboard/contents/DashboardContent.jsx';
const ListingsContent = lazy(() => import('../components/dashboard/contents/ListingsContent.jsx'));
const ReportsContent = lazy(() => import('../components/dashboard/contents/ReportsContent.jsx'));
const ReservationsContent = lazy(() => import('../components/dashboard/contents/ReservationsContent.jsx'));
const UsersContent = lazy(() => import('../components/dashboard/contents/UsersContent.jsx'));

import useLogout from '../hooks/auth/useLogout.js';
import { useDashboardMenuItems } from '../hooks/dashboard/useDashboardMenuItems.jsx';
import { setMenuOpen, setSelectedKeys, setSidebarCollapsed } from '../store/dashboardSlice.js';
import { setIsLanguageAndCurrencyOpen } from '../store/modalSlice.js';
import useBreakpoint from '../hooks/useBreakpoint.js';
import { useAdmin } from '../hooks/dashboard/useAdmin.js';

const { Sider, Content } = Layout;

function SideBar({ collapsed, setCollapsed, menuItems, selectedKey, setSelectedKey }) {
  return (
    <Sider collapsible collapsed={collapsed} trigger={null} collapsedWidth={60} className='py-6 pl-4'>
      {/* Custom Collapse Button */}
      <Button
        type='primary'
        icon={<Icon icon={`uil:arrow-${collapsed ? 'right' : 'left'}`} width={20} />}
        onClick={() => setCollapsed(!collapsed)}
        block
        ghost
        className='!mt-2 !rounded-lg'
      />

      {/* Your menu */}
      <Menu
        items={menuItems}
        selectedKeys={[selectedKey]}
        onClick={({ key }) => setSelectedKey(key)}
        mode='inline'
        className='!mt-4 !border-none'
      />
    </Sider>
  );
}

function Dashboard() {
  const dispatch = useDispatch();
  const { isMenuOpen, isSidebarCollapsed } = useSelector((state) => state.dashboard);
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const { reports } = useAdmin();

  const { isMdUp } = useBreakpoint();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  const { menuItems, menuItemsDrawer } = useDashboardMenuItems(isLogoutPending, reports?.length);

  const renderContent = useCallback(() => {
    switch (selectedKey) {
      case 'dashboard':
        return <DashboardContent />;
      case 'listings':
        return <ListingsContent />;
      case 'reservations':
        return <ReservationsContent />;
      case 'users':
        return <UsersContent />;
      case 'reports':
        return <ReportsContent />;
      default:
        return null;
    }
  }, [selectedKey]);

  const handleKeyChange = useCallback(
    (key) => {
      setSelectedKey(key);
      dispatch(setSelectedKeys([]));
    },
    [dispatch],
  );

  return (
    <MainContainer>
      <BookBnbHomeModal />
      <MobileNavigationDrawer />
      <Layout style={{ minHeight: '100vh', width: '100%' }}>
        <HeaderGeneral />

        <Layout hasSider>
          {isMdUp ? (
            <SideBar
              collapsed={isSidebarCollapsed}
              setCollapsed={() => dispatch(setSidebarCollapsed())}
              menuItems={menuItems}
              selectedKey={selectedKey}
              setSelectedKey={handleKeyChange}
            />
          ) : (
            <Drawer
              open={isMenuOpen}
              onClose={() => dispatch(setMenuOpen())}
              placement='top'
              closeIcon={null}
              height={400}
            >
              <Menu
                items={menuItemsDrawer}
                selectedKeys={[selectedKey]}
                onClick={({ key }) => {
                  if (key === 'logout') {
                    logout();
                  } else if (key === 'explore') {
                    window.location.href = '/';
                  } else if (key === 'languageAndCurrency') {
                    dispatch(setIsLanguageAndCurrencyOpen('1'));
                  } else {
                    setSelectedKey(key);
                  }
                  dispatch(setMenuOpen());
                }}
                mode='inline'
                className='!mt-2 !border-none'
              />
            </Drawer>
          )}

          <Layout>
            <Content className='py-8 pr-2 pl-6'> {renderContent()}</Content>
          </Layout>
        </Layout>
      </Layout>
    </MainContainer>
  );
}

export default Dashboard;
