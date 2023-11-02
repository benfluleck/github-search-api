import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@styles/global.css';
import HomePage from '@pages/HomePage';
import FavouritePage from '@pages/FavouritePage';
import DetailPage from '@pages/DetailsPage';



const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<DetailPage />} />
      <Route path="/favourites" element={<FavouritePage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
