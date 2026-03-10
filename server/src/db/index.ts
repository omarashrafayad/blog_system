import mongoose from 'mongoose';

const DATABASE = process.env.DATABASE;

if (!DATABASE) {
  throw new Error('DATABASE connection string is missing in .env');
}

export async function connectDb(): Promise<void> {
  await mongoose.connect(DATABASE!);
  console.log('MongoDB connected');
}
