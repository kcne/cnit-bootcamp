import express from 'express'
import { createLecture, deleteLecture, getAllLectures, getLectureById } from '../controllers/lectureController'

const router = express.Router()



// Create a new lecture
router.post('/lectures', createLecture)

router.get('/lectures', getAllLectures);

// Get an lecture by ID
router.get('/lectures/:id', getLectureById)

// Delete lecture by ID
router.delete('/lectures/:id', deleteLecture)

export default router
