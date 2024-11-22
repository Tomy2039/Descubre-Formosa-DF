import React, { useState, useEffect } from 'react';

const LibraryForm = ({ book, editMode, onSave, onClose }) => {
  const genres = [
    'No ficción',
    'Ficción',
    'Historia',
    'Ciencia',
    'Suspenso',
    'Drama',
    'Novela',
    'Romance',
    'Misterio',
    'Terror',
  ];

  const [formBook, setFormBook] = useState({
    title: '',
    author: '',
    description: '',
    gender: '',
    image: null,
    pdf: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (editMode && book) {
      setFormBook({
        _id: book._id,
        title: book.title || '',
        author: book.author || '',
        description: book.description || '',
        gender: book.gender || '',
        image: book.image || null,
        pdf: book.pdf || null,
      });
      setPreviewImage(book.image || null);
    }
  }, [editMode, book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'my_preset'); // Cambia por tu upload_preset configurado en Cloudinary

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dkktczf96/image/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setFormBook((prevBook) => ({
          ...prevBook,
          image: data.secure_url,
        }));
        setPreviewImage(data.secure_url);
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  const handlePdfChange = async (e) => {
    const file = e.target.files[0];
  
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'my_preset');
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dkktczf96/raw/upload', {
        method: 'POST',
        body: uploadData,
      });
  
      const data = await response.json();
      if (data.secure_url) {
        // Usa data.secure_url para el archivo subido
        setFormBook((prevBook) => ({
          ...prevBook,
          pdf: data.secure_url,
        }));
      }
    } catch (error) {
      console.error('Error al subir el PDF:', error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: formBook.title,
      author: formBook.author,
      description: formBook.description,
      gender: formBook.gender,
      image: formBook.image,
      pdf: formBook.pdf,
    };

    try {
      let response;
      if (editMode && formBook._id) {
        response = await fetch(`http://localhost:4000/api/library/${formBook._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch('http://localhost:4000/api/library', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();
      onSave(data);
      onClose();
    } catch (error) {
      console.error('Error al guardar el libro:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {editMode ? 'Editar Libro' : 'Nuevo Libro'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              name="title"
              value={formBook.title}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Autor</label>
            <input
              type="text"
              name="author"
              value={formBook.author}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Descripción</label>
            <textarea
              name="description"
              value={formBook.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Género</label>
            <select
              name="gender"
              value={formBook.gender}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Selecciona un género
              </option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Imagen</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Vista previa"
                className="mt-2 w-full h-40 object-cover rounded-md"
              />
            )}
          </div>
          <div>
            <label className="block text-gray-700">PDF</label>
            <input
              type="file"
              name="pdf"
              accept=".pdf"
              onChange={handlePdfChange}
              className="file-input file-input-bordered w-full"
            />
            {formBook.pdf && (
              <a
                href={formBook.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 block"
              >
                Ver PDF cargado
              </a>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {editMode ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LibraryForm;