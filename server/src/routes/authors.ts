import { Router } from 'express';
import * as authorsController from '../controllers/authorsController';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const authors = await authorsController.getAllAuthors();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch authors' });
    }
});

router.post('/', async (req, res) => {
    try {
        const author = await authorsController.createAuthor(req.body);
        res.status(201).json(author);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create author' });
    }
});

export default router;
