import { Request, Response } from 'express'
import prisma from '../prisma'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    })
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
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
}


export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword },
  });
  res.status(201).json({ message: `User ${newUser.email} registered successfully!` });
};


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, 'super_secret_key', { expiresIn: '1h' });
    res.json({ message: 'Login successful!', token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};