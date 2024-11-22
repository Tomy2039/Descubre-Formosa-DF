import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url'
import connectDB from './db/database.js';  // Conexión a la base de datos
import { authRouter } from './routes/authRoutes.js'; // Rutas de autenticación
import markerRoutes from './routes/markerRoutes.js';
import galeryRoutes from './routes/galeryRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import musicRoutes from './routes/SongRoutes.js'
import libraryRoutes from './routes/libraryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Usar path para rutas (con ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:5173', // Cambia según la URL de tu frontend
  credentials: true,
}));

// Servir imágenes locales
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas de autenticación, libros y canciones
app.use('/user', authRouter);
app.use('/api/markers', markerRoutes);
app.use('/api/galery', galeryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/song', musicRoutes);
app.use('/api/library', libraryRoutes);

// Conectar a MongoDB
connectDB();

// Configuración del puerto
app.set('port', PORT);

// Iniciar el servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
});
