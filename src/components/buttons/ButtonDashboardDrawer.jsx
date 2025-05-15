import { Button } from 'antd';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setIsSidebarOpen } from '../../store/modalSlice.js';

function ButtonDashboardDrawer() {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setIsSidebarOpen(true));
  }

  return (
    <Button type='text' onClick={handleClick}>
      <Icon icon='uil:bars' width={30} />
    </Button>
  );
}

export default ButtonDashboardDrawer;
