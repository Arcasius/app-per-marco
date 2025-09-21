import React, { useState, useEffect } from 'react';

export default function Terapie() {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [list, setList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('terapie') || '[]');
    setList(saved);
  }, []);

  const saveToStorage = (updated) => {
    localStorage.setItem('terapie', JSON.stringify(updated));
    setList(updated);
  };

  const addOrUpdateTerapia = () => {
    if (!name.trim() || !time || !date) {
      alert('Inserisci tutti i campi: terapia, orario e data');
      return;
    }

    const newItem = { name: name.trim(), time, date };

    let updated;
    if (editingIndex !== null) {
      updated = [...list];
      updated[editingIndex] = newItem;
      setEditingIndex(null);
    } else {
      updated = [...list, newItem];
    }

    saveToStorage(updated);
    setName('');
    setTime('');
    setDate('');
  };

  const editTerapia = (index) => {
    const item = list[index];
    setName(item.name);
    setTime(item.time);
    setDate(item.date);
    setEditingIndex(index);
  };

  const deleteTerapia = (index) => {
    const updated = list.filter((_, i) => i !== index);
    saveToStorage(updated);
  };

  const grouped = list.reduce((acc, item, i) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push({ ...item, index: i });
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">🧠 Terapie Programmate</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tipo terapia"
          className="p-2 border rounded w-full sm:w-auto"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={addOrUpdateTerapia}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {editingIndex !== null ? "Modifica" : "Aggiungi"}
        </button>
      </div>

      {sortedDates.map((date) => (
        <div key={date} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">📅 {new Date(date).toLocaleDateString('it-IT')}</h3>
          <ul className="space-y-2">
            {grouped[date].map((tp, idx) => (
              <li
                key={idx}
                className="bg-indigo-100 border border-indigo-300 rounded p-3 flex justify-between items-center"
              >
                <span className="text-sm">
                  <strong>{tp.name}</strong> alle {tp.time}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => editTerapia(tp.index)}
                    className="px-2 py-1 text-xs bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                  >
                    ✏️ Modifica
                  </button>
                  <button
                    onClick={() => deleteTerapia(tp.index)}
                    className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    ❌ Elimina
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

