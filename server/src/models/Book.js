import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: false
    },
    file: {
        type: String,
        required: false // Solo si quieres almacenar el archivo o enlace al libro digital
    }
});

export const Book = mongoose.model('Book', BookSchema);
