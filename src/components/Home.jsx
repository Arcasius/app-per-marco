import React from 'react';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white p-6 min-h-screen">
      <div className="max-w-3xl mx-auto text-center mt-12">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">Benvenuto nell'App per Marco 👋</h1>
        <p className="text-lg text-gray-700">
          Questa app ti aiuta a gestire con amore le giornate di Marco 💙<br />
          Usa il menu in alto per accedere a Diario, Terapie e Medicine.
        </p>
        <div className="mt-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3771/3771478.png"
            alt="Icona famiglia"
            className="mx-auto w-32 opacity-70"
          />
        </div>
      </div>
    </div>
  );
}
