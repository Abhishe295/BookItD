import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import Result from './pages/Result';

export default function App() {
  return (
    <div className="min-h-screen" data-theme="night">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiences/:id" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </main>
    </div>
  );
}
