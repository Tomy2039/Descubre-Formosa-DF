import express from 'express';
import { createLibrary, getLibraries, updateLibrary, deleteLibrary } from '../controllers/libraryController.js';

const router = express.Router();

router.post('/', createLibrary); // Ruta protegida
router.get('/', getLibraries); // Ruta pública
router.put('/:id', updateLibrary); // Ruta protegida
router.delete('/:id', deleteLibrary); // Ruta protegida

export default router;