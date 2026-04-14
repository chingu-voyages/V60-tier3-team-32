import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller.js';
import { loginSchema, registerSchema } from '../validators/auth.validator.js';
import { validateRequest } from '../middleware/validateRequest.middleware.js';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), registerUser);
router.post('/login', validateRequest(loginSchema), loginUser);
export default router;
