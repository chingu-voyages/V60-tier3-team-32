import express from 'express';
import { validateRequest } from '../middleware/validateRequest.middleware.js';
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  submitPost,
  updatePost,
} from '../controllers/post.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import {
  createPostSchema,
  updatePostSchema,
} from '../validators/post.validator.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, validateRequest(createPostSchema), createPost);
router.patch(
  '/:id',
  authMiddleware,
  validateRequest(updatePostSchema),
  updatePost,
);
router.delete('/:id', authMiddleware, deletePost);
router.post('/:id/submit', authMiddleware, submitPost);

export default router;
