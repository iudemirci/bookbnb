import HeaderGeneral from '../components/header/HeaderGeneral.jsx';
import BookBnbHomeModal from '../components/modals/BookBnbHome/BookBnbHomeModal.jsx';
import { Button, Drawer, Layout, Menu } from 'antd';
import MainContainer from '../components/MainContainer.jsx';
import { useCallback, useState } from 'react';
import { Icon } from '@iconify/react';
import OverviewContent from '../components/dashboard/overview/OverviewContent.jsx';
import useLogout from '../hooks/auth/useLogout.js';
import MobileNavigationDrawer from '../components/modals/MobileSearchDrawer.jsx';
import useBreakpoint from '../hooks/useBreakpoint.js';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLanguageAndCurrencyOpen, setIsSidebarOpen } from '../store/modalSlice.js';
import ListingsContent from '../components/dashboard/listings/ListingsContent.jsx';
import { useDashboardMenuItems } from '../hooks/dashboard/useDashboardMenuItems.jsx';
import { setSelectedKeys } from '../store/dashboardSlice.js';

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
  const isSideBarOpen = useSelector((state) => state.modal.isSidebarOpen);
  const [selectedKey, setSelectedKey] = useState('dashboard');

  const { isMdUp } = useBreakpoint();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  const { menuItems, menuItemsDrawer } = useDashboardMenuItems(isLogoutPending);

  const renderContent = useCallback(() => {
    switch (selectedKey) {
      case 'dashboard':
        return <OverviewContent />;
      case 'listings':
        return <ListingsContent />;
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
              collapsed={isSideBarOpen}
              setCollapsed={() => dispatch(setIsSidebarOpen(false))}
              menuItems={menuItems}
              selectedKey={selectedKey}
              setSelectedKey={handleKeyChange}
            />
          ) : (
            <Drawer
              open={isSideBarOpen}
              onClose={() => dispatch(setIsSidebarOpen(false))}
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
                  dispatch(setIsSidebarOpen(false));
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
