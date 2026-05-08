import express from 'express';
import { getPrompts, createPrompt } from '../controllers/prompt.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/today', authMiddleware, getPrompts);
router.post('/', createPrompt);

export default router;
