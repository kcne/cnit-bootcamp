import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Call the service to create a user
  const user = await userService.register({ name, email, password });

  // Send a response
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Call the service to log in the user
  const { token, user } = await userService.login({ email, password });

  // Send a response (user is already sanitized)
  res.status(200).json({ token, user });
};

export const getUserInfo = async(req:AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id
  const user = await userService.getUserInfoById(Number(userId));
  res.status(200).json(user);
}