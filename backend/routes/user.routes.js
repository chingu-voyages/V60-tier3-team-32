import express from 'express';
import {
  getMe,
  getMyPosts,
  updateProfile,
} from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validateRequest.middleware.js';
import { updateProfileSchema } from '../validators/user.validator.js';
const router = express.Router();

router.get('/me', authMiddleware, getMe);
router.get('/me/posts', authMiddleware, getMyPosts);
router.patch(
  '/me',
  authMiddleware,
  validateRequest(updateProfileSchema),
  updateProfile,
);
export default router;
