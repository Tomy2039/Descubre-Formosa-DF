import express from "express";
import { uploadBookCover, addBook } from "../controllers/bokscontrollers.js"; // Importa los controladores de libros

const router = express.Router();

// Ruta para subir la portada de un libro
router.post("/upload/cover", uploadBookCover);

// Ruta para agregar un libro
router.post("/add", addBook);

export default router;

