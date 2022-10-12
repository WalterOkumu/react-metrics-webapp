import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CoinDetails from './components/CoinDetails';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:coinId" element={<CoinDetails />} />
    </Routes>
  </>
);

export default App;
