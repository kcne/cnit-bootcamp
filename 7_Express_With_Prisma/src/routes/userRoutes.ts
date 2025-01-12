import express from 'express'
import { createUser, deleteUser, getUserById, getUsers } from '../controllers/userController'


const router = express.Router()

// Create a new user
router.post('/users', createUser)

// Get all users
router.get('/users', getUsers)

// Get a user by ID
router.get('/users/:id', getUserById)

// Delete a user by ID
router.delete('/users/:id', deleteUser)

export default router
