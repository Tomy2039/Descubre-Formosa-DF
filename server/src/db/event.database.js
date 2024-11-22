import mongoose from "mongoose";    

export const connectDBevent = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/DFevent');
        console.log('Base de datos conectado');
    } catch (error) {
        console.log('Error al conectar la base de datos');
    }
}