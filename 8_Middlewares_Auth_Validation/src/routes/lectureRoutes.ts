import express from 'express'
import { createLecture, deleteLecture, getAllLectures, getLectureById } from '../controllers/lectureController'
import { authenticateToken } from '../middlewares/authenticateToken';

const router = express.Router()



// Create a new lecture
router.post('/lectures', authenticateToken, createLecture)

router.get('/lectures',authenticateToken, getAllLectures);

// Get an lecture by ID
router.get('/lectures/:id', getLectureById)

// Delete lecture by ID
router.delete('/lectures/:id', deleteLecture)

export default router
