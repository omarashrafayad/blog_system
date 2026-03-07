import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    headerImage: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: String, required: true },
  },
  { timestamps: false }
);

export const PostModel = mongoose.model('Post', postSchema);
