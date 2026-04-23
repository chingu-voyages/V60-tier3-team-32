import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
} from '../controllers/auth.controller.js';
import { loginSchema, registerSchema } from '../validators/auth.validator.js';
import { validateRequest } from '../middleware/validateRequest.middleware.js';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), registerUser);
router.post('/login', validateRequest(loginSchema), loginUser);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logoutUser);

export default router;
