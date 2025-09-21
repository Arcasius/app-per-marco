
import React, { useState } from 'react';

const Medicine = () => {
  const [medicineList, setMedicineList] = useState([]);
  const [nome, setNome] = useState('');
  const [orario, setOrario] = useState('');
  const [data, setData] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAggiungi = () => {
    if (!nome || !orario || !data) return;
    const nuova = { nome, orario, data };
    if (editingIndex !== null) {
      const aggiornata = [...medicineList];
      aggiornata[editingIndex] = nuova;
      setMedicineList(aggiornata);
      setEditingIndex(null);
    } else {
      setMedicineList([...medicineList, nuova]);
    }
    setNome('');
    setOrario('');
    setData('');
  };

  const handleModifica = (index) => {
    const m = medicineList[index];
    setNome(m.nome);
    setOrario(m.orario);
    setData(m.data);
    setEditingIndex(index);
  };

  const handleElimina = (index) => {
    const aggiornata = [...medicineList];
    aggiornata.splice(index, 1);
    setMedicineList(aggiornata);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Gestione Medicine</h2>
      <div className="grid grid-cols-1 gap-2 mb-4">
        <input className="border p-2 rounded" placeholder="Nome medicina" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input className="border p-2 rounded" type="time" value={orario} onChange={(e) => setOrario(e.target.value)} />
        <input className="border p-2 rounded" type="date" value={data} onChange={(e) => setData(e.target.value)} />
        <button className="bg-green-600 text-white p-2 rounded" onClick={handleAggiungi}>
          {editingIndex !== null ? "Modifica Medicina" : "Aggiungi Medicina"}
        </button>
      </div>

      <div className="space-y-4">
        {medicineList.map((m, index) => (
          <div key={index} className="border p-4 rounded shadow-sm bg-gray-50">
            <p><strong>{m.nome}</strong></p>
            <p>{m.data} alle {m.orario}</p>
            <div className="mt-2 space-x-2">
              <button className="bg-yellow-400 px-3 py-1 rounded" onClick={() => handleModifica(index)}>Modifica</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleElimina(index)}>Elimina</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Medicine;
