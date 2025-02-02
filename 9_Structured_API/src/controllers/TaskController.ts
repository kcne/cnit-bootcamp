import { Response } from 'express';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import { createNewTask, deleteTaskById, getAllTasks, getTaskById, updateTask } from '../services/taskService';

export const GetAllTasks = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id

    const tasks = await getAllTasks(Number(userId));

    res.status(200).json({tasks:tasks});
};

export const CreateTask = async (req: AuthenticatedRequest, res: Response) => {
  const { name, description, status, priority } = req.body;
  const userId = Number(req.user?.id);''


  const task = {name, description,status,priority, userId}

  const newTask = await createNewTask(task);
  res.status(201).json({newTask});
};

export const GetTaskById = async(req:AuthenticatedRequest, res: Response) => {
  const taskId = req.params.id;

  const task = await getTaskById(Number(taskId));
  res.status(200).json(task);
}

export const DeleteTaskById = async(req:AuthenticatedRequest, res: Response) => {
    const taskId = req.params.id;

    const deletedTask = await deleteTaskById(Number(taskId))

    res.status(204).json(deletedTask);
}

export const UpdateTask = async(req:AuthenticatedRequest, res: Response) => {
    const taskId = Number(req.params.id);
    const {name, description, status, priority } = req.body;
    const userId = Number(req.user?.id);

  const task = {taskId, name, description, status, priority, userId}
  const updatedTask = await updateTask(task);
  res.status(200).json({updatedTask});
}
