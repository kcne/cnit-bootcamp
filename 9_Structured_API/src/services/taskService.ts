import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import createHttpError from 'http-errors';
import { CreateTask, UpdateTask } from '../types/Task';

export const getAllTasks = async (userId:number) => {
  // Create new user
  const tasks = await prisma.task.findMany({where: { userId: userId}, include: {tags:true}});

  return tasks;
};

export const createNewTask = async (data: CreateTask) => {
  const task = await prisma.task.create({data:data});

  return task;
};

export const getTaskById = async (taskId: number) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId }
  });

  if (!task) {
    throw createHttpError(404, 'Task not found');
  }

  return task;
};

export const deleteTaskById = async(taskId: number) =>{
    const task = await getTaskById(taskId);

    if(task){
        const deletedTask = await prisma.task.delete({where:{id:taskId}});
    }

    return task;
}


export const updateTask = async (data: UpdateTask) => {

  const task = await getTaskById(data.taskId);

  const {id, ...taskData} = task;
  const updatedTask = await prisma.task.update({
  where: {
    id: data.taskId
  },
  data: {
    name:data.name??task.name,
    description: data.description??task.description,
    status: data.status??task.status,
    priority: data.priority??task.priority
    },
})

  return updatedTask;
};

