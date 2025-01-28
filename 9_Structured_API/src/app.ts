import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import authMiddleware from './middlewares/authMiddleware';
import errorHandler from './middlewares/errorHandler';
import { AuthenticatedRequest } from './types/AuthenticatedRequest';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import metadataRoutes from './routes/metadataRoutes';


dotenv.config();
const app = express();


// Shared middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Protected route example
app.get('/protected', authMiddleware, (req:AuthenticatedRequest, res) => {
  res.status(200).json({ message: 'You are authenticated!', user: req.user });
});

// User routes
app.use('/api/users', userRoutes);

// Task routes
app.use('/api/tasks', taskRoutes);

// Metadata routes
app.use('/api/metadata', metadataRoutes);

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

export default app;
