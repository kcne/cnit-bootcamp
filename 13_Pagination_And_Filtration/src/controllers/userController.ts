import { Request, Response } from 'express'
import { userService } from '../services/userService';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    const paginatedUsers = await userService.getAllUsers({ page, limit });
    res.json(paginatedUsers)
  } catch (error) {
    console.error('Error in getUsers:', error);
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const user = await userService.getUserById(Number(id));
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await userService.deleteUser(Number(id));
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  try {
    const newUser = await userService.register(email, password, name);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const result = await userService.login(email, password);
    if (result.success) {
      res.json(result);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};