import React from "react";

const SongModal = ({ song, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-yellow-200 p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">{song.title}</h2>
        <p className="text-lg mb-4">Artista: {song.artist}</p>
        <p className="mb-4">Imagen: <img src={song.image} alt={song.title} className="w-full h-48 object-cover" /></p>
        <audio controls className="w-full">
          <source src={song.audio} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <div className="mt-4 flex justify-center">
          <button onClick={onClose} className="px-6 py-2 bg-yellow-600 text-white rounded-md">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongModal;
