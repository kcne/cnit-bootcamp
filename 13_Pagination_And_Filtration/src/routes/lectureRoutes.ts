import express from 'express'
import { 
  getAllLectures, 
  getMyLectures, 
  searchLectures,
  getLectureById, 
  createLecture, 
  updateLecture, 
  deleteLecture 
} from '../controllers/lectureController'
import { authenticateToken } from '../middlewares/authenticateToken';
import { validateRequest } from '../middlewares/validateRequest';
import { 
  lectureQuerySchema, 
  createLectureSchema, 
  updateLectureSchema 
} from '../schemas/lectureSchema';

const router = express.Router()

// Public routes
router.get('/', getAllLectures);
router.get('/:id', getLectureById);
router.post('/search', validateRequest(lectureQuerySchema), searchLectures);

// Protected routes
router.use(authenticateToken);
router.get('/my-lectures', getMyLectures);
router.post('/', validateRequest(createLectureSchema), createLecture);
router.put('/:id', validateRequest(updateLectureSchema), updateLecture);
router.delete('/:id', deleteLecture);

export default router
