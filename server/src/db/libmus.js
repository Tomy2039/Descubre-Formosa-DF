import mongoose from "mongoose";

export const connectDBMusicAndBooks = async () => {
    try {
        const musicAndBooksDB = await mongoose.createConnection('mongodb://localhost:27017/DFmusicAndBooks');
        console.log('Base de datos de música y libros conectada');
        return musicAndBooksDB;
    } catch (error) {
        console.error('Error al conectar la base de datos de música y libros:', error);
    }
};
