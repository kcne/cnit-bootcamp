import express from 'express'
import userRoutes from './routes/userRoutes'
import profileRoutes from './routes/profileRoutes'
import orderRoutes from './routes/orderRoutes'
import roleRoutes from './routes/roleRoutes'
import lectureRoutes from './routes/lectureRoutes'
import { logger } from './middlewares/logger'
import { AuthenticatedRequest, authenticateToken } from './middlewares/authenticateToken'

const app = express()

// Middleware to parse JSON requests
app.use(express.json())

app.use(logger);

// Register routes
app.use('/api', userRoutes)
app.use('/api', profileRoutes)
app.use('/api', orderRoutes)
app.use('/api', roleRoutes)
app.use('/api', lectureRoutes)


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
