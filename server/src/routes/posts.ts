import { Router } from 'express';
import * as postsController from '../controllers/postsController';

const router = Router();

router.get('/', postsController.getAllPosts);
router.post('/bulk', postsController.bulkCreatePost);
router.get('/:id', postsController.getPostById);
router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

export default router;
