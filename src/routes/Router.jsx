import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Details from '../pages/Details.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='listing/:id' element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
