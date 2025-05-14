import HeaderGeneral from '../components/header/HeaderGeneral.jsx';
import BookBnbHomeModal from '../components/modals/BookBnbHome/BookBnbHomeModal.jsx';
import { Button, Drawer, Layout, Menu } from 'antd';
import MainContainer from '../components/MainContainer.jsx';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import DashboardOverview from '../components/dashboard/DashboardOverview.jsx';
import useLogout from '../hooks/auth/useLogout.js';

const { Sider, Content } = Layout;

function SideBar({ collapsed, setCollapsed, menuItems, selectedKey, setSelectedKey }) {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      collapsedWidth={60}
      breakpoint='lg'
      onBreakpoint={(broken) => setCollapsed(broken)}
      className='hidden py-6 pl-4 md:block'
    >
      {/* Custom Collapse Button */}
      <Button
        type='primary'
        icon={collapsed ? <Icon icon='uil:arrow-right' width={20} /> : <Icon icon='uil:arrow-left' width={20} />}
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
        className='!mt-4'
      />
    </Sider>
  );
}

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const { t } = useTranslation();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();

  const menuItems = useMemo(() => {
    return [
      {
        label: 'Dashboard',
        key: 'dashboard',
        icon: <Icon icon='material-symbols:dashboard-outline' width={20} />,
      },
      {
        label: t('dashboard:users'),
        key: 'users',
        icon: <Icon icon='uil:user' width={20} />,
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
        label: t('dashboard:users'),
        key: 'users',
        icon: <Icon icon='uil:user' width={20} />,
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
        type: 'divider',
      },
      {
        label: t('explore'),
        key: 'explore',
        icon: <Icon icon='uil:search-alt' width={20} />,
      },
      {
        label: t('logout'),
        key: 'logout',
        icon: <Icon icon='uil:signout' width={20} />,
      },
    ];
  }, [t]);

  const renderContent = () => {
    switch (selectedKey) {
      case 'dashboard':
        return <DashboardOverview />;
      default:
        return null;
    }
  };

  return (
    <MainContainer>
      <BookBnbHomeModal />
      <Layout style={{ minHeight: '100vh', width: '100%' }}>
        <HeaderGeneral />

        <Button type='primary' className='!rounded-xl' onClick={() => setCollapsed(true)}>
          test
        </Button>
        <Layout>
          <Drawer open={collapsed} onClose={() => setCollapsed(false)} placement='top' closeIcon={null}>
            <Menu
              items={menuItemsDrawer}
              selectedKeys={[selectedKey]}
              onClick={({ key }) => {
                if (key === 'logout') {
                  logout();
                } else if (key === 'explore') {
                  window.location.href = '/';
                } else {
                  setSelectedKey(key);
                }
              }}
              mode='inline'
              className='!mt-2'
            />
          </Drawer>
          <SideBar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            menuItems={menuItems}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
          />
          <Layout>
            <Content> {renderContent()}</Content>
          </Layout>
        </Layout>
      </Layout>
    </MainContainer>
  );
}

export default Dashboard;
