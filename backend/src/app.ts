import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import healthRoutes from './routes/health.routes.js';
import advisorRoutes from './routes/advisor.routes.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

const allowedOrigins = [ENV.FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow dev access
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', healthRoutes);
app.use('/api/advisor', advisorRoutes);
app.use('/api/auth', authRoutes);

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({
    status: 'failed',
    message: 'Endpoint not found',
  });
});

// Centralized Error Middleware
app.use(errorHandler);

export default app;
