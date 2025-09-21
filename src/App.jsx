
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Diario from './components/Diario';
import Medicine from './components/Medicine';
import Terapie from './components/Terapie';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diario" element={<Diario />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/terapie" element={<Terapie />} />
        </Routes>
      </div>
    </Router>
  );
}
