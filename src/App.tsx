import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@styles/global.css';
import { Suspense, lazy } from 'react';

const HomePage = lazy(() => import('@pages/HomePage'));
const FavouritePage = lazy(() => import('@pages/FavouritePage'));
const DetailPage = lazy(() => import('@pages/DetailPage'));

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
