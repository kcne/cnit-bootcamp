import { Router } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import asyncHandler from '../middlewares/asyncHandler';
import authMiddleware from '../middlewares/authMiddleware';
import { CreateTask, DeleteTaskById, GetAllTasks, GetTaskById, UpdateTask } from '../controllers/TaskController';
import { createTaskSchema } from '../models/validators/taskValidator';

const router = Router();

// Register a new user
router.get('/get-all', authMiddleware, asyncHandler(GetAllTasks));

// User login
router.post('/create', authMiddleware,  validateRequest(createTaskSchema), asyncHandler(CreateTask));

router.get('/get-by-id/:id', authMiddleware, asyncHandler(GetTaskById));

// Get user info
router.delete('/delete-by-id/:id', authMiddleware, asyncHandler(DeleteTaskById));

router.put('/update-task/:id', authMiddleware, asyncHandler(UpdateTask))

export default router;
