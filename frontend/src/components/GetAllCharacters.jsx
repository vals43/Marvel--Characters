// src/components/GetAllCharacters.jsx
import { useEffect, useState } from 'react';
import HeroCardDetailed from './HeroCardDetailed.jsx';

export default function GetAllCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Nouvel état pour le personnage sélectionné et l'affichage de la modale
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('http://localhost:5000/characters');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCharacters(data);
        
      } catch (err) {
        console.error("Error fetching characters:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleCardClick = (character) => {
    setSelectedCharacter(character); 
  };

  const closeDetails = () => {
    setSelectedCharacter(null);
  };

  const handleImageError = (e) => {
    e.target.style.backgroundImage = `url(https://placehold.co/400x300/1a1a1a/e00?text=IMAGE_ERROR&font=roboto&bold)`;
  };


  if (loading) {
    return (
      <div className="text-center py-12 text-gray-300 text-2xl font-semibold animate-pulse">
        Chargement des dossiers de personnages...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500 text-2xl font-semibold">
        ERREUR DE TRANSMISSION: {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {characters.length > 0 ? (
          characters.map(c => (
            <div 
              key={c.id} 
              onClick={() => handleCardClick(c)}
              className="group bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-0 border border-gray-700 flex flex-col items-center text-center transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden cursor-pointer"
            >
              <div 
                className="w-full h-48 bg-cover bg-center rounded-t-xl relative"
                style={{ backgroundImage: `url(${c.image})` }}
                onError={handleImageError} 
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>

              <div className="p-6 w-full relative z-10">
                <h3 className="text-xl font-extrabold text-white mb-2 tracking-wide uppercase">
                   #{c.id}
                </h3>
                <h3 className="text-3xl font-extrabold text-white mb-2 tracking-wide uppercase">
                  {c.name}
                </h3>
                <p className="text-lg text-gray-300 mb-2">{c.realName}</p>
                <span className="text-md text-yellow-400 font-semibold px-4 py-1 bg-gray-900 rounded-full border border-yellow-500 shadow-inner block mx-auto mt-2">
                  {c.universe}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full py-12 text-gray-400 text-xl">
            Aucun dossier de personnage trouvé dans la base de données Marvel.
          </p>
        )}
      </div>

      {selectedCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 animate-fade-in">

          <div className="bg-gray-800 rounded-2xl shadow-2xl-custom p-6 md:p-8 relative w-full max-w-2xl transform scale-95 animate-scale-in">

            <button
              onClick={closeDetails}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold focus:outline-none z-20"
              aria-label="Close"
            >
              &times;
            </button>
            <HeroCardDetailed hero={selectedCharacter} />
          </div>
        </div>
      )}
    </div>
  );
}
