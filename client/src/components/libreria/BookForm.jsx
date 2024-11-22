import React, { useState, useEffect } from "react";
import axios from "axios"; // Asegúrate de tener axios instalado

const BookForm = ({ book, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    coverImage: null, // Cambié a null para manejar los archivos
    category: "",
    pdf: null, // Cambié a null para manejar los archivos
    description: ""
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0] // Solo se maneja el primer archivo
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("category", formData.category);
    data.append("description", formData.description);

    if (formData.coverImage) {
      data.append("image", formData.coverImage); // Agregar archivo de imagen
    }
    if (formData.pdf) {
      data.append("pdf", formData.pdf); // Agregar archivo PDF
    }

    try {
      const response = await axios.post("http://localhost:5000/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // Manejar la respuesta del backend
      console.log(response.data);
      onSave(response.data.book); // Aquí se pasa la información del libro guardado
    } catch (error) {
      console.error("Error al guardar el libro", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-yellow-200 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-serif text-yellow-700 mb-4 text-center">{book ? "Editar Libro" : "Agregar Libro"}</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título"
            className="mb-3 p-2 w-full border border-yellow-400 rounded-md"
          />
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Autor"
            className="mb-3 p-2 w-full border border-yellow-400 rounded-md"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mb-3 p-2 w-full border border-yellow-400 rounded-md"
          >
            <option value="">Seleccionar Categoría</option>
            <option value="Ficción">Ficción</option>
            <option value="No Ficción">No Ficción</option>
            <option value="Ciencia">Ciencia</option>
            <option value="Historia">Historia</option>
            <option value="Arte">Arte</option>
          </select>

          {/* Subir Imagen */}
          <label className="text-sm text-yellow-700 font-semibold mb-1">Subir Imagen</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="mb-3 p-2 w-full border border-yellow-400 rounded-md"
          />
          
          {/* Subir PDF */}
          <label className="text-sm text-yellow-700 font-semibold mb-1">Subir PDF</label>
          <input
            type="file"
            name="pdf"
            onChange={handleFileChange}
            className="mb-3 p-2 w-full border border-yellow-400 rounded-md"
          />
          
          {/* Descripción */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción"
            className="mb-3 p-2 w-full border border-yellow-400 rounded-md"
            rows="4"
          />
          
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-400">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
