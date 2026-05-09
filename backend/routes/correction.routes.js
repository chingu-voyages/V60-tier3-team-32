import express from 'express';
import { getMyCorrections } from '../controllers/correction.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/me', authMiddleware, getMyCorrections);

export default router;
