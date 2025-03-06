import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/authenticateToken';
import { lectureService } from '../services/lectureService';
import { LectureQueryInput } from '../schemas/lectureSchema';

export const createLecture = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { name, description, duration } = req.body
  const user = req.user;

  try {
    const lecture = await lectureService.createLecture(req.body, user.userId);
    res.status(201).json(lecture)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create lecture' })
  }
}

export const getAllLectures = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    const result = await lectureService.findAll({
      pagination: { page, limit },
      includeUser: true
    });
    
    res.json(result);
  } catch (error) {
    console.error('Error in getAllLectures:', error);
    res.status(500).json({ error: 'Failed to fetch lectures' });
  }
}

export const getMyLectures = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    const result = await lectureService.findByUserId(req.user.userId, {
      pagination: { page, limit },
      includeUser: false
    });
    
    res.json(result);
  } catch (error) {
    console.error('Error in getMyLectures:', error);
    res.status(500).json({ error: 'Failed to fetch lectures' });
  }
}

export const getLectureById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const lecture = await lectureService.findById(Number(id));
    if (!lecture) {
      res.status(404).json({ error: 'Lecture not found' })
      return
    }
    res.json(lecture)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lecture' })
  }
}

export const searchLectures = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryOptions = req.body as LectureQueryInput;
    const result = await lectureService.findAll(queryOptions);
    res.json(result);
  } catch (error) {
    console.error('Error in searchLectures:', error);
    res.status(500).json({ error: 'Failed to search lectures' });
  }
};

export const updateLecture = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const lecture = await lectureService.update(id, req.body);
    res.json(lecture);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lecture' });
  }
};

export const deleteLecture = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const lecture = await lectureService.delete(Number(id));
    res.json(lecture)
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lecture' })
  }
}


