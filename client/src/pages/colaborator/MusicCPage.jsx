import React, { useState, useEffect } from "react"; 
import SongForm from "../../components/musica/SongForm"; // Formulario para agregar/editar canciones

const CollaboratorMusic= () => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Obtener canciones del usuario desde el backend
  useEffect(() => {
    const fetchUserSongs = async () => {
      try {
        const response = await fetch("/api/songs");
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("Error al obtener canciones:", error);
      }
    };

    fetchUserSongs();
  }, []);

  // Agregar una canción
  const addSong = async (newSong) => {
    try {
      const response = await fetch("/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSong),
      });
      const data = await response.json();
      setSongs((prevSongs) => [...prevSongs, data]);
    } catch (error) {
      console.error("Error al agregar canción:", error);
    }
  };

  // Editar una canción
  const editSong = async (updatedSong) => {
    try {
      const response = await fetch(`/api/songs/${updatedSong.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSong),
      });
      const data = await response.json();
      setSongs((prevSongs) =>
        prevSongs.map((song) => (song.id === updatedSong.id ? data : song))
      );
    } catch (error) {
      console.error("Error al editar canción:", error);
    }
  };

  // Eliminar una canción
  const deleteSong = async (songId) => {
    try {
      await fetch(`/api/songs/${songId}`, {
        method: "DELETE",
      });
      setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
    } catch (error) {
      console.error("Error al eliminar canción:", error);
    }
  };

  return (
    <div className="p-6 bg-yellow-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700 mb-8 shadow-lg">
          Mis Canciones
        </h1>
        <p className="text-center text-lg text-gray-800 mb-8 italic">
          Comparte tus canciones, ya sea de artistas formoseños o sobre Formosa. Contribuye con tu talento musical y conecta con la cultura local.
        </p>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              setIsFormOpen(true);
              setIsEditing(false);
              setSelectedSong(null);
            }}
            className="px-6 py-3 bg-yellow-600 text-white font-bold rounded-md shadow-xl hover:bg-yellow-500 transform transition duration-200 ease-in-out"
          >
            Agregar Canción
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mx-auto">
          {songs.map((song) => (
            <div
              key={song.id}
              className="bg-yellow-300 p-4 rounded-lg shadow-md border-2 border-yellow-500 cursor-pointer transition-transform hover:scale-105"
            >
              <img
                src={song.image}
                alt={song.title}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-bold text-gray-700 text-center">{song.title}</h3>
              <p className="text-sm text-gray-600 text-center mb-4">{song.artist}</p>
              <div className="flex justify-center mt-2 space-x-4">
                <button
                  onClick={() => {
                    setSelectedSong(song);
                    setIsEditing(true);
                    setIsFormOpen(true);
                  }}
                  className="text-lg text-yellow-700 hover:text-yellow-600 font-semibold"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteSong(song.id)}
                  className="text-lg text-red-600 hover:text-red-500 font-semibold"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {isFormOpen && (
          <SongForm
            song={isEditing ? selectedSong : null}
            onSave={(songData) => {
              isEditing ? editSong(songData) : addSong(songData);
              setIsFormOpen(false);
            }}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CollaboratorMusic;
