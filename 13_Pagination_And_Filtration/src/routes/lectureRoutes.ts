import express from 'express'
import { createLecture, deleteLecture, getAllLectures, getMyLectures, getLectureById } from '../controllers/lectureController'
import { authenticateToken } from '../middlewares/authenticateToken';

const router = express.Router()

// Public route - get all lectures
router.get('/', getAllLectures);

// Protected routes
router.use(authenticateToken);
router.get('/my-lectures', getMyLectures);
router.post('/', createLecture);
router.get('/:id', getLectureById);
router.delete('/:id', deleteLecture);

export default router
