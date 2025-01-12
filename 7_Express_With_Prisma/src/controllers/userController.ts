import { Request, Response } from 'express'
import prisma from '../prisma'

export const createUser = async (req: Request, res: Response) => {
  const { email, name } = req.body
  try {
    const user = await prisma.user.create({
      data: { email, name },
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' })
  }
}

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
