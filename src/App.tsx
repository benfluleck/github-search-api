import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@styles/global.css';
import { Suspense } from 'react';
import HomePage from '@pages/HomePage';
import DetailPage from '@pages/DetailPage';
import FavouritePage from '@pages/FavouritePage';

const App = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<DetailPage />} />
        <Route path="/favourites" element={<FavouritePage />} />
      </Routes>
    </BrowserRouter>
  </Suspense>
);

export default App;
