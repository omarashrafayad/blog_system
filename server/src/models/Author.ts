import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    bio: { type: String },
    avatar: { type: String },
    email: { type: String, unique: true },
  },
  { timestamps: true }
);

export const AuthorModel = mongoose.model('Author', authorSchema);
