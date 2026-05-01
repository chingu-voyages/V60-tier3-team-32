import express from 'express';
import { getPrompts, createPrompt } from '../controllers/prompt.controller.js';

const router = express.Router();

router.get('/today', getPrompts);
router.post('/', createPrompt);

export default router;
