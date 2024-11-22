import Library from '../models/libraryModel.js';
import { uploadImage, uploadPDF } from '../db/cloudinary.js'; // Asegúrate de que estas funciones estén bien importadas
import fs from 'fs';

// Crear un nuevo marcador
export const createLibrary = async (req, res) => {
  const { title, author, description, gender, useCloudinary, image, pdf } = req.body;
console.log(req.body)
  if (!title || !author || !description || !gender) {
    return res.status(400).json({ message: 'Faltan campos obligatorios.' });
  }

  try {
    // let imageUrl = '';
    // let audioUrl = '';

    console.log("Archivos recibidos:", req.files);
    console.log("Datos del formulario:", req.body);
    console.log("Uso de Cloudinary:", useCloudinary);

    // Crear nuevo Libro
    const newLibrary = new Library({
      title,
      author,
      description,
      gender,
      image,
      pdf
    });

    await newLibrary.save();
    res.status(201).json(newLibrary);
    console.log("Nuevo libro creado:", newLibrary);
  } catch (error) {
    console.error("Error al crear el libro:", error);
    res.status(500).json({ message: 'Error al crear el libro' });
  }
};

// Obtener todos los libros
export const getLibraries = async (req, res) => {
  try {
    const libraries = await Library.find();
    res.status(200).json(libraries);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros' });
  }
};

// Actualizar un libro existente
export const updateLibrary = async (req, res) => {
  const { title, author, description, gender, useCloudinary } = req.body;

  if (!title || !author || !description || !gender) {
    return res.status(400).json({ message: 'Faltan campos obligatorios.' });
  }

  try {
    let updatedFields = { ...req.body }; // Campos actualizados

    // Subida de archivos en la actualización
    if ((useCloudinary === 'true' || useCloudinary === true) && req.files) {
      if (req.files.image) {
        try {
          const imagePath = req.files.image.tempFilePath;
          const imageResult = await uploadImage(imagePath);
          updatedFields.image = imageResult.secure_url;
          fs.unlinkSync(imagePath); // Eliminar archivo temporal
        } catch (err) {
          console.error("Error al subir la imagen en Cloudinary:", err);
          return res.status(500).json({ message: 'Error al cargar la imagen en Cloudinary' });
        }
      }

      if (req.files.pdf) {
        try {
          const pdfPath = req.files.pdf.tempFilePath;
          const pdfResult = await uploadPDF(pdfPath);
          updatedFields.pdf = pdfResult.secure_url;
          fs.unlinkSync(pdfPath); // Eliminar archivo temporal
        } catch (err) {
          console.error("Error al subir el pdf en Cloudinary:", err);
          return res.status(500).json({ message: 'Error al cargar el pdf en Cloudinary' });
        }
      }
    }

    const updatedLibrary = await Library.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.status(200).json(updatedLibrary);
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    res.status(500).json({ message: 'Error al actualizar el libro' });
  }
};

// Eliminar un libro
export const deleteLibrary = async (req, res) => {
  try {
    await Library.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Libro eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    res.status(500).json({ message: 'Error al eliminar el libro' });
  }
};