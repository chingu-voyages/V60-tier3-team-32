import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/auth.routes.js';
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. MIDDLEWARE
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
// Server Health Test
app.get('/', (req, res) => {
  res.send('LinguaLoop API is running...');
});

// ERROR HANDLER
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
