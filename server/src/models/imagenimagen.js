import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  imageUrl: String,
}, {
  timestamps: true
});

const Image = mongoose.model('Image', ImageSchema);
export default Image;