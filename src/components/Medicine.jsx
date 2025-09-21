import React, { useState, useEffect } from 'react';

export default function Medicine() {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [list, setList] = useState([]);

  const getToday = () => {
    return new Date().toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('medicine') || '[]');
    setList(saved);
  }, []);

  const addMedicine = () => {
    if (!name.trim() || !time) {
      alert('Inserisci un nome e un orario');
      return;
    }

    const newItem = {
      name: name.trim(),
      time,
      date: getToday(),
    };

    const updated = [...list, newItem];
    setList(updated);
    localStorage.setItem('medicine', JSON.stringify(updated));
    setName('');
    setTime('');
  };

  const grouped = list.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">💊 Medicine</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome medicina"
          className="p-2 border rounded w-full sm:w-auto"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={addMedicine}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Aggiungi
        </button>
      </div>

      {Object.keys(grouped).reverse().map((date) => (
        <div key={date} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🗓️ {date}</h3>
          <ul className="space-y-2">
            {grouped[date].map((med, idx) => (
              <li key={idx} className="bg-indigo-100 border border-indigo-300 rounded p-3 text-sm">
                {med.name} alle {med.time}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
