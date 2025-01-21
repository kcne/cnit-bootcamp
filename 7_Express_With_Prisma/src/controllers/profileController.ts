import { Request, Response } from 'express'
import prisma from '../prisma'

export const createProfile = async (req: Request, res: Response) => {
  const { userId, bio, age, dateOfBirth } = req.body
  try {
    const profile = await prisma.profile.create({
      data: {
        bio,
        age,
        dateOfBirth,
        user: { connect: { id: Number(userId) } },
      },
    })
    res.status(201).json(profile)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create profile' })
  }
}

export const getProfileById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: Number(id) },
    })
    if (!profile) {
      res.status(404).json({ error: 'Profile not found' })
      return
    }
    res.json(profile)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
}

export const deleteProfile = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const profile = await prisma.profile.delete({
      where: { id: Number(id) },
    })
    res.json(profile)
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete profile' })
  }
}
