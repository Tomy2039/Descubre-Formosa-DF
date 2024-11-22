import React, { useState, useEffect, useRef } from 'react';

const EventForm = ({ event, editMode, onSave, onClose }) => {
  const [formEvent, setFormEvent] = useState({
    name: '',
    description: '',
    date: '',
    timeBegin: '',
    timeEnd: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);  // Estado para la vista previa de la imagen
  const imageInputRef = useRef();

  useEffect(() => {
    if (editMode && event) {
      console.log("Evento recibido para edición:", event); // Verifica qué contiene 'event'
      setFormEvent({
        _id: event._id,
        name: event.name || '',
        description: event.description || '',
        date: event.date || '',
        timeBegin: event.timeBegin || '',
        timeEnd: event.timeEnd || '',
        image: event.image || null,
      });
      setPreview(event.image || null);  // Si es un evento editado, mostrar la imagen actual
    }
  }, [editMode, event]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'DF_preset'); // Agregar el upload_preset aquí
    
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dtzgpdbyx/upload', {
        method: 'POST',
        body: uploadData,
      });
  
      const data = await response.json(); // Espera la respuesta JSON
      console.log('Respuesta de Cloudinary:', data);
  
      if (data.secure_url) {
        // Asigna la URL de la imagen a formEvent.image
        setFormEvent((prevEvent) => ({
          ...prevEvent,
          image: data.secure_url,
        }));
        setPreview(data.secure_url);  // Actualiza la vista previa
      } else {
        throw new Error('No se recibió una URL segura de Cloudinary');
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      name: formEvent.name,
      description: formEvent.description,
      date: formEvent.date,
      timeBegin: formEvent.timeBegin,
      timeEnd: formEvent.timeEnd,
      image: formEvent.image,
    };
  
    try {
      let response;
      if (editMode && formEvent._id) {
        response = await fetch(`http://localhost:4000/api/events/${formEvent._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch('http://localhost:4000/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
  
      const data = await response.json();
      console.log('Evento guardado:', data);
      onSave(data);
      onClose();
    } catch (error) {
      console.error('Error al guardar el evento:', error);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formEvent.name}
          onChange={handleChange}
          required
          className="input input-bordered w-full mb-2"
        />
      </div>
      <div>
        <label htmlFor="description" className="block">Descripción</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formEvent.description}
          onChange={handleChange}
          required
          className="input input-bordered w-full mb-2"
        />
      </div>
      <div>
        <label htmlFor="date" className="block">Fecha</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formEvent.date}
          onChange={handleChange}
          required
          className="input input-bordered w-full mb-2"
        />
      </div>
      <div>
        <label htmlFor="timeBegin" className="block">Hora de inicio</label>
        <input
          type="time"
          id="timeBegin"
          name="timeBegin"
          value={formEvent.timeBegin}
          onChange={handleChange}
          required
          className="input input-bordered w-full mb-2"
        />
      </div>
      <div>
        <label htmlFor="timeEnd" className="block">Hora de fin</label>
        <input
          type="time"
          id="timeEnd"
          name="timeEnd"
          value={formEvent.timeEnd}
          onChange={handleChange}
          required
          className="input input-bordered w-full mb-2"
        />
      </div>
      <div>
        <label htmlFor="image" className="block">Imagen</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full mb-2"
        />
        {preview && (
          <div className="mt-2">
            <h3>Vista previa:</h3>
            <img src={preview} alt="Vista previa" className="max-w-xs mt-2" />
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary w-full">{editMode ? 'Actualizar Evento' : 'Crear Evento'}</button>
      <button
        type="button"
        onClick={onClose}
        className="btn btn-secondary w-full mt-2"
      >
        Cerrar Formulario
      </button>
    </form>
  );
};

export default EventForm;
