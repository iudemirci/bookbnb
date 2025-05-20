import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setExpanded } from '../store/appSlice';

function ScrollToTop() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setExpanded(false));
  }, [pathname, dispatch]);

  return null;
}

export default memo(ScrollToTop);
