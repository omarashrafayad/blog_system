import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDb } from './db';
import postsRoutes from './routes/posts';
import authorsRoutes from './routes/authors';

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/posts', postsRoutes);
app.use('/authors', authorsRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
