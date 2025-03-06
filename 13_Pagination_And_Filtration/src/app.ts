import express from 'express'
import userRoutes from './routes/userRoutes'
import lectureRoutes from './routes/lectureRoutes'
import { logger } from './middlewares/logger'
import { AuthenticatedRequest, authenticateToken } from './middlewares/authenticateToken'
import productRoutes from './routes/productRoutes'
import inventoryRoutes from './routes/inventoryRoutes'

const app = express()

// Middleware to parse JSON requests
app.use(express.json())

app.use(logger);

// Register routes
app.use('/api/users', userRoutes)
app.use('/api/lectures', lectureRoutes)
app.use('/api/products', productRoutes)
app.use('/api/inventory', inventoryRoutes)


app.get('/protected', authenticateToken, (req: AuthenticatedRequest, res) => {
  const user = req.user; // Access user information from the request object
  res.json({
    message: 'Welcome to the protected route!',
    user, // Include user details in the response
  });
});

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

export default app
