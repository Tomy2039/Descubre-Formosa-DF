import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    image: { type: String, required: true },
    pdf: { type: String, required: true }
}, { timestamps: true });

const Library = mongoose.model('Library', librarySchema);
export default Library;