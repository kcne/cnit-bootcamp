import express from 'express'
import { createProfile, deleteProfile, getProfileById } from '../controllers/profileController'


const router = express.Router()

// Create a new profile
router.post('/profiles', createProfile)

// Get a profile by ID
router.get('/profiles/:id', getProfileById)

// Delete a profile by ID
router.delete('/profiles/:id', deleteProfile)

export default router
