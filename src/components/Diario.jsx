
import React, { useState } from 'react';

const Diario = () => {
  const [note, setNote] = useState([]);
  const [testo, setTesto] = useState('');
  const [data, setData] = useState('');

  const handleAggiungi = () => {
    if (!testo || !data) return;
    const nuova = { testo, data };
    setNote([...note, nuova]);
    setTesto('');
    setData('');
  };

  const raggruppaNote = () => {
    return note.reduce((acc, n) => {
      if (!acc[n.data]) acc[n.data] = [];
      acc[n.data].push(n.testo);
      return acc;
    }, {});
  };

  const notePerData = raggruppaNote();

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Diario Giornaliero</h2>
      <div className="grid grid-cols-1 gap-2 mb-4">
        <input className="border p-2 rounded" type="date" value={data} onChange={(e) => setData(e.target.value)} />
        <textarea className="border p-2 rounded" rows="3" placeholder="Scrivi una nota..." value={testo} onChange={(e) => setTesto(e.target.value)} />
        <button className="bg-blue-600 text-white p-2 rounded" onClick={handleAggiungi}>Aggiungi Nota</button>
      </div>

      {Object.entries(notePerData).map(([giorno, testi], idx) => (
        <div key={idx} className="mb-6 border rounded p-4 bg-white shadow-sm">
          <h3 className="font-bold text-lg mb-2">🗓️ {giorno}</h3>
          {testi.map((t, i) => (
            <p key={i} className="mb-2">• {t}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Diario;
