// src/components/AddCharacter.jsx
import React, { useState } from 'react';

export default function AddCharacter() {
  const [name, setName] = useState('');
  const [realName, setRealName] = useState('');
  const [universe, setUniverse] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, realName, universe }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Échec de l\'ajout du héros.');
      }

      setMessage('Héros AJOUTÉ avec succès ! ID: ' + data.id);
      setName('');
      setRealName('');
      setUniverse('');
    } catch (err) {
      console.error("Error adding character:", err);
      setMessage('ERREUR: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block text-gray-200 text-lg font-semibold mb-3 uppercase tracking-wide">
            NOM DU HÉROS:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-700 text-gray-100 placeholder-gray-400 shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 text-lg"
            required
            placeholder="Spider-Man"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="realName" className="block text-gray-200 text-lg font-semibold mb-3 uppercase tracking-wide">
            IDENTITÉ SECRÈTE:
          </label>
          <input
            type="text"
            id="realName"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            className="bg-gray-700 text-gray-100 placeholder-gray-400 shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 text-lg"
            required
            placeholder="Peter Parker"
          />
        </div>
        <div className="mb-7">
          <label htmlFor="universe" className="block text-gray-200 text-lg font-semibold mb-3 uppercase tracking-wide">
            UNIVERS:
          </label>
          <input
            type="text"
            id="universe"
            value={universe}
            onChange={(e) => setUniverse(e.target.value)}
            className="bg-gray-700 text-gray-100 placeholder-gray-400 shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 text-lg"
            required
            placeholder="Earth-616"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-200 text-xl shadow-md hover:shadow-lg uppercase tracking-wide"
          disabled={loading}
        >
          {loading ? 'AJOUT EN COURS...' : 'AJOUTER HÉROS'}
        </button>
      </form>
      {message && (
        <p className={`mt-6 text-center text-lg font-medium ${message.startsWith('ERREUR') ? 'text-red-400' : 'text-yellow-400'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
