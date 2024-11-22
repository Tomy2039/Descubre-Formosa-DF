import { useState, useEffect } from "react";
import LibraryForm from "./libraryForm";
import PdfViewer from "./pdfViewer"; // Asegúrate de importar el nuevo componente

const CollaboratorLibrary = () => {
  const [libraries, setLibraries] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Obtener librerías del backend
  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/library");
        const data = await response.json();
        console.log(data); // Verificar que el campo 'genero' está presente en los datos
        if (Array.isArray(data)) {
          setLibraries(data);
        } else {
          console.error("Expected an array of libraries, but got:", data);
        }
      } catch (error) {
        console.error("Error fetching libraries:", error);
      }
    };
  
    fetchLibraries();
  }, []);
  

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedLibrary(null);
    setEditMode(false);
  };

  const handleAddLibrary = () => {
    setIsFormOpen(true);
    setEditMode(false);
    setSelectedLibrary(null);
  };

  const handleEditLibrary = (library) => {
    setSelectedLibrary(library);
    setEditMode(true);
    setIsFormOpen(true);
  };

  const handleDeleteLibrary = async (libraryId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/library/${libraryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar biblioteca.");
      }

      setLibraries((prevLibraries) =>
        prevLibraries.filter((library) => library._id !== libraryId)
      );
    } catch (error) {
      console.error("Error al eliminar biblioteca:", error);
    }
  };

  const handleSaveLibrary = (libraryData) => {
    if (editMode) {
      setLibraries((prevLibraries) =>
        prevLibraries.map((library) =>
          library._id === libraryData._id ? libraryData : library
        )
      );
    } else {
      setLibraries((prevLibraries) => [...prevLibraries, libraryData]);
    }
    handleCloseForm();
  };

  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 to-yellow-400 mb-8 shadow-lg">
          Mi Biblioteca
        </h1>
        <p className="text-center text-lg text-gray-800 mb-8 italic">
          Crea, edita y administra los libros de tu biblioteca colaborativa.
        </p>
        <div className="flex justify-center mb-6">
          <button
            onClick={handleAddLibrary}
            className="btn btn-primary px-6 py-3 text-white font-bold rounded-md shadow-xl hover:bg-yellow-700 transform transition duration-200 ease-in-out"
          >
            Agregar Libro
          </button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto">
          {libraries.map((library) => (
            <div
              key={library._id}
              className="card bg-yellow-200 p-4 rounded-lg shadow-md border-2 border-yellow-500 cursor-pointer transition-transform hover:scale-105"
            >
              {library.image && (
                <img
                  src={library.image}
                  alt={library.title}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
              )}
              <h3 className="text-xl font-bold text-gray-700 text-center">
                {library.title}
              </h3>
              <h2 className="text-lg text-gray-700 text-center">
                {library.author}
              </h2>
              {library.gender && (
                <p className="text-md text-gray-600 text-center italic mt-2">
                  Género: {library.gender}
                </p>
              )}
              <div className="flex justify-center mt-2 space-x-4">
                <button
                  onClick={() => handleEditLibrary(library)}
                  className="btn btn-info text-lg text-yellow-200 hover:text-yellow-700 font-semibold"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteLibrary(library._id)}
                  className="btn btn-error text-lg text-yellow-200 hover:text-yellow-700 font-semibold"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => setSelectedLibrary(library)}
                  className="btn btn-secondary text-lg text-yellow-200 hover:text-yellow-700 font-semibold"
                >
                  Ver Más
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {isFormOpen && (
          <LibraryForm
            library={selectedLibrary}
            editMode={editMode}
            onSave={handleSaveLibrary}
            onClose={handleCloseForm}
          />
        )}
  
        {selectedLibrary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="modal modal-open">
              <div className="modal-box bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold">{selectedLibrary.title}</h2>
                <h3 className="text-lg font-semibold mt-2">{selectedLibrary.author}</h3>
                <p className="mt-4 text-lg">{selectedLibrary.description}</p>
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
                {selectedLibrary.genero && (
                  <p className="text-md text-gray-600 text-center mt-2">
                    Género: {selectedLibrary.genero}
                  </p>
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
    </div>
  );  
};

export default CollaboratorLibrary;
