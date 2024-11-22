import React, { useState } from 'react';
import vacio from '../../assets/galeria/vacio.png';

const artworks = [
  {
    title: 'Lucas Brandi',
    name: 'Fishing for Icicles, 2019',
    location: 'Edward Cella Art and Architecture',
    price: '$16,000',
    imageUrl: vacio,
    author: 'Lucas Brandi',
    otherWorks: [
      { title: 'Winter Solstice', imageUrl: vacio },
      { title: 'Autumn Leaves', imageUrl: vacio },
    ],
  },
  {
    title: 'William Mallcou',
    name: 'Integrity II, 2019',
    location: 'AbrahamArt',
    price: '€4,950',
    imageUrl: vacio,
    author: 'William Mallcou',
    otherWorks: [
      { title: 'Blue Horizon', imageUrl: vacio },
      { title: 'Sunset Whispers', imageUrl: vacio },
    ],
  },
];

export const ArtGallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const openModal = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  return (
    <div className="bg-yellow-50 p-8 min-h-screen">
      <h1 className="text-4xl font-bold text-yellow-800 mb-10 text-center animate-pulse">Featured Artworks</h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {artworks.map((artwork, index) => (
          <div
            key={index}
            className="w-80 bg-yellow-100 shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
            onClick={() => openModal(artwork)}
          >
            <img
              src={artwork.imageUrl}
              alt={artwork.name}
              className="w-full h-56 object-cover cursor-pointer"
            />
            <div className="p-4">
              <h3 className="text-2xl font-semibold text-yellow-700">{artwork.title}</h3>
              <p className="text-yellow-600">{artwork.name}</p>
              <p className="text-yellow-500 italic">{artwork.location}</p>
              <p className="text-yellow-900 font-bold">{artwork.price}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedArtwork && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-yellow-50 rounded-lg shadow-lg w-11/12 max-w-4xl p-6 relative">
            <button
              className="absolute top-2 right-2 text-yellow-900 font-bold text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4 text-yellow-700">{selectedArtwork.author}</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={selectedArtwork.imageUrl}
                alt={selectedArtwork.name}
                className="w-full md:w-1/2 h-auto rounded"
              />
              <div className="flex flex-col justify-between md:w-1/2">
                <p className="text-lg mb-2 text-yellow-800">{selectedArtwork.name}</p>
                <p className="text-md mb-2 text-yellow-600">{selectedArtwork.location}</p>
                <p className="text-lg font-bold mb-4 text-yellow-900">{selectedArtwork.price}</p>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-yellow-700">Other Works by {selectedArtwork.author}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedArtwork.otherWorks.map((work, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <img
                          src={work.imageUrl}
                          alt={work.title}
                          className="w-24 h-24 object-cover rounded transition-transform duration-200 hover:scale-110"
                        />
                        <p className="text-sm mt-1 text-yellow-600">{work.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ArtGallery;