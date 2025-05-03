import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Details from '../pages/Details.jsx';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='listing/:id' element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
