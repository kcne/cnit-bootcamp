import { Request, Response } from 'express'
import prisma from '../prisma'
import { AuthenticatedRequest } from '../middlewares/authenticateToken';


export const createLecture = async (req: AuthenticatedRequest, res: Response) => {
  const { name, description, duration } = req.body
  const user = req.user;

  try {
    const lecture = await prisma.lecture.create({
      data: {
        name,
        description,
        duration: Number(duration),
        userId: user.userId
      },
    })
    res.status(201).json(lecture)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create order' })
  }
}

export const getAllLectures = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user.userId;
  try {
    const lectures = await prisma.lecture.findMany({
    where: {
    userId: userId
    }
    });
    res.json({lectures});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lecture' })
  }
}

export const getLectureById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const lecture = await prisma.lecture.findUnique({
      where: { id: Number(id) },
    })
    if (!lecture) {
      res.status(404).json({ error: 'Lecture not found' })
      return
    }
    res.json(lecture)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lecture' })
  }
}


export const deleteLecture = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const lecture = await prisma.lecture.delete({
      where: { id: Number(id) },
    })
    res.json(lecture)
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' })
  }
}


