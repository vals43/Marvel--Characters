// src/components/DeleteCharacter.jsx
import React, { useState } from 'react';

export default function DeleteCharacter() {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`http://localhost:5000/characters/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = response.status === 204 ? {} : await response.json();
        throw new Error(errorData.message || `Erreur réseau: ${response.status}`);
      }

      setMessage('Héros SUPPRIMÉ avec succès !');
      setId('');
    } catch (err) {
      console.error("Error deleting character:", err);
      setMessage('ERREUR: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="deleteId" className="block text-gray-200 text-lg font-semibold mb-3 uppercase tracking-wide">
            ID du HÉROS à SUPPRIMER:
          </label>
          <input
            type="number"
            id="deleteId"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="bg-gray-700 text-gray-100 placeholder-gray-400 shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 text-lg"
            required
            placeholder="Entrez l'ID"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-200 text-xl shadow-md hover:shadow-lg uppercase tracking-wide"
          disabled={loading}
        >
          {loading ? 'SUPPRESSION EN COURS...' : 'SUPPRIMER HÉROS'}
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
