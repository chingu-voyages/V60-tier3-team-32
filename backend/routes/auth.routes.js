import express from 'express';
import { registerUser } from '../controllers/auth.controller.js';
import { registerSchema } from '../validators/auth.validator.js';
import { validateRequest } from '../middleware/validateRequest.middleware.js';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), registerUser);

export default router;
