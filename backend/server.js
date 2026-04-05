import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 1. Middleware
// Replace '*' with your actual frontend URL later for better security
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite Dev Server
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 2. Routes (We'll create the test route here for now)
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'The Test Pipe is connected! 🚀' });
});

// 3. Error Handler (Should be the last middleware)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));