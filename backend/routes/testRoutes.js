import express from 'express';
const router = express.Router();
import { getTests, createTest } from '../controllers/testController.js';

router.route('/').get(getTests).post(createTest);

export default router;