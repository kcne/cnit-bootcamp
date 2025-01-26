import { z } from 'zod';

enum taskStatus {
    NEW = 'NEW',
    IN_PROGRESS = 'IN PROGRESS',
    DONE = 'DONE',
}


enum taskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export const createTaskSchema = z.object({
  name: z.string().min(3, 'Task name is required'),
  description: z.string().optional(),
  status: z.nativeEnum(taskStatus).optional(),
  priority: z.nativeEnum(taskPriority).optional(),
});


export const updateTaskSchema = z.object({
  name: z.string().min(3, 'Task name is required').optional(),
  description: z.string().optional().optional(),
  status: z.nativeEnum(taskStatus).optional().optional(),
  priority: z.nativeEnum(taskPriority).optional(),
});

