import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home.jsx'));
const Details = lazy(() => import('../pages/Details.jsx'));
const Trips = lazy(() => import('../pages/Trips.jsx'));
const ProtectedRoute = lazy(() => import('./ProtectedRoute.jsx'));
const Liked = lazy(() => import('../pages/Favourites.jsx'));
const MyHomes = lazy(() => import('../pages/MyHomes.jsx'));

import ScrollToTop from '../components/ScrollToTop.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import ProtectedAdminRoute from './ProtectedAdminRoute.jsx';

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='listing/:id' element={<Details />} />
        <Route
          path='/my_homes'
          element={
            <ProtectedRoute>
              <MyHomes />
            </ProtectedRoute>
          }
        />
        <Route
          path='/liked'
          element={
            <ProtectedRoute>
              <Liked />
            </ProtectedRoute>
          }
        />
        <Route
          path='/trips'
          element={
            <ProtectedRoute>
              <Trips />
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
