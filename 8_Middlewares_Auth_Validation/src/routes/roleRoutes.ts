import express from 'express'
import { createRole, deleteRole, getRoleById } from '../controllers/roleController'

const router = express.Router()

// Create a new role
router.post('/roles', createRole)

// Get a role by ID
router.get('/roles/:id', getRoleById)

// Delete a role by ID
router.delete('/roles/:id', deleteRole)

export default router
