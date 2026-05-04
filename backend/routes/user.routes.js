import express from 'express';
import { getMe, getMyPosts } from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/me', authMiddleware, getMe);
router.get('/me/posts', authMiddleware, getMyPosts);

export default router;
