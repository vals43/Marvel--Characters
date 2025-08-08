// src/components/UpdateCharacter.jsx
import React, { useState } from 'react';

export default function UpdateCharacter() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [realName, setRealName] = useState('');
  const [universe, setUniverse] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const loadCharacterData = async () => {
    if (!id) {
      setMessage("ERREUR: Veuillez entrer un ID pour charger le héros.");
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`http://localhost:5000/characters/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Héros non trouvé. Vérifiez l\'ID.');
        }
        throw new Error(`Erreur réseau: ${response.status}`);
      }
      const data = await response.json();
      setName(data.name);
      setRealName(data.realName);
      setUniverse(data.universe);
      setMessage('Données du héros chargées !');
    } catch (err) {
      console.error("Error loading character for update:", err);
      setMessage('ERREUR DE CHARGEMENT: ' + err.message);
      setName('');
      setRealName('');
      setUniverse('');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`http://localhost:5000/characters/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, realName, universe }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Échec de la mise à jour du héros.');
      }

      setMessage('Héros mis à jour avec succès !');
    } catch (err) {
      console.error("Error updating character:", err);
      setMessage('ERREUR: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="updateId" className="block text-gray-200 text-lg font-semibold mb-3 uppercase tracking-wide">
            ID du HÉROS à MODIFIER:
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              id="updateId"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="bg-gray-700 text-gray-100 placeholder-gray-400 shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 text-lg"
              required
              placeholder="Entrez l'ID"
            />
            <button
              type="button"
              onClick={loadCharacterData}
              className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold py-2 px-5 rounded-lg transition-all duration-200 text-lg shadow-md hover:shadow-lg uppercase tracking-wide"
              disabled={loading}
            >
              Charger
            </button>
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="updateName" className="block text-gray-200 text-lg font-semibold mb-3 uppercase tracking-wide">
            NOUVEAU NOM DU HÉROS:
          </label>
          <input
            type="text"
            id="updateName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-700 text-gray-100 placeholder-gray-400 shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 text-lg"
            required
            placeholder="Nouveau nom du héros"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="updateRealName" className="block text-gray-200 text-lg font-semibold mb-3 uppercase tracking-wide">
            NOUVELLE IDENTITÉ SECRÈTE:
          </label>
          <input
            type="text"
            id="updateRealName"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            className="bg-gray-700 text-gray-100 placeholder-gray-400 shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 text-lg"
            required
            placeholder="Nouvelle identité secrète"
          />
        </div>
        <div className="mb-7">
          <label htmlFor="updateUniverse" className="block text-gray-200 text-lg font-semibold mb-3 uppercase tracking-wide">
            NOUVEL UNIVERS:
          </label>
          <input
            type="text"
            id="updateUniverse"
            value={universe}
            onChange={(e) => setUniverse(e.target.value)}
            className="bg-gray-700 text-gray-100 placeholder-gray-400 shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 text-lg"
            required
            placeholder="Nouvel univers du héros"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-200 text-xl shadow-md hover:shadow-lg uppercase tracking-wide"
          disabled={loading}
        >
          {loading ? 'MISE À JOUR EN COURS...' : 'METTRE À JOUR HÉROS'}
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
