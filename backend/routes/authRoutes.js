import express from 'express';
import { registerUser } from '../controllers/authController.js';
import { registerSchema } from '../validators/authValidator.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), registerUser);

export default router;
