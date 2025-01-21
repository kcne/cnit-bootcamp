import { Request, Response } from 'express'
import prisma from '../prisma'


export const createLecture = async (req: Request, res: Response) => {
  const { name, description, duration } = req.body


  try {
    const lecture = await prisma.lecture.create({
      data: {
        name,
        description,
        duration: Number(duration)
      },
    })
    res.status(201).json(lecture)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create order' })
  }
}

export const getAllLectures = async (req: Request, res: Response): Promise<void> => {
  try {
    const lectures = await prisma.lecture.findMany();
    res.json(lectures);
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
