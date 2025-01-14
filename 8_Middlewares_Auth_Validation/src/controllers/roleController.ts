import { Request, Response } from 'express'
import prisma from '../prisma'

export const createRole = async (req: Request, res: Response) => {
  const { name } = req.body
  try {
    const role = await prisma.role.create({
      data: { name },
    })
    res.status(201).json(role)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create role' })
  }
}

export const getRoleById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const role = await prisma.role.findUnique({
      where: { id: Number(id) },
    })
    if (!role) {
      res.status(404).json({ error: 'Role not found' })
      return
    }
    res.json(role)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch role' })
  }
}

export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const role = await prisma.role.delete({
      where: { id: Number(id) },
    })
    res.json(role)
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete role' })
  }
}
