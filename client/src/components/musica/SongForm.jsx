import React, { useState, useEffect } from "react";
import axios from "axios";

const SongForm = ({ song, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    image: null, // Para manejar la imagen
    audio: null, // Para manejar el archivo de audio
    description: ""
  });

  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title || "",
        artist: song.artist || "",
        image: song.image || null,
        audio: song.audio || null,
        description: song.description || ""
      });
    }
  }, [song]);

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
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('artist', formData.artist);
      formDataToSend.append('description', formData.description);
      if (formData.image) formDataToSend.append('image', formData.image);
      if (formData.audio) formDataToSend.append('audio', formData.audio);

      if (song) {
        await axios.put(`http://localhost:5000/api/songs/${song.id}`, formDataToSend, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await axios.post("http://localhost:5000/api/songs", formDataToSend, { headers: { 'Content-Type': 'multipart/form-data' } });
      }

      onSave(); // Llama a onSave para actualizar la lista
    } catch (error) {
      console.error("Error al guardar la canción:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="text-2xl font-bold text-center mb-4">Subir Canción</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Título"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="artist" className="block text-sm font-medium">Autor</label>
            <input
              type="text"
              id="artist"
              name="artist"
              placeholder="Autor"
              value={formData.artist}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
            <textarea
              id="description"
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium">Imagen</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="file-input w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="audio" className="block text-sm font-medium">Audio</label>
            <input
              type="file"
              id="audio"
              name="audio"
              onChange={handleFileChange}
              className="file-input w-full"
            />
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cerrar</button>
            <button type="submit" className="btn btn-primary">{song ? 'Guardar cambios' : 'Agregar canción'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SongForm;

