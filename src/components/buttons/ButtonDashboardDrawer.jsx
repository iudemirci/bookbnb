import { Button } from 'antd';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setMenuOpen } from '../../store/dashboardSlice';

function ButtonDashboardDrawer() {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setMenuOpen());
  }

  return (
    <Button type='text' onClick={handleClick}>
      <Icon icon='uil:bars' width={30} />
    </Button>
  );
}

export default ButtonDashboardDrawer;
