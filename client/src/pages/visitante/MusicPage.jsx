import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SongModal from "../../components/musica/SongModal";
import axios from "axios";

const MusicList = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Cargar canciones desde el backend
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/songs");
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const categories = ["Todos", ...new Set(songs.map(song => song.category))];

  // Filtrado de canciones basado en búsqueda y categoría
  const filteredSongs = songs.filter(
    (song) =>
      (selectedCategory === "Todos" || song.category === selectedCategory) &&
      song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openSongModal = (song) => {
    setSelectedSong(song);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-yellow-200 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700 mb-8 shadow-lg">
        Música Local
      </h1>

      <input
        type="text"
        placeholder="Buscar por título..."
        className="input input-bordered w-full max-w-md bg-white text-gray-700 rounded-md shadow-md mb-6 text-center"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="w-full max-w-4xl mb-4">
        <Slider {...settings}>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 mx-2 font-bold rounded-md ${
                selectedCategory === category
                  ? "bg-yellow-300 text-white"
                  : "bg-yellow-300 text-gray-700"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </Slider>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl">
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            className="bg-yellow-400 p-4 rounded-lg shadow-md border-2 border-yellow-600 cursor-pointer transition-transform hover:scale-105"
            onClick={() => openSongModal(song)}
          >
            <img
              src={song.image}
              alt={song.title}
              className="w-full h-40 object-cover mb-2 rounded-md"
            />
            <h3 className="text-sm font-bold text-gray-700 text-center">{song.title}</h3>
            <p className="text-xs text-gray-600 text-center">{song.artist}</p>
          </div>
        ))}
      </div>

      {selectedSong && (
        <SongModal
          song={selectedSong}
          isOpen={!!selectedSong}
          onClose={() => setSelectedSong(null)}
        />
      )}
    </div>
  );
};

export default MusicList;
