import { Router } from 'express';
import * as postsController from '../controllers/postsController';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', postsController.getAllPosts);
router.post('/bulk', postsController.bulkCreatePost);
router.get('/:id', postsController.getPostById);
router.post('/', upload.single('headerImage'), postsController.createPost);
router.put('/:id', upload.single('headerImage'), postsController.updatePost);
router.delete('/:id', postsController.deletePost);

export default router;
