import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/authenticateToken';
import { lectureService } from '../services/lectureService';

export const createLecture = async (req: AuthenticatedRequest, res: Response) => {
  const { name, description, duration } = req.body
  const user = req.user;

  try {
    const lecture = await lectureService.createLecture(name, description, duration, user.userId);
    res.status(201).json(lecture)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create order' })
  }
}

export const getAllLectures = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    
    const paginatedLectures = await lectureService.getAllLectures({ page, limit });
    res.json(paginatedLectures);
  } catch (error) {
    console.error('Error in getAllLectures:', error);
    res.status(500).json({ error: 'Failed to fetch lectures' })
  }
}

export const getMyLectures = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    console.log('User ID from token:', req.user?.userId);
    
    const page = req.query.page ? parseInt(req.query.page as string) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    
    const paginatedLectures = await lectureService.getMyLectures(req.user.userId, { page, limit });
    res.json(paginatedLectures);
  } catch (error) {
    console.error('Error in getMyLectures:', error);
    res.status(500).json({ error: 'Failed to fetch lectures' })
  }
}

export const getLectureById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const lecture = await lectureService.getLectureById(Number(id));
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
    const lecture = await lectureService.deleteLecture(Number(id));
    res.json(lecture)
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' })
  }
}


