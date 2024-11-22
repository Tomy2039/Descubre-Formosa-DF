import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
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
    audio: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
});

export const Music = mongoose.model('Music', MusicSchema); 