import express from 'express'
import { createOrder, deleteOrder, getOrderById } from '../controllers/orderController';

const router = express.Router()

// Create a new order
router.post('/orders', createOrder)

// Get an order by ID
router.get('/orders/:id', getOrderById)

// Delete an order by ID
router.delete('/orders/:id', deleteOrder)

export default router
