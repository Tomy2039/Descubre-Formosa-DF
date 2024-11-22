import { useState, useEffect } from "react";
import Navbar from "../../components/iniciopage/NavBar";
import Footer from "../../components/iniciopage/Footer";
import PdfViewer from "../colaborator/pdfViewer";

const categories = [
  "Ficción",
  "No Ficción",
  "Ciencia",
  "Historia",
  "Tecnología",
  "Arte",
  "Literatura",
  "Misterio",
];

const LibraryViews = () => {
  const [libraries, setLibraries] = useState([]);
  const [filteredLibraries, setFilteredLibraries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLibrary, setSelectedLibrary] = useState(null);

  // Obtener bibliotecas del backend
  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/library");
        const data = await response.json();
        if (Array.isArray(data)) {
          setLibraries(data);
          setFilteredLibraries(data);
        } else {
          console.error("Se esperaba un arreglo de bibliotecas, pero se recibió:", data);
        }
      } catch (error) {
        console.error("Error al obtener las bibliotecas:", error);
      }
    };

    fetchLibraries();
  }, []);

  // Filtrar bibliotecas por búsqueda y género
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = libraries.filter(
      (library) =>
        (library.title.toLowerCase().includes(query) ||
          library.author.toLowerCase().includes(query)) &&
        (selectedCategory === "" || library.gender === selectedCategory) // Cambiado de category a gender
    );
    setFilteredLibraries(filtered);
  }, [searchQuery, selectedCategory, libraries]);

  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      {/* Navbar en la parte superior */}
      <Navbar />

      {/* Contenido principal */}
      <div className="flex-grow p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-800 mb-8 shadow-lg">
          Bibliotecas Disponibles
        </h1>
        <p className="text-center text-lg text-yellow-800 mb-8 italic">
          Explora libros de diferentes géneros y autores.
        </p>

        {/* Barra de búsqueda */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Buscar por título o autor"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-lg px-4 py-2 text-lg border-2 border-yellow-500 rounded-md shadow focus:outline-none focus:ring focus:ring-yellow-300"
          />
        </div>

        {/* Slider de géneros */}
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

        {/* Lista de bibliotecas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto">
          {filteredLibraries.map((library) => (
            <div
              key={library._id}
              className="card bg-yellow-100 p-4 rounded-lg shadow-md border-2 border-yellow-400 cursor-pointer transition-transform hover:scale-105"
            >
              {library.image && (
                <img
                  src={library.image}
                  alt={library.title}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
              )}
              <h3 className="text-xl font-bold text-yellow-900 text-center">
                {library.title}
              </h3>
              <h2 className="text-lg text-yellow-800 text-center">
                {library.author}
              </h2>
              <h4 className="text-md text-yellow-700 text-center italic">
                {library.gender} {/* Cambiado de category a gender */}
              </h4>
              <div className="flex justify-center mt-2 space-x-4">
                <button
                  onClick={() => setSelectedLibrary(library)}
                  className="btn btn-warning text-lg text-yellow-100 hover:text-yellow-900 font-semibold"
                >
                  Ver Más
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para biblioteca seleccionada */}
        {selectedLibrary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="modal modal-open">
              <div className="modal-box bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold text-yellow-800">
                  {selectedLibrary.title}
                </h2>
                <h3 className="text-lg font-semibold mt-2 text-yellow-700">
                  {selectedLibrary.author}
                </h3>
                <p className="mt-4 text-lg text-yellow-700">
                  {selectedLibrary.description}
                </p>
                <p className="mt-4 text-lg italic text-yellow-600">
                  {selectedLibrary.gender} {/* Cambiado de category a gender */}
                </p>
                {selectedLibrary.image && (
                  <img
                    src={selectedLibrary.image}
                    alt={selectedLibrary.title}
                    className="w-full h-64 object-cover mt-4 mb-4 rounded-md"
                  />
                )}
                {selectedLibrary.pdfUrl && (
                  <PdfViewer pdfUrl={selectedLibrary.pdfUrl} />
                )}
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    onClick={() => setSelectedLibrary(null)}
                    className="btn btn-primary text-white hover:text-yellow-700"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer en la parte inferior */}
      <Footer />
    </div>
  );
};

export default LibraryViews;
