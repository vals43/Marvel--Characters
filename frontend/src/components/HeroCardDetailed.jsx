
import React from 'react';

export default function HeroCardDetailed({ hero }) {
  if (!hero) {
    return (
      <div className="text-center py-8 text-gray-400 text-xl font-semibold">
        Sélectionnez ou recherchez un héros pour voir les détails.
      </div>
    );
  }

  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/400x300/1a1a1a/e00?text=HERO_NOT_FOUND&font=roboto&bold";
  };

  return (
    <div className="w-full bg-gray-900 rounded-2xl shadow-xl border border-gray-700 p-8 flex flex-col md:flex-row items-center md:items-start gap-8">

      <div className="flex-shrink-0 w-full md:w-1/3 max-w-xs md:max-w-none">
        {hero.image ? (
          <img
            src={hero.image}
            alt={hero.name}
            className="w-full h-auto object-cover rounded-xl shadow-lg border border-gray-600 transform group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError} 
          />
        ) : (
          <img
            src="https://placehold.co/400x300/1a1a1a/e00?text=NO_IMAGE&font=roboto&bold"
            alt="No Image Available"
            className="w-full h-auto object-cover rounded-xl shadow-lg border border-gray-600"
          />
        )}
      </div>

      <div className="flex-grow text-center md:text-left">
        <h2 className="text-5xl font-extrabold text-red-600 mb-2 uppercase tracking-wide drop-shadow-lg">
          {hero.name}
        </h2>
        <p className="text-2xl font-semibold text-gray-200 mb-4">{hero.realName}</p>
        <span className="inline-block text-lg text-yellow-400 font-semibold px-4 py-1 bg-gray-800 rounded-full border border-yellow-500 shadow-inner mb-6 uppercase">
          {hero.universe}
        </span>

        {hero.description && (
          <p className="text-gray-300 text-lg leading-relaxed mt-4 mb-6 border-l-4 border-red-700 pl-4 py-2 italic">
            "{hero.description}"
          </p>
        )}

        {hero.stats && (
          <div className="bg-gray-800 rounded-lg p-5 shadow-inner border border-gray-700 mt-6">
            <h4 className="text-2xl font-bold text-yellow-400 mb-3 uppercase tracking-wide">STATISTIQUES</h4>
            <ul className="space-y-2 text-lg">
              <li className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Force:</span>
                <span className="text-red-400 font-bold">{hero.stats.strength}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Intelligence:</span>
                <span className="text-red-400 font-bold">{hero.stats.intelligence}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Vitesse:</span>
                <span className="text-red-400 font-bold">{hero.stats.speed}</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
