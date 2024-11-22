import { useState, useEffect } from "react";
import Navbar from "../../components/iniciopage/NavBar";
import Footer from "../../components/iniciopage/Footer";

const categories = [
  "Rock",
  "Hip-Hop",
  "Pop",
  "Electronica",
  "Jazz",
  "Chacarera",
  "Polka",
  "Zamba",
];

const MusicViewer = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);

  // Obtener canciones del backend
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/song");
        const data = await response.json();
        if (Array.isArray(data)) {
          setSongs(data);
          setFilteredSongs(data);
        } else {
          console.error(
            "Se esperaba un arreglo de canciones, pero se recibió:",
            data
          );
        }
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
      }
    };

    fetchSongs();
  }, []);

  // Filtrar canciones por búsqueda y categoría
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = songs.filter(
      (song) =>
        (song.title.toLowerCase().includes(query) ||
          song.artist.toLowerCase().includes(query)) &&
        (selectedCategory === "" || song.category === selectedCategory)
    );
    setFilteredSongs(filtered);
  }, [searchQuery, selectedCategory, songs]);

  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      {/* Navbar en la parte superior */}
      <Navbar />
  
      {/* Contenido principal */}
      <div className="flex-grow p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-800 mb-8 shadow-lg">
          Canciones Disponibles
        </h1>
        <p className="text-center text-lg text-yellow-800 mb-8 italic">
          Explora canciones de tus artistas favoritos.
        </p>
  
        {/* Barra de búsqueda */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Buscar por título o artista"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-lg px-4 py-2 text-lg border-2 border-yellow-500 rounded-md shadow focus:outline-none focus:ring focus:ring-yellow-300"
          />
        </div>
  
        {/* Slider de categorías */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 py-4 px-6 bg-yellow-100 rounded-lg shadow-lg">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() =>
                setSelectedCategory(selectedCategory === category ? "" : category)
              }
              className={`cursor-pointer px-6 py-3 rounded-full text-lg font-semibold transition-all shadow ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-700 text-white scale-110"
                  : "bg-yellow-200 text-yellow-800 hover:bg-yellow-400 hover:text-white"
              }`}
            >
              {category}
            </div>
          ))}
        </div>
  
        {/* Lista de canciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto">
          {filteredSongs.map((song) => (
            <div
              key={song._id}
              className="card bg-yellow-100 p-4 rounded-lg shadow-md border-2 border-yellow-400 cursor-pointer transition-transform hover:scale-105"
            >
              {song.image && (
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
              )}
              <h3 className="text-xl font-bold text-yellow-900 text-center">
                {song.title}
              </h3>
              <h2 className="text-lg text-yellow-800 text-center">
                {song.artist}
              </h2>
              <h4 className="text-md text-yellow-700 text-center italic">
                {song.category}
              </h4>
              <div className="flex justify-center mt-2 space-x-4">
                <button
                  onClick={() => setSelectedSong(song)}
                  className="btn btn-warning text-lg text-yellow-100 hover:text-yellow-900 font-semibold"
                >
                  Ver Más
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {/* Modal para canción seleccionada */}
        {selectedSong && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="modal modal-open">
              <div className="modal-box bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold text-yellow-800">
                  {selectedSong.title}
                </h2>
                <h3 className="text-lg font-semibold mt-2 text-yellow-700">
                  {selectedSong.artist}
                </h3>
                <p className="mt-4 text-lg text-yellow-700">
                  {selectedSong.description}
                </p>
                <p className="mt-4 text-lg italic text-yellow-600">
                  {selectedSong.category}
                </p>
                {selectedSong.image && (
                  <img
                    src={selectedSong.image}
                    alt={selectedSong.title}
                    className="w-full h-64 object-cover mt-4 mb-4 rounded-md"
                  />
                )}
                {selectedSong.audio && (
                  <audio controls src={selectedSong.audio} className="w-full mt-4" />
                )}
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    onClick={() => setSelectedSong(null)}
                    className="btn btn-warning text-white hover:text-yellow-900"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
  
};

export default MusicViewer;
