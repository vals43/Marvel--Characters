
import React, { useState } from 'react';
import GetAllCharacters from './GetAllCharacters';
import GetCharacterById from './GetCharacterById';
import AddCharacter from './AddCharacter';
import UpdateCharacter from './UpdateCharacter';
import DeleteCharacter from './DeleteCharacter';

export default function ComponentViewer() {
  const componentsList = [
    { name: 'ALL HEROES', Component: GetAllCharacters },
    { name: 'SEARCH HERO', Component: GetCharacterById },
    { name: 'ADD HERO', Component: AddCharacter },
    { name: 'UPDATE HERO', Component: UpdateCharacter },
    { name: 'DELETE HERO', Component: DeleteCharacter },
  ];

  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  const CurrentComponent = componentsList[currentViewIndex].Component;
  const currentComponentName = componentsList[currentViewIndex].name;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-inner-xl p-8 border border-gray-700 relative z-10">
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {componentsList.map((item, index) => (
          <button
            key={item.name}
            onClick={() => setCurrentViewIndex(index)}
            className={`
              px-7 py-3 rounded-xl text-lg font-bold uppercase tracking-wide
              transition-all duration-300 ease-in-out transform
              ${
                currentViewIndex === index
                  ? 'bg-red-700 text-yellow-400 shadow-xl border-2 border-yellow-500 scale-105 hover:bg-red-800 filter drop-shadow-lg' // Bouton actif
                  : 'bg-gray-700 text-gray-300 shadow-md border border-gray-600 hover:bg-gray-600 hover:text-white filter brightness-90 hover:brightness-110' // Bouton inactif
              }
              focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50
            `}
          >
            {item.name}
          </button>
        ))}
      </div>

      <h3 className="text-4xl font-extrabold text-gray-100 text-center mb-8 drop-shadow-md">
        {currentComponentName}
      </h3>

      <div className="border border-gray-600 rounded-2xl p-8 bg-gray-700 shadow-inner-xl min-h-[500px] flex items-start justify-center text-gray-100">
        <CurrentComponent />
      </div>
    </div>
  );
}
