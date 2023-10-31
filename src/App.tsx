import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@styles/global.css';
import HomePage from '@pages/HomePage';
import FavouritePage from '@pages/FavouritePage';
import MainLayout from './layout/MainLayout';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/favourites" element={<FavouritePage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
