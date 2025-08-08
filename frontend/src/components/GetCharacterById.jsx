// src/components/GetCharacterById.jsx
import React, { useState } from 'react';

export default function GetCharacterById() {
  const [id, setId] = useState('');
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCharacter = async () => {
    setLoading(true);
    setError(null);
    setCharacter(null); // Réinitialiser le personnage précédent
    try {
      const response = await fetch(`http://localhost:5000/characters/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Héros non trouvé. Vérifiez l\'IDENTIFIANT.');
        }
        throw new Error(`Erreur réseau: ${response.status}`);
      }
      const data = await response.json();
      setCharacter(data);
    } catch (err) {
      console.error("Error fetching character by ID:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMarvelPlaceholder = (name, id) => {
    const cleanName = name ? name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10).toUpperCase() : 'HERO';
    return `https://placehold.co/400x300/1a1a1a/e00?text=${cleanName}&font=roboto&bold`;
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
      <div className="mb-6">
        <label htmlFor="characterId" className="block text-gray-200 text-lg font-semibold mb-3 uppercase tracking-wide">
          IDENTIFIANT DU HÉROS:
        </label>
        <input
          type="number"
          id="characterId"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="bg-gray-700 text-gray-100 placeholder-gray-400 shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 text-lg"
          placeholder="Entrez l'ID du héros (ex: 1)"
        />
      </div>
      <button
        onClick={fetchCharacter}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-200 text-lg shadow-md hover:shadow-lg uppercase tracking-wide"
        disabled={loading}
      >
        {loading ? 'RECHERCHE EN COURS...' : 'RECHERCHER HÉROS'}
      </button>

      {error && <p className="text-red-400 text-center mt-6 text-md font-medium">{error}</p>}

      {character && !loading && (
        <div className="mt-8 p-6 bg-gray-900 rounded-xl border border-gray-700 shadow-lg text-gray-100 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${getMarvelPlaceholder(character.name, character.id)})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
          
          <h3 className="text-3xl font-extrabold text-yellow-400 mb-3 relative z-10 uppercase">{character.name}</h3>
          <p className="text-xl text-gray-200 mb-1 relative z-10">Nom Réel: {character.realName}</p>
          <p className="text-xl text-gray-200 relative z-10">Univers: {character.universe}</p>
        </div>
      )}
    </div>
  );
}
