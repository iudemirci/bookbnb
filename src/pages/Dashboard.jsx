import HeaderGeneral from '../components/header/HeaderGeneral.jsx';
import BookBnbHomeModal from '../components/modals/BookBnbHome/BookBnbHomeModal.jsx';
import { Button, Drawer, Layout, Menu } from 'antd';
import MainContainer from '../components/MainContainer.jsx';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import OverviewContent from '../components/dashboard/overview/OverviewContent.jsx';
import useLogout from '../hooks/auth/useLogout.js';
import MobileSearchModal from '../components/modals/MobileSearchModal.jsx';
import useBreakpoint from '../hooks/useBreakpoint.js';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLanguageAndCurrencyOpen, setIsSidebarOpen } from '../store/modalSlice.js';
import ListingsContent from '../components/dashboard/listings/ListingsContent.jsx';

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
  const isSideBarOpen = useSelector((state) => state.modal.isSidebarOpen);
  const dispatch = useDispatch();
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const { t } = useTranslation();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  const { isMdUp } = useBreakpoint();

  const menuItems = useMemo(() => {
    return [
      {
        label: 'Dashboard',
        key: 'dashboard',
        icon: <Icon icon='material-symbols:dashboard-outline' width={20} />,
      },

      {
        label: t('dashboard:listings'),
        key: 'listings',
        icon: <Icon icon='uil:home' width={20} />,
      },
      {
        label: t('dashboard:reservations'),
        key: 'reservations',
        icon: <Icon icon='uil:calendar' width={20} />,
      },
      {
        label: t('dashboard:users'),
        key: 'users',
        icon: <Icon icon='uil:user' width={20} />,
      },
      {
        label: t('dashboard:reports'),
        key: 'reports',
        icon: <Icon icon='uil:ticket' width={20} />,
      },
    ];
  }, [t]);

  const menuItemsDrawer = useMemo(() => {
    return [
      {
        label: 'Dashboard',
        key: 'dashboard',
        icon: <Icon icon='material-symbols:dashboard-outline' width={20} />,
      },
      {
        label: t('dashboard:listings'),
        key: 'listings',
        icon: <Icon icon='uil:home' width={20} />,
      },
      {
        label: t('dashboard:reservations'),
        key: 'reservations',
        icon: <Icon icon='uil:calendar' width={20} />,
      },
      {
        label: t('dashboard:users'),
        key: 'users',
        icon: <Icon icon='uil:user' width={20} />,
      },
      {
        label: t('dashboard:reports'),
        key: 'reports',
        icon: <Icon icon='uil:ticket' width={20} />,
      },
      {
        type: 'divider',
      },
      {
        label: t('explore'),
        key: 'explore',
        icon: <Icon icon='uil:search-alt' width={20} />,
      },
      {
        label: t('dashboard:language'),
        key: 'languageAndCurrency',
        icon: <Icon icon='uil:globe' width={20} />,
      },
      {
        label: t('logout'),
        key: 'logout',
        icon: <Icon icon='uil:signout' width={20} />,
        disabled: isLogoutPending,
      },
    ];
  }, [t, isLogoutPending]);

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

  return (
    <MainContainer>
      <BookBnbHomeModal />
      <MobileSearchModal />
      <Layout style={{ minHeight: '100vh', width: '100%' }}>
        <HeaderGeneral />

        <Layout hasSider>
          {isMdUp ? (
            <SideBar
              collapsed={isSideBarOpen}
              setCollapsed={() => dispatch(setIsSidebarOpen(false))}
              menuItems={menuItems}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
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
