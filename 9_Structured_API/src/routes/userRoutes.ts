import { Router } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import { registerSchema, loginSchema } from '../models/validators/userValidator';
import { register, login, getUserInfo } from '../controllers/UserController';
import asyncHandler from '../middlewares/asyncHandler';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Register a new user
router.post('/register', validateRequest(registerSchema), asyncHandler(register));

// User login
router.post('/login', validateRequest(loginSchema), asyncHandler(login));

// Get user info
router.get('/me', authMiddleware, asyncHandler(getUserInfo));

export default router;
