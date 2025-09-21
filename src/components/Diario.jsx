import React, { useState, useEffect } from 'react';

export default function Diario() {
  const [note, setNote] = useState('');
  const [list, setList] = useState([]);

  const getToday = () => {
    return new Date().toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('diario') || '[]');
    setList(saved);
  }, []);

  const saveNote = () => {
    if (!note.trim()) return;

    const newItem = {
      note: note.trim(),
      date: getToday(),
    };

    const updated = [...list, newItem];
    setList(updated);
    localStorage.setItem('diario', JSON.stringify(updated));
    setNote('');
  };

  const grouped = list.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item.note);
    return acc;
  }, {});

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">📓 Diario di Marco</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Scrivi una nota..."
          className="p-2 border rounded w-full"
        />
        <button
          onClick={saveNote}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Salva
        </button>
      </div>

      {Object.keys(grouped).reverse().map((date) => (
        <div key={date} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🗓️ {date}</h3>
          <ul className="space-y-2">
            {grouped[date].map((entry, idx) => (
              <li key={idx} className="bg-indigo-100 border border-indigo-300 rounded p-3 text-sm">
                {entry}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

