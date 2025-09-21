import React, { useState, useEffect } from 'react';

const Terapie = () => {
  const [terapie, setTerapie] = useState([]);
  const [tipo, setTipo] = useState('');
  const [giorno, setGiorno] = useState('');
  const [orario, setOrario] = useState('');
  const [data, setData] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Carica terapie da localStorage all'avvio
  useEffect(() => {
    const salvate = localStorage.getItem('terapie');
    if (salvate) setTerapie(JSON.parse(salvate));
  }, []);

  // Salva terapie su localStorage a ogni modifica
  useEffect(() => {
    localStorage.setItem('terapie', JSON.stringify(terapie));
  }, [terapie]);

  const handleAggiungi = () => {
    if (!tipo || !giorno || !orario || !data) return;
    const nuovaTerapia = { tipo, giorno, orario, data };

    if (editingIndex !== null) {
      const aggiornate = [...terapie];
      aggiornate[editingIndex] = nuovaTerapia;
      setTerapie(aggiornate);
      setEditingIndex(null);
    } else {
      setTerapie([...terapie, nuovaTerapia]);
    }

    setTipo('');
    setGiorno('');
    setOrario('');
    setData('');
  };

  const handleModifica = (index) => {
    const t = terapie[index];
    setTipo(t.tipo);
    setGiorno(t.giorno);
    setOrario(t.orario);
    setData(t.data);
    setEditingIndex(index);
  };

  const handleElimina = (index) => {
    const aggiornate = [...terapie];
    aggiornate.splice(index, 1);
    setTerapie(aggiornate);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gestione Terapie</h2>

      {/* Form inserimento/modifica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <input className="border p-2 rounded" placeholder="Tipo terapia" value={tipo} onChange={(e) => setTipo(e.target.value)} />
        <select className="border p-2 rounded" value={giorno} onChange={(e) => setGiorno(e.target.value)}>
          <option value="">Seleziona giorno</option>
          {["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"].map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <input className="border p-2 rounded" type="time" value={orario} onChange={(e) => setOrario(e.target.value)} />
        <input className="border p-2 rounded" type="date" value={data} onChange={(e) => setData(e.target.value)} />
        <button
          className="bg-blue-600 text-white p-2 rounded col-span-full hover:bg-blue-700 transition"
          onClick={handleAggiungi}
        >
          {editingIndex !== null ? "Modifica Terapia" : "Aggiungi Terapia"}
        </button>
      </div>

      {/* Terapie salvate */}
      <div className="space-y-4">
        {[...terapie]
          .sort((a, b) => new Date(`${a.data}T${a.orario}`) - new Date(`${b.data}T${b.orario}`))
          .map((terapia, index) => (
            <div key={index} className="border p-4 rounded shadow-sm bg-gray-50">
              <p className="font-semibold">{terapia.tipo}</p>
              <p>{terapia.giorno} alle {terapia.orario}</p>
              <p className="text-sm text-gray-600">Data inizio: {terapia.data}</p>
              <div className="mt-2 flex gap-2">
                <button className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500" onClick={() => handleModifica(index)}>Modifica</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleElimina(index)}>Elimina</button>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Terapie;
