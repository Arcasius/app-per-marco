import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide">💙 App per Marco</div>
        <div className="space-x-6 text-lg">
          <Link to="/" className="hover:text-yellow-300 transition">🏠 Home</Link>
          <Link to="/diario" className="hover:text-yellow-300 transition">📓 Diario</Link>
          <Link to="/medicine" className="hover:text-yellow-300 transition">💊 Medicine</Link>
          <Link to="/terapie" className="hover:text-yellow-300 transition">🧠 Terapie</Link>
        </div>
      </div>
    </nav>
  );
}
